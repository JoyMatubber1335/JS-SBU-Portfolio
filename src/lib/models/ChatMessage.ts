import mongoose, { Document, Model } from 'mongoose'

// Define the interface for the document
interface IChatMessage extends Document {
  conversationId: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const chatMessageSchema = new mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
    index: true,
  },
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

// Export the model with proper typing
export const ChatMessage =
  (mongoose.models.ChatMessage as Model<IChatMessage>) ||
  mongoose.model<IChatMessage>('ChatMessage', chatMessageSchema)
