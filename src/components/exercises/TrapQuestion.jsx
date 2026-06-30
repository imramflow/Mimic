import { useState } from 'react'
import { motion } from 'framer-motion'

export default function TrapQuestion({ exercise, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [showTrap, setShowTrap] = useState(false)

  const handleSelect = (idx) => {
    if (submitted) return
    setSelected(idx)
  }

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
    setShowTrap(true)

    const isTrap = selected === exercise.trapIndex
    setTimeout(() => {
      onAnswer(isTrap ? false : selected === exercise.correctIndex)
      setSelected(null)
      setSubmitted(false)
      setShowTrap(false)
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm">⚡</span>
        <p className="text-white/80 text-sm font-medium">TRAP QUESTION</p>
      </div>

      <p className="text-white font-semibold mb-4">{exercise.question}</p>

      <div className="grid gap-2.5">
        {exercise.options.map((opt, idx) => {
          let bg = 'rgba(255,255,255,0.04)'
          let border = 'rgba(255,255,255,0.08)'
          if (submitted) {
            if (idx === exercise.correctIndex) {
              bg = 'rgba(52,211,153,0.1)'
              border = 'rgba(52,211,153,0.3)'
            } else if (idx === selected) {
              bg = 'rgba(244,114,182,0.1)'
              border = 'rgba(244,114,182,0.3)'
            }
          } else if (selected === idx) {
            bg = 'rgba(167,139,250,0.1)'
            border = 'rgba(167,139,250,0.3)'
          }

          return (
            <motion.button
              key={idx}
              whileHover={!submitted ? { scale: 1.01 } : {}}
              onClick={() => handleSelect(idx)}
              disabled={submitted}
              className="text-left px-4 py-3 rounded-xl transition-all cursor-pointer"
              style={{ background, border: `1px solid ${border}` }}
            >
              <span className="text-white/80 text-sm">{opt}</span>
            </motion.button>
          )
        })}
      </div>

      {showTrap && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-3 rounded-xl text-center"
          style={{ background: 'rgba(244,114,182,0.1)', border: '1px solid rgba(244,114,182,0.3)' }}
        >
          <p className="text-rose-400 font-bold text-sm">
            {selected === exercise.trapIndex
              ? '😈 GOTCHA! It was a trap! Now you\'ll NEVER forget this.'
              : '🙄 You dodged my trap... Impressive. Hmph.'}
          </p>
        </motion.div>
      )}

      {!submitted && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={selected === null}
          className="btn-primary mt-4 w-full"
          style={{ opacity: selected === null ? 0.5 : 1 }}
        >
          Submit Answer
        </motion.button>
      )}
    </motion.div>
  )
}
