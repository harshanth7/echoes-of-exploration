import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Machine3DViewer } from './Machine3DViewer.jsx'
import { StudentQuiz } from './StudentQuiz.jsx'

export function MachineStoryModal({ machine, onClose }) {
  const [activePhoto, setActivePhoto] = useState(null)
  const [activeTab, setActiveTab] = useState('story') // 'story' | '3d' | 'quiz'

  // ESC key to close modal or lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activePhoto) setActivePhoto(null)
        else onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePhoto, onClose])

  if (!machine) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-start overflow-y-auto p-3 sm:p-6 md:p-8 animate-in fade-in duration-300">
      {/* Lightbox Modal for Gallery Photos — Rendered via Portal directly into document.body for instant viewport centering */}
      {activePhoto &&
        createPortal(
          <div
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 cursor-zoom-out animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-[#030712] border border-cyan-400/40 rounded-2xl p-4 sm:p-6 shadow-[0_0_80px_rgba(0,240,255,0.28)] flex flex-col items-center cursor-default animate-in zoom-in-95 duration-200 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 text-slate-300 hover:text-white text-xs tracking-widest uppercase font-mono px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <span>✕</span>
                <span>CLOSE</span>
              </button>

              {/* High-res Image Mount */}
              <div className="w-full flex items-center justify-center overflow-hidden rounded-xl bg-black/90 border border-white/10">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="max-h-[62vh] w-auto max-w-full object-contain select-none"
                />
              </div>

              {/* Photo Description & Historical Credit */}
              <div className="mt-3.5 text-center max-w-2xl w-full space-y-1">
                <h4
                  className="text-sm sm:text-lg font-bold text-white uppercase tracking-wider"
                  style={{ fontFamily: "'Orbitron', 'Rajdhani', sans-serif" }}
                >
                  {activePhoto.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {activePhoto.caption}
                </p>
                <div className="flex items-center justify-center gap-2 pt-1 text-[10px] sm:text-[11px] font-mono text-cyan-300">
                  <span>NASA Historical Photographic Archive</span>
                  <span className="text-white/25">•</span>
                  <span>Photo Credit: {activePhoto.credit}</span>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Main Container */}
      <div className="relative w-full max-w-4xl bg-[#03060f]/95 border border-white/[0.12] rounded-2xl sm:rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.95)] my-6 sm:my-10 flex flex-col">
        
        {/* Sticky Top Control Header with Distinct Working Tabs */}
        <div className="sticky top-0 z-30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 bg-[#03060f] border-b border-white/[0.08] shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono tracking-wider text-slate-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>←</span>
              <span>
                BACK TO {machine.id === 'sojourner' || machine.id === 'opportunity' ? 'MARS ROVERS' : 'MOON MACHINES'}
              </span>
            </button>
            <span className="hidden sm:inline-block text-[11px] font-mono text-cyan-300/80 tracking-widest uppercase">
              {machine.code}
            </span>
          </div>

          {/* Interactive Working Tabs */}
          <div className="flex items-center gap-1.5 self-center sm:self-auto bg-white/5 p-1 rounded-full border border-white/10">
            <button
              onClick={() => setActiveTab('story')}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'story'
                  ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400 font-semibold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-white border border-transparent hover:bg-white/5'
              }`}
            >
              
              <span>MISSION STORY</span>
            </button>

            <button
              onClick={() => setActiveTab('3d')}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === '3d'
                  ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400 font-semibold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-white border border-transparent hover:bg-white/5'
              }`}
            >
               
              <span>3D MODEL EXPLORER</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-purple-500/30 text-purple-200 border border-purple-400 font-semibold shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'text-slate-400 hover:text-white border border-transparent hover:bg-white/5'
              }`}
            >
              <span>🎯</span>
              <span>STUDENT QUIZ</span>
            </button>

            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer text-xs ml-1"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab 1: MISSION STORY VIEW */}
        {activeTab === 'story' && (
          <div className="p-6 sm:p-8 md:p-10 space-y-8 animate-in fade-in duration-300">
            {/* Hero Section */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.12] bg-slate-950">
              <img
                src={machine.heroImage}
                alt={machine.name}
                className="w-full h-72 sm:h-96 md:h-[420px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03060f] via-[#03060f]/40 to-transparent" />

              {/* Hero Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                  <span className="px-3 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-[10px] font-mono tracking-widest uppercase">
                    {machine.year}
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-white/10 border border-white/20 text-slate-300 text-[10px] font-mono tracking-widest uppercase">
                    {machine.mission}
                  </span>
                </div>

                <h1
                  className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-white"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {machine.name}
                </h1>

                <p className="text-xs sm:text-sm text-cyan-200/90 mt-2 font-mono tracking-wider">
                  {machine.tagline}
                </p>

                {/* NASA Credit & Source Link */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400 border-t border-white/10 pt-3">
                  <span className="italic">{machine.heroCaption}</span>
                  <a
                    href={machine.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 flex items-center gap-1"
                  >
                    <span>Official NASA Archive Source</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Link to 3D Viewer Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900/40 to-purple-950/30 border border-cyan-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔮</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    Interactive 3D Machine Available
                  </h4>
                  <p className="text-[11px] text-slate-300 font-light">
                    Spin and inspect this machine in 360° with realistic materials and holographic blueprint mode.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('3d')}
                className="px-4 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-[10px] tracking-wider uppercase transition-all cursor-pointer shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                OPEN 3D VIEW →
              </button>
            </div>

            {/* Student Everyday Analogies */}
            {machine.studentSummary && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block mb-1">
                    🏃 HOW FAST WAS IT?
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {machine.studentSummary.speedComparison}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 block mb-1">
                    ⚖️ HOW LIGHT ON THE MOON?
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {machine.studentSummary.weightComparison}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 block mb-1">
                    ⚡ POWER & ENERGY
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {machine.studentSummary.batteryLife || machine.studentSummary.powerUsage}
                  </p>
                </div>
              </div>
            )}

            {/* Machine Anatomy Highlights */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2">
                <span className="text-cyan-400 text-sm">🛠️</span>
                <h3
                  className="text-base sm:text-lg font-bold uppercase tracking-wider text-white"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Machine Anatomy & Special Engineering
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {machine.anatomy.map((part) => (
                  <div
                    key={part.id}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-400/40 transition-all space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{part.icon}</span>
                      <div>
                        <h4
                          className="text-xs sm:text-sm font-semibold text-white tracking-wide"
                          style={{ fontFamily: "'Rajdhani', sans-serif" }}
                        >
                          {part.title}
                        </h4>
                        <span className="text-[9px] font-mono text-cyan-300/70 uppercase block">
                          {part.subtitle}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-300/85 leading-relaxed font-light">
                      {part.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Story Chapters (School Explorer Guide) */}
            <div className="space-y-6">
              <div className="border-b border-white/[0.08] pb-2 flex items-center gap-2">
                <span className="text-cyan-400">📖</span>
                <h3
                  className="text-base sm:text-lg font-bold uppercase tracking-wider text-white"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  The Story Chapters (School Explorer Guide)
                </h3>
              </div>

              {/* 1. Meet the Machine / Rover */}
              {machine.sections.meetTheMachine && (
                <section className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <h3 className="text-base sm:text-xl font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      1. {machine.sections.meetTheMachine.title}
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {machine.sections.meetTheMachine.content}
                  </p>
                </section>
              )}

              {/* 2. Its Mission */}
              {machine.sections.itsMission && (
                <section className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <h3 className="text-base sm:text-xl font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      2. {machine.sections.itsMission.title}
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {machine.sections.itsMission.content}
                  </p>
                </section>
              )}

              {/* 3. Technology (If present) */}
              {machine.sections.technology && (
                <section className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <h3 className="text-base sm:text-xl font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      3. {machine.sections.technology.title}
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {machine.sections.technology.content}
                  </p>
                </section>
              )}

              {/* Discoveries */}
              {machine.sections.discoveries && (
                <section className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <h3 className="text-base sm:text-xl font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {machine.sections.technology ? '4.' : '3.'} {machine.sections.discoveries.title}
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {machine.sections.discoveries.content}
                  </p>
                </section>
              )}

              {/* Why It Was Left Behind / Why It Stopped */}
              {(machine.sections.whyStopped || machine.sections.whyLeftBehind) && (
                <section className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 rounded-full bg-orange-400" />
                    <h3 className="text-base sm:text-xl font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {machine.sections.technology ? '5.' : '4.'}{' '}
                      {(machine.sections.whyStopped || machine.sections.whyLeftBehind).title}
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {(machine.sections.whyStopped || machine.sections.whyLeftBehind).content}
                  </p>
                </section>
              )}

              {/* Amazing Fact */}
              {machine.sections.amazingFact && (
                <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-purple-950/20 border border-cyan-500/30 shadow-[0_0_30px_rgba(126,235,255,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-base text-cyan-300">★</span>
                    <h3 className="text-base sm:text-xl font-bold uppercase tracking-wider text-cyan-300" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {machine.sections.technology ? '6.' : '5.'} {machine.sections.amazingFact.title}
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-light" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {machine.sections.amazingFact.content}
                  </p>
                </section>
              )}
            </div>

            {/* Official NASA Historical Photo Gallery */}
            <div className="border-t border-white/[0.08] pt-8">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase block">AUTHENTIC ARCHIVE</span>
                  <h3 className="text-xl font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    Official NASA Historical Photographs
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">Click photo to expand</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {machine.gallery.map((photo, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActivePhoto(photo)}
                    className="group relative rounded-xl overflow-hidden border border-white/[0.1] bg-black/40 hover:border-cyan-400/50 transition-all cursor-pointer shadow-lg"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-52 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-3.5 bg-slate-950/90 border-t border-white/[0.06]">
                      <h4 className="text-xs font-semibold text-white tracking-wide" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                        {photo.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed font-light">
                        {photo.caption}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.06] text-[10px] font-mono text-slate-500">
                        <span>{photo.credit}</span>
                        <span className="text-cyan-400 group-hover:underline">View Full ↗</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Navigation Prompts */}
            <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setActiveTab('3d')}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                
                <span>EXPLORE 3D MODEL</span>
                <span>→</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                <span>🎯</span>
                <span>TAKE STUDENT QUIZ</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: DEDICATED 3D MODEL EXPLORER VIEW */}
        {activeTab === '3d' && (
          <div className="p-6 sm:p-8 md:p-10 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase block">
                  REAL-TIME ARTIFACT SCANNER
                </span>
                <h3
                  className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {machine.name} 3D Model
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Click & Drag to rotate in 360°</span>
            </div>

            {/* Large 3D Stage */}
            <Machine3DViewer machineId={machine.id} />

            {/* Subsystem Anatomy Highlights */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-300">
                Key Subsystems & Engineering Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {machine.anatomy.map((part) => (
                  <div key={part.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{part.icon}</span>
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider">{part.title}</h5>
                    </div>
                    <p className="text-[11px] text-slate-300 font-light leading-relaxed">{part.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Step */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setActiveTab('quiz')}
                className="px-6 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                <span>READY FOR THE QUIZ? TEST YOUR KNOWLEDGE</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: DEDICATED STUDENT QUIZ VIEW */}
        {activeTab === 'quiz' && (
          <div className="p-6 sm:p-8 md:p-10 space-y-6 animate-in fade-in duration-300">
            <StudentQuiz quiz={machine.quiz} machineName={machine.name} />

            {/* Back to story */}
            <div className="pt-4 flex justify-between items-center text-xs font-mono text-slate-400">
              <button
                onClick={() => setActiveTab('story')}
                className="hover:text-white underline underline-offset-4 cursor-pointer"
              >
                ← Review Mission Story Chapters
              </button>

              <button
                onClick={() => setActiveTab('3d')}
                className="hover:text-cyan-300 underline underline-offset-4 cursor-pointer"
              >
                Inspect 3D Machine Model →
              </button>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#03060f] border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
          <span>
            ECHOES OF EXPLORATION • {machine.id === 'sojourner' || machine.id === 'opportunity' ? 'MARTIAN' : 'LUNAR'} ARTIFACT REGISTRY
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  )
}
