import { useState } from "react"
import { evaluateAnswer } from "./api"

export default function Interview({ questions, jobDesc, onFinish }) {
  const [current, setCurrent] = useState(0)
  const [answer, setAnswer] = useState("")
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  const handleSubmit = async () => {
    setLoading(true)
    const result = await evaluateAnswer(questions[current], answer, jobDesc)
    setFeedback(result)
    setResults([...results, { question: questions[current], answer, ...result }])
    setLoading(false)
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      onFinish([...results])
    } else {
      setCurrent(current + 1)
      setAnswer("")
      setFeedback(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{Math.round(((current) / questions.length) * 100)}% done</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2 mb-8">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${((current) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <p className="text-xs text-blue-400 font-semibold uppercase mb-3">Question {current + 1}</p>
          <p className="text-lg font-medium">{questions[current]}</p>
        </div>

        {/* Answer */}
        {!feedback && (
          <>
            <textarea
              className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl p-4 h-36 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              disabled={!answer.trim() || loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all"
            >
              {loading ? "Evaluating..." : "Submit Answer →"}
            </button>
          </>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`text-3xl font-bold ${feedback.score >= 7 ? "text-green-400" : feedback.score >= 5 ? "text-yellow-400" : "text-red-400"}`}>
                  {feedback.score}/10
                </div>
                <div className="text-gray-400 text-sm">AI Score</div>
              </div>
              <p className="text-gray-300 text-sm mb-4">{feedback.feedback}</p>
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-xs text-green-400 font-semibold mb-2">💡 STRONGER ANSWER</p>
                <p className="text-gray-300 text-sm">{feedback.better_answer}</p>
              </div>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all"
            >
              {current + 1 >= questions.length ? "See My Report Card →" : "Next Question →"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}