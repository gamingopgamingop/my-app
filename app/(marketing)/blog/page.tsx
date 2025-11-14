import Link from 'next/link'
import { Calendar } from 'lucide-react'

// Incremental Static Regeneration - Revalidate every hour
export const revalidate = 3600

// Mock blog data - in production, this would come from a CMS or database
const blogPosts = [
  {
    slug: 'soc2-compliance-guide',
    title: 'Complete Guide to SOC 2 Compliance',
    excerpt: 'Learn everything you need to know about achieving and maintaining SOC 2 compliance for your organization.',
    date: '2025-01-15',
    category: 'Compliance'
  },
  {
    slug: 'owasp-top-10-2024',
    title: 'Understanding OWASP Top 10 Security Risks',
    excerpt: 'A deep dive into the most critical web application security risks and how to mitigate them.',
    date: '2025-01-10',
    category: 'Security'
  },
  {
    slug: 'automated-security-testing',
    title: 'The Future of Automated Security Testing',
    excerpt: 'How AI and automation are revolutionizing security auditing and vulnerability detection.',
    date: '2025-01-05',
    category: 'Technology'
  }
]

export default async function BlogPage() {
  // Simulate data fetching
  await new Promise(resolve => setTimeout(resolve, 100))

  return (
    <div className="min-h-screen bg-white">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Security & Compliance Blog</h1>
          <p className="text-xl text-gray-600">
            Stay updated with the latest security best practices and compliance standards
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white border rounded-xl p-6 hover:shadow-lg transition"
            >
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
