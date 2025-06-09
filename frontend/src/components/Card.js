// src/components/Card.js
import React from 'react'

export default function Card({ title, children }) {
  return (
    <div className="bg-white shadow rounded-xl p-6 transition hover:shadow-lg">
      {title && <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>}
      {children}
    </div>
  )
}
