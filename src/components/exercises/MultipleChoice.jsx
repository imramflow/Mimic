import { useState } from 'react'
import { motion } from 'framer-motion'

export default function MultipleChoice({ exercise, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
    const correct = selected === exercise.correctIndex
    setTimeout(() => {
      onAnswer(correct)
      setSelected(null)
      setSubmitted(false)
    }, 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6"
    >
      <p className="text-white/80 text-sm font-medium mb-4">{exercise.question}</p>

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
          }

          return (
            <motion.button
              key={idx}
              whileHover={!submitted ? { scale: 1.01 } : {}}
              whileTap={!submitted ? { scale: 0.99 } : {}}
              onClick={() => !submitted && setSelected(idx)}
              disabled={submitted}
              className="text-left px-4 py-3 rounded-xl transition-all cursor-pointer"
              style={{ background: bg, border: `1px solid ${border}` }}
            >
              <span className="text-white/80 text-sm">{opt}</span>
            </motion.button>
          )
        })}
      </div>

      {!submitted && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={selected === null}
          className="btn-primary mt-4 w-full"
          style={{ opacity: selected === null ? 0.5 : 1 }}
        >
          Check ✓
        </motion.button>
      )}
    </motion.div>
  )
}
