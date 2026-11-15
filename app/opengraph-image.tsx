import { ImageResponse } from 'next/og';

export const alt = 'LAICOS Farm — Fresh Produce. Trusted Farms.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #f4fcf4 0%, #e9f5ef 100%)',
          color: '#141c17',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 14, height: 6, borderRadius: 999, background: '#d29d41' }} />
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: '#0a976b' }}>
            LAICOS Agricultural Marketplace
          </div>
        </div>
        <div style={{ marginTop: 28, fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
          Fresh Produce.
        </div>
        <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1, color: '#009163' }}>
          Trusted Farms.
        </div>
        <div style={{ marginTop: 32, fontSize: 26, color: '#2a3a31' }}>
          Connecting farmers, buyers and better opportunities.
        </div>
      </div>
    ),
    { ...size },
  );
}
