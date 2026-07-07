import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rhobert Isaac Calem | QA Automation Portfolio',
  description:
    'Portfolio of Rhobert Isaac Calem, a Quality Assurance Analyst focused on automation, manual, and performance testing.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
