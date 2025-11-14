import Link from 'next/link'
import { Calendar, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

// Incremental Static Regeneration - Revalidate every hour
export const revalidate = 3600

// Mock blog data
const blogPosts: Record<string, {
  title: string
  content: string
  date: string
  category: string
}> = {
  'soc2-compliance-guide': {
    title: 'Complete Guide to SOC 2 Compliance',
    content: `
SOC 2 (Service Organization Control 2) is a crucial compliance framework for service providers storing customer data in the cloud. This guide will walk you through everything you need to know.

## What is SOC 2?

SOC 2 is an auditing procedure that ensures service providers securely manage data to protect the interests of their organization and the privacy of their clients.

## The Five Trust Service Criteria

1. **Security**: The system is protected against unauthorized access
2. **Availability**: The system is available for operation and use as committed
3. **Processing Integrity**: System processing is complete, valid, accurate, timely, and authorized
4. **Confidentiality**: Information designated as confidential is protected
5. **Privacy**: Personal information is collected, used, retained, disclosed, and disposed of properly

## Steps to Achieve SOC 2 Compliance

### 1. Define Your Scope
Identify which systems and processes will be included in your audit.

### 2. Implement Security Controls
Put the necessary security measures in place based on the Trust Service Criteria.

### 3. Monitor and Document
Continuously monitor your systems and maintain detailed documentation.

### 4. Engage an Auditor
Work with a qualified CPA firm to perform the SOC 2 audit.

## How Auto-Audit Agent Can Help

Our platform automates much of the compliance monitoring process, providing:
- Continuous security monitoring
- Automated evidence collection
- Real-time compliance dashboards
- Audit-ready reports

Ready to streamline your SOC 2 compliance? Get started with Auto-Audit Agent today.
    `,
    date: '2025-01-15',
    category: 'Compliance'
  },
  'owasp-top-10-2024': {
    title: 'Understanding OWASP Top 10 Security Risks',
    content: `
The OWASP Top 10 is a standard awareness document for developers and web application security, representing a broad consensus about the most critical security risks.

## 2024 OWASP Top 10

1. Broken Access Control
2. Cryptographic Failures
3. Injection
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable and Outdated Components
7. Identification and Authentication Failures
8. Software and Data Integrity Failures
9. Security Logging and Monitoring Failures
10. Server-Side Request Forgery (SSRF)

Each of these represents a significant threat that organizations must address to maintain secure applications.
    `,
    date: '2025-01-10',
    category: 'Security'
  },
  'automated-security-testing': {
    title: 'The Future of Automated Security Testing',
    content: `
Automated security testing is transforming how organizations approach cybersecurity, making it faster, more comprehensive, and more accessible.

## The Evolution of Security Testing

Traditional manual security testing is time-consuming and often incomplete. Automated testing provides continuous monitoring and rapid detection of vulnerabilities.

## Benefits of Automation

- **Speed**: Scan thousands of endpoints in minutes
- **Consistency**: Apply the same rigorous tests every time
- **Coverage**: Test more scenarios than humanly possible
- **Cost-Effective**: Reduce the need for extensive manual testing

## The Role of AI

Artificial intelligence is enhancing automated security testing by identifying patterns, predicting vulnerabilities, and providing intelligent remediation suggestions.

Auto-Audit Agent leverages AI to provide cutting-edge automated security testing for modern applications.
    `,
    date: '2025-01-05',
    category: 'Technology'
  }
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }))
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article>
          <div className="mb-8">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={idx} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>
              } else if (paragraph.startsWith('### ')) {
                return <h3 key={idx} className="text-xl font-bold text-gray-900 mt-6 mb-3">{paragraph.replace('### ', '')}</h3>
              } else if (paragraph.match(/^\d+\./)) {
                return <li key={idx} className="ml-6 text-gray-700">{paragraph}</li>
              } else if (paragraph.startsWith('- ')) {
                return <li key={idx} className="ml-6 text-gray-700">{paragraph.replace('- ', '')}</li>
              } else if (paragraph.trim()) {
                return <p key={idx} className="text-gray-700 mb-4">{paragraph}</p>
              }
              return null
            })}
          </div>
        </article>
      </main>
    </div>
  )
}
