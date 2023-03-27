import './global.css';

export const metadata = {
  title: '이상형 월드컵 게임',
  description: 'hyunBell',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}