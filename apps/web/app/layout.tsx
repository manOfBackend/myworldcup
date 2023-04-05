import Script from 'next/script';
import './global.css';

export const metadata = {
  title: 'hyunBell 토이 프로젝트',
  description: 'hyunBell',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>HY</title>
      </head>
      <body>{children}</body>
      <Script src='https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js'/>
      <Script src='https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js' noModule/>
    </html>
  );
}