import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bondhu Motor and Electronic',
    short_name: 'Bondhu Motor',
    description: 'Best Electric Scooty in Jumainaskar & Dholahat',
    start_url: '/',
    display: 'standalone',
    background_color: '#070A11',
    theme_color: '#00B4FF',
    icons: [
      {
        src: '/icon',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
