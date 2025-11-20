import { useEffect, useState } from 'react'

export default function Quiz() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [loading, setLoading] = useState(true)
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(()=>{ fetchQuiz() },[])

  const fetchQuiz = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/quizzes/network-topologies`)
      if (!res.ok) throw new Error('Failed to load quiz')
      const data = await res.json()
      setQuiz(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    try {
      const payload = { quiz_key: 'network-topologies', answers }
      const res = await fetch(`${baseUrl}/api/quizzes/network-topologies/submit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error('Failed to submit quiz')
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <Section><p>Loading quiz...</p></Section>
  if (error) return <Section><p className="text-red-600">{error}</p></Section>

  if (result) {
    return (
      <Section>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Your Result</h2>
          <p className="text-slate-600 mb-4">Score: {result.score} / {result.total}</p>
          <div className="space-y-3">
            {result.details.map((d)=> (
              <div key={d.id} className={`p-4 rounded-lg border ${d.is_correct? 'bg-green-50 border-green-200':'bg-red-50 border-red-200'}`}>
                <p className="font-medium">{d.question}</p>
                <p className="text-sm mt-1">Your answer: {typeof d.selected === 'number' ? d.selected + 1 : 'None'} • Correct: {d.correct_answer + 1}</p>
              </div>
            ))}
          </div>
          <a href="/" className="inline-flex mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Back to Home</a>
        </div>
      </Section>
    )
  }

  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">{quiz.title}</h2>
        <form onSubmit={submit} className="space-y-6">
          {quiz.questions.map((q, qi)=> (
            <div key={q.id} className="p-4 rounded-lg border border-slate-200">
              <p className="font-medium text-slate-800 mb-3">{qi+1}. {q.question}</p>
              <div className="grid gap-2">
                {q.options.map((opt, oi)=> (
                  <label key={oi} className="flex items-center gap-2">
                    <input type="radio" name={q.id} value={oi} checked={answers[q.id]===oi} onChange={()=>setAnswers(a=>({...a, [q.id]: oi}))} />
                    <span className="text-slate-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button className="inline-flex items-center px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Submit Quiz</button>
        </form>
      </div>
    </Section>
  )
}

function Section({ children }) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    </section>
  )
}
