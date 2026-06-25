import { useState } from "react"

export default function Roadmap({ roadmap, score, onStartInterview }) {
  const [checked, setChecked] = useState({})

  const toggle = (name) => {
    setChecked(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const completedCount = Object.values(checked).filter(Boolean).length
  const priorityColor = {
    "High": "text-red-400 bg-red-900 border-red-700",
    "Medium": "text-yellow-400 bg-yellow-900 border-yellow-700",
    "Low": "text-green-400 bg-green-900 border-green-700"
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Score + Level */}
        <div className="text-center mb-8">
          <div className={`text-6xl font-bold mb-2 ${score >= 4 ? "text-green-400" : score >= 2 ? "text-yellow-400" : "text-red-400"}`}>
            {score}/5
          </div>
          <p className="text-gray-400 text-sm mb-1">Knowledge Check Score</p>
          <div className="inline-block bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            {roadmap.level}
          </div>
          <p className="text-gray-300 mt-4 max-w-md mx-auto">{roadmap.message}</p>
        </div>

        {/* Progress bar */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Study Progress</span>
            <span className="text-blue-400">{completedCount}/{roadmap.topics.length} topics</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${(completedCount / roadmap.topics.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Topics Checklist */}
        <h3 className="text-lg font-bold mb-4">📚 Your Study Checklist</h3>
        <div className="space-y-3 mb-8">
          {roadmap.topics.map((topic) => (
            <div
              key={topic.name}
              onClick={() => toggle(topic.name)}
              className={`border rounded-2xl p-5 cursor-pointer transition-all ${checked[topic.name] ? "bg-gray-800 border-green-700 opacity-60" : "bg-gray-900 border-gray-800 hover:border-blue-500"}`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${checked[topic.name] ? "bg-green-500 border-green-500" : "border-gray-600"}`}>
                  {checked[topic.name] && <span className="text-white text-xs">✓</span>}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`font-semibold ${checked[topic.name] ? "line-through text-gray-500" : ""}`}>
                      {topic.name}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityColor[topic.priority]}`}>
                      {topic.priority}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{topic.description}</p>
                  <p className="text-blue-400 text-xs">📖 {topic.resources}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onStartInterview}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all"
        >
          I'm Ready — Start Interview Practice →
        </button>
      </div>
    </div>
  )
}