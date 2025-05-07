import { NextResponse } from 'next/server'
import connectDB, { mongoose } from '@/lib/mongodb'
import { ChatMessage } from '@/lib/models/ChatMessage'
import { v4 as uuidv4 } from 'uuid'
import { referenceData } from '@/utilities/questionData'

async function ensureMongoDBConnection() {
  try {
    await connectDB()
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB connection not ready')
    }
    return true
  } catch (error) {
    console.error('MongoDB connection error:', error)
    return false
  }
}

export async function POST(req: Request) {
  try {
    // Ensure MongoDB is connected
    const isConnected = await ensureMongoDBConnection()
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Database connection failed. Please try again.' },
        { status: 503 },
      )
    }

    const { message, conversationId } = await req.json()

    console.log('🚀 ~ POST ~ message:', message)
    // Generate a new conversation ID if not provided
    const newConversationId = conversationId || uuidv4()

    // Save user message
    const userMessage = await new ChatMessage({
      conversationId: newConversationId,
      role: 'user',
      content: message,
    }).save()

    // Prepare context from reference data (limit to last 3 Q&A pairs to reduce context size)
    const context = referenceData
      .slice(-3)
      .map((qa) => `Q: ${qa.question}\nA: ${qa.answer}`)
      .join('\n\n')

    // Call Ollama API with llama3:8b model
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000) // 60 second timeout

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3:8b',
          prompt: `Context:\n${context}\n\nUser: ${message}\nAssistant:`,
          stream: false,
          options: {
            temperature: 0.7,
            top_p: 0.9,
            top_k: 40,
            num_ctx: 2048, // Reduced context window
            num_thread: 4, // Limit threads
            repeat_penalty: 1.1, // Add slight repetition penalty
          },
        }),
        signal: controller.signal,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Ollama API error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()

      if (!data.response) {
        throw new Error('No response from Ollama API')
      }

      const assistantResponse = data.response

      // Save assistant message
      const assistantMessage = await new ChatMessage({
        conversationId: newConversationId,
        role: 'assistant',
        content: assistantResponse,
      }).save()

      return NextResponse.json({
        conversationId: newConversationId,
        messages: [userMessage, assistantMessage],
      })
    } catch (error) {
      console.error('Ollama API Error:', error)

      // Check if it's a timeout error
      const errorMessage =
        error instanceof Error && error.name === 'AbortError'
          ? 'The request took too long to complete. Please try again with a shorter message.'
          : 'I apologize, but I encountered an error while processing your request. Please try again.'

      // Save error message as assistant response
      const errorResponse = await new ChatMessage({
        conversationId: newConversationId,
        role: 'assistant',
        content: errorMessage,
      }).save()

      return NextResponse.json({
        conversationId: newConversationId,
        messages: [userMessage, errorResponse],
      })
    } finally {
      clearTimeout(timeoutId)
    }
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    // Ensure MongoDB is connected
    const isConnected = await ensureMongoDBConnection()
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Database connection failed. Please try again.' },
        { status: 503 },
      )
    }

    const { searchParams } = new URL(req.url)
    const conversationId = searchParams.get('conversationId')

    if (!conversationId) {
      return NextResponse.json({ error: 'Conversation ID is required' }, { status: 400 })
    }

    const messages = await ChatMessage.find({ conversationId }).sort({ timestamp: 1 }).lean().exec()

    return NextResponse.json({ messages })
  } catch (error) {
    console.error('Get Messages API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
