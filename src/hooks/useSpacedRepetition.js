const INTERVALS = [0, 1, 3, 7, 14, 30, 90]

export function useSpacedRepetition() {
  function getNextReview(streak) {
    const idx = Math.min(streak, INTERVALS.length - 1)
    return Date.now() + INTERVALS[idx] * 86400000
  }

  function isDue(word) {
    return Date.now() >= (word.nextReview || 0)
  }

  function recordAttempt(word, correct) {
    return {
      ...word,
      streak: correct ? (word.streak || 0) + 1 : 0,
      nextReview: correct ? getNextReview((word.streak || 0) + 1) : getNextReview(0),
      totalCorrect: (word.totalCorrect || 0) + (correct ? 1 : 0),
      totalAttempts: (word.totalAttempts || 0) + 1,
    }
  }

  return { getNextReview, isDue, recordAttempt }
}
