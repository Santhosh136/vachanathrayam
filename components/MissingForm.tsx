'use client'

import { useEffect, useState } from 'react'
import { Word, VachanamForm } from '@/lib/types'
import wordsData from '@/app/data/vachanathrayam.json'

export default function MissingForm() {
  const [words, setWords] = useState<Word[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string>('')
  const [current, setCurrent] = useState<{ word: Word; shownForm: VachanamForm } | null>(null)
  const [revealed, setRevealed] = useState<Set<VachanamForm>>(new Set())

  useEffect(() => {
    const data = wordsData as Word[]
    setWords(data)
    const uniqueTypes = [...new Set(data.map(w => w.type))]
    setTypes(uniqueTypes)
    setSelectedType(uniqueTypes[0])
  }, [])

  const pickWord = () => {
    const toUse = selectedType ? words.filter(w => w.type === selectedType) : words
    if (toUse.length === 0) return

    const word = toUse[Math.floor(Math.random() * toUse.length)]
    const forms: VachanamForm[] = ['singular', 'dual', 'plural']
    const shownForm = forms[Math.floor(Math.random() * forms.length)]

    setCurrent({ word, shownForm })
    setRevealed(new Set([shownForm]))
  }

  useEffect(() => {
    pickWord()
  }, [selectedType, words])

  if (!current) return null

  const forms: VachanamForm[] = ['singular', 'dual', 'plural']
  const hiddenForms = forms.filter(f => f !== current.shownForm)

  const getFormLabel = (form: VachanamForm) => form.charAt(0).toUpperCase() + form.slice(1)
  const getFormValue = (form: VachanamForm) => current.word.vachanam[form]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-6 sm:mb-8">Missing Form</h2>

      <div className="mb-8">
        <p className="text-sm sm:text-base text-gray-600 mb-3">Filter by type:</p>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded text-xs sm:text-sm"
        >
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-sm sm:text-base text-gray-600 mb-2">English meaning:</p>
          <p className="text-xl sm:text-3xl font-semibold">{current.word.english}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {forms.map(form => (
            <button
              key={form}
              onClick={() => !revealed.has(form) && setRevealed(new Set([...revealed, form]))}
              className="border border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:bg-gray-50 transition-colors"
            >
              <p className="text-xs text-gray-500 mb-2 sm:mb-3 font-semibold">{getFormLabel(form)}</p>
              <div className="devanagari text-2xl sm:text-3xl font-medium min-h-[2rem] sm:min-h-[3rem] flex items-center justify-center cursor-pointer">
                {revealed.has(form) ? getFormValue(form) : '?'}
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={pickWord}
            className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded text-xs sm:text-sm font-medium hover:bg-gray-50"
          >
            Next Word →
          </button>
        </div>
      </div>
    </div>
  )
}
