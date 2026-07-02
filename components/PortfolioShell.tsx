'use client';

import { useState } from 'react';
import IntroScreen from './IntroScreen';
import Layout from './layout/Layout';

export default function PortfolioShell({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <div className="bg-noise" />
      {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
      <Layout>{children}</Layout>
    </>
  );
}
