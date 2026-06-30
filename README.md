🎯 PrepAI — AI Interview Coach

> A full-stack AI-powered interview preparation platform. Paste any job description and get a personalized knowledge check, study roadmap, mock interview, and AI-scored report card.

**🔗 Live App:** [prepai-frontend-eight.vercel.app](https://prepai-frontend-eight.vercel.app)
**💻 Frontend Code:** [github.com/kripamariamjohn22-stack/-prepai-frontend](https://github.com/kripamariamjohn22-stack/-prepai-frontend)
**⚙️ Backend Code:** [github.com/kripamariamjohn22-stack/-prepai-backend](https://github.com/kripamariamjohn22-stack/-prepai-backend)

---

## 📖 What It Does

PrepAI takes the guesswork out of interview prep. Instead of generic interview questions, it personalizes the entire experience based on the exact job description you're targeting.

**The flow:**
1. **Paste a Job Description** — any role, any company
2. **Knowledge Check** — AI generates 5 targeted technical MCQ questions to assess your current level
3. **Personalized Study Roadmap** — based on your score, get a prioritized checklist of topics to study, with resources for each
4. **Mock Interview** — AI generates 10 custom interview questions tailored to the role
5. **AI-Scored Report Card** — get scored 1-10 on each answer, with specific feedback and a stronger example answer

---

## ✨ Features

- 🎯 Fully personalized to any job description — not generic questions
- 🧠 Knowledge check that adapts difficulty based on the role
- 📚 Study roadmap with priority levels (High/Medium/Low) and learning resources
- 💬 Real-time AI feedback on every interview answer
- 📊 Final report card with overall score and breakdown
- ⚡ Fast — parallel API calls reduce wait time
- 🎨 Clean, dark-themed, professional UI

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- Deployed on Vercel

**Backend:**
- FastAPI (Python)
- Groq API (Llama 3.3 70B) for AI generation
- Deployed on Railway

---

## 🏗️ Architecture

```
User Browser
     ↓
React Frontend (Vercel)
     ↓ HTTP requests
FastAPI Backend (Railway)
     ↓ API calls
Groq AI (Llama 3.3 70B)
```

The frontend sends the job description to the backend, which builds carefully engineered prompts and sends them to Groq's LLM. Responses are parsed as JSON and rendered as interactive UI components.

---

## 📁 Project Structure

```
prepai-frontend/
├── src/
│   ├── App.jsx              # Main app, screen routing
│   ├── api.js                # API call functions
│   ├── KnowledgeCheck.jsx    # MCQ knowledge assessment screen
│   ├── Roadmap.jsx           # Study roadmap with checklist
│   ├── Interview.jsx         # Mock interview Q&A screen
│   └── Report.jsx            # Final score report card
└── package.json

prepai-backend/
├── main.py                   # FastAPI app with 4 endpoints
└── requirements.txt
```

---

## 🔌 API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/generate-questions` | POST | Generates 10 custom interview questions from job description |
| `/evaluate-answer` | POST | Scores a user's answer 1-10 with feedback |
| `/knowledge-check` | POST | Generates 5 technical MCQ questions to assess level |
| `/generate-roadmap` | POST | Creates personalized study roadmap based on knowledge check results |

---

## 🚀 Run Locally

**Backend:**
```bash
cd prepai-backend
pip install fastapi uvicorn groq python-dotenv
# Add GROQ_API_KEY to .env file
uvicorn main:app --reload
```

**Frontend:**
```bash
cd prepai-frontend
npm install
npm run dev
```

---

## 💡 What I Learned

- Building a full-stack application from scratch — React frontend + Python backend
- Designing and connecting REST API endpoints
- Prompt engineering for structured JSON output from LLMs
- Managing application state across multiple screens in React
- Parallel async operations to optimize performance (`Promise.all`)
- Deploying frontend and backend separately (Vercel + Railway)
- Handling API keys and environment variables securely
- Git/GitHub workflow including resolving push protection and secret scanning issues

---

## 🎯 Why I Built This

I wanted to prep for internship interviews at companies like Google and Microsoft, but found existing tools either too generic or not personalized to the actual role. So I built one — and used it myself to prepare.
---

*Built by Kripa Mariam John · 2026*
