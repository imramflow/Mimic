import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ProfessorMimic from './ProfessorMimic'
import MultipleChoice from './exercises/MultipleChoice'
import FillBlank from './exercises/FillBlank'
import DragMatch from './exercises/DragMatch'
import ListenType from './exercises/ListenType'
import SpeakPractice from './exercises/SpeakPractice'
import ReverseTeach from './exercises/ReverseTeach'
import TrapQuestion from './exercises/TrapQuestion'
import SpeedRound from './exercises/SpeedRound'
import PlotTwist from './exercises/PlotTwist'
import MemoryPalace from './exercises/MemoryPalace'

import { getLangVoiceCode, getLevelTheme } from '../content/languages'
import { lessons as allLessons } from '../content/lessons'

const EXERCISE_COMPONENTS = {
  'multiple-choice': MultipleChoice,
  'fill-blank': FillBlank,
  'drag-match': DragMatch,
  'listen-type': ListenType,
  'speak-practice': SpeakPractice,
  'reverse-teach': ReverseTeach,
  'trap-question': TrapQuestion,
  'speed-round': SpeedRound,
  'plot-twist': PlotTwist,
  'memory-palace': MemoryPalace,
}

export default function LessonPlayer({ progress, setProgress }) {
  const { lang, level } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const lessons = allLessons[lang]?.[level] || []
  const [currentLesson, setCurrentLesson] = useState(0)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [mood, setMood] = useState('idle')
  const [customMessage, setCustomMessage] = useState('')

  const lesson = lessons[currentLesson]

  const updateMood = useCallback((m, msg) => {
    setMood(m)
    if (msg) setCustomMessage(msg)
  }, [])

  const handleAnswer = useCallback((correct) => {
    if (correct) {
      setCorrectCount(p => p + 1)
      updateMood('correct')
    } else {
      updateMood('wrong')
    }

    const exs = lesson?.exercises || []
    if (currentExercise < exs.length - 1) {
      setTimeout(() => setCurrentExercise(p => p + 1), 800)
    } else {
      setCompleted(true)
      const earned = Math.round((correctCount + (correct ? 1 : 0)) / exs.length * 100) + 50
      updateMood('complete')

      setTimeout(() => {
        setProgress(prev => {
          const p = { ...prev }
          p.totalXP = (p.totalXP || 0) + earned
          p.lastActive = new Date().toISOString()
          p.streak = (p.streak || 0) + 1
          if (!p.languages) p.languages = {}
          if (!p.languages[lang]) p.languages[lang] = {}
          if (!p.languages[lang][level]) p.languages[lang][level] = []
          p.languages[lang][level].push({
            id: `${lang}-${level}-${currentLesson}`,
            completed: true,
            xp: earned,
            date: new Date().toISOString(),
          })
          return p
        })
      }, 2000)
    }
  }, [currentExercise, lesson, correctCount, updateMood, setProgress, lang, level, currentLesson])

  useEffect(() => {
    if (!lesson && lessons.length > 0) {
      navigate(`/levels/${lang}`)
    }
  }, [lesson, lessons, lang, navigate])

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <ProfessorMimic mood="bored" customMessage="No lessons here yet. Phew." />
      </div>
    )
  }

  if (completed) {
    const theme = getLevelTheme(level)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto px-4 text-center"
      >
        <ProfessorMimic mood="proud" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
          className="glass p-8 mt-4"
        >
          <p className="text-4xl mb-2">🎉</p>
          <h2 className="text-xl font-bold text-white mb-1">{t('lesson_complete')}</h2>
          <p className="text-white/40 text-sm mb-4">{lesson.title}</p>
          <p className="text-3xl font-black gradient-text mb-2">+{correctCount > 0 ? Math.round(correctCount / lesson.exercises.length * 100) + 50 : 50} XP</p>
          <p className="text-white/30 text-xs">
            {correctCount}/{lesson.exercises.length} {t('correct')}
          </p>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => navigate(`/levels/${lang}`)}
              className="btn-secondary flex-1"
            >
              {t('continue')}
            </button>
            <button
              onClick={() => {
                setCompleted(false)
                setCurrentExercise(0)
                setCorrectCount(0)
                setMood('idle')
                if (currentLesson < lessons.length - 1) {
                  setCurrentLesson(p => p + 1)
                } else {
                  navigate(`/levels/${lang}`)
                }
              }}
              className="btn-primary flex-1"
            >
              {currentLesson < lessons.length - 1 ? t('next') : t('finish')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  const exercise = lesson.exercises[currentExercise]
  const ExerciseComponent = EXERCISE_COMPONENTS[exercise?.type]
  const theme = getLevelTheme(level)

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(`/levels/${lang}`)} className="btn-secondary text-xs !py-2 !px-3">
          ← {t('levels')}
        </button>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-white/60 font-medium">{lesson.title}</p>
            <p className="text-[10px] text-white/30">
              {currentLesson + 1}/{lessons.length} · {currentExercise + 1}/{lesson.exercises.length}
            </p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-right">
            <p className="text-xs text-white/60 font-medium">{correctCount}/{lesson.exercises.length}</p>
            <p className="text-[10px] text-white/30">{t('correct')}</p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-white/5 mb-6 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentExercise + 1) / lesson.exercises.length) * 100}%` }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${theme.color}, ${theme.color}88)` }}
        />
      </div>

      {/* Professor + Exercise */}
      <div className="grid md:grid-cols-[auto_1fr] gap-4 items-start">
        <div className="hidden md:block sticky top-28">
          <ProfessorMimic mood={mood} customMessage={customMessage} size={100} />
        </div>

        <div className="md:hidden flex justify-center mb-4">
          <ProfessorMimic mood={mood} customMessage={null} size={80} />
        </div>

        <AnimatePresence mode="wait">
          {ExerciseComponent && (
            <ExerciseComponent
              key={`${currentLesson}-${currentExercise}`}
              exercise={exercise}
              onAnswer={handleAnswer}
              langCode={lang}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
