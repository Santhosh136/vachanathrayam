'use client'

import { useEffect, useState } from 'react'
import { Word } from '@/lib/types'
import { splitStemSuffix } from '@/lib/utils'
import wordsData from '@/app/data/vachanathrayam.json'

export default function PatternTable() {
  const [words, setWords] = useState<Word[]>([])
  const [selectedType, setSelectedType] = useState<string>('')
  const [types, setTypes] = useState<string[]>([])

  useEffect(() => {
    const data = wordsData as Word[]
    setWords(data)
    const uniqueTypes = [...new Set(data.map(w => w.type))]
    setTypes(uniqueTypes)
    setSelectedType(uniqueTypes[0])
  }, [])

  const filteredWords = words.filter(w => w.type === selectedType)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-6 sm:mb-8">Pattern Table</h2>

      <div className="mb-8">
        <p className="text-sm sm:text-base text-gray-600 mb-3">Select grammatical type:</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded border text-xs sm:text-sm transition ${
                selectedType === type
                  ? 'bg-amber-50 border-amber-500 text-amber-900'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {filteredWords.length > 0 && (() => {
          const firstWord = filteredWords[0]
          const forms = [firstWord.vachanam.singular, firstWord.vachanam.dual, firstWord.vachanam.plural]
          const split = splitStemSuffix(forms)
          return (
            <div className="p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded">
              <p className="devanagari text-sm sm:text-base font-medium text-gray-700 text-center">
                {split.suffixes[0]} → {split.suffixes[1]} → {selectedType === "अकारान्तः नपुंसकलिङ्गः" ? split.suffixes[2] + "/णि" : split.suffixes[2]}
              </p>
            </div>
          )
        })()}
      </div>


      <div className="overflow-x-auto border border-gray-200 rounded">
        <table className="w-full text-xs sm:text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold">एकवचनम्</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold">द्विवचनम्</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold">बहुवचनम्</th>
            </tr>
          </thead>
          <tbody>
            {filteredWords.map((word, idx) => {
              const { singular, dual, plural } = word.vachanam
              const isAkaarantaPullingam = selectedType === 'अकारान्तः पुल्लिङ्गः'
              const isAakaarantaSthrilingam = selectedType === 'आकारान्तः स्त्रीलिङ्गः'
              const isEekaarantaSthrilingam = selectedType === 'ईकारान्तः स्त्रीलिङ्गः'

              let singularHighlight = 2
              let pluralHighlight = (isAkaarantaPullingam || isAakaarantaSthrilingam) ? 3 : isEekaarantaSthrilingam ? 4 : 2
              let dualHighlight = isEekaarantaSthrilingam ? 4 : 2

              if (word.sanskrit === "छात्रः") {
                singularHighlight = 4;
                dualHighlight = 4;
                pluralHighlight = 5;
              }

              if (word.sanskrit === "अभिनेत्री") {
                singularHighlight = 4;
                dualHighlight = 6;
                pluralHighlight = 6;
              }

              return (
                <tr key={word.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 devanagari text-sm sm:text-lg">
                    {singular.slice(0, -singularHighlight)}<span className="text-amber-600 font-bold">{singular.slice(-singularHighlight)}</span>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 devanagari text-sm sm:text-lg">
                    {dual.slice(0, -dualHighlight)}<span className="text-amber-600 font-bold">{dual.slice(-dualHighlight)}</span>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 devanagari text-sm sm:text-lg">
                    {plural.slice(0, -pluralHighlight)}<span className="text-amber-600 font-bold">{plural.slice(-pluralHighlight)}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
