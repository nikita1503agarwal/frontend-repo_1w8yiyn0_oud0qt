import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Materials from './components/Materials'

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />
      <Hero />
      <Materials />
      <footer className="py-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-sm text-slate-600">© {new Date().getFullYear()} NetLearn — Interactive Computer Networks</div>
      </footer>
    </div>
  )
}

export default App