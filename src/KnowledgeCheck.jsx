import { useState } from "react"

export default function KnowledgeCheck({ questions, onFinish }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [results, setResults] = useState([])
  const [showAnswer, setShowAnswer] = useState(false)

  const handleSelect = (option) => {
    if (showAnswer) return
    setSelected(option)
    setShowAnswer(true)
  }

  const handleNext = () => {
    const isCorrect = selected?.startsWith(questions[current].correct)
    const newResults = [...results, {
      topic: questions[current].topic,
      correct: isCorrect
    }]
    setResults(newResults)

    if (current + 1 >= questions.length) {
      // Calculate score and weak topics
      const score = newResults.filter(r => r.correct).length
      const weakTopics = newResults
        .filter(r => !r.correct)
        .map(r => r.topic)
      onFinish(score, weakTopics)
    } else {
      setCurrent(current + 1)
      setSelected(null)
      setShowAnswer(false)
    }
  }

  const q = questions[current]
  const isCorrect = selected?.startsWith(q.correct)

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-blue-400 mb-1">Knowledge Check</h2>
          <p className="text-gray-400 text-sm">5 quick questions to personalize your prep</p>
        </div>

        {/* Progress */}
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{current} of {questions.length} done</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2 mb-8">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${(current / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <p className="text-xs text-blue-400 font-semibold uppercase mb-3">
            Topic: {q.topic}
          </p>
          <p className="text-lg font-medium">{q.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {q.options.map((option) => {
            const isThisCorrect = option.startsWith(q.correct)
            const isThisSelected = selected === option

            let style = "bg-gray-900 border-gray-800 hover:border-blue-500 cursor-pointer"
            if (showAnswer) {
              if (isThisCorrect) style = "bg-green-900 border-green-500"
              else if (isThisSelected && !isThisCorrect) style = "bg-red-900 border-red-500"
              else style = "bg-gray-900 border-gray-800 opacity-50"
            }

            return (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className={`border rounded-xl p-4 transition-all ${style}`}
              >
                <p className="text-sm">{option}</p>
              </div>
            )
          })}
        </div>

        {/* Feedback + Next */}
        {showAnswer && (
          <div className="space-y-4">
            <div className={`rounded-xl p-4 ${isCorrect ? "bg-green-900 border border-green-700" : "bg-red-900 border border-red-700"}`}>
              <p className="font-semibold text-sm">
                {isCorrect ? "✅ Correct!" : `❌ Wrong! Correct answer: ${q.correct}`}
              </p>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all"
            >
              {current + 1 >= questions.length ? "See My Learning Roadmap →" : "Next Question →"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}