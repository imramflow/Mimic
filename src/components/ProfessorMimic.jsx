import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MOODS = {
  idle: { eyes: '😐', mouth: '⎯', brows: '—' },
  happy: { eyes: '😊', mouth: '◡', brows: '/' },
  sad: { eyes: '😢', mouth: '◠', brows: '\\' },
  angry: { eyes: '😠', mouth: '□', brows: '∨' },
  surprised: { eyes: '😮', mouth: '○', brows: '∧' },
  sneaky: { eyes: '😏', mouth: '⌣', brows: '∨' },
  excited: { eyes: '🤩', mouth: '◇', brows: '∧' },
  bored: { eyes: '😑', mouth: '—', brows: '—' },
  trap: { eyes: '😈', mouth: '⌢', brows: '∨' },
  proud: { eyes: '😌', mouth: '⌣', brows: '/' },
}

const MESSAGES = {
  idle: [
    "I'm waiting. My time is valuable.",
    "Don't rush me. I'm thinking of a good insult.",
    "You're still here? Impressive commitment.",
    "I've taught rocks smarter than you. But I believe in you.",
    "This better be worth my time...",
  ],
  correct: [
    "Hmph. You got it right. Fluke.",
    "Don't let it go to your head. It's ONE answer.",
    "Even a broken clock is right twice a day.",
    "I'm shocked. And I don't shock easily.",
    "Beginner's luck. Obviously.",
  ],
  wrong: [
    "HA! Gotcha! Now you'll never forget it.",
    "Classic mistake. Classic you.",
    "Wrong. But now your brain burned it in. You're welcome.",
    "I SET YOU UP. And you fell perfectly.",
    "Oof. That was painful to watch. But effective.",
  ],
  trap: [
    "Too easy? I made it TOO easy. Now you're suspicious. Good.",
    "You see the trick? Or did I get you?",
    "Nothing is ever that simple in my lessons.",
    "You hesitated. That means you're learning.",
  ],
  complete: [
    "You survived. Barely. I'm impressed. A little.",
    "Fine. You passed. Don't expect a party.",
    "One lesson done. Only 299 to go. No big deal.",
    "I'll admit it. You're not COMPLETELY hopeless.",
  ],
}

const COLORS = {
  idle: '#a78bfa',
  happy: '#22d3ee',
  sad: '#60a5fa',
  angry: '#f472b6',
  surprised: '#fbbf24',
  sneaky: '#a78bfa',
  excited: '#34d399',
  bored: '#6b7280',
  trap: '#f472b6',
  proud: '#22d3ee',
}

export default function ProfessorMimic({ mood = 'idle', customMessage, size = 120 }) {
  const [currentMood, setCurrentMood] = useState(mood)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setCurrentMood(mood)
    if (customMessage) {
      setMessage(customMessage)
    } else {
      const msgs = MESSAGES[mood] || MESSAGES.idle
      setMessage(msgs[Math.floor(Math.random() * msgs.length)])
    }
  }, [mood, customMessage])

  const features = MOODS[currentMood] || MOODS.idle
  const accent = COLORS[currentMood] || COLORS.idle

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        key={currentMood + message}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-30"
          style={{ background: accent }}
        />

        {/* Body */}
        <svg width={size} height={size} viewBox="0 0 120 120" className="relative z-10">
          {/* Body */}
          <ellipse cx="60" cy="75" rx="45" ry="35" fill="rgba(255,255,255,0.08)" />

          {/* Head */}
          <circle cx="60" cy="45" r="32" fill="rgba(255,255,255,0.1)" stroke={accent} strokeWidth="1.5" />

          {/* Eyes */}
          <text x="47" y="42" textAnchor="middle" fontSize="12" fill="white">{features.eyes === '😊' ? '◕' : features.eyes === '😑' ? '●' : '◉'}</text>
          <text x="73" y="42" textAnchor="middle" fontSize="12" fill="white">{features.eyes === '😊' ? '◕' : features.eyes === '😑' ? '●' : '◉'}</text>

          {/* Eyebrows */}
          <text x="60" y="28" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)">{features.brows}</text>

          {/* Mouth */}
          <text x="60" y="58" textAnchor="middle" fontSize="14" fill={accent}>{features.mouth}</text>

          {/* Hat */}
          <text x="60" y="18" textAnchor="middle" fontSize="14" fill={accent}>🎩</text>
        </svg>

        {/* Mood indicator */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute -top-1 -right-1 text-sm"
        >
          {currentMood === 'trap' ? '😈' : currentMood === 'sneaky' ? '🕵️' : currentMood === 'angry' ? '🔥' : '🎭'}
        </motion.div>
      </motion.div>

      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="glass px-4 py-2.5 rounded-xl max-w-[280px] text-center"
        >
          <p className="text-sm text-white/80 leading-relaxed">{message}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
