import { Link, useLocation } from 'react-router-dom'
import { Menu, Network, BookOpenCheck, FileEdit, PenLine, GraduationCap } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/', label: 'Home' },
    { to: '/materials', label: 'Materials' },
    { to: '/worksheet', label: 'Worksheet' },
    { to: '/quiz', label: 'Quiz' },
  ]

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/50 bg-white/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-800 font-semibold">
            <Network className="w-6 h-6 text-blue-600" />
            <span>NetLearn</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <Link key={l.to} to={l.to} className={`text-sm font-medium hover:text-blue-600 transition-colors ${location.pathname===l.to? 'text-blue-600':'text-slate-700'}`}>
                {l.label}
              </Link>
            ))}
            <a href="/worksheet" className="ml-2 inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700 transition-colors">
              <FileEdit className="w-4 h-4" /> Start LKPD
            </a>
          </nav>
          <button className="md:hidden p-2" onClick={()=>setOpen(o=>!o)} aria-label="Toggle menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4">
            <div className="grid gap-2">
              {links.map(l => (
                <Link key={l.to} to={l.to} onClick={()=>setOpen(false)} className={`px-3 py-2 rounded-lg ${location.pathname===l.to? 'bg-blue-50 text-blue-700':'text-slate-700 hover:bg-slate-100'}`}>
                  {l.label}
                </Link>
              ))}
              <Link to="/worksheet" onClick={()=>setOpen(false)} className="px-3 py-2 rounded-lg bg-blue-600 text-white">Start LKPD</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}