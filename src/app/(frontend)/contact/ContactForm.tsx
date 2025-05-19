'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface ContactFormProps {
  successMessage?: string
  emailRecipient?: string
}

export function ContactForm({ successMessage = 'Thank you for your message. We will get back to you soon!', emailRecipient }: ContactFormProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Here you would typically send the form data to an API route
      // For now, we'll just simulate a successful submission
      
   
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Clear form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
      
      setIsSubmitted(true)
    } catch (err) {
      console.error('Error submitting form:', err)
      setError('There was an error submitting your message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-black font-medium text-lg mb-2">Message Sent!</h3>
        <p className="text-black">{successMessage}</p>
        <Button 
          variant="outline" 
          className="mt-4 text-black border-gray-200 hover:bg-gray-50"
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-3 text-black">Send Us a Message</h2>
      <p className="text-black mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>
      
      {error && (
        <div className="bg-white p-4 rounded-md mb-6 border border-gray-200">
          <p className="text-black">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-black">Your Name</Label>
          <Input
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="mt-1 text-black bg-white border-gray-200"
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="text-black">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="mt-1 text-black bg-white border-gray-200"
          />
        </div>
        
        <div>
          <Label htmlFor="subject" className="text-black">Subject</Label>
          <Input
            id="subject"
            name="subject"
            value={formState.subject}
            onChange={handleChange}
            required
            placeholder="How can we help you?"
            className="mt-1 text-black bg-white border-gray-200"
          />
        </div>
        
        <div>
          <Label htmlFor="message" className="text-black">Message</Label>
          <Textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            required
            placeholder="Your message here..."
            className="mt-1 min-h-[120px] text-black bg-white border-gray-200"
          />
        </div>
        
        <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  )
} 