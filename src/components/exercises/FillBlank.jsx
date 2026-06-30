import { useState } from 'react'
import { motion } from 'framer-motion'

export default function FillBlank({ exercise, onAnswer }) {
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const normalize = (s) => s.toLowerCase().trim().replace(/[^a-z0-9\u0600-\u06FF\u0400-\u04FF\u4e00-\u9fff]/gi, '')

  const handleSubmit = () => {
    if (!input.trim()) return
    setSubmitted(true)
    const correct = normalize(input) === normalize(exercise.answer)
    setTimeout(() => {
      onAnswer(correct)
      setInput('')
      setSubmitted(false)
    }, 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6"
    >
      <p className="text-white/80 text-sm font-medium mb-4">{exercise.sentence}</p>

      <div className="flex gap-3">
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Type your answer here..."
          disabled={submitted}
          className="flex-1"
        />
      </div>

      {submitted && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 text-sm font-semibold ${normalize(input) === normalize(exercise.answer) ? 'text-emerald-400' : 'text-rose-400'}`}
        >
          {normalize(input) === normalize(exercise.answer) ? '✓ Correct!' : `✗ Answer: ${exercise.answer}`}
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
          Check ✓
        </motion.button>
      )}
    </motion.div>
  )
}
