import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { referenceData, responsePatterns } from '@/utilities/questionData'

function findBestMatch(message: string): { question: string; answer: string } | null {
  const lowerMessage = message.toLowerCase()

  // First, try exact matches
  const exactMatch = referenceData.find((qa) => lowerMessage === qa.question.toLowerCase())
  if (exactMatch) return exactMatch

  // Then, try partial matches
  const partialMatches = referenceData.filter(
    (qa) =>
      lowerMessage.includes(qa.question.toLowerCase()) ||
      qa.question.toLowerCase().includes(lowerMessage),
  )

  if (partialMatches.length > 0) {
    // Find the best match by comparing word overlap
    const bestMatch = partialMatches.reduce((best, current) => {
      const bestWords = best.question.toLowerCase().split(' ')
      const currentWords = current.question.toLowerCase().split(' ')
      const messageWords = lowerMessage.split(' ')

      const bestOverlap = bestWords.filter((word) => messageWords.includes(word)).length
      const currentOverlap = currentWords.filter((word) => messageWords.includes(word)).length

      return currentOverlap > bestOverlap ? current : best
    })

    return bestMatch
  }

  return null
}

function getResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  // Check for matching patterns
  for (const [category, data] of Object.entries(responsePatterns)) {
    if (category === 'default') continue

    if (data.patterns && data.responses.length > 0) {
      const hasMatch = data.patterns.some((pattern: string) => lowerMessage.includes(pattern))
      if (hasMatch) {
        const response = data.responses[Math.floor(Math.random() * data.responses.length)]
        if (response) {
          return response
        }
      }
    }
  }

  // Try to find the best matching question from reference data
  const bestMatch = findBestMatch(message)
  if (bestMatch) {
    return bestMatch.answer
  }

  // Return default response if no matches
  const defaultPattern = responsePatterns.default
  if (!defaultPattern?.responses?.length) {
    return "I'm not sure about that specific aspect of JS SBU. Could you try asking about our services, technologies, or team structure?"
  }

  const defaultResponse =
    defaultPattern.responses[Math.floor(Math.random() * defaultPattern.responses.length)]
  return (
    defaultResponse ||
    "I'm not sure about that specific aspect of JS SBU. Could you try asking about our services, technologies, or team structure?"
  )
}

export async function POST(req: Request) {
  try {
    const { message, conversationId } = await req.json()

    // Generate a new conversation ID if not provided
    const newConversationId = conversationId || uuidv4()

    // Get response from our enhanced chat system
    const assistantResponse = getResponse(message)

    return NextResponse.json({
      conversationId: newConversationId,
      message: { role: 'assistant', content: assistantResponse },
    })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const conversationId = searchParams.get('conversationId')

    if (!conversationId) {
      return NextResponse.json({ error: 'Conversation ID is required' }, { status: 400 })
    }

    // Since we're not using MongoDB, we'll return an empty array
    // In a real application, you might want to implement a different storage solution
    return NextResponse.json({ messages: [] })
  } catch (error) {
    console.error('Get Messages API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
