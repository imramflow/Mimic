import { useState } from 'react'
import { motion } from 'framer-motion'

const SCENE_ITEMS = [
  { id: 'door', emoji: '🚪', label: 'Door', x: 10, y: 40 },
  { id: 'window', emoji: '🪟', label: 'Window', x: 70, y: 30 },
  { id: 'table', emoji: '🪑', label: 'Table', x: 30, y: 65 },
  { id: 'book', emoji: '📚', label: 'Book', x: 55, y: 55 },
  { id: 'lamp', emoji: '💡', label: 'Lamp', x: 78, y: 15 },
  { id: 'plant', emoji: '🪴', label: 'Plant', x: 15, y: 15 },
  { id: 'cup', emoji: '☕', label: 'Cup', x: 40, y: 45 },
  { id: 'clock', emoji: '🕰️', label: 'Clock', x: 85, y: 5 },
]

export default function MemoryPalace({ exercise, onAnswer }) {
  const [revealed, setRevealed] = useState({})
  const [found, setFound] = useState(0)
  const [complete, setComplete] = useState(false)

  const handleClick = (item) => {
    if (revealed[item.id] || complete) return
    setRevealed(prev => ({ ...prev, [item.id]: true }))
    const newFound = found + 1
    setFound(newFound)
    if (newFound >= 5) {
      setComplete(true)
      setTimeout(() => onAnswer(true), 1500)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6"
    >
      <p className="text-white/80 text-sm font-medium mb-1">🧠 Memory Palace</p>
      <p className="text-white/30 text-xs mb-4">Find 5 hidden words in this room. Click objects to reveal them!</p>

      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-white/[0.02] to-white/[0.06] border border-white/10 mb-4">
        {/* Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-white/[0.03]" />

        {/* Items */}
        {SCENE_ITEMS.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => handleClick(item)}
            whileHover={!revealed[item.id] && !complete ? { scale: 1.15 } : {}}
            className="absolute transition-all cursor-pointer"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: revealed[item.id] ? 1 : 0.6,
            }}
          >
            <span className="text-3xl block">{item.emoji}</span>
            {revealed[item.id] && (
              <motion.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="block text-center text-[10px] text-white/80 font-semibold mt-0.5"
              >
                {item.label}
              </motion.span>
            )}
          </motion.button>
        ))}

        {/* Progress overlay */}
        <div className="absolute bottom-2 left-2 right-2 flex gap-1">
          {[1,2,3,4,5].map(i => (
            <div
              key={i}
              className="flex-1 h-1.5 rounded-full"
              style={{
                background: found >= i ? '#22d3ee' : 'rgba(255,255,255,0.1)',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
      </div>

      <p className="text-center text-white/40 text-sm">{found}/5 words found</p>

      {complete && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-emerald-400 text-sm font-semibold mt-2"
        >
          ✓ Memory Palace explored! Your brain grew 5 new wrinkles.
        </motion.p>
      )}
    </motion.div>
  )
}
