'use client'

import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <Link href="/" className="text-base sm:text-lg font-semibold devanagari">
          वचनत्रयम्
        </Link>
        <Link href="/" className="text-base sm:text-lg text-gray-600">
          Home
        </Link>
      </div>
    </nav>
  )
}
