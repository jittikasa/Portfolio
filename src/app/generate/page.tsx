'use client'

import { useState } from 'react'
import { generateTypewriterImage } from '../actions/generate-typewriter'

export default function GeneratePage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)

    const result = await generateTypewriterImage()

    if (result.success && result.imageUrl) {
      setImageUrl(result.imageUrl)
    } else {
      setError(result.error || 'Failed to generate image')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[var(--cream)] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)' }}>
          Generate Typewriter Image
        </h1>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-6 py-3 bg-[var(--ink)] text-white rounded-lg disabled:opacity-50 mb-8"
        >
          {loading ? 'Generating...' : 'Generate Typewriter'}
        </button>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-8">
            {error}
          </div>
        )}

        {imageUrl && (
          <div className="space-y-4">
            <img
              src={imageUrl}
              alt="Generated typewriter"
              className="w-full rounded-lg shadow-lg"
            />
            <p className="text-sm text-gray-600">
              Right-click to save this image, then place it in /public/typewriter.png
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
