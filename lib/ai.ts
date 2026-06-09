const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL = 'nex-agi/nex-n2-pro:free'

type Profile = Record<string, string | string[]>

async function streamCompletion(prompt: string): Promise<string> {
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok || !res.body) {
    throw new Error(`OpenRouter error: ${res.status}`)
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let full = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = decoder.decode(value, { stream: true })
    for (const line of chunk.split('\n')) {
      const trimmed = line.replace(/^data: /, '').trim()
      if (!trimmed || trimmed === '[DONE]') continue
      try {
        const json = JSON.parse(trimmed)
        const delta = json.choices?.[0]?.delta?.content
        if (delta) full += delta
      } catch {}
    }
  }

  return full.trim()
}

function profileSummary(profile: Profile): string {
  const lines: string[] = []
  if (profile.genderIdentity) lines.push(`Gender: ${profile.genderIdentity}`)
  if (profile.ageCohort) lines.push(`Age: ${profile.ageCohort}`)
  if (profile.occupation) lines.push(`Occupation: ${profile.occupation}`)
  if (profile.maritalStatus) lines.push(`Relationship status: ${profile.maritalStatus}`)
  if (profile.carThoughts) lines.push(`What they think about alone: ${profile.carThoughts}`)
  if (profile.neglectedArea) lines.push(`What feels neglected: ${profile.neglectedArea}`)
  if (profile.preferExperience) lines.push(`Prefers to experience: ${profile.preferExperience}`)
  if (profile.nudgeType) lines.push(`Nudge style: ${profile.nudgeType}`)
  if (profile.betterLife) lines.push(`Life goal: ${profile.betterLife}`)
  return lines.join('\n')
}

export async function generateRitual(profile: Profile): Promise<{ title: string; body: string }> {
  const summary = profileSummary(profile)
  const prompt = `You are a calm, warm well-being companion. Generate a single personalised daily ritual for this person.

Person profile:
${summary}

Rules:
- Title: 3-6 words, poetic and warm
- Body: 2-3 sentences, calm and encouraging tone, deeply personal to this profile
- Tone: calm, happy, comfortable, healthy, prosperous
- Do NOT use motivational clichés or corporate language
- Do NOT mention their job title directly
- Output ONLY valid JSON: {"title": "...", "body": "..."}
- No markdown, no extra text`

  const raw = await streamCompletion(prompt)
  const match = raw.match(/\{[\s\S]*\}/)
  if (!match) return { title: 'A moment just for you', body: 'Find 10 quiet minutes today that belong only to you. No agenda — just rest, breathe and be.' }
  try {
    return JSON.parse(match[0])
  } catch {
    return { title: 'A moment just for you', body: 'Find 10 quiet minutes today that belong only to you. No agenda — just rest, breathe and be.' }
  }
}

export async function generateInvitation(profile: Profile): Promise<{ title: string; body: string }> {
  const summary = profileSummary(profile)
  const prompt = `You are a calm, warm well-being companion. Generate a single personalised relationship invitation for this person. This is sent every 14 days to encourage them to connect with people they love.

Person profile:
${summary}

Rules:
- Title: 3-6 words, warm and poetic
- Body: 2-3 sentences, focused on relationships, warmth and human connection
- Tone: calm, loving, comfortable, present
- Make it feel personal to their life stage and situation
- Do NOT use generic phrases like "reach out" or "connect with others"
- Output ONLY valid JSON: {"title": "...", "body": "..."}
- No markdown, no extra text`

  const raw = await streamCompletion(prompt)
  const match = raw.match(/\{[\s\S]*\}/)
  if (!match) return { title: 'Someone is thinking of you', body: 'Reach out to someone you have been meaning to call. A few warm words go further than you think.' }
  try {
    return JSON.parse(match[0])
  } catch {
    return { title: 'Someone is thinking of you', body: 'Reach out to someone you have been meaning to call. A few warm words go further than you think.' }
  }
}

export async function generateHobbyPlan(profile: Profile, hobbyName: string, duration: number): Promise<string> {
  const summary = profileSummary(profile)
  const prompt = `You are a calm well-being coach. Write a short, personalised learning method description for this person starting the hobby: ${hobbyName} (${duration}-month plan).

Person profile:
${summary}

Rules:
- 1-2 sentences only
- Practical, specific, warm
- Match their learning style (nudge type: ${profile.nudgeType ?? 'gentle'})
- Output ONLY the plain text description, no JSON, no extra text`

  try {
    return await streamCompletion(prompt)
  } catch {
    return `Spend 15 minutes daily on ${hobbyName}, at whatever pace feels natural to you.`
  }
}
