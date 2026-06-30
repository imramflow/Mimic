import { useState, useRef, useCallback } from 'react'

export function useSpeechRecog() {
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState(null)
  const recognitionRef = useRef(null)

  const start = useCallback((lang = 'en-US') => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setError('Speech recognition not supported')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = lang
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript
      setTranscript(result)
    }

    recognition.onerror = () => setError('Could not hear you')
    recognition.onend = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
    setError(null)
  }, [])

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }, [])

  return { transcript, isListening, error, start, stop }
}
