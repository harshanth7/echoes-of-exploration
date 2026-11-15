import React, { useEffect, useRef, useState } from 'react'
import { SpaceScene } from '../scene/SpaceScene.js'
import { hasWebGL } from '../lib/webgl.js'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import { MoonSection } from './MoonSection.jsx'
import { MarsSection } from './MarsSection.jsx'

const CELESTIAL_TELEMETRY = {
  moon: {
    id: 'moon',
    name: 'MOON',
    subtitle: 'EARTH’S NATURAL SATELLITE',
    distance: '384,000 km',
    diameter: '3 474 Km',
    gravity: '1.62 m/s²',
    density: '3 344 kg/m³',
    inclination: '6.68°',
    phase: 'PHASE 5',
    relicCount: '6 CREWED SITES',
    description:
      'Tranquility Base, Ocean of Storms, Descartes Highlands. Descent stages, rovers, and retroreflectors resting in lunar vacuum.',
    coords: '0.6740° N, 23.4720° E',
    accentColor: '#7eebff',
  },
  mars: {
    id: 'mars',
    name: 'MARS',
    subtitle: 'THE RED PLANET',
    distance: '225,000,000 km',
    diameter: '6 779 Km',
    gravity: '3.72 m/s²',
    density: '3 933 kg/m³',
    inclination: '25.19°',
    phase: 'ACTIVE SOL',
    relicCount: '7 ROBOTIC SITES',
    description:
      'Jezero, Gale, Meridiani Planum, Chryse. Nuclear rovers, solar landers, and descent parachutes resting across Martian dust dunes.',
    coords: '18.4447° N, 77.4508° E',
    accentColor: '#ff6b4a',
  },
}

export function LandingExperience() {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const [webGLSupported, setWebGLSupported] = useState(true)
  const [hoveredPlanet, setHoveredPlanet] = useState(null)
  const [selectedPlanet, setSelectedPlanet] = useState('overview')

  // WebGL support verification
  useEffect(() => {
    setWebGLSupported(hasWebGL())
  }, [])

  // Initialize Three.js SpaceScene
  useEffect(() => {
    if (!webGLSupported || !containerRef.current) return

    const scene = new SpaceScene({
      container: containerRef.current,
      onHover: (planetId) => setHoveredPlanet(planetId),
      onClick: (planetId) => {
        setSelectedPlanet((prev) => (prev === planetId ? 'overview' : planetId))
      },
      isMobile,
    })

    sceneRef.current = scene

    return () => {
      scene.destroy()
      sceneRef.current = null
    }
  }, [webGLSupported, isMobile])

  // Synchronize camera focus with 3D scene
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setFocus(selectedPlanet)
    }
  }, [selectedPlanet])

  // Active celestial data for HUD (defaults to Moon or Mars based on focus/hover)
  const activeKey = hoveredPlanet || (selectedPlanet === 'mars' ? 'mars' : 'moon')
  const telemetry = CELESTIAL_TELEMETRY[activeKey]

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#010206] text-[#f4f7fb] select-none p-3 sm:p-5 md:p-6 lg:p-7 flex flex-col font-sans">
      {/* Framed Container with Rounded Borders (Image 1 & 2 inspired) */}
      <div className="relative flex-1 w-full h-full rounded-[20px] sm:rounded-[32px] border border-white/[0.09] overflow-hidden flex flex-col justify-between shadow-[0_0_80px_rgba(0,0,0,0.9)]">
        
        {/* 1. 3D WebGL Canvas Layer */}
        <div ref={containerRef} className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing" />

        {/* 2. Delicate Radial Dark Vignette */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(1,2,6,0.3)_60%,rgba(1,2,6,0.85)_100%)]" />

        {/* 3. Subtle Film Grain */}
        <div className="pointer-events-none absolute inset-0 z-10 grain opacity-10" />

        {/* 4. Fine Corner Alignment Crosshairs */}
        <span className="pointer-events-none absolute top-4 left-4 z-20 text-[10px] font-mono text-white/20 select-none">+</span>
        <span className="pointer-events-none absolute top-4 right-4 z-20 text-[10px] font-mono text-white/20 select-none">+</span>
        <span className="pointer-events-none absolute bottom-4 left-4 z-20 text-[10px] font-mono text-white/20 select-none">+</span>
        <span className="pointer-events-none absolute bottom-4 right-4 z-20 text-[10px] font-mono text-white/20 select-none">+</span>

        {/* 5. WebGL Fallback Notification */}
        {!webGLSupported && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#010206] p-6 text-center">
            <div className="max-w-md p-8 glass-panel rounded-2xl">
              <h2 className="text-lg font-tech tracking-widest text-cyan-300 uppercase mb-2">
                WebGL Acceleration Unavailable
              </h2>
              <p className="text-xs text-slate-400 font-sans">
                Please enable hardware acceleration in your browser to experience the real-time 3D planetary environment.
              </p>
            </div>
          </div>
        )}

        {/* 6. Minimal Top Navigation Bar */}
        <header className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10 sm:py-6 border-b border-white/[0.06] backdrop-blur-[2px] pointer-events-auto">
          {/* Top Left: Clean minimal spacer (removed ECHOES // SPACE as requested) */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_8px_#7eebff]" />
          </div>

          {/* Top Center: Minimal Segmented Navigation (Overview / Moon / Mars without '//' and numberings) */}
          <nav className="hidden sm:flex glass-pill px-1.5 py-1 rounded-full items-center gap-1 border border-white/[0.08]">
            {[
              { id: 'overview', label: 'OVERVIEW' },
              { id: 'moon', label: 'MOON' },
              { id: 'mars', label: 'MARS' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedPlanet(tab.id)}
                className={`px-4 py-1 rounded-full text-[11px] font-medium tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                  selectedPlanet === tab.id
                    ? 'bg-white/20 text-white shadow-[0_0_12px_rgba(255,255,255,0.2)] border border-white/25 font-semibold'
                    : 'text-slate-400 hover:text-white border border-transparent hover:bg-white/[0.04]'
                }`}
                style={{ fontFamily: "'Orbitron', 'Rajdhani', 'Space Grotesk', sans-serif" }}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Top Right: Clean Exploration indicator (removed unnecessary Menu button) */}
          <div className="flex items-center gap-3">
            <span
              className="text-[11px] tracking-[0.24em] text-slate-400 uppercase font-mono"
            >
              {selectedPlanet === 'overview' ? 'SOLAR SYSTEM' : selectedPlanet.toUpperCase()}
            </span>
          </div>
        </header>

        {/* 7. Moon / Mars Exploration Section or Main Landing View */}
        {selectedPlanet === 'moon' ? (
          <MoonSection onBackToOverview={() => setSelectedPlanet('overview')} />
        ) : selectedPlanet === 'mars' ? (
          <MarsSection onBackToOverview={() => setSelectedPlanet('overview')} />
        ) : (
          <>
            {/* Main Left-Aligned Content Area (Inspired by Image 1's Bold Typography & Layout) */}
            <main className="relative z-20 flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 py-8 pointer-events-none">
              <div className="max-w-xl md:max-w-2xl text-left pointer-events-auto">
                {/* UNIT THREE PRESENTS (Enlarged with creative Syncopate font) */}
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_12px_#7eebff]" />
                  </span>
                  <span
                    className="text-xs sm:text-sm md:text-base font-bold tracking-[0.38em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-teal-300 drop-shadow-[0_0_16px_rgba(126,235,255,0.65)]"
                    style={{ fontFamily: "'Syncopate', 'Syne', sans-serif" }}
                  >
                    UNIT THREE PRESENTS
                  </span>
                </div>

                {/* Title: ECHOES OF EXPLORATION (Stacked boldly on the left side) */}
                <h1
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-[74px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-white leading-[1.05] select-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
                  style={{ fontFamily: "'Orbitron', 'Syncopate', sans-serif" }}
                >
                  ECHOES OF<br />EXPLORATION
                </h1>

                {/* Subtitle: THE MACHINES NASA LEFT BEHIND (Kept as requested) */}
                <h2
                  className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-medium tracking-[0.34em] sm:tracking-[0.42em] uppercase text-cyan-100/90 flex items-center gap-3 drop-shadow-[0_0_12px_rgba(126,235,255,0.25)]"
                  style={{ fontFamily: "'Orbitron', 'Rajdhani', 'Space Grotesk', sans-serif" }}
                >
                  <span className="w-6 sm:w-10 h-[1px] bg-cyan-400/60" />
                  THE MACHINES NASA LEFT BEHIND
                </h2>

                {/* Action Buttons: Opens Moon Machines or Mars Rovers */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3.5">
                  <button
                    onClick={() => setSelectedPlanet('moon')}
                    className="hidden px-6 py-3 bg-[#e63926] hover:bg-[#ff4530] text-white font-bold text-xs tracking-[0.25em] uppercase rounded-[3px] shadow-[0_0_25px_rgba(230,57,38,0.45)] transition-all flex items-center gap-2 cursor-pointer border-none"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    <span>EXPLORE MOON MACHINES</span>
                    <span className="text-sm">→</span>
                  </button>

                  <button
                    onClick={() => setSelectedPlanet('mars')}
                    className="hidden px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs tracking-[0.25em] uppercase rounded-[3px] shadow-[0_0_25px_rgba(234,88,12,0.45)] transition-all flex items-center gap-2 cursor-pointer border-none"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    <span>EXPLORE MARS ROVERS</span>
                    <span className="text-sm">→</span>
                  </button>
                </div>
              </div>
            </main>

            {/* 8. Technical Telemetry HUD Panel (Bottom Right, Inspired by Venturi Space Image 1) */}
            <aside className="absolute bottom-5 sm:bottom-7 right-5 sm:right-8 z-30 pointer-events-auto hidden md:block">
              <div className="glass-panel rounded-xl p-4 sm:p-5 border border-white/[0.1] shadow-[0_12px_40px_rgba(0,0,0,0.85)] max-w-md w-full">
                {/* Header / Planet Identification */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedPlanet('moon')}
                      className={`px-2.5 py-0.5 rounded text-[10px] tracking-[0.2em] font-bold uppercase transition-all cursor-pointer ${
                        activeKey === 'moon'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                          : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
                      }`}
                      style={{ fontFamily: "'Rajdhani', monospace" }}
                    >
                      MOON
                    </button>
                    <button
                      onClick={() => setSelectedPlanet('mars')}
                      className={`px-2.5 py-0.5 rounded text-[10px] tracking-[0.2em] font-bold uppercase transition-all cursor-pointer ${
                        activeKey === 'mars'
                          ? 'bg-orange-500/20 text-orange-300 border border-orange-400/50'
                          : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
                      }`}
                      style={{ fontFamily: "'Rajdhani', monospace" }}
                    >
                      MARS
                    </button>
                  </div>

                  <span
                    className="text-[10px] tracking-[0.22em] text-slate-400 uppercase"
                    style={{ fontFamily: "'Rajdhani', monospace" }}
                  >
                    {telemetry.relicCount}
                  </span>
                </div>

                {/* Orbit Circle Graphic & 4-Grid Telemetry Matrix (Exact Venturi Space layout) */}
                <div className="flex items-center gap-4">
                  {/* Circular Orbit Graphic with Satellite Indicator */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#7eebff]" />
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/70" />
                    </div>
                    <span
                      className="text-[9px] text-slate-400 mt-2 tracking-wider text-center"
                      style={{ fontFamily: "'Rajdhani', monospace" }}
                    >
                      {telemetry.distance}
                    </span>
                  </div>

                  {/* 4-Stat Metric Box Grid */}
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06]">
                      <span
                        className="text-[8px] text-slate-500 uppercase tracking-widest block"
                        style={{ fontFamily: "'Rajdhani', monospace" }}
                      >
                        DIAMETER
                      </span>
                      <span
                        className="text-xs font-semibold text-white tracking-wider"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        {telemetry.diameter}
                      </span>
                    </div>

                    <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06]">
                      <span
                        className="text-[8px] text-slate-500 uppercase tracking-widest block"
                        style={{ fontFamily: "'Rajdhani', monospace" }}
                      >
                        GRAVITY
                      </span>
                      <span
                        className="text-xs font-semibold text-white tracking-wider"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        {telemetry.gravity}
                      </span>
                    </div>

                    <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06]">
                      <span
                        className="text-[8px] text-slate-500 uppercase tracking-widest block"
                        style={{ fontFamily: "'Rajdhani', monospace" }}
                      >
                        DENSITY
                      </span>
                      <span
                        className="text-xs font-semibold text-white tracking-wider"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        {telemetry.density}
                      </span>
                    </div>

                    <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06]">
                      <span
                        className="text-[8px] text-slate-500 uppercase tracking-widest block"
                        style={{ fontFamily: "'Rajdhani', monospace" }}
                      >
                        INCLINATION
                      </span>
                      <span
                        className="text-xs font-semibold text-white tracking-wider"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        {telemetry.inclination}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </>
        )}

        {/* 9. Minimal Bottom Status Line */}
        <footer className="relative z-20 flex items-center justify-between px-6 py-4 sm:px-10 sm:py-4 border-t border-white/[0.06] backdrop-blur-[2px] pointer-events-auto">
          {/* Coordinates readout */}
          <div
            className="flex items-center gap-2.5 text-[10px] sm:text-[11px] text-slate-400 tracking-[0.25em]"
            style={{ fontFamily: "'Rajdhani', 'Space Grotesk', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/70" />
            <span>LUNA: 00°40'N 23°28'E</span>
            <span className="text-white/30">•</span>
            <span>ARES: 18°26'N 77°27'E</span>
          </div>

          {/* Interactive Hint */}
          <div
            className="text-[10px] text-slate-400/80 tracking-[0.25em] uppercase"
            style={{ fontFamily: "'Rajdhani', 'Space Grotesk', sans-serif" }}
          >
            
            <span className="text-white/30 mx-2">•</span>
            <span>CLICK PLANET TO FOCUS</span>
          </div>
        </footer>

      </div>
    </div>
  )
}
