import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 512,
  height: 512,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#070A11',
          borderRadius: '128px',
          border: '16px solid #00A1F1',
        }}
      >
        <div
          style={{
            fontSize: 270,
            fontWeight: 900,
            color: '#00D084',
            fontFamily: 'sans-serif',
            letterSpacing: '-5px',
            marginLeft: '15px'
          }}
        >
          BM
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
