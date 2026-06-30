// Run: node scripts/generate-lessons.js
// Generates structured lesson data for all languages and levels

import fs from 'fs'
import path from 'path'

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

const VOCAB_THEMES = {
  A1: [
    { theme: 'Greetings', words: ['Hello', 'Goodbye', 'Please', 'Thank you', 'Yes', 'No', 'Excuse me', 'Sorry', 'How are you?', 'I am fine'] },
    { theme: 'Numbers', words: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'] },
    { theme: 'Colors', words: ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Orange', 'Purple', 'Pink', 'Brown'] },
    { theme: 'Family', words: ['Mother', 'Father', 'Sister', 'Brother', 'Grandma', 'Grandpa', 'Aunt', 'Uncle', 'Cousin', 'Baby'] },
    { theme: 'Food', words: ['Water', 'Bread', 'Rice', 'Milk', 'Apple', 'Banana', 'Egg', 'Fish', 'Meat', 'Cheese'] },
    { theme: 'Animals', words: ['Cat', 'Dog', 'Bird', 'Fish', 'Horse', 'Cow', 'Sheep', 'Duck', 'Chicken', 'Rabbit'] },
    { theme: 'House', words: ['Door', 'Window', 'Table', 'Chair', 'Bed', 'Lamp', 'Kitchen', 'Bathroom', 'Room', 'Key'] },
    { theme: 'Body', words: ['Head', 'Hand', 'Foot', 'Eye', 'Ear', 'Nose', 'Mouth', 'Arm', 'Leg', 'Finger'] },
    { theme: 'Clothes', words: ['Shirt', 'Shoes', 'Hat', 'Coat', 'Dress', 'Pants', 'Socks', 'Gloves', 'Scarf', 'Belt'] },
    { theme: 'Weather', words: ['Sun', 'Rain', 'Snow', 'Wind', 'Cloud', 'Hot', 'Cold', 'Warm', 'Storm', 'Fog'] },
    { theme: 'Time', words: ['Morning', 'Afternoon', 'Evening', 'Night', 'Today', 'Tomorrow', 'Yesterday', 'Now', 'Later', 'Soon'] },
    { theme: 'Places', words: ['Home', 'School', 'Work', 'Shop', 'Park', 'Hospital', 'Bank', 'Airport', 'Station', 'Hotel'] },
    { theme: 'School', words: ['Book', 'Pen', 'Paper', 'Teacher', 'Student', 'Class', 'Lesson', 'Question', 'Answer', 'Desk'] },
    { theme: 'Work', words: ['Job', 'Office', 'Boss', 'Colleague', 'Meeting', 'Email', 'Phone', 'Computer', 'Document', 'Desk'] },
    { theme: 'Travel', words: ['Map', 'Ticket', 'Passport', 'Suitcase', 'Train', 'Bus', 'Car', 'Bike', 'Boat', 'Plane'] },
    { theme: 'Shopping', words: ['Price', 'Money', 'Cost', 'Buy', 'Sell', 'Cheap', 'Expensive', 'Bag', 'Receipt', 'Change'] },
    { theme: 'Feelings', words: ['Happy', 'Sad', 'Tired', 'Hungry', 'Thirsty', 'Scared', 'Brave', 'Angry', 'Calm', 'Excited'] },
    { theme: 'Actions', words: ['Eat', 'Drink', 'Sleep', 'Walk', 'Run', 'Sit', 'Stand', 'Read', 'Write', 'Speak'] },
    { theme: 'Directions', words: ['Left', 'Right', 'Up', 'Down', 'Here', 'There', 'Near', 'Far', 'Straight', 'Corner'] },
    { theme: 'Emergency', words: ['Help', 'Danger', 'Fire', 'Police', 'Doctor', 'Medicine', 'Hospital', 'Accident', 'Safe', 'Stop'] },
    { theme: 'Days', words: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Week', 'Month', 'Year'] },
    { theme: 'Nature', words: ['Tree', 'Flower', 'River', 'Mountain', 'Sea', 'Forest', 'Sky', 'Star', 'Moon', 'Earth'] },
    { theme: 'Technology', words: ['Computer', 'Phone', 'Internet', 'Screen', 'Battery', 'Charger', 'App', 'Website', 'Email', 'Message'] },
    { theme: 'Music', words: ['Song', 'Music', 'Dance', 'Sing', 'Guitar', 'Drum', 'Piano', 'Voice', 'Band', 'Concert'] },
    { theme: 'Sports', words: ['Ball', 'Game', 'Team', 'Player', 'Goal', 'Run', 'Swim', 'Jump', 'Catch', 'Throw'] },
  ],
  A2: [
    { theme: 'Daily Routine', words: ['Wake up', 'Get dressed', 'Have breakfast', 'Go to work', 'Come home', 'Have dinner', 'Watch TV', 'Take a shower', 'Brush teeth', 'Go to bed'] },
    { theme: 'Restaurant', words: ['Menu', 'Order', 'Waiter', 'Table', 'Bill', 'Tip', 'Main course', 'Dessert', 'Appetizer', 'Drink'] },
    { theme: 'Feelings Deep', words: ['Worried', 'Confused', 'Proud', 'Embarrassed', 'Jealous', 'Grateful', 'Lonely', 'Hopeful', 'Disappointed', 'Curious'] },
    { theme: 'Weather 2', words: ['Forecast', 'Temperature', 'Humidity', 'Thunder', 'Lightning', 'Flood', 'Drought', 'Breeze', 'Drizzle', 'Hail'] },
    { theme: 'Health', words: ['Headache', 'Fever', 'Cough', 'Cold', 'Pain', 'Appointment', 'Pharmacy', 'Symptom', 'Treatment', 'Recovery'] },
    { theme: 'Education', words: ['Subject', 'Exam', 'Grade', 'Homework', 'Project', 'Research', 'Library', 'Scholarship', 'Graduate', 'Degree'] },
    { theme: 'Shopping 2', words: ['Discount', 'Sale', 'Refund', 'Exchange', 'Try on', 'Fit', 'Size', 'Color', 'Style', 'Brand'] },
    { theme: 'Travel 2', words: ['Reservation', 'Departure', 'Arrival', 'Delay', 'Cancel', 'Boarding', 'Gate', 'Seat', 'Luggage', 'Customs'] },
    { theme: 'City Life', words: ['Traffic', 'Parking', 'Subway', 'Sidewalk', 'Neighborhood', 'Building', 'Street', 'Corner', 'Bridge', 'Square'] },
    { theme: 'Hobbies', words: ['Painting', 'Photography', 'Gardening', 'Cooking', 'Reading', 'Gaming', 'Hiking', 'Fishing', 'Camping', 'Knitting'] },
  ],
  B1: [
    { theme: 'Workplace', words: ['Deadline', 'Meeting', 'Presentation', 'Negotiation', 'Contract', 'Salary', 'Promotion', 'Interview', 'Resign', 'Hire'] },
    { theme: 'Money', words: ['Budget', 'Savings', 'Investment', 'Loan', 'Interest', 'Mortgage', 'Insurance', 'Tax', 'Profit', 'Expense'] },
    { theme: 'Relationships', words: ['Argument', 'Agreement', 'Support', 'Trust', 'Respect', 'Apology', 'Forgiveness', 'Compromise', 'Loyalty', 'Commitment'] },
    { theme: 'Media', words: ['Article', 'Headline', 'Interview', 'Broadcast', 'Channel', 'Social media', 'Influencer', 'Podcast', 'Subscription', 'Trend'] },
    { theme: 'Environment', words: ['Pollution', 'Recycle', 'Climate', 'Emission', 'Renewable', 'Conservation', 'Ecosystem', 'Biodiversity', 'Sustainability', 'Carbon'] },
    { theme: 'Technology 2', words: ['Artificial', 'Intelligence', 'Software', 'Hardware', 'Update', 'Upgrade', 'Password', 'Security', 'Privacy', 'Backup'] },
    { theme: 'Health 2', words: ['Nutrition', 'Exercise', 'Allergy', 'Vaccine', 'Chronic', 'Therapy', 'Surgery', 'Prevention', 'Diagnosis', 'Prescription'] },
    { theme: 'Law', words: ['Court', 'Judge', 'Lawyer', 'Evidence', 'Witness', 'Trial', 'Sentence', 'Appeal', 'Fine', 'Legal'] },
    { theme: 'Business', words: ['Revenue', 'Strategy', 'Market', 'Competition', 'Investment', 'Growth', 'Partnership', 'Startup', 'Client', 'Service'] },
    { theme: 'Culture', words: ['Tradition', 'Festival', 'Ceremony', 'Heritage', 'Custom', 'Folklore', 'Art', 'Cuisine', 'Religion', 'Diversity'] },
  ],
  B2: [
    { theme: 'Politics', words: ['Government', 'Election', 'Policy', 'Democracy', 'Debate', 'Campaign', 'Legislation', 'Amendment', 'Constitution', 'Opposition'] },
    { theme: 'Psychology', words: ['Behavior', 'Perception', 'Cognition', 'Emotion', 'Motivation', 'Personality', 'Memory', 'Learning', 'Bias', 'Trauma'] },
    { theme: 'Economics', words: ['Inflation', 'Recession', 'GDP', 'Supply', 'Demand', 'Monopoly', 'Tariff', 'Subsidy', 'Sanction', 'Fiscal'] },
    { theme: 'Science', words: ['Hypothesis', 'Experiment', 'Research', 'Analysis', 'Theory', 'Conclusion', 'Evidence', 'Laboratory', 'Discovery', 'Innovation'] },
    { theme: 'Philosophy', words: ['Reason', 'Logic', 'Ethics', 'Existence', 'Knowledge', 'Truth', 'Belief', 'Consciousness', 'Freedom', 'Justice'] },
    { theme: 'Medicine', words: ['Diagnosis', 'Treatment', 'Symptom', 'Prognosis', 'Therapy', 'Surgery', 'Prescription', 'Chronic', 'Acute', 'Recovery'] },
    { theme: 'Literature', words: ['Novel', 'Poem', 'Essay', 'Narrative', 'Symbolism', 'Metaphor', 'Genre', 'Protagonist', 'Plot', 'Theme'] },
    { theme: 'Architecture', words: ['Structure', 'Design', 'Facade', 'Foundation', 'Column', 'Dome', 'Blueprint', 'Modernism', 'Heritage', 'Restoration'] },
  ],
  C1: [
    { theme: 'Advanced Business', words: ['Acquisition', 'Merger', 'Diversification', 'Outsource', 'Equity', 'Liquidity', 'Dividend', 'Portfolio', 'Hedge', 'Arbitrage'] },
    { theme: 'Advanced Science', words: ['Quantum', 'Entropy', 'Photosynthesis', 'Evolution', 'Genetics', 'Mutation', 'Symbiosis', 'Catalyst', 'Metabolism', 'Neuroplasticity'] },
    { theme: 'Advanced Culture', words: ['Cosmopolitan', 'Cultural appropriation', 'Assimilation', 'Globalization', 'Secularism', 'Nationalism', 'Populism', 'Ideology', 'Hegemony', 'Paradigm'] },
    { theme: 'Advanced Law', words: ['Jurisdiction', 'Precedent', 'Litigation', 'Arbitration', 'Injunction', 'Testament', 'Affidavit', 'Extradition', 'Indictment', 'Acquittal'] },
    { theme: 'Medicine 2', words: ['Pathology', 'Epidemiology', 'Immunology', 'Metastasis', 'Remission', 'Prognosis', 'Biopsy', 'Benign', 'Malignant', 'Anthropology'] },
  ],
  C2: [
    { theme: 'Mastery Level — Rhetoric', words: ['Hyperbole', 'Euphemism', 'Understatement', 'Paradox', 'Irony', 'Sarcasm', 'Satire', 'Allegory', 'Metonymy', 'Synecdoche'] },
    { theme: 'Mastery Level — Academia', words: ['Epistemology', 'Ontology', 'Phenomenology', 'Teleology', 'Deconstruction', 'Hermeneutics', 'Empiricism', 'Rationalism', 'Existentialism', 'Nihilism'] },
    { theme: 'Mastery Level — Nuance', words: ['Ambiguity', 'Connotation', 'Denotation', 'Pragmatics', 'Semantics', 'Syntax', 'Phonology', 'Morphology', 'Lexicon', 'Discourse'] },
    { theme: 'Mastery Level — World Affairs', words: ['Geopolitics', 'Diplomacy', 'Sovereignty', 'Multilateral', 'Unilateral', 'Intervention', 'Nonproliferation', 'Hegemony', 'Autarky', 'Tectonic shift'] },
  ],
}

function generateUnit(theme, unitIdx, level) {
  const words = theme.words.slice(0, 10)
  const isTrapUnit = unitIdx % 5 === 2
  const isSpeedUnit = unitIdx % 5 === 3
  const isPlotTwistUnit = unitIdx % 5 === 4

  const exercises = []

  // 1-2 Multiple Choice
  for (let i = 0; i < 2; i++) {
    const word = words[i]
    const wrong = words.filter(w => w !== word).slice(0, 3)
    exercises.push({
      type: 'multiple-choice',
      question: isTrapUnit
        ? `Which one means "${word}"? (I'll make this too easy... OR WILL I?)`
        : `What does "${word}" mean?`,
      options: shuffle([word, ...wrong]),
      correctIndex: 0,
    })
  }

  // Fill blank
  const fillSentences = [
    `I ___ to learn ${theme.theme}.`,
    `She ___ studying very hard.`,
    `They ___ going to the ${words[0]}.`,
    `We ___ happy with our ${theme.theme} lesson.`,
  ]
  exercises.push({
    type: 'fill-blank',
    sentence: fillSentences[unitIdx % fillSentences.length],
    answer: ['want', 'is', 'are', 'are'][unitIdx % 4],
  })

  // Drag match
  exercises.push({
    type: 'drag-match',
    pairs: words.slice(0, 4).map(w => ({ left: w, right: `${w} (translated)` })),
  })

  // Listen type
  exercises.push({
    type: 'listen-type',
    text: words[unitIdx % words.length],
  })

  // Speak practice
  exercises.push({
    type: 'speak-practice',
    text: `${words[1]} and ${words[2]}`,
  })

  // Reverse teach
  if (unitIdx % 3 === 0) {
    exercises.push({
      type: 'reverse-teach',
      topic: `Explain why "${words[0]}" is important when learning ${theme.theme}.`,
    })
  }

  // Trap question (every 5th unit)
  if (isTrapUnit) {
    const word = words[0]
    const similar = words.filter(w => w !== word).slice(0, 3)
    exercises.push({
      type: 'trap-question',
      question: `Quick! What does "${word}" mean?`,
      options: shuffle([word, ...similar]),
      correctIndex: 0,
      trapIndex: 3,
    })
  }

  // Speed round
  if (isSpeedUnit) {
    exercises.push({
      type: 'speed-round',
      questions: words.slice(0, 8).map(w => ({
        question: `What is "${w}"?`,
        options: shuffle([w, ...words.filter(x => x !== w).slice(0, 3)]),
        correctIndex: 0,
      })),
    })
  }

  // Plot twist
  if (isPlotTwistUnit) {
    exercises.push({
      type: 'plot-twist',
      setup: `You're at a ${theme.theme} class. The teacher asks: "Who knows the word for '${words[0]}'?" You raise your hand confidently.`,
      twist: `But the teacher says in a whisper: "Actually... that's a trick question. The real meaning is different in modern slang. What do you answer?"`,
      question: 'How do you respond?',
      type: 'input',
      answer: words[0],
    })
  }

  // Memory palace
  if (unitIdx % 4 === 0) {
    exercises.push({
      type: 'memory-palace',
      scene: theme.theme,
    })
  }

  return {
    id: `${level.toLowerCase()}-unit-${String(unitIdx + 1).padStart(3, '0')}`,
    title: `${theme.theme} — ${level}`,
    era: ['2024', '1990s', 'Medieval', 'Future'][unitIdx % 4],
    professor_mood: isTrapUnit ? 'trap' : isSpeedUnit ? 'excited' : isPlotTwistUnit ? 'sneaky' : 'idle',
    vocab: words.map(w => ({ word: w, translation: w, example: `Example with "${w}"` })),
    grammar: {
      title: level === 'A1' ? 'Basic Sentence Structure' : level === 'A2' ? 'Past Tense' : level === 'B1' ? 'Conditionals' : level === 'B2' ? 'Subjunctive' : level === 'C1' ? 'Advanced Syntax' : 'Mastery Level',
      explanation: `Learning how to use "${theme.theme}" vocabulary correctly.`,
      examples: [`"${words[0]}" is used in context.`, `"${words[1]}" is used differently.`],
    },
    exercises: shuffle(exercises).slice(0, 8),
  }
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function generateLanguage(langCode) {
  const lessons = {}
  for (const level of LEVELS) {
    const themes = VOCAB_THEMES[level] || []
    lessons[level] = themes.map((theme, idx) => generateUnit(theme, idx, level))
  }
  return lessons
}

// Generate for all languages
const ALL_CODES = ['en', 'fr', 'es', 'de', 'it', 'pt', 'ru', 'ja', 'zh', 'ko', 'ar', 'tr', 'nl', 'pl', 'sv', 'da', 'no', 'fi', 'el', 'he', 'hi', 'th', 'vi', 'id', 'cs', 'hu', 'ro', 'uk', 'fa', 'ur', 'ms', 'sw']

const allData = {}
for (const code of ALL_CODES) {
  allData[code] = generateLanguage(code)
}

const output = `// auto-generated by scripts/generate-lessons.js
// DO NOT EDIT MANUALLY — run \`npm run generate-lessons\` instead

export const lessons = ${JSON.stringify(allData, null, 2)}
`

fs.writeFileSync(path.join(process.cwd(), 'src', 'content', 'lessons.js'), output)
console.log('Generated lessons.js for', ALL_CODES.length, 'languages')
