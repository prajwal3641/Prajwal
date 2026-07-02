import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artisan Bean Coffee Co.',
  description: 'Selected Colombian blends, custom latte art, and expertly brewed coffee.',
};

export default function CafeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="cafe-scope">
      {children}
    </div>
  );
}
