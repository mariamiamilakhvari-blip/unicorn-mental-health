// ─── Hobby Matching ───────────────────────────────────────────────────────────

type HobbyMatch = {
  name: string
  category: string
  duration: 6 | 9
  learningMethod: string
  description: string
}

const HOBBY_MAP: Record<string, Record<string, HobbyMatch>> = {
  'Making something with my hands': {
    'My relationships and social life':   { name: 'Pottery', category: 'craft', duration: 6, learningMethod: 'Weekly class with a small group', description: 'Shape something beautiful with your hands in a warm, social studio setting.' },
    'My health and physical energy':       { name: 'Gardening', category: 'nature', duration: 6, learningMethod: 'Self-guided with a beginner planting journal', description: 'Grow things, tend to life, and feel grounded every time you step outside.' },
    'My personal growth and creativity':   { name: 'Watercolour Painting', category: 'art', duration: 9, learningMethod: 'Online course + 20 min daily practice', description: 'Let colour and water guide you into a quiet, creative state.' },
    'My inner calm and sense of purpose':  { name: 'Candle Making', category: 'craft', duration: 6, learningMethod: 'Self-guided with a beginner kit', description: 'A slow, sensory hobby that fills your space with warmth you made yourself.' },
  },
  'Learning and expanding my knowledge': {
    'My relationships and social life':   { name: 'Book Club', category: 'learning', duration: 6, learningMethod: 'Monthly group meeting + weekly reading', description: 'Discover new worlds through books and share them with people who get it.' },
    'My health and physical energy':       { name: 'Nutrition Science', category: 'learning', duration: 6, learningMethod: 'Online short course, one module per week', description: 'Understand your body and what fuels it — knowledge that changes everything.' },
    'My personal growth and creativity':   { name: 'Creative Writing', category: 'writing', duration: 9, learningMethod: 'Daily 15-min writing prompts + monthly review', description: 'Your thoughts, your voice, your world — put on paper and made real.' },
    'My inner calm and sense of purpose':  { name: 'Philosophy Reading', category: 'learning', duration: 9, learningMethod: 'One chapter per week, gentle journalling after', description: 'Sit with big questions. Let them slow you down in the best possible way.' },
  },
  'Movement and physical challenge': {
    'My relationships and social life':   { name: 'Salsa Dancing', category: 'dance', duration: 6, learningMethod: 'Weekly partner class', description: 'Joyful, social, physical — salsa connects you to music and to people.' },
    'My health and physical energy':       { name: 'Yoga', category: 'movement', duration: 9, learningMethod: '3x weekly practice, studio or online', description: 'Strength, flexibility and stillness — a practice that grows with you.' },
    'My personal growth and creativity':   { name: 'Martial Arts', category: 'movement', duration: 9, learningMethod: 'Twice-weekly classes with a structured belt path', description: 'Discipline, focus and confidence built one session at a time.' },
    'My inner calm and sense of purpose':  { name: 'Tai Chi', category: 'movement', duration: 6, learningMethod: 'Morning group class, 3x per week', description: 'Slow, intentional movement that quiets the mind and strengthens the body.' },
  },
  'Experiences and meeting new people': {
    'My relationships and social life':   { name: 'Improv Theatre', category: 'performance', duration: 6, learningMethod: 'Weekly workshop with a beginner group', description: 'Say yes, be present, laugh freely — improv is connection in its purest form.' },
    'My health and physical energy':       { name: 'Hiking Club', category: 'outdoors', duration: 6, learningMethod: 'Bi-weekly group hikes, increasing distance', description: 'Fresh air, beautiful trails, and the company of people who love the outdoors.' },
    'My personal growth and creativity':   { name: 'Photography Walks', category: 'art', duration: 6, learningMethod: 'Weekly solo walks + monthly group critique', description: 'Train your eye to see beauty in ordinary moments.' },
    'My inner calm and sense of purpose':  { name: 'Mindfulness Retreat', category: 'wellness', duration: 9, learningMethod: 'Monthly day retreat + daily 10-min practice', description: 'Step away from the noise and come back to yourself, regularly.' },
  },
}

const DEFAULT_HOBBY: HobbyMatch = {
  name: 'Journaling',
  category: 'writing',
  duration: 6,
  learningMethod: '10 minutes every evening, self-guided',
  description: 'A quiet, private place to think, feel and understand yourself better.',
}

export function suggestHobby(profile: Record<string, string | string[]>): HobbyMatch {
  const experience = profile.preferExperience as string
  const neglected = profile.neglectedArea as string
  return HOBBY_MAP[experience]?.[neglected] ?? DEFAULT_HOBBY
}

// ─── Daily Rituals ────────────────────────────────────────────────────────────

const RITUALS_BY_GOAL: Record<string, string[][]> = {
  'More present with the people I love': [
    ['Reach out with warmth', 'Send a voice note to someone you love — just to say you are thinking of them. Not to catch up. Just to let them feel it.'],
    ['Undivided presence', 'Have one meal today with your phone face down. Just the food, the room, the people — or even just the quiet.'],
    ['Ask and really listen', 'Ask someone how they really are today. Then wait. Give them the space to actually answer.'],
    ['Notice who shows up for you', 'Write down one person who made you feel seen or supported this week. Let yourself feel grateful for them.'],
    ['A moment of contact', 'Call or message someone you have been meaning to reach. It does not need to be long — just warm.'],
    ['Share something small', 'Tell someone one thing that made you smile or feel alive today. Connection lives in the small moments.'],
  ],
  'More energized and physically alive': [
    ['Morning body ritual', 'Before you look at your phone, stretch gently for 10 minutes. Let your body wake up on its own terms.'],
    ['A walk without purpose', 'Step outside for a 20-minute walk and leave your earphones at home. Just move, breathe, notice.'],
    ['Hydrate first', 'Drink a full glass of water before your first coffee or tea today. Your body will thank you quietly.'],
    ['Breathe outside', 'Step outside for 5 minutes. Stand still. Breathe slowly. Feel the air on your skin.'],
    ['Move before noon', 'Do 10 minutes of any movement you enjoy before midday — stretch, dance, walk, whatever feels right.'],
    ['Rest like you mean it', 'Give yourself permission to stop completely for 20 minutes today. No screens. No tasks. Real rest.'],
  ],
  'More creative and mentally stimulated': [
    ['Observe something today', 'Write 3 sentences about something you noticed today — a texture, a face, a feeling. Let yourself be curious.'],
    ['Follow your curiosity', 'Spend 15 minutes on something purely because you find it interesting. No productivity required.'],
    ['Make something small', 'Sketch, doodle, write, or build something tiny with your hands today. It does not need to be good.'],
    ['Read something that excites you', 'Read one page of something that genuinely interests you. Let your mind go somewhere new.'],
    ['Ask a new question', 'Pick one thing you have always wondered about and spend 10 minutes just exploring it. Curiosity is a muscle.'],
    ['Capture an idea', 'Write down one idea that has been floating in your mind. Give it a home on paper before it drifts away.'],
  ],
  'More at peace with where I am right now': [
    ['Begin with breath', 'Take 5 slow, deep breaths before you start your day. Let your body settle before the world asks anything of you.'],
    ['Gratitude for the small things', 'Write down one thing you are grateful for today — something specific and small. A smell, a sound, a moment.'],
    ['Screenless stillness', 'Sit quietly for 5 minutes today without a screen. No podcast, no scroll, no plan. Just you, as you are.'],
    ['Notice beauty', 'Find one beautiful thing today and really stop to take it in. A colour, a sound, a person — whatever finds you.'],
    ['Let one thing go', 'Identify one worry or task you are carrying that can wait. Give yourself permission to set it down until tomorrow.'],
    ['An evening of ease', 'End today gently. Make your space a little quieter than usual and let yourself wind down without effort.'],
  ],
}

const DEFAULT_RITUALS: string[][] = [
  ['A moment just for you', 'Find 10 minutes today that belong only to you. No agenda — just rest, breathe or sit with yourself.'],
  ['One kind act', 'Do one small kind thing today — for yourself or for someone else. Notice how it feels.'],
  ['Slow down once', 'At some point today, deliberately slow down. Walk slower, eat slower, breathe slower. Just once.'],
]

export function getRitual(profile: Record<string, string | string[]>, index: number): { title: string; body: string } {
  const goal = profile.betterLife as string
  const pool = RITUALS_BY_GOAL[goal] ?? DEFAULT_RITUALS
  const [title, body] = pool[index % pool.length]
  return { title, body }
}

// ─── Relationship Invitations (every 14 days) ─────────────────────────────────

const INVITATIONS = [
  { title: 'A hello from nowhere', body: 'Reach out to someone you have not spoken to in a while — not to catch up, just to say hello. Sometimes that is enough.' },
  { title: 'Walk with someone', body: 'Invite someone for a walk this week. No agenda, no destination. Just company and fresh air.' },
  { title: 'Cook for someone', body: 'Make something for someone you care about — a meal, a snack, a cup of tea. Nourishment is love made visible.' },
  { title: 'Write something real', body: 'Write a short note to someone who matters to you. A few honest sentences go further than you think.' },
  { title: 'An evening of presence', body: 'Plan a quiet evening with people you love — no phones, no plans, just the kind of time that feels like home.' },
  { title: 'Call the one you keep meaning to', body: 'You have been meaning to call someone. Today is the day. Just dial.' },
  { title: 'Say it out loud', body: 'Tell someone something you genuinely appreciate about them. Do not overthink it. Just say it plainly and warmly.' },
  { title: 'Show up unexpectedly', body: 'Surprise someone with your presence or attention today — a message, a gesture, a visit. Small shows of care go a long way.' },
]

export function getInvitation(index: number): { title: string; body: string } {
  return INVITATIONS[index % INVITATIONS.length]
}

export type { HobbyMatch }
