import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PlotTwist({ exercise, onAnswer }) {
  const [phase, setPhase] = useState('setup')
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleTwist = () => {
    setPhase('twist')
  }

  const handleSubmit = () => {
    if (!input.trim()) return
    setSubmitted(true)
    const normalize = (s) => s.toLowerCase().trim()
    const correct = normalize(input).includes(normalize(exercise.answer).slice(0, 5))
    setTimeout(() => {
      onAnswer(correct)
      setInput('')
      setPhase('setup')
      setSubmitted(false)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm">🎭</span>
        <p className="text-white/80 text-sm font-medium">PLOT TWIST</p>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-6"
          >
            <p className="text-white/80 text-base leading-relaxed mb-6">{exercise.setup}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTwist}
              className="btn-primary"
            >
              What happens next? 🎭
            </motion.button>
          </motion.div>
        )}

        {phase === 'twist' && (
          <motion.div
            key="twist"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="p-4 rounded-xl mb-4 text-center"
              style={{ background: 'rgba(244,114,182,0.1)', border: '1px solid rgba(244,114,182,0.3)' }}
            >
              <p className="text-white font-bold text-base">{exercise.twist}</p>
            </div>

            <p className="text-white/80 text-sm mb-4">{exercise.question}</p>

            {exercise.type === 'input' ? (
              <>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="What do you say?"
                  disabled={submitted}
                />
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-emerald-400 text-sm font-semibold"
                  >
                    ✓ Plot twist mastered!
                  </motion.p>
                )}
                {!submitted && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={!input.trim()}
                    className="btn-primary mt-4"
                    style={{ opacity: !input.trim() ? 0.5 : 1 }}
                  >
                    Answer ✓
                  </motion.button>
                )}
              </>
            ) : (
              <div className="grid gap-2">
                {exercise.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      const correct = idx === exercise.correctIndex
                      setTimeout(() => onAnswer(correct), 1200)
                    }}
                    className="text-left px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm cursor-pointer hover:bg-white/10 transition-all"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
