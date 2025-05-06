'use client'

import React, { useRef, useEffect, useState } from 'react'
import './Services.css'

export default function Services({ tabs }) {
  const panelRefs = useRef([])
  const [activeTab, setActiveTab] = useState(0)

  // Scroll to panel on tab click, with offset for sticky tab bar
  const STICKY_TAB_HEIGHT = 64
  const handleTabClick = (idx) => {
    setActiveTab(idx)
    const ref = panelRefs.current[idx]
    if (ref) {
      const rect = ref.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const top = rect.top + scrollTop - STICKY_TAB_HEIGHT - 8
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  // Update active tab on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offsets = panelRefs.current.map((ref) => {
        if (!ref) return Infinity
        const rect = ref.getBoundingClientRect()
        return Math.abs(rect.top - STICKY_TAB_HEIGHT - 8)
      })
      const minIdx = offsets.indexOf(Math.min(...offsets))
      setActiveTab(minIdx)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Placeholder icon (can be replaced with your icon system)
  const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#b388ff" />

      <g transform="translate(2, 0)">
        <path
          d="M7 12h8m0 0l-3-3m3 3l-3 3"
          stroke="#ffffff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  )

  return (
    <div className="marketing-tabs__container">
      <h2 className="marketing-tabs__headline">
        Everything you need for marketing, <span>all in one</span>
      </h2>
      <div className="marketing-tabs__tablist sticky">
        {tabs.map((t, idx) => (
          <button
            key={t.key || t.label || idx}
            className={`marketing-tabs__tab${activeTab === idx ? ' active' : ''}`}
            onClick={() => handleTabClick(idx)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="marketing-tabs__panels">
        {tabs.map((tab, idx) => (
          <div
            key={tab.key || tab.label || idx}
            id={`marketing-tab-panel-${tab.key || idx}`}
            className="marketing-tabs__panel"
            ref={(el) => (panelRefs.current[idx] = el)}
          >
            <div className="services__panel-content">
              <div className="services__panel-text">
                <h3>{tab.title}</h3>
                <p>{tab.description}</p>
                <ul>
                  {tab.links &&
                    tab.links.map((link) => (
                      <li key={link.text}>
                        <a href={link.href} className="services__link">
                          <span className="services__icon">
                            <ArrowIcon />
                          </span>
                          <span>{link.text}</span>
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="services__image">
                {tab.image && (
                  <img
                    src={
                      typeof tab.image === 'string'
                        ? tab.image
                        : tab.image?.url ||
                          tab.image?.sizes?.large?.url ||
                          tab.image?.sizes?.thumbnail?.url ||
                          ''
                    }
                    alt={tab.title}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
