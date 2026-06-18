import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2 devanagari">
            वचनत्रयम्
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">Learn Sanskrit Singular, Dual, and Plural</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
          <Link href="/pattern-table">
            <div className="border border-gray-200 rounded p-6 sm:p-8 cursor-pointer">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">Pattern Table</h3>
              <p className="text-sm sm:text-base text-gray-600">View words by type with suffix highlighting</p>
            </div>
          </Link>

          <Link href="/missing-form">
            <div className="border border-gray-200 rounded p-6 sm:p-8 cursor-pointer">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">Missing Form</h3>
              <p className="text-sm sm:text-base text-gray-600">Click to reveal hidden forms</p>
            </div>
          </Link>

          <Link href="/form-quiz">
            <div className="border border-gray-200 rounded p-6 sm:p-8 cursor-pointer">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">Form Quiz</h3>
              <p className="text-sm sm:text-base text-gray-600">Test your knowledge</p>
            </div>
          </Link>
        </div>

        <div className="text-center text-base sm:text-lg text-gray-500 space-y-1">
          <p>100 words • 4 grammatical types • 3 number forms</p>
        </div>
      </main>
    </div>
  )
}
