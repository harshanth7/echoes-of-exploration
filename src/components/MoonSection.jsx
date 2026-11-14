import React, { useState } from 'react'
import { MOON_MACHINES } from '../data/moonMachines.js'
import { MachineStoryModal } from './MachineStoryModal.jsx'

export function MoonSection({ onBackToOverview }) {
  const [selectedMachine, setSelectedMachine] = useState(null)

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-8 md:p-10 z-30 overflow-y-auto animate-in fade-in duration-300">
      {/* Detail Story Modal */}
      {selectedMachine && (
        <MachineStoryModal
          machine={selectedMachine}
          onClose={() => setSelectedMachine(null)}
        />
      )}

      {/* Top Header & Breadcrumb Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToOverview}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono tracking-wider text-slate-200 hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>←</span>
            <span>BACK TO ORBIT</span>
          </button>
          <span className="text-[11px] font-mono text-cyan-300/80 tracking-widest uppercase">
            LUNAR MACHINES ARCHIVE
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>DESTINATION: MOON (384,000 KM)</span>
          <span className="text-white/20 mx-1">•</span>
          <span>CATALOGUE: 2 MACHINES</span>
        </div>
      </div>

      {/* Main Content Area: Intro & Two Interactive Machine Cards */}
      <div className="flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto my-auto space-y-6 sm:space-y-8">
        {/* Section Header */}
        <div className="text-left space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase text-cyan-300"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              HUMANITY'S LUNAR FOOTPRINTS
            </span>
          </div>
          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-white"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            The Machines NASA Left On The Moon
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light leading-relaxed">
            Select a machine below to open its visual storytelling chapter, discover why it was left behind,
            and inspect authentic historical NASA photographs.
          </p>
        </div>

        {/* Two Interactive Moon Machine Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {MOON_MACHINES.map((machine) => (
            <div
              key={machine.id}
              onClick={() => setSelectedMachine(machine)}
              className="group relative rounded-2xl sm:rounded-3xl bg-slate-950/70 border border-white/[0.12] hover:border-cyan-400/60 p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_12px_45px_rgba(126,235,255,0.18)] cursor-pointer flex flex-col justify-between overflow-hidden backdrop-blur-xl"
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />

              <div>
                {/* Card Image Thumbnail */}
                <div className="relative rounded-xl overflow-hidden border border-white/[0.1] h-48 sm:h-56 bg-black mb-5">
                  <img
                    src={machine.heroImage}
                    alt={machine.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                  
                  {/* Badge & Year Overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-wider text-cyan-300 uppercase">
                      {machine.year}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 backdrop-blur-md border border-cyan-400/40 text-[10px] font-mono tracking-wider text-cyan-300 uppercase flex items-center gap-1 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                      <span>🔮</span>
                      <span>3D SCANNER + QUIZ</span>
                    </span>
                  </div>

                  <span className="absolute bottom-2.5 right-3 text-[10px] font-mono text-slate-400 italic">
                    {machine.heroCredit}
                  </span>
                </div>

                {/* Machine Name & Tagline */}
                <div className="space-y-1.5 mb-4">
                  <span
                    className="text-[10px] font-mono tracking-[0.25em] text-cyan-400/90 uppercase block"
                  >
                    {machine.code}
                  </span>
                  <h3
                    className="text-lg sm:text-2xl font-bold uppercase tracking-wide text-white group-hover:text-cyan-200 transition-colors"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {machine.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 italic">
                    "{machine.tagline}"
                  </p>
                </div>

                {/* Key Bullet Highlights */}
                <ul className="space-y-2 text-xs text-slate-300 mb-6 font-light">
                  {machine.id === 'apollo-15-lrv' ? (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">▸</span>
                        <span><strong>First human-driven vehicle</strong> on the Moon, piloted by David Scott & James Irwin.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">▸</span>
                        <span><strong>Battery-powered electric rover</strong> with wire-mesh wheels and a top speed of 8 mph.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">▸</span>
                        <span>Travelled <strong>17.5 miles (28 km)</strong> and helped retrieve the 4-billion-year-old Genesis Rock.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">▸</span>
                        <span><strong>Left behind</strong> at Hadley Base; its camera broadcasted the Apollo 15 liftoff live to Earth.</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">▸</span>
                        <span><strong>Robotic spacecraft</strong> that executed an automated soft landing on the Moon in April 1967.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">▸</span>
                        <span>Carried a <strong>television camera & robotic soil sampler</strong>, transmitting 6,326 pictures.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">▸</span>
                        <span><strong>Visited by Apollo 12 astronauts</strong> in 1969, who retrieved its camera to test long-term space exposure.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">▸</span>
                        <span>The lander body remains <strong>permanently anchored</strong> in the Ocean of Storms.</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span
                  className="text-xs font-semibold text-cyan-300 group-hover:text-cyan-200 tracking-wider flex items-center gap-1.5 transition-colors"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  <span>EXPLORE 3D, STORY & QUIZ</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="pt-4 mt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
        <span>Click any card to read school-friendly storytelling chapters</span>
        <span className="text-slate-500">Official NASA Public Domain Imagery & Historical Archives</span>
      </div>
    </div>
  )
}
