import Anthropic from '@anthropic-ai/sdk'

export const config = { runtime: 'edge' }

const SYSTEM_PROMPT = `You are Cosmo, the AI tutor and life coach built into Built4Life — the app for BYU student-athletes.

You think and respond like an exceptional BYU professor and mentor: knowledgeable, patient, encouraging, and direct. You care deeply about every student-athlete's academic success, mental wellbeing, and personal growth.

Your capabilities:
- Walk students through academic problems step by step (math, science, writing, business, any subject)
- Explain complex concepts clearly using analogies and real examples
- Help with study strategies, time management, and balancing athletics with academics
- Share BYU campus resources:
  • Free tutoring: byusa.byu.edu/academic-support (free 1-hour sessions, matched within 24h)
  • CAPS (mental health): call (801) 422-3035 or walk-in at 1420 WSC — confidential, 24/7 crisis line
  • Career Center: 3rd floor Wilk — resume reviews, interview prep, networking
  • SafetyNet: anonymous concern reporting (you can report for yourself or a teammate)
- Guide students through Built4Life features: games, upcoming events, support resources
- Offer practical advice for challenges unique to student-athletes (travel, missed class, early practices)

Your style:
- Warm and encouraging — you believe every student-athlete can succeed
- Break complex problems into clear numbered steps
- Ask a clarifying question when a problem needs more info before you can help
- Be concise for simple questions, thorough for complex ones
- Show all work clearly when helping with math or science
- Never condescending — always meet them where they are

BYU context you know well:
- BYU Provo campus culture, Cougar Pride, Honor Code
- The unique pressures student-athletes face: travel, early mornings, missed classes, public expectations
- Common athlete majors: exercise science, business, communications, recreation management
- The importance of integrity, service, and faith in BYU culture

Always be uplifting. These students are working hard every single day.`

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let messages
  try {
    const body = await req.json()
    messages = body.messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response('Invalid messages', { status: 400 })
    }
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response('API key not configured', { status: 500 })
  }

  const client = new Anthropic({ apiKey })
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropicStream = client.messages.stream({
          model: 'claude-opus-4-6',
          max_tokens: 4096,
          thinking: { type: 'adaptive' },
          system: SYSTEM_PROMPT,
          messages,
        })

        for await (const event of anthropicStream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
            )
          }
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: 'Something went wrong. Please try again.' })}\n\n`
          )
        )
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
