import PortfolioShell from '@/components/PortfolioShell';

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <PortfolioShell>{children}</PortfolioShell>;
}
