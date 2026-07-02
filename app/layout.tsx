import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prajwal Rode | Portfolio',
  description: 'Product Developer — backend engineering, distributed systems, and scalable applications.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800;900&display=swap"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
