import { getSmartWatchData } from '@/lib/smartwatch'

export type Dimension = 'joy' | 'spirituality' | 'creativity' | 'social' | 'finances' | 'career' | 'education' | 'health'
export type Intervention = 'More energy' | 'Better mood' | 'Better focus' | 'Less stress'
export type NotifKind = 'daily' | 'reminder'

export interface NotifAction {
  id: string
  title: string
  body: string
  dimensions: Dimension[]
  interventions: Intervention[]
}

export interface ActiveNotif {
  id: string
  kind: NotifKind
  title: string
  body: string
  dimension: Dimension
}

interface NotifState {
  dailyId: string
  dailyShownAt: string
  reminderId: string
  reminderShownAt: string
  seenIds: string[]
}

const HOURS_48 = 48 * 60 * 60 * 1000
const HOURS_24 = 24 * 60 * 60 * 1000

export const ACTIONS: NotifAction[] = [
  {
    id: 'a01',
    title: 'Step outside',
    body: 'Ten minutes of fresh air — balcony, yard, or the nearest park. Natural light resets cortisol faster than any supplement.',
    dimensions: ['health', 'joy'],
    interventions: ['Less stress', 'More energy'],
  },
  {
    id: 'a02',
    title: 'Design your next seven days',
    body: 'Map the week before it happens. High performers do not react to the week — they architect it.',
    dimensions: ['career', 'finances'],
    interventions: ['Better focus'],
  },
  {
    id: 'a03',
    title: 'Deliberate time with family',
    body: 'Quality presence, not mere proximity, is what builds the bonds that actually sustain you.',
    dimensions: ['social', 'joy'],
    interventions: ['Better mood'],
  },
  {
    id: 'a04',
    title: 'Stay hydrated today',
    body: 'Keep water within reach and drink consistently. Hydration is the most underrated lever in your performance stack.',
    dimensions: ['health'],
    interventions: ['More energy'],
  },
  {
    id: 'a05',
    title: 'Focused research block',
    body: 'Set aside time today for deep research on your work. Focused hours compound into expertise; expertise compounds into leverage.',
    dimensions: ['career', 'education'],
    interventions: ['Better focus'],
  },
  {
    id: 'a06',
    title: 'Learn a song you love',
    body: 'Music and memory are deeply wired together. Knowing the words turns listening into a fully inhabited experience.',
    dimensions: ['creativity', 'joy'],
    interventions: ['Better mood'],
  },
  {
    id: 'a07',
    title: 'Write three specific gratitudes',
    body: 'Specificity is what makes gratitude neurologically effective. Vague appreciation fades; precise recognition stays.',
    dimensions: ['spirituality', 'joy'],
    interventions: ['Better mood', 'Less stress'],
  },
  {
    id: 'a08',
    title: 'Choose one restorative activity',
    body: 'Rest is not the absence of productivity — it is the foundation of it. Choose one thing tonight that genuinely restores you.',
    dimensions: ['health', 'joy'],
    interventions: ['Less stress'],
  },
  {
    id: 'a09',
    title: 'Plan a day trip',
    body: 'A change of environment shifts perspective more reliably than a change of mindset. Plan where you will go.',
    dimensions: ['joy', 'social'],
    interventions: ['Better mood'],
  },
  {
    id: 'a10',
    title: 'Organize the next ten days',
    body: 'One focused session to clear your calendar of ambiguity. Clarity in schedule creates clarity in mind.',
    dimensions: ['career', 'finances'],
    interventions: ['Better focus'],
  },
  {
    id: 'a11',
    title: 'Make time for your friends',
    body: 'Depth in friendship is one of the strongest predictors of sustained well-being. Shared presence matters.',
    dimensions: ['social', 'joy'],
    interventions: ['Better mood'],
  },
  {
    id: 'a12',
    title: 'Build a mood board',
    body: 'Visual intention-setting engages goal-encoding systems in ways that written lists cannot. Make it concrete.',
    dimensions: ['creativity', 'career'],
    interventions: ['Better focus'],
  },
  {
    id: 'a13',
    title: 'Research a skill that interests you',
    body: 'The intersection of genuine curiosity and practical utility is where meaningful mastery begins.',
    dimensions: ['education', 'career'],
    interventions: ['Better focus'],
  },
  {
    id: 'a14',
    title: 'Watch a film that moves you',
    body: 'Intentional entertainment is not indulgence — it is emotional maintenance. Choose something that leaves you feeling something good.',
    dimensions: ['joy'],
    interventions: ['Better mood'],
  },
  {
    id: 'a15',
    title: 'Write five things you love about yourself',
    body: 'Self-recognition is not vanity — it is the psychological counterweight to imposter syndrome.',
    dimensions: ['spirituality', 'joy'],
    interventions: ['Better mood', 'Less stress'],
  },
  {
    id: 'a16',
    title: 'Attend or schedule therapy',
    body: 'Speaking with a professional is the clearest signal of self-respect, not weakness. Keep or book the session.',
    dimensions: ['spirituality', 'health'],
    interventions: ['Less stress'],
  },
  {
    id: 'a17',
    title: 'Digital detox — full day',
    body: 'A day without screens is not about missing out. It is about recovering the attention you have been lending out in fragments.',
    dimensions: ['health', 'spirituality'],
    interventions: ['Less stress', 'Better focus'],
  },
  {
    id: 'a18',
    title: '20-minute walk with music',
    body: 'Twenty minutes of walking with music you love is a simple act that genuinely lifts the spirit. Give yourself that today.',
    dimensions: ['health', 'joy'],
    interventions: ['More energy', 'Better mood'],
  },
  {
    id: 'a19',
    title: 'Plan the coming week — in one sitting',
    body: 'A week planned on paper takes twenty minutes. A week left unplanned costs you far more.',
    dimensions: ['career', 'finances'],
    interventions: ['Better focus'],
  },
  {
    id: 'a20',
    title: 'Acknowledge someone who supports you',
    body: 'Gratitude expressed outward strengthens the relationship and the one expressing it in equal measure. Tell them directly.',
    dimensions: ['social', 'spirituality'],
    interventions: ['Better mood'],
  },
  {
    id: 'a21',
    title: 'Take a full day to rest',
    body: 'Give yourself permission to simply rest today — not as a reward, but as a necessity. A day of genuine restoration is one of the most productive things you can do.',
    dimensions: ['health', 'spirituality'],
    interventions: ['Less stress'],
  },
  {
    id: 'a22',
    title: 'Handwriting exercise — 20 minutes',
    body: 'Write by hand on a topic you love. Handwriting slows thought to the pace where genuine insight becomes accessible.',
    dimensions: ['creativity', 'spirituality'],
    interventions: ['Better focus', 'Less stress'],
  },
  {
    id: 'a23',
    title: '15-minute full-body stretch',
    body: 'Releasing physical tension is releasing held stress. The body stores what the mind has not yet processed.',
    dimensions: ['health'],
    interventions: ['Less stress', 'More energy'],
  },
  {
    id: 'a24',
    title: 'Watch one educational video',
    body: 'Cross-domain learning is how the most original thinkers build their edge. Step outside your usual field today.',
    dimensions: ['education'],
    interventions: ['Better focus'],
  },
  {
    id: 'a25',
    title: 'Build an energizing playlist',
    body: 'Your sonic environment shapes your psychological state more than most people acknowledge. Curate it with intention.',
    dimensions: ['creativity', 'joy'],
    interventions: ['More energy', 'Better mood'],
  },
  {
    id: 'a26',
    title: 'Review your week — plan one meaningful activity',
    body: 'Reflection without planning is nostalgia. Planning without reflection is just busyness. Do both, briefly.',
    dimensions: ['spirituality', 'career'],
    interventions: ['Better focus'],
  },
  {
    id: 'a27',
    title: 'Schedule a check-in with yourself',
    body: 'The most important recurring meeting in your calendar is the one with yourself. Keep it.',
    dimensions: ['spirituality'],
    interventions: ['Less stress', 'Better focus'],
  },
  {
    id: 'a28',
    title: 'Explore your neighborhood on foot',
    body: 'Familiar environments contain more than we register. A slow, attentive walk reveals what habit has made invisible.',
    dimensions: ['health', 'joy'],
    interventions: ['Less stress'],
  },
  {
    id: 'a29',
    title: 'Protect a block of time for yourself',
    body: 'Me-time is not selfishness — it is the maintenance of the person everyone else depends on.',
    dimensions: ['spirituality', 'health'],
    interventions: ['Less stress'],
  },
  {
    id: 'a30',
    title: 'Organize a small gathering',
    body: 'Human connection does not require grand gestures. A shared hour — in person or online — is sufficient.',
    dimensions: ['social', 'joy'],
    interventions: ['Better mood'],
  },
  {
    id: 'a31',
    title: 'Return to a hobby you have neglected',
    body: 'Creative engagement outside your profession rebuilds the energy that your profession consumes.',
    dimensions: ['creativity', 'joy'],
    interventions: ['Better mood', 'More energy'],
  },
  {
    id: 'a32',
    title: '10 minutes of undirected mindfulness',
    body: 'Mindfulness is not relaxation — it is attention training. The calm is a side effect, not the goal.',
    dimensions: ['spirituality'],
    interventions: ['Less stress'],
  },
  {
    id: 'a33',
    title: 'Reflect on one current challenge',
    body: 'Write your honest assessment and one concrete plan. Clarity about difficulty is the first step toward dissolving it.',
    dimensions: ['spirituality', 'career'],
    interventions: ['Better focus', 'Less stress'],
  },
  {
    id: 'a34',
    title: 'Dance to music you love',
    body: 'Unstructured physical movement is one of the most direct routes to emotional release. No audience required.',
    dimensions: ['joy', 'health'],
    interventions: ['Better mood', 'More energy'],
  },
  {
    id: 'a35',
    title: 'Spend time with children today',
    body: 'Children are unrestricted thinkers. Their company recalibrates your sense of what actually matters.',
    dimensions: ['social', 'joy'],
    interventions: ['Better mood'],
  },
  {
    id: 'a36',
    title: 'Write what creativity means to you',
    body: 'Defining your personal relationship to creativity is how you stop waiting for permission to be creative.',
    dimensions: ['creativity', 'spirituality'],
    interventions: ['Better focus'],
  },
  {
    id: 'a37',
    title: 'Spend time in nature — without agenda',
    body: 'Nature exposure measurably reduces cortisol. It is therapy with no waiting list and no appointment required.',
    dimensions: ['health', 'spirituality'],
    interventions: ['Less stress', 'More energy'],
  },
  {
    id: 'a38',
    title: 'Visit a place that holds meaning for you',
    body: 'Returning to meaningful spaces reconnects you with the version of yourself that matters most.',
    dimensions: ['spirituality', 'joy'],
    interventions: ['Better mood'],
  },
  {
    id: 'a39',
    title: 'Build a vision board for where you are headed',
    body: 'Visual representation of goals activates more persistent motivational circuits than written lists alone.',
    dimensions: ['creativity', 'career'],
    interventions: ['Better focus'],
  },
  {
    id: 'a40',
    title: 'Reach out to a friend — no occasion needed',
    body: 'Maintaining relationships requires contact, not occasion. Send the message.',
    dimensions: ['social', 'joy'],
    interventions: ['Better mood'],
  },
  {
    id: 'a41',
    title: 'Non-dominant handwriting — 30 minutes',
    body: 'Writing with your non-dominant hand bypasses habitual thought patterns and opens access to deeper reflection.',
    dimensions: ['creativity', 'spirituality'],
    interventions: ['Better focus', 'Less stress'],
  },
  {
    id: 'a42',
    title: 'Light yoga — 15 minutes',
    body: "Yoga's core value is not flexibility — it is the practice of listening to your own body with full attention.",
    dimensions: ['health', 'spirituality'],
    interventions: ['Less stress', 'More energy'],
  },
  {
    id: 'a43',
    title: 'Write about your career aspirations',
    body: 'Writing about where you want to go — even briefly — brings clarity that thinking alone rarely does. Your aspirations deserve to be put into words.',
    dimensions: ['career'],
    interventions: ['Better focus'],
  },
  {
    id: 'a44',
    title: 'Explore new music today',
    body: 'Musical novelty activates dopamine systems that routine listening has long since stopped triggering.',
    dimensions: ['creativity', 'education'],
    interventions: ['Better mood'],
  },
  {
    id: 'a45',
    title: 'Walk — no destination required',
    body: 'An unstructured walk is one of the few genuinely unproductive activities that still improves performance.',
    dimensions: ['health', 'joy'],
    interventions: ['Less stress', 'More energy'],
  },
  {
    id: 'a46',
    title: 'Mood board about where you are now',
    body: 'Documenting the present with intention creates the contrast that makes future growth visible and meaningful.',
    dimensions: ['creativity', 'spirituality'],
    interventions: ['Better focus'],
  },
  {
    id: 'a47',
    title: 'Watch something that makes you laugh',
    body: 'Laughter is not frivolous — it is a physiological reset with measurable psychological benefit. Give yourself that.',
    dimensions: ['joy'],
    interventions: ['Better mood', 'Less stress'],
  },
  {
    id: 'a48',
    title: 'Cook a meal with full attention',
    body: 'Cooking with intention is a meditative act. The meal is the reward; the process is the practice.',
    dimensions: ['joy', 'health'],
    interventions: ['Less stress', 'Better mood'],
  },
  {
    id: 'a49',
    title: 'Schedule a coffee with someone who matters',
    body: 'Deep conversations require time set aside for them — they rarely happen by accident. Book it.',
    dimensions: ['social', 'career'],
    interventions: ['Better mood'],
  },
  {
    id: 'a50',
    title: 'Design a personal relaxation session',
    body: 'Relaxation planned in advance is more effective than relaxation when you finally collapse. Schedule it first.',
    dimensions: ['health', 'spirituality'],
    interventions: ['Less stress'],
  },
  {
    id: 'a51',
    title: 'One mindful meal — no screens',
    body: 'Eating with full attention improves both digestion and your relationship with nourishment. Try it at one meal today.',
    dimensions: ['health', 'spirituality'],
    interventions: ['Less stress'],
  },
  {
    id: 'a52',
    title: 'Mood board for your future',
    body: 'The future you are building needs a visual anchor. Your brain responds to images before it responds to words.',
    dimensions: ['creativity', 'career'],
    interventions: ['Better focus'],
  },
  {
    id: 'a53',
    title: 'Introduce yourself to someone new',
    body: 'Every meaningful connection in your life began with a single interaction. Start one today.',
    dimensions: ['social'],
    interventions: ['Better mood'],
  },
  {
    id: 'a54',
    title: 'Learn one skill today',
    body: 'Learning something new — even one small thing — is a quiet act of care for your future self. Today is a good day to begin.',
    dimensions: ['education', 'career'],
    interventions: ['Better focus'],
  },
  {
    id: 'a55',
    title: 'Attend a live performance',
    body: 'Live music creates shared presence that no recording replicates. It is worth protecting in your calendar.',
    dimensions: ['joy', 'social'],
    interventions: ['Better mood'],
  },
  {
    id: 'a56',
    title: 'Acknowledge your small wins this month',
    body: 'What gets recognized gets repeated. Celebrate the granular, not just the grand. Name three specific wins.',
    dimensions: ['spirituality', 'career'],
    interventions: ['Better mood', 'Better focus'],
  },
  {
    id: 'a57',
    title: 'Attend a mental health workshop',
    body: 'Investing in your psychological infrastructure is the same discipline as investing in your physical health.',
    dimensions: ['spirituality', 'education'],
    interventions: ['Less stress'],
  },
  {
    id: 'a58',
    title: 'One hour without screens',
    body: 'The most restorative hour of your week may be the one you spend fully present — without a device in hand.',
    dimensions: ['health', 'spirituality'],
    interventions: ['Less stress'],
  },
  {
    id: 'a59',
    title: 'Call the people who matter',
    body: 'Some connections require deliberate maintenance. Make the call before the moment becomes an occasion you missed.',
    dimensions: ['social', 'joy'],
    interventions: ['Better mood'],
  },
  {
    id: 'a60',
    title: 'Begin something of your own',
    body: 'The right time is never perfect. The best time is when the idea will not leave you alone — which may be now.',
    dimensions: ['career', 'creativity'],
    interventions: ['Better focus'],
  },
  {
    id: 'a61',
    title: 'Reflect on your most important relationships',
    body: 'Depth in relationships is built in ordinary moments, not extraordinary ones. Reflect on where you want to invest.',
    dimensions: ['social', 'spirituality'],
    interventions: ['Better mood'],
  },
  {
    id: 'a62',
    title: 'Research a certification that excites you',
    body: 'Structured learning gives ambition direction. Find one course, webinar, or masterclass worth your time.',
    dimensions: ['education', 'career'],
    interventions: ['Better focus'],
  },
  {
    id: 'a63',
    title: 'Listen to a full album — beginning to end',
    body: 'Albums are designed as complete experiences. Listening without skipping is a different act than listening in fragments.',
    dimensions: ['creativity', 'joy'],
    interventions: ['Better mood', 'Less stress'],
  },
  {
    id: 'a64',
    title: 'Write how art has shaped your life',
    body: "Tracing art's influence on your life reveals what you actually value — not what you believe you value.",
    dimensions: ['creativity', 'spirituality'],
    interventions: ['Better focus'],
  },
  {
    id: 'a65',
    title: 'Create calm in your environment',
    body: 'Your environment shapes your psychological state. Candles, soft music, order — this is design, not decoration.',
    dimensions: ['health', 'spirituality'],
    interventions: ['Less stress'],
  },
  {
    id: 'a66',
    title: 'Open your planner and map the week',
    body: 'Twenty minutes of planning before the week begins saves hours of friction inside it.',
    dimensions: ['career', 'finances'],
    interventions: ['Better focus'],
  },
  {
    id: 'a67',
    title: 'Genuine time with your colleagues',
    body: 'Professional relationships are nourished through real exchange, not only collaboration under pressure.',
    dimensions: ['social', 'career'],
    interventions: ['Better mood'],
  },
  {
    id: 'a68',
    title: 'Try a new food today',
    body: 'Novelty in small things — textures, flavors, combinations — keeps sensory aliveness from fading into routine.',
    dimensions: ['joy'],
    interventions: ['Better mood'],
  },
  {
    id: 'a69',
    title: 'Plan a physical activity with a friend',
    body: 'Combining movement with connection doubles the well-being return on your time. Plan it and commit.',
    dimensions: ['health', 'social'],
    interventions: ['More energy', 'Better mood'],
  },
  {
    id: 'a70',
    title: 'Plan a purposeful trip',
    body: 'The most productive travel also restores. Plan for both outcomes — not just the work.',
    dimensions: ['career', 'joy'],
    interventions: ['Better focus'],
  },
  {
    id: 'a71',
    title: 'Explore music from another culture',
    body: 'Musical traditions encode emotional intelligence that no other medium transmits as efficiently. Listen widely.',
    dimensions: ['education', 'creativity'],
    interventions: ['Better mood'],
  },
  {
    id: 'a72',
    title: '15 minutes of unstructured journaling',
    body: 'Write with no agenda. What lands on the page stops occupying your mind — that is the whole mechanism.',
    dimensions: ['spirituality'],
    interventions: ['Less stress', 'Better focus'],
  },
  {
    id: 'a73',
    title: 'Plan a morning with people you love',
    body: 'A shared breakfast sets an entirely different tone for the day. Make it happen this week.',
    dimensions: ['social', 'joy'],
    interventions: ['Better mood'],
  },
  {
    id: 'a74',
    title: 'Learn foundational breathing techniques',
    body: 'Breathing is the fastest lever you have over your autonomic nervous system. Three techniques is enough to start.',
    dimensions: ['spirituality', 'health'],
    interventions: ['Less stress'],
  },
  {
    id: 'a75',
    title: 'Read about the history of a genre you love',
    body: 'Understanding the origins of what moves you deepens every future listening experience permanently.',
    dimensions: ['education', 'creativity'],
    interventions: ['Better mood'],
  },
  {
    id: 'a76',
    title: 'Take an attentive walk',
    body: 'Pay deliberate attention to what you usually ignore. Attentive walking is a form of mindfulness that requires nothing.',
    dimensions: ['health', 'spirituality'],
    interventions: ['Less stress', 'More energy'],
  },
  {
    id: 'a77',
    title: 'Look at old photographs',
    body: 'Positive memory retrieval is not nostalgia — it is a legitimate tool for emotional regulation. Let yourself remember.',
    dimensions: ['joy', 'spirituality'],
    interventions: ['Better mood'],
  },
  {
    id: 'a78',
    title: 'Protect tonight\'s sleep',
    body: 'A good night of sleep is one of the most caring things you can give yourself. Seven to eight hours tonight will restore more than you realise.',
    dimensions: ['health'],
    interventions: ['More energy', 'Less stress'],
  },
  {
    id: 'a79',
    title: 'Write one sentence of intention for this month',
    body: 'A single clear sentence cuts through complexity better than any goal-setting framework. Write it now.',
    dimensions: ['spirituality', 'career'],
    interventions: ['Better focus'],
  },
  {
    id: 'a80',
    title: 'Spend 15 minutes in silence',
    body: 'Silence is not emptiness — it is the condition in which the most important thoughts finally surface.',
    dimensions: ['spirituality', 'health'],
    interventions: ['Less stress', 'Better focus'],
  },
]

function scoreAction(
  action: NotifAction,
  profile: Record<string, string | string[]>,
  seenIds: string[],
  watch?: { heartRate: number; stressLevel: string; sleepHours: number; steps: number }
): number {
  if (seenIds.includes(action.id)) return -1
  let score = 0

  // Profile: target intervention
  const intervention = profile.targetIntervention as string | undefined
  if (intervention && action.interventions.includes(intervention as Intervention)) score += 3

  // Profile: primary motivators
  const motivators = profile.primaryMotivators
  if (motivators) {
    const mArr = Array.isArray(motivators) ? motivators : [motivators]
    if (mArr.some(m => m.toLowerCase().includes('career') || m.toLowerCase().includes('work')) && action.dimensions.includes('career')) score += 2
    if (mArr.some(m => m.toLowerCase().includes('health') || m.toLowerCase().includes('fit')) && action.dimensions.includes('health')) score += 2
    if (mArr.some(m => m.toLowerCase().includes('social') || m.toLowerCase().includes('connect')) && action.dimensions.includes('social')) score += 2
    if (mArr.some(m => m.toLowerCase().includes('creat')) && action.dimensions.includes('creativity')) score += 2
  }

  // Profile: fatigue state
  const fatigue = profile.fatigueState as string | undefined
  if (fatigue && (fatigue.toLowerCase().includes('exhaust') || fatigue.toLowerCase().includes('drain'))) {
    if (action.dimensions.includes('health') || action.dimensions.includes('spirituality')) score += 1
  }

  // Profile: micro desire
  const microDesire = profile.microDesire as string | undefined
  if (microDesire) {
    if (microDesire.toLowerCase().includes('relax') && (action.dimensions.includes('health') || action.dimensions.includes('spirituality'))) score += 1
    if (microDesire.toLowerCase().includes('connect') && action.dimensions.includes('social')) score += 1
    if (microDesire.toLowerCase().includes('creat') && action.dimensions.includes('creativity')) score += 1
    if (microDesire.toLowerCase().includes('learn') && (action.dimensions.includes('education') || action.dimensions.includes('career'))) score += 1
  }

  // Smartwatch signals
  if (watch) {
    // High stress → prioritise calming (spirituality, health)
    if ((watch.stressLevel === 'High' || watch.stressLevel === 'Medium') &&
      (action.dimensions.includes('spirituality') || action.dimensions.includes('health'))) score += 2
    // Elevated heart rate (>85) → rest/calm activities
    if (watch.heartRate > 85 &&
      (action.dimensions.includes('spirituality') || action.dimensions.includes('health'))) score += 2
    // Low sleep (<7h) → sleep-supportive or restorative activities
    if (watch.sleepHours < 7 &&
      (action.interventions.includes('Less stress') || action.dimensions.includes('health'))) score += 2
    // Very low steps (<4000) → movement activities
    if (watch.steps < 4000 &&
      (action.dimensions.includes('health') && action.interventions.includes('More energy'))) score += 2
    // Good metrics → mood/creativity/social boost
    if (watch.stressLevel === 'Low' && watch.sleepHours >= 7 && watch.steps >= 6000 &&
      (action.dimensions.includes('joy') || action.dimensions.includes('creativity') || action.dimensions.includes('social'))) score += 1
  }

  score += Math.random() * 0.5
  return score
}

function pickAction(
  pool: NotifAction[],
  profile: Record<string, string | string[]>,
  seenIds: string[],
  watch?: { heartRate: number; stressLevel: string; sleepHours: number; steps: number },
  excludeId?: string
): NotifAction {
  const candidates = pool
    .filter(a => a.id !== excludeId)
    .map(a => ({ action: a, score: scoreAction(a, profile, seenIds, watch) }))
    .filter(c => c.score >= 0)
    .sort((a, b) => b.score - a.score)
  return candidates[0]?.action ?? pool[Math.floor(Math.random() * pool.length)]
}

export function getActiveNotifications(
  profile: Record<string, string | string[]>
): ActiveNotif[] {
  let state: NotifState = { dailyId: '', dailyShownAt: '', reminderId: '', reminderShownAt: '', seenIds: [] }
  try {
    const raw = localStorage.getItem('unicorn_notif_state')
    if (raw) state = JSON.parse(raw)
  } catch {}

  const now = Date.now()
  const seenIds = state.seenIds ?? []
  const watch = getSmartWatchData()

  const dailyExpired = !state.dailyShownAt || now - new Date(state.dailyShownAt).getTime() > HOURS_48
  const reminderExpired = !state.reminderShownAt || now - new Date(state.reminderShownAt).getTime() > HOURS_24

  let dailyAction: NotifAction
  let reminderAction: NotifAction

  if (dailyExpired || !state.dailyId) {
    dailyAction = pickAction(ACTIONS, profile, seenIds, watch)
    state.dailyId = dailyAction.id
    state.dailyShownAt = new Date().toISOString()
    if (!seenIds.includes(dailyAction.id)) {
      seenIds.push(dailyAction.id)
      if (seenIds.length > 60) seenIds.splice(0, 20)
    }
    state.seenIds = seenIds
  } else {
    dailyAction = ACTIONS.find(a => a.id === state.dailyId) ?? ACTIONS[0]
  }

  if (reminderExpired || !state.reminderId) {
    reminderAction = pickAction(ACTIONS, profile, seenIds, watch, dailyAction.id)
    state.reminderId = reminderAction.id
    state.reminderShownAt = new Date().toISOString()
    if (!seenIds.includes(reminderAction.id)) {
      seenIds.push(reminderAction.id)
      if (seenIds.length > 60) seenIds.splice(0, 20)
    }
    state.seenIds = seenIds
  } else {
    reminderAction = ACTIONS.find(a => a.id === state.reminderId) ?? ACTIONS[1]
  }

  try { localStorage.setItem('unicorn_notif_state', JSON.stringify(state)) } catch {}

  return [
    { id: dailyAction.id, kind: 'daily', title: dailyAction.title, body: dailyAction.body, dimension: dailyAction.dimensions[0] },
    { id: reminderAction.id, kind: 'reminder', title: reminderAction.title, body: reminderAction.body, dimension: reminderAction.dimensions[0] },
  ]
}
