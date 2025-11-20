import { useState } from 'react'

export default function Worksheet() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [studentName, setStudentName] = useState('')
  const [className, setClassName] = useState('')
  const [answers, setAnswers] = useState({})
  const [submittedId, setSubmittedId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const questions = [
    { id: 'w1', q: 'Explain in your own words what a network topology is.' },
    { id: 'w2', q: 'Compare Bus and Star topologies. Mention one advantage and one disadvantage each.' },
    { id: 'w3', q: 'When would a Mesh topology be most beneficial? Give an example.' },
    { id: 'w4', q: 'Draw or describe a Tree topology structure.' },
  ]

  const updateAnswer = (id, value) => setAnswers(prev => ({ ...prev, [id]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const payload = {
        student_name: studentName,
        class_name: className,
        answers: questions.map(q => ({ question_id: q.id, answer_text: answers[q.id] || '' }))
      }
      const res = await fetch(`${baseUrl}/api/worksheets`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error('Failed to submit worksheet')
      const data = await res.json()
      setSubmittedId(data.id)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Online Student Worksheet (LKPD)</h2>
        {!submittedId ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <input value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder="Student name" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <input value={className} onChange={e=>setClassName(e.target.value)} placeholder="Class / Group" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="space-y-4">
              {questions.map(q => (
                <div key={q.id}>
                  <p className="font-medium text-slate-800 mb-1">{q.q}</p>
                  <textarea rows={4} value={answers[q.id]||''} onChange={e=>updateAnswer(q.id, e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type your answer here..." required />
                </div>
              ))}
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <button disabled={loading} className="inline-flex items-center px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">{loading? 'Submitting...':'Submit Worksheet'}</button>
          </form>
        ) : (
          <Reflection submittedId={submittedId} />
        )}
      </div>
    </section>
  )
}

function Reflection({ submittedId }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [studentName, setStudentName] = useState('')
  const [understanding, setUnderstanding] = useState(3)
  const [feelings, setFeelings] = useState('')
  const [challenges, setChallenges] = useState('')
  const [questions, setQuestions] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const submitReflection = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const payload = { worksheet_id: submittedId, student_name: studentName, understanding_level: Number(understanding), feelings, challenges, questions }
      const res = await fetch(`${baseUrl}/api/reflections`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error('Failed to submit reflection')
      setDone(true)
    } catch (err) {
      setError(err.message)
    }
  }

  if (done) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6">
        <p className="font-semibold">Thank you! Your worksheet and reflection have been submitted.</p>
        <p className="mt-1">You can now proceed to the quiz.</p>
        <a href="/quiz" className="inline-flex mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Go to Quiz</a>
      </div>
    )
  }

  return (
    <div className="mt-8 border border-slate-200 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-slate-800">Learning Reflection</h3>
      <p className="text-slate-600 mb-4">Fill this after submitting your worksheet.</p>
      <form onSubmit={submitReflection} className="space-y-4">
        <input value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder="Student name" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <div>
          <label className="block text-sm text-slate-600 mb-1">Understanding level: {understanding}</label>
          <input type="range" min="1" max="5" value={understanding} onChange={e=>setUnderstanding(e.target.value)} className="w-full" />
        </div>
        <textarea rows={3} value={feelings} onChange={e=>setFeelings(e.target.value)} placeholder="How do you feel about the topic?" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <textarea rows={3} value={challenges} onChange={e=>setChallenges(e.target.value)} placeholder="What was challenging?" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <textarea rows={3} value={questions} onChange={e=>setQuestions(e.target.value)} placeholder="What questions remain?" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {error && <p className="text-red-600">{error}</p>}
        <button className="inline-flex items-center px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Submit Reflection</button>
      </form>
    </div>
  )
}
