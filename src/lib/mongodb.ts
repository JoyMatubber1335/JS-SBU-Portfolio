import mongoose from 'mongoose'

// Use the same connection string as Payload CMS
const MONGODB_URI = process.env.DATABASE_URI

if (!MONGODB_URI) {
  throw new Error('Please define the DATABASE_URI environment variable inside .env')
}

// Define the type for the cached connection
interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// Check if we already have a connection
const cached = (global as any).mongoose || { conn: null, promise: null }

// Maximum number of connection retries
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      if (!cached.promise) {
        const opts = {
          bufferCommands: false,
          serverSelectionTimeoutMS: 5000, // 5 seconds timeout for server selection
          socketTimeoutMS: 45000, // 45 seconds timeout for operations
        }

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
          return mongoose
        })
      }

      cached.conn = await cached.promise

      // Ensure the connection is ready
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connection.asPromise()
      }

      // Test the connection
      if (mongoose.connection.db) {
        await mongoose.connection.db.admin().ping()
      } else {
        throw new Error('MongoDB connection not properly initialized')
      }

      return cached.conn
    } catch (e) {
      console.error(`MongoDB connection attempt ${retries + 1} failed:`, e)
      cached.promise = null
      retries++

      if (retries < MAX_RETRIES) {
        await wait(RETRY_DELAY * retries) // Exponential backoff
      } else {
        throw new Error(`Failed to connect to MongoDB after ${MAX_RETRIES} attempts`)
      }
    }
  }

  throw new Error('Failed to connect to MongoDB')
}

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully')
})

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected')
  cached.conn = null
  cached.promise = null
})

// Export both the function and the connection state
export { mongoose }
export default connectDB
