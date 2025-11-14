import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { clerkClient } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId || session.metadata?.clerkId

        if (!userId) {
          console.error('No userId found in session metadata')
          break
        }

        // Update user role in Clerk to PRO_AUDITOR
        const client = await clerkClient()
        await client.users.updateUserMetadata(userId, {
          publicMetadata: {
            role: 'PRO_AUDITOR',
            stripeCustomerId: session.customer,
            subscriptionId: session.subscription,
          },
        })

        // Update user in database
        await prisma.user.upsert({
          where: { clerkId: userId },
          update: {
            role: 'PRO_AUDITOR',
            stripeCustomerId: session.customer as string,
          },
          create: {
            clerkId: userId,
            email: session.customer_email || '',
            role: 'PRO_AUDITOR',
            stripeCustomerId: session.customer as string,
          },
        })

        console.log(`User ${userId} upgraded to PRO_AUDITOR`)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Find user by Stripe customer ID
        const user = await prisma.user.findUnique({
          where: { stripeCustomerId: customerId },
        })

        if (!user) {
          console.error('User not found for customer:', customerId)
          break
        }

        // Check subscription status
        if (subscription.status === 'active') {
          // Ensure user has PRO_AUDITOR role
          const client = await clerkClient()
          await client.users.updateUserMetadata(user.clerkId, {
            publicMetadata: {
              role: 'PRO_AUDITOR',
            },
          })

          await prisma.user.update({
            where: { id: user.id },
            data: { role: 'PRO_AUDITOR' },
          })
        } else if (['canceled', 'unpaid', 'past_due'].includes(subscription.status)) {
          // Downgrade to FREE_TIER
          const client = await clerkClient()
          await client.users.updateUserMetadata(user.clerkId, {
            publicMetadata: {
              role: 'FREE_TIER',
            },
          })

          await prisma.user.update({
            where: { id: user.id },
            data: { role: 'FREE_TIER' },
          })

          console.log(`User ${user.clerkId} downgraded to FREE_TIER`)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const user = await prisma.user.findUnique({
          where: { stripeCustomerId: customerId },
        })

        if (user) {
          // Downgrade to FREE_TIER
          const client = await clerkClient()
          await client.users.updateUserMetadata(user.clerkId, {
            publicMetadata: {
              role: 'FREE_TIER',
            },
          })

          await prisma.user.update({
            where: { id: user.id },
            data: { role: 'FREE_TIER' },
          })

          console.log(`Subscription canceled for user ${user.clerkId}`)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
