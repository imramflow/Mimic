import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSpeech } from '../../hooks/useSpeech'

export default function ListenType({ exercise, onAnswer, langCode }) {
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [played, setPlayed] = useState(false)
  const { speak } = useSpeech()

  useEffect(() => {
    setPlayed(false)
  }, [exercise])

  const playAudio = () => {
    speak(exercise.text, `${langCode}-${langCode.toUpperCase()}`, 0.8)
    setPlayed(true)
  }

  const normalize = (s) => s.toLowerCase().trim().replace(/[^a-z0-9\u0600-\u06FF\u0400-\u04FF\u4e00-\u9fff\s]/gi, '')

  const handleSubmit = () => {
    if (!input.trim()) return
    setSubmitted(true)
    const correct = normalize(input) === normalize(exercise.text)
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
      <p className="text-white/80 text-sm font-medium mb-4">Listen and type what you hear</p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={playAudio}
        className="btn-primary w-full mb-4 flex items-center justify-center gap-2"
      >
        <span>{played ? '🔊' : '🔈'}</span>
        {played ? 'Play Again' : 'Play Audio'}
      </motion.button>

      <input
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Type what you heard..."
        disabled={submitted}
      />

      {submitted && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 text-sm font-semibold ${normalize(input) === normalize(exercise.text) ? 'text-emerald-400' : 'text-rose-400'}`}
        >
          {normalize(input) === normalize(exercise.text) ? "✓ Perfect! You've got ears!" : `✗ It was: "${exercise.text}"`}
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
