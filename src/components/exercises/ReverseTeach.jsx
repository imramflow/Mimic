import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ReverseTeach({ exercise, onAnswer }) {
  const [explanation, setExplanation] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!explanation.trim()) return
    setSubmitted(true)
    const correct = explanation.length > 10
    setTimeout(() => {
      onAnswer(correct)
      setExplanation('')
      setSubmitted(false)
    }, 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6"
    >
      <p className="text-white/80 text-sm font-medium mb-2">🧑‍🏫 Teach Mimic</p>
      <p className="text-white/40 text-xs mb-4">"Explain this to me like I'm a beginner. Convince me."</p>

      <p className="text-white font-semibold mb-3 text-sm bg-white/5 p-3 rounded-xl border border-white/10">
        "{exercise.topic}"
      </p>

      <textarea
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
        placeholder="Explain it in your own words..."
        rows={4}
        disabled={submitted}
      />

      {submitted && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-emerald-400 text-sm font-semibold"
        >
          ✓ You taught me something! ...I won't admit it again.
        </motion.p>
      )}

      {!submitted && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!explanation.trim()}
          className="btn-primary mt-4"
          style={{ opacity: !explanation.trim() ? 0.5 : 1 }}
        >
          Teach Mimic ✓
        </motion.button>
      )}
    </motion.div>
  )
}
