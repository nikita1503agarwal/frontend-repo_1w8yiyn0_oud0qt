import { motion } from 'framer-motion'

// Animated data flow for different topologies using SVG
export default function TopologyAnimator({ type = 'bus' }) {
  const common = 'stroke-blue-500'

  if (type === 'bus') {
    return (
      <div className="w-full aspect-[16/9] bg-slate-900/60 rounded-xl border border-slate-700 p-4">
        <svg viewBox="0 0 800 450" className="w-full h-full">
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L6,3 z" fill="#60a5fa" />
            </marker>
          </defs>
          <rect x="50" y="200" width="700" height="8" fill="#334155" />
          {[120, 260, 400, 540, 680].map((x, i) => (
            <g key={i}>
              <rect x={x-20} y={150} width="40" height="40" rx="8" fill="#0f172a" stroke="#475569" />
              <line x1={x} y1={190} x2={x} y2={204} stroke="#64748b" strokeWidth="3" />
            </g>
          ))}
          {/* Data pulse across the bus */}
          <motion.circle cx="120" cy="204" r="6" fill="#60a5fa" initial={{ cx: 120 }} animate={{ cx: 730 }} transition={{ repeat: Infinity, duration: 4, ease: 'linear' }} />
          <motion.circle cx="260" cy="204" r="6" fill="#22d3ee" initial={{ cx: 260 }} animate={{ cx: 50 }} transition={{ repeat: Infinity, duration: 5, ease: 'linear' }} />
        </svg>
      </div>
    )
  }

  if (type === 'star') {
    return (
      <div className="w-full aspect-[16/9] bg-slate-900/60 rounded-xl border border-slate-700 p-4">
        <svg viewBox="0 0 800 450" className="w-full h-full">
          <defs>
            <marker id="arrow2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L6,3 z" fill="#60a5fa" />
            </marker>
          </defs>
          <rect x="380" y="195" width="40" height="40" rx="8" fill="#0f172a" stroke="#475569" />
          {[[200,100],[600,100],[200,350],[600,350]].map(([x,y],i)=>(
            <g key={i}>
              <rect x={x-20} y={y-20} width="40" height="40" rx="8" fill="#0f172a" stroke="#475569" />
              <line x1={x} y1={y} x2={400} y2={215} stroke="#64748b" strokeWidth="3" />
            </g>
          ))}
          {/* Data from a node to hub then to another node */}
          <motion.circle cx="200" cy="100" r="6" fill="#60a5fa" animate={{ x: 200, y: 115 }} transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }} />
          <motion.circle cx="400" cy="215" r="6" fill="#22d3ee" animate={{ x: 200, y: 235 }} transition={{ repeat: Infinity, duration: 2.2, repeatDelay: 1 }} />
        </svg>
      </div>
    )
  }

  if (type === 'ring') {
    return (
      <div className="w-full aspect-[16/9] bg-slate-900/60 rounded-xl border border-slate-700 p-4">
        <svg viewBox="0 0 800 450" className="w-full h-full">
          <g>
            {[0,1,2,3,4,5].map(i=>{
              const angle = (i/6)*Math.PI*2
              const cx = 400 + Math.cos(angle)*200
              const cy = 225 + Math.sin(angle)*160
              return (
                <g key={i}>
                  <rect x={cx-20} y={cy-20} width="40" height="40" rx="8" fill="#0f172a" stroke="#475569" />
                </g>
              )
            })}
            {/* Ring path */}
            <ellipse cx="400" cy="225" rx="200" ry="160" fill="none" stroke="#64748b" strokeWidth="3" />
            {/* Data token moving clockwise */}
            <motion.circle r="7" fill="#60a5fa" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 6, ease: 'linear' }} style={{ originX: '400px', originY: '225px' }} cx="600" cy="225" />
          </g>
        </svg>
      </div>
    )
  }

  if (type === 'mesh') {
    return (
      <div className="w-full aspect-[16/9] bg-slate-900/60 rounded-xl border border-slate-700 p-4">
        <svg viewBox="0 0 800 450" className="w-full h-full">
          {[[200,120],[400,80],[600,120],[250,300],[400,360],[550,300]].map(([x,y],i)=>{
            return (
              <g key={i}>
                <rect x={x-20} y={y-20} width="40" height="40" rx="8" fill="#0f172a" stroke="#475569" />
              </g>
            )
          })}
          {/* full connections */}
          {[0,1,2,3,4,5].flatMap(i=>[...Array(6).keys()].filter(j=>j>i).map(j=>{
            const pts=[[200,120],[400,80],[600,120],[250,300],[400,360],[550,300]]
            const [x1,y1]=pts[i]
            const [x2,y2]=pts[j]
            return <line key={`${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" />
          }))}
          {/* data packet across a diagonal path */}
          <motion.circle cx="200" cy="120" r="6" fill="#22d3ee" animate={{ cx: 550, cy: 300 }} transition={{ repeat: Infinity, repeatType: 'mirror', duration: 3 }} />
        </svg>
      </div>
    )
  }

  if (type === 'tree') {
    return (
      <div className="w-full aspect-[16/9] bg-slate-900/60 rounded-xl border border-slate-700 p-4">
        <svg viewBox="0 0 800 450" className="w-full h-full">
          {/* root */}
          <rect x="380" y="40" width="40" height="40" rx="8" fill="#0f172a" stroke="#475569" />
          {/* level 1 */}
          {[260,540].map((x,i)=> (
            <g key={i}>
              <rect x={x-20} y={140} width="40" height="40" rx="8" fill="#0f172a" stroke="#475569" />
              <line x1={400} y1={80} x2={x} y2={160} stroke="#64748b" strokeWidth="3" />
            </g>
          ))}
          {/* level 2 */}
          {[200,320,480,600].map((x,i)=> (
            <g key={i}>
              <rect x={x-20} y={260} width="40" height="40" rx="8" fill="#0f172a" stroke="#475569" />
              <line x1={[260,540][i<2?0:1]} y1={160} x2={x} y2={280} stroke="#64748b" strokeWidth="3" />
            </g>
          ))}
          {/* data pulse from root down the tree */}
          <motion.circle cx={400} cy={80} r="6" fill="#60a5fa" animate={{ cx: 260, cy: 160 }} transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }} />
        </svg>
      </div>
    )
  }

  if (type === 'hybrid') {
    return (
      <div className="w-full aspect-[16/9] bg-slate-900/60 rounded-xl border border-slate-700 p-4">
        <svg viewBox="0 0 800 450" className="w-full h-full">
          {/* Combine star and bus */}
          <rect x="100" y="350" width="600" height="8" fill="#334155" />
          {[180,320,460,600].map((x,i)=>(
            <g key={i}>
              <rect x={x-20} y={300} width="40" height="40" rx="8" fill="#0f172a" stroke="#475569" />
              <line x1={x} y1={340} x2={x} y2={354} stroke="#64748b" strokeWidth="3" />
            </g>
          ))}
          {/* star cluster */}
          <rect x="380" y="120" width="40" height="40" rx="8" fill="#0f172a" stroke="#475569" />
          {[[250,100],[550,100],[250,220],[550,220]].map(([x,y],i)=>(
            <g key={i}>
              <rect x={x-20} y={y-20} width="40" height="40" rx="8" fill="#0f172a" stroke="#475569" />
              <line x1={x} y1={y} x2={400} y2={140} stroke="#64748b" strokeWidth="3" />
            </g>
          ))}
          {/* data traveling from star to bus */}
          <motion.circle cx="400" cy="140" r="6" fill="#22d3ee" animate={{ cx: 600, cy: 354 }} transition={{ repeat: Infinity, duration: 2.5, repeatType: 'mirror' }} />
        </svg>
      </div>
    )
  }

  return null
}
