'use client'

import { useEffect, useState } from 'react'
import { Word, VachanamForm } from '@/lib/types'
import wordsData from '@/app/data/vachanathrayam.json'

export default function FormQuiz() {
  const [words, setWords] = useState<Word[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string>('')
  const [current, setCurrent] = useState<{ word: Word; form: VachanamForm } | null>(null)
  const [answered, setAnswered] = useState<VachanamForm | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [history, setHistory] = useState<Array<{ word: Word; form: VachanamForm }>>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)

  useEffect(() => {
    const data = wordsData as Word[]
    setWords(data)
    const uniqueTypes = [...new Set(data.map(w => w.type))]
    setTypes(uniqueTypes)
    setSelectedType(uniqueTypes[0])
  }, [])

  const pickQuestion = () => {
    const toUse = selectedType ? words.filter(w => w.type === selectedType) : words
    if (toUse.length === 0) return

    const word = toUse[Math.floor(Math.random() * toUse.length)]
    const forms: VachanamForm[] = ['singular', 'dual', 'plural']
    const form = forms[Math.floor(Math.random() * forms.length)]

    const newQuestion = { word, form }
    setCurrent(newQuestion)
    setAnswered(null)

    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newQuestion)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const goToPrevious = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setCurrent(history[historyIndex - 1])
      setAnswered(null)
    }
  }

  const goToNext = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setCurrent(history[historyIndex + 1])
      setAnswered(null)
    } else {
      pickQuestion()
    }
  }

  useEffect(() => {
    pickQuestion()
  }, [selectedType, words])

  const getFormLabel = (form: VachanamForm) => {
    if (form === 'singular') return 'एकवचनम्'
    if (form === 'dual') return 'द्विवचनम्'
    if (form === 'plural') return 'बहुवचनम्'
  }

  const handleAnswer = (guess: VachanamForm) => {
    if (answered) return

    const isCorrect = guess === current?.form
    setAnswered(guess)
    setScore(prev => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1
    }))
  }

  if (!current) return null

  const currentValue = current.word.vachanam[current.form]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-8">Form Quiz</h2>

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
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Which form is this?</p>
          <div className="devanagari text-4xl sm:text-6xl font-medium mb-4 sm:mb-6 break-words">{currentValue}</div>
          <p className="text-lg sm:text-2xl text-gray-700">{current.word.english} ({current.word.tamil})</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {(['singular', 'dual', 'plural'] as VachanamForm[]).map(form => {
            const isCorrect = form === current.form
            const isAnswered = answered === form
            const isWrong = answered && form === answered && !isCorrect

            return (
              <button
                key={form}
                onClick={() => handleAnswer(form)}
                disabled={answered !== null}
                className={`py-2 sm:py-3 px-3 sm:px-4 rounded text-sm sm:text-base font-medium border transition ${
                  answered === null
                    ? 'border-gray-300 hover:bg-gray-50 cursor-pointer'
                    : isCorrect
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : isWrong
                        ? 'border-red-500 bg-red-50 text-red-900'
                        : 'border-gray-300 text-gray-500 opacity-50'
                }`}
              >
                {getFormLabel(form)}
              </button>
            )
          })}
        </div>

        <div className="flex gap-2 sm:gap-3 justify-center">
          <button
            onClick={goToPrevious}
            disabled={historyIndex <= 0}
            className="px-4 sm:px-6 py-2 border border-gray-300 rounded text-xs sm:text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <button
            onClick={goToNext}
            className="px-4 sm:px-6 py-2 border border-gray-300 rounded text-xs sm:text-sm font-medium hover:bg-gray-50"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
