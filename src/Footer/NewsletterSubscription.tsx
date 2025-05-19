'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | null }>({
    text: '',
    type: null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage({ text: '', type: null })

    try {
      // Here you would normally call your API to handle the subscription
      // For now we'll just simulate a successful subscription
      await new Promise((resolve) => setTimeout(resolve, 800))

      setEmail('')
      setMessage({
        text: 'Thank you for subscribing!',
        type: 'success',
      })
    } catch (error) {
      console.log('🚀 ~ handleSubmit ~ error:', error)
      setMessage({
        text: 'Something went wrong. Please try again.',
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-6 md:mt-0 w-full p-5 rounded-lg bg-card shadow-sm animate-fade-in">
      <h3 className="font-bold text-lg mb-3">Subscribe to our Newsletter</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Stay updated with our latest news and offers
      </p>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Your email address"
          className="bg-background border-input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />

        <Button
          type="submit"
          className="w-full transition-all hover:shadow-md"
          disabled={isSubmitting}
          variant={isSubmitting ? 'outline' : 'default'}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>

        {message.text && (
          <p
            className={`text-sm mt-2 ${message.type === 'success' ? 'text-success' : 'text-error'}`}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  )
}
