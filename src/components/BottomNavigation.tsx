import { Home, Heart, Settings, ListMusic } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';

export function BottomNavigation() {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/playlists', icon: ListMusic, label: 'Playlists' },
    { to: '/favorites', icon: Heart, label: 'Favorites' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#fdfbf7]/90 dark:bg-[#1a1c29]/90 backdrop-blur-md border-t border-[#e2d5c3] dark:border-[#2a2d3d] pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive 
                  ? "text-[#c2410c] dark:text-[#ffb067]" 
                  : "text-[#8a6b6b] dark:text-[#a09c9c] hover:text-[#4a1515] dark:hover:text-[#f3e7d3]"
              )}
            >
              <Icon size={24} strokeWidth={2} />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
