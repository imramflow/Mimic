import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function SpeedRound({ exercise, onAnswer }) {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [active, setActive] = useState(false)
  const [finished, setFinished] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const startGame = () => {
    setActive(true)
    setTimeLeft(30)
    setScore(0)
    setCurrent(0)
    setFinished(false)
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          setActive(false)
          setFinished(true)
          setTimeout(() => onAnswer(score > 5), 1500)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleAnswer = (idx) => {
    if (!active) return
    if (idx === exercise.questions[current].correctIndex) {
      setScore(s => s + 1)
    }
    if (current < exercise.questions.length - 1) {
      setCurrent(c => c + 1)
    } else {
      setActive(false)
      setFinished(true)
      clearInterval(timerRef.current)
      setTimeout(() => onAnswer(score > 5), 1500)
    }
  }

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-6 text-center"
      >
        <p className="text-3xl mb-2">⏱️</p>
        <p className="text-white font-bold text-lg">Speed Round Done!</p>
        <p className="text-white/60 mt-1">Score: {score}/{exercise.questions.length}</p>
      </motion.div>
    )
  }

  if (!active) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 text-center"
      >
        <p className="text-3xl mb-2">⚡</p>
        <p className="text-white font-bold text-lg mb-1">Speed Round</p>
        <p className="text-white/40 text-sm mb-4">Answer as many as you can in 30 seconds!</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
          className="btn-primary"
        >
          START! 🚀
        </motion.button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="text-lg font-black"
          style={{ color: timeLeft < 10 ? '#f472b6' : '#22d3ee' }}
        >
          {timeLeft}s
        </div>
        <div className="text-white/40 text-sm">Score: {score}</div>
        <div className="text-white/40 text-sm">{current + 1}/{exercise.questions.length}</div>
      </div>

      <div className="h-1.5 rounded-full bg-white/5 mb-4 overflow-hidden">
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: `${(timeLeft / 30) * 100}%` }}
          className="h-full rounded-full"
          style={{ background: timeLeft < 10 ? '#f472b6' : '#22d3ee' }}
        />
      </div>

      <p className="text-white font-semibold mb-4">{exercise.questions[current].question}</p>

      <div className="grid grid-cols-2 gap-2">
        {exercise.questions[current].options.map((opt, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleAnswer(idx)}
            className="px-3 py-3 rounded-xl text-sm text-white/80 bg-white/5 border border-white/10 cursor-pointer transition-all hover:bg-white/10"
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
