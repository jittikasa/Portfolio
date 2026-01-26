'use server'

import { google } from '@ai-sdk/google'
import { generateText } from 'ai'

export async function generateTypewriterImage(): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
  try {
    const prompt = `A photorealistic vintage typewriter, cream/beige colored body with warm ivory tones, viewed from a front-facing angle slightly from above. The typewriter has:
- A cream/beige colored body with subtle gradients and realistic lighting
- Black round mechanical keys with white letters arranged in QWERTY layout
- A black rubber platen roller visible at the top
- Chrome/silver accents on the knobs and mechanical parts
- Paper loaded in the typewriter, coming out from the top, with a slight natural curl
- The paper is cream colored with subtle texture
- Realistic shadows underneath giving it depth
- Clean white/off-white background
- Professional product photography style with soft studio lighting
- High detail on all mechanical parts
- The style should match vintage Olivetti or Hermes typewriter aesthetics
The image should be clean, elegant, and photorealistic like a high-end product shot.`

    const result = await generateText({
      model: google('gemini-2.5-flash-image'),
      prompt,
      providerOptions: {
        google: {
          responseModalities: ['IMAGE'],
          imageConfig: {
            aspectRatio: '1:1'
          }
        }
      }
    })

    if (result.files && result.files.length > 0) {
      const file = result.files[0]
      const base64 = file.base64
      const mediaType = file.mimeType || 'image/png'
      const dataUrl = `data:${mediaType};base64,${base64}`

      return { success: true, imageUrl: dataUrl }
    }

    return { success: false, error: 'No image generated' }
  } catch (error) {
    console.error('Error generating typewriter image:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
