const BASE_URL = "http://localhost:8000"

async function handleResponse(res) {
  const text = await res.text()
  if (!res.ok) {
    const message = text || `${res.status} ${res.statusText}`
    throw new Error(message)
  }

  try {
    return JSON.parse(text)
  } catch {
    throw new Error("Invalid JSON response from server")
  }
}

export async function generateQuestions(jobDesc) {
  const res = await fetch(`${BASE_URL}/generate-questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ job_description: jobDesc })
  })
  return handleResponse(res)
}

export async function evaluateAnswer(question, answer, jobDesc) {
  const res = await fetch(`${BASE_URL}/evaluate-answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answer, job_description: jobDesc })
  })
  return handleResponse(res)
}

export async function getKnowledgeCheck(jobDesc) {
  const res = await fetch(`${BASE_URL}/knowledge-check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ job_description: jobDesc })
  })
  return handleResponse(res)
}

export async function getRoadmap(jobDesc, score, weakTopics) {
  const res = await fetch(`${BASE_URL}/generate-roadmap`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      job_description: jobDesc, 
      score: score,
      weak_topics: weakTopics
    })
  })
  return handleResponse(res)
}