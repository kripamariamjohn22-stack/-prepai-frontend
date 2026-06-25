export default function Report({ results, onRestart }) {
  const avgScore = Math.round(results.reduce((a, b) => a + b.score, 0) / results.length)

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className={`text-7xl font-bold mb-2 ${avgScore >= 7 ? "text-green-400" : avgScore >= 5 ? "text-yellow-400" : "text-red-400"}`}>
            {avgScore}/10
          </div>
          <p className="text-gray-400">Overall Interview Score</p>
          <p className="text-2xl font-bold mt-2">
            {avgScore >= 8 ? "🔥 Excellent!" : avgScore >= 6 ? "👍 Good job!" : "📚 Keep practicing!"}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {results.map((r, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-medium text-gray-300 flex-1 mr-4">{r.question}</p>
                <span className={`text-lg font-bold ${r.score >= 7 ? "text-green-400" : r.score >= 5 ? "text-yellow-400" : "text-red-400"}`}>
                  {r.score}/10
                </span>
              </div>
              <p className="text-xs text-gray-500">{r.feedback}</p>
            </div>
          ))}
        </div>

        <button onClick={onRestart} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl">
          Practice Again →
        </button>
      </div>
    </div>
  )
}