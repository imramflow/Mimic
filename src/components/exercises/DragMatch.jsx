import { useState } from 'react'
import { motion, Reorder } from 'framer-motion'

export default function DragMatch({ exercise, onAnswer }) {
  const [shuffled, setShuffled] = useState(() =>
    [...exercise.pairs].sort(() => Math.random() - 0.5)
  )
  const [matches, setMatches] = useState({})
  const [selectedLeft, setSelectedLeft] = useState(null)

  const handleLeftClick = (idx) => {
    if (selectedLeft === idx) {
      setSelectedLeft(null)
      return
    }
    if (selectedLeft !== null) {
      setMatches(prev => ({ ...prev, [selectedLeft]: idx }))
      setSelectedLeft(null)
    } else {
      setSelectedLeft(idx)
    }
  }

  const allMatched = exercise.pairs.every((_, i) => matches[i] !== undefined)

  const handleSubmit = () => {
    if (!allMatched) return
    const correct = exercise.pairs.every((pair, i) => {
      const matchedIdx = matches[i]
      return shuffled[matchedIdx]?.right === pair.right
    })
    setTimeout(() => {
      onAnswer(correct)
      setMatches({})
      setSelectedLeft(null)
      setShuffled([...exercise.pairs].sort(() => Math.random() - 0.5))
    }, 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6"
    >
      <p className="text-white/80 text-sm font-medium mb-4">Match the pairs</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {exercise.pairs.map((pair, idx) => (
            <motion.button
              key={`left-${idx}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLeftClick(idx)}
              className={`w-full px-3 py-2.5 rounded-xl text-sm text-left transition-all cursor-pointer ${
                selectedLeft === idx
                  ? 'bg-white/15 border-white/20'
                  : matches[idx] !== undefined
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-white/5 border-white/10'
              }`}
              style={{ border: '1px solid', borderColor: selectedLeft === idx ? 'rgba(255,255,255,0.2)' : matches[idx] !== undefined ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.08)' }}
            >
              {pair.left}
            </motion.button>
          ))}
        </div>

        <div className="space-y-2">
          {shuffled.map((pair, idx) => {
            const isMatched = Object.values(matches).includes(idx)
            return (
              <motion.button
                key={`right-${idx}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (selectedLeft !== null) {
                    setMatches(prev => ({ ...prev, [selectedLeft]: idx }))
                    setSelectedLeft(null)
                  }
                }}
                className={`w-full px-3 py-2.5 rounded-xl text-sm text-left transition-all ${
                  isMatched ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10'
                }`}
                style={{ border: '1px solid', borderColor: isMatched ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.08)' }}
              >
                {pair.right}
              </motion.button>
            )
          })}
        </div>
      </div>

      {allMatched && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          className="btn-primary mt-4 w-full"
        >
          Check ✓
        </motion.button>
      )}
    </motion.div>
  )
}
