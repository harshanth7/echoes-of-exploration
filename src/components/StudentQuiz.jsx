import React, { useState, useRef, useEffect } from 'react'

export function StudentQuiz({ quiz, machineName }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({}) // { questionId: chosenIndex }
  const [score, setScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)
  const feedbackRef = useRef(null)
  const topRef = useRef(null)

  const currentQ = quiz[currentQuestionIndex]
  const answeredCurrent = selectedAnswers[currentQ.id] !== undefined
  const isCurrentCorrect = answeredCurrent && selectedAnswers[currentQ.id] === currentQ.correctIndex

  useEffect(() => {
    if (answeredCurrent && feedbackRef.current) {
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 60)
    }
  }, [answeredCurrent])

  const handleSelectOption = (optionIndex) => {
    if (answeredCurrent) return // prevent re-clicking

    const isCorrect = optionIndex === currentQ.correctIndex
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }))

    if (isCorrect) {
      setScore((prev) => prev + 1)
      playPositiveTone()
    } else {
      playHintTone()
    }
  }

  // Friendly audio feedback using Web Audio API
  const playPositiveTone = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(587.33, ctx.currentTime) // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15) // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.3)
    } catch {}
  }

  const playHintTone = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(329.63, ctx.currentTime) // E4
      osc.frequency.linearRampToValueAtTime(261.63, ctx.currentTime + 0.2) // C4
      gain.gain.setValueAtTime(0.06, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.3)
    } catch {}
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
    } else {
      setQuizFinished(true)
    }
  }

  const handleRestart = () => {
    setSelectedAnswers({})
    setScore(0)
    setCurrentQuestionIndex(0)
    setQuizFinished(false)
  }

  return (
    <div ref={topRef} className="relative rounded-2xl sm:rounded-3xl bg-slate-950/90 border border-cyan-500/30 p-6 sm:p-8 overflow-hidden shadow-[0_0_60px_rgba(0,240,255,0.08)]">
      {/* Background Subtle Radar Glow */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span
              className="text-xs font-semibold tracking-[0.28em] uppercase text-cyan-300"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              STUDENT MISSION CHALLENGE
            </span>
          </div>
          <h3
            className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white mt-1"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {machineName} Knowledge Quiz
          </h3>
        </div>

        {!quizFinished && (
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
            <span>QUESTION {currentQuestionIndex + 1} OF {quiz.length}</span>
            <span className="text-white/20">•</span>
            <span className="text-cyan-300">SCORE: {score}</span>
          </div>
        )}
      </div>

      {/* Quiz Body */}
      {!quizFinished ? (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / quiz.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="space-y-1">
            <span className="text-[11px] font-mono tracking-widest text-cyan-400/80 uppercase">
              Mission Objective #{currentQuestionIndex + 1}
            </span>
            <h4
              className="text-base sm:text-lg font-medium text-white leading-relaxed"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {currentQ.question}
            </h4>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === idx
              const isCorrectAnswer = idx === currentQ.correctIndex

              let btnStyle = 'bg-white/[0.03] border-white/10 text-slate-200 hover:border-cyan-400/40 hover:bg-white/[0.06]'

              if (answeredCurrent) {
                if (isCorrectAnswer) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(52,211,153,0.3)]'
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = 'bg-rose-500/20 border-rose-400 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                } else {
                  btnStyle = 'bg-white/[0.01] border-white/5 text-slate-500 opacity-60'
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={answeredCurrent}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                      answeredCurrent && isCorrectAnswer
                        ? 'bg-emerald-400 text-black'
                        : answeredCurrent && isSelected
                        ? 'bg-rose-400 text-black'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-xs sm:text-sm font-light leading-relaxed">{option}</span>
                </button>
              )
            })}
          </div>

          {/* Immediate Feedback Box (Appears after answer is clicked) */}
          {answeredCurrent && (
            <div
              ref={feedbackRef}
              className={`p-5 rounded-2xl border transition-all animate-in fade-in duration-300 ${
                isCurrentCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/40'
                  : 'bg-rose-950/40 border-rose-500/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{isCurrentCorrect ? '🎉' : '❌'}</span>
                <h5
                  className={`text-sm sm:text-base font-bold uppercase tracking-wider ${
                    isCurrentCorrect ? 'text-emerald-300' : 'text-rose-300'
                  }`}
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {isCurrentCorrect
                    ? 'Brilliant observation, astronaut! You are correct!'
                    : 'Not quite, space cadet! Check out why:'}
                </h5>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light mb-3">
                {currentQ.explanation}
              </p>

              {currentQ.funFact && (
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-cyan-300 flex items-start gap-2">
                  <span className="text-sm">💡</span>
                  <span><strong>Fun Space Fact:</strong> {currentQ.funFact}</span>
                </div>
              )}

              {/* Next Question Button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer flex items-center gap-2"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  <span>{currentQuestionIndex < quiz.length - 1 ? 'Next Question' : 'View Mission Report'}</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Certificate & Appreciation */
        <div className="text-center py-6 sm:py-8 space-y-6 animate-in zoom-in-95 duration-400">
          <div className="inline-block p-4 rounded-full bg-cyan-500/20 border border-cyan-400 shadow-[0_0_40px_rgba(0,240,255,0.3)]">
            <span className="text-4xl sm:text-5xl">
              {score >= 4 ? '🏆' : score >= 3 ? '🚀' : '🧑‍🚀'}
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              MISSION DEBRIEF COMPLETE
            </span>
            <h4
              className="text-2xl sm:text-4xl font-bold uppercase tracking-wider text-white"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {score === 5
                ? 'Chief Lunar Commander!'
                : score >= 4
                ? 'Senior Lunar Astronaut!'
                : score >= 3
                ? 'Certified Space Explorer!'
                : 'Cadet in Training!'}
            </h4>
            <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto font-light leading-relaxed">
              {score >= 4
                ? `Incredible work! You scored ${score} out of ${quiz.length}. You have mastered the science and engineering behind this historic machine!`
                : `Good effort! You scored ${score} out of ${quiz.length}. Review the story chapters and try again to achieve a perfect 5/5 score!`}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs tracking-wider uppercase transition-all cursor-pointer"
            >
              Retake Mission Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
