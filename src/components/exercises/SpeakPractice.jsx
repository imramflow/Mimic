import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech } from '../../hooks/useSpeech'
import { useSpeechRecog } from '../../hooks/useSpeechRecog'

export default function SpeakPractice({ exercise, onAnswer, langCode }) {
  const [step, setStep] = useState('listen')
  const { speak } = useSpeech()
  const { transcript, isListening, error, start, stop } = useSpeechRecog()

  const playPhrase = () => {
    speak(exercise.text, `${langCode}-${langCode.toUpperCase()}`, 0.8)
    setStep('speak')
  }

  const startRecording = () => {
    start(`${langCode}-${langCode.toUpperCase()}`)
  }

  const checkAnswer = () => {
    stop()
    const normalize = (s) => s.toLowerCase().trim().replace(/[^a-z0-9\s]/gi, '')
    const correct = normalize(transcript).includes(normalize(exercise.text).slice(0, 5))
    setTimeout(() => {
      onAnswer(correct)
      setStep('listen')
    }, 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6"
    >
      <p className="text-white/80 text-sm font-medium mb-4">Repeat after me</p>

      <div className="text-center mb-4">
        <p className="text-2xl font-bold text-white/90">{exercise.text}</p>
      </div>

      {step === 'listen' && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={playPhrase}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          🔈 Listen & Repeat
        </motion.button>
      )}

      {step === 'speak' && (
        <div className="space-y-3">
          {!isListening ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startRecording}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              🎤 Say it
            </motion.button>
          ) : (
            <div className="text-center py-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-16 h-16 rounded-full mx-auto mb-2"
                style={{ background: 'rgba(244,114,182,0.2)', border: '2px solid rgba(244,114,182,0.4)' }}
              >
                <span className="text-2xl flex items-center justify-center h-full">🎤</span>
              </motion.div>
              <p className="text-white/50 text-sm">Listening...</p>
            </div>
          )}

          {transcript && (
            <div className="text-center">
              <p className="text-white/80 text-sm mb-1">You said:</p>
              <p className="text-white font-semibold">"{transcript}"</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={checkAnswer}
                className="btn-primary mt-3"
              >
                Check ✓
              </motion.button>
            </div>
          )}

          {error && <p className="text-rose-400 text-sm text-center">{error}</p>}
        </div>
      )}
    </motion.div>
  )
}
