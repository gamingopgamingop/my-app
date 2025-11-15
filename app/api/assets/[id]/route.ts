import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const assetUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  type: z.enum(['WEB_APPLICATION', 'MOBILE_APP', 'API', 'CLOUD_INFRASTRUCTURE', 'NETWORK_DEVICE', 'DATABASE']).optional(),
  ipAddress: z.string().optional(),
  domain: z.string().optional(),
});

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    const asset = await prisma.asset.findFirst({
      where: { id, tenantId: user?.tenantId || '' },
      include: { vulnerabilities: true },
    });

    if (!asset) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
    }

    return NextResponse.json(asset);
  } catch (error) {
    console.error('Error fetching asset:', err