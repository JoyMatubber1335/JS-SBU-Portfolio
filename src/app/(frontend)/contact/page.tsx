import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContactForm } from './ContactForm'
import { payload } from '@/utilities/payload'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with our team',
}

// Add types for the business hours
interface BusinessHour {
  day: string
  isOpen: boolean
  openTime?: string
  closeTime?: string
}

async function getContactData() {
  try {
    const contact = await payload.find({
      collection: 'contact',
      limit: 1,
    })

    if (contact.docs && contact.docs.length > 0) {
      return contact.docs[0]
    }

    return null
  } catch (error) {
    console.error('Error fetching contact data:', error)
    return null
  }
}

export default async function ContactPage() {
  const contact = await getContactData()

  if (!contact) {
    // If no contact information is set up, show a simple message
    return (
      <div className="container mx-auto py-4 px-4 bg-white">
        <h1 className="text-3xl font-bold mb-6 text-black">Contact Us</h1>
        <p className="text-black">Contact information is not available at this time. Please check back later.</p>
      </div>
    )
  }

  // Get latitude and longitude with fallback values for Dhaka
  const latitude = contact.location?.latitude || 23.8103
  const longitude = contact.location?.longitude || 90.4125
  const zoom = contact.location?.zoom || 14

  return (
    <div className="container mx-auto py-4 px-4 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-black">{contact.title || 'Contact Us'}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-3 text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-black">Email</p>
                  <p className="font-medium text-black">{contact.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-3 text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-black">Phone</p>
                  <p className="font-medium text-black">{contact.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-3 text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-black">Address</p>
                  <p className="font-medium whitespace-pre-line text-black">{contact.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          {contact.businessHours && contact.businessHours.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-black">Business Hours</h2>
              <ul className="space-y-2">
                {contact.businessHours.map((hours: BusinessHour, index: number) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="capitalize text-black">{hours.day}</span>
                    <span className="text-black">
                      {hours.isOpen 
                        ? `${hours.openTime} - ${hours.closeTime}` 
                        : 'Closed'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Media Links */}
          {contact.socialLinks && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-black">Connect With Us</h2>
              <div className="flex space-x-4">
                {contact.socialLinks.facebook && (
                  <a href={contact.socialLinks.facebook} target="_blank" rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </a>
                )}
                
                {contact.socialLinks.twitter && (
                  <a href={contact.socialLinks.twitter} target="_blank" rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                )}
                
                {contact.socialLinks.instagram && (
                  <a href={contact.socialLinks.instagram} target="_blank" rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
                
                {contact.socialLinks.linkedin && (
                  <a href={contact.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Contact Form */}
        <div>
          {contact.contactFormSettings?.enableContactForm ? (
            <ContactForm 
              successMessage={contact.contactFormSettings.formSuccessMessage} 
              emailRecipient={contact.contactFormSettings.emailRecipient}
            />
          ) : (
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold mb-3 text-black">Message Us</h2>
              <p className="text-black">Our contact form is currently disabled. Please email us directly at {contact.email}.</p>
            </div>
          )}
        </div>
      </div>

      {/* Map - Using OpenStreetMap which is free and doesn't require an API key */}
      <div className="mt-12">
        
        <div className="h-[400px] rounded-lg overflow-hidden border border-gray-200 bg-white">
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            title="Map" 
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01}%2C${latitude-0.01}%2C${longitude+0.01}%2C${latitude+0.01}&layer=mapnik&marker=${latitude}%2C${longitude}`} 
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className="mt-2 text-sm text-black">
          <a 
            href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=${zoom}/marker/${latitude}/${longitude}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black hover:underline"
          >
            View larger map
          </a>
        </div>
      </div>
    </div>
  )
} 