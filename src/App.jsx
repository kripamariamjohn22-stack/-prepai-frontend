import { useState } from "react"
import { generateQuestions, getKnowledgeCheck, getRoadmap } from "./api"
import KnowledgeCheck from "./KnowledgeCheck"
import Roadmap from "./Roadmap"
import Interview from "./Interview"
import Report from "./Report"

export default function App() {
  const [jobDesc, setJobDesc] = useState("")
  const [questions, setQuestions] = useState([])
  const [mcqQuestions, setMcqQuestions] = useState([])
  const [roadmap, setRoadmap] = useState(null)
  const [score, setScore] = useState(0)
  const [results, setResults] = useState([])
  const [screen, setScreen] = useState("landing")
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState("")

  const handleStart = async () => {
    if (!jobDesc.trim()) return
    setLoading(true)
    setLoadingMsg("Generating your personalized knowledge check...")
    try {
      const data = await getKnowledgeCheck(jobDesc)
      setMcqQuestions(data.questions)
      setScreen("knowledge")
    } catch(e) {
      console.error("Knowledge check error:", e)
      alert(`Something went wrong. Try again! ${e.message || ""}`)
    } finally {
      setLoading(false)
    }
  }

  const handleKnowledgeFinish = async (userScore, weakTopics) => {
    setScore(userScore)
    setLoading(true)
    setLoadingMsg("Building your roadmap and interview questions...")
    try {
      // Both calls at the SAME TIME instead of one after other
      const [roadmapData, questionsData] = await Promise.all([
        getRoadmap(jobDesc, userScore, weakTopics),
        generateQuestions(jobDesc)
      ])
      setRoadmap(roadmapData)
      setQuestions(questionsData.questions)
      setScreen("roadmap")
    } catch(e) {
      console.error("Knowledge finish error:", e)
      alert(`Something went wrong. Try again! ${e.message || ""}`)
    } finally {
      setLoading(false)
    }
  }

  const handleStartInterview = async () => {
    setLoading(true)
    setLoadingMsg("Generating your interview questions...")
    try {
      const data = await generateQuestions(jobDesc)
      setQuestions(data.questions)
      setScreen("interview")
    } catch(e) {
      console.error("Start interview error:", e)
      alert(`Something went wrong. Try again! ${e.message || ""}`)
    } finally {
      setLoading(false)
    }
  }

  const handleRestart = () => {
    setScreen("landing")
    setJobDesc("")
    setResults([])
    setRoadmap(null)
    setScore(0)
  }

  // Loading screen
  if (loading) return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
      <p className="text-gray-400">{loadingMsg}</p>
    </div>
  )

  if (screen === "knowledge") return <KnowledgeCheck questions={mcqQuestions} onFinish={handleKnowledgeFinish} />
  if (screen === "roadmap") return <Roadmap roadmap={roadmap} score={score} onStartInterview={handleStartInterview} />
  if (screen === "interview") return <Interview questions={questions} jobDesc={jobDesc} onFinish={(r) => { setResults(r); setScreen("report") }} />
  if (screen === "report") return <Report results={results} onRestart={handleRestart} />

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-400">PrepAI</h1>
        <span className="text-gray-400 text-sm">AI Interview Coach</span>
      </nav>

      <div className="flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="bg-blue-500 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
          Free AI Tool
        </div>
        <h2 className="text-5xl font-bold mb-4 leading-tight">
          Ace Your Next <br />
          <span className="text-blue-400">Tech Interview</span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-xl">
          Paste any job description → get a knowledge check → personalized study roadmap → practice interview → AI feedback.
        </p>

        <div className="w-full max-w-2xl bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <label className="text-sm text-gray-400 mb-2 block text-left">Paste Job Description</label>
          <textarea
            className="w-full bg-gray-800 text-white rounded-xl p-4 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Paste the job description here... e.g. Software Engineering Intern at Microsoft..."
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
          <button
            onClick={handleStart}
            disabled={!jobDesc.trim()}
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all"
          >
            Start My Interview Prep →
          </button>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-4 gap-4 mt-16 max-w-3xl w-full">
          {[
            { icon: "📋", step: "1", title: "Paste JD", desc: "Any job description" },
            { icon: "🧠", step: "2", title: "Knowledge Check", desc: "5 MCQ questions" },
            { icon: "📚", step: "3", title: "Study Roadmap", desc: "Personalized checklist" },
            { icon: "🎯", step: "4", title: "Practice + Score", desc: "AI feedback on answers" },
          ].map((f) => (
            <div key={f.step} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-left">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="text-xs text-blue-400 font-bold mb-1">STEP {f.step}</div>
              <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
              <p className="text-gray-400 text-xs">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}