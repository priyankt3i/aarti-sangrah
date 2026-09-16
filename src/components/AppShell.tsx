import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { usePreferences } from '../hooks/usePreferences';
import { cn } from '../lib/utils';

export function AppShell({ children }: { children: ReactNode }) {
  const { preferences } = usePreferences();
  
  useEffect(() => {
    // Ensure dark class is removed
    window.document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className={cn(
      "min-h-screen pb-[env(safe-area-inset-bottom)]",
      "bg-[#fdfbf7] text-[#4a1515]",
      preferences.reducedMotion ? "motion-reduce:transition-none" : ""
    )}>
      {children}
    </div>
  );
}
