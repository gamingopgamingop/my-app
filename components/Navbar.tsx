import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Auto-Audit Agent</span>
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition">
              About
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition">
              Blog
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition">
              Pricing
            </Link>
            <Link 
              href="/sign-in" 
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Sign In
            </Link>
            <Link 
              href="/sign-up" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
