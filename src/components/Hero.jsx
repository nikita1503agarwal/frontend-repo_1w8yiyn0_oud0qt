import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/hGDm7Foxug7C6E8s/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-800/90 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-300 bg-blue-500/10 px-3 py-1 rounded-full ring-1 ring-blue-500/30">Technology • Education • Interactive</span>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white">Learn Computer Network Topologies the Interactive Way</h1>
          <p className="mt-4 text-lg text-blue-100">Explore bus, star, mesh, tree, ring, and hybrid topologies with animated data flows, hands-on worksheets, reflections, and auto-graded quizzes.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/materials" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">Explore Materials</Link>
            <Link to="/worksheet" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">Start LKPD</Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}