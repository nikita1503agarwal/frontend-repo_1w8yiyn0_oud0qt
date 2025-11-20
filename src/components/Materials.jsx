import { useState } from 'react'
import TopologyAnimator from './TopologyAnimator'

const content = {
  bus: {
    title: 'Bus Topology',
    text: 'All devices share a single backbone cable. Data is broadcast to all devices, and terminators prevent signal reflections.'
  },
  star: {
    title: 'Star Topology',
    text: 'Each device connects to a central hub/switch. Data is sent from a device to the hub, then forwarded to the destination.'
  },
  ring: {
    title: 'Ring Topology',
    text: 'Devices form a circular path. Data travels around the ring in one direction (or both in dual ring).'
  },
  mesh: {
    title: 'Mesh Topology',
    text: 'Every device may connect to many others, providing redundancy and multiple paths for data to travel.'
  },
  tree: {
    title: 'Tree Topology',
    text: 'A hierarchical arrangement of star networks, resembling a tree with branches.'
  },
  hybrid: {
    title: 'Hybrid Topology',
    text: 'A combination of different topologies, such as star-bus or star-ring, tailored to network needs.'
  }
}

export default function Materials() {
  const [active, setActive] = useState('bus')
  const options = Object.keys(content)

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Materials</h2>
            <p className="text-slate-600 mb-4">Choose a topology to see how data flows through the network.</p>
            <div className="grid gap-2">
              {options.map(key => (
                <button key={key} onClick={()=>setActive(key)} className={`text-left px-4 py-2 rounded-lg border ${active===key? 'bg-blue-600 text-white border-blue-600':'border-slate-200 hover:bg-slate-50 text-slate-700'}`}>{content[key].title}</button>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-800">{content[active].title}</h3>
              <p className="text-slate-600 mt-1">{content[active].text}</p>
            </div>
            <TopologyAnimator type={active} />
          </div>
        </div>
      </div>
    </section>
  )
}
