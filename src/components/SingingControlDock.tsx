import { Play, Pause, FastForward, Rewind, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '../lib/utils';

interface SingingControlDockProps {
  isAutoScrolling: boolean;
  onToggleAutoScroll: () => void;
  autoScrollSpeed: number;
  onChangeSpeed: (speed: number) => void;
  fontSize: number;
  onChangeFontSize: (size: number) => void;
}

export function SingingControlDock({
  isAutoScrolling,
  onToggleAutoScroll,
  autoScrollSpeed,
  onChangeSpeed,
  fontSize,
  onChangeFontSize,
}: SingingControlDockProps) {
  
  const speedLabel = autoScrollSpeed === 1 ? 'Slow' : autoScrollSpeed === 2 ? 'Med' : 'Fast';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#fdfbf7]/95 dark:bg-[#1a1c29]/95 backdrop-blur-md border-t border-[#e2d5c3] dark:border-[#2a2d3d] pb-[env(safe-area-inset-bottom)] px-2 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
      <div className="max-w-md mx-auto flex items-center justify-between px-2">
        {/* Left: Zoom Controls */}
        <div className="flex gap-1 items-center bg-black/5 dark:bg-white/5 rounded-full px-1 py-1">
          <button 
            onClick={() => onChangeFontSize(Math.max(16, fontSize - 2))}
            className="p-2 text-[#8a6b6b] dark:text-[#a09c9c] active:bg-black/10 dark:active:bg-white/10 rounded-full"
            aria-label="Decrease text size"
          >
            <ZoomOut size={20} />
          </button>
          <div className="w-px h-4 bg-[#e2d5c3] dark:bg-[#2a2d3d]"></div>
          <button 
            onClick={() => onChangeFontSize(Math.min(40, fontSize + 2))}
            className="p-2 text-[#8a6b6b] dark:text-[#a09c9c] active:bg-black/10 dark:active:bg-white/10 rounded-full"
            aria-label="Increase text size"
          >
            <ZoomIn size={20} />
          </button>
        </div>
        
        {/* Center: Play/Pause */}
        <button 
          onClick={onToggleAutoScroll}
          className="flex items-center gap-2 bg-[#781f19] dark:bg-[#c2410c] text-white px-6 py-3 rounded-full font-medium shadow-md active:scale-95 transition-transform"
          aria-label={isAutoScrolling ? "Pause autoscroll" : "Start autoscroll"}
        >
          {isAutoScrolling ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current" />}
          <span>{isAutoScrolling ? 'Pause' : 'Sing'}</span>
        </button>
        
        {/* Right: Speed Control */}
        <div className="flex gap-1 items-center bg-black/5 dark:bg-white/5 rounded-full px-1 py-1">
          <button 
            onClick={() => onChangeSpeed(Math.max(1, autoScrollSpeed - 1))}
            className={cn("p-2 rounded-full", autoScrollSpeed <= 1 ? "text-gray-300 dark:text-gray-600" : "text-[#8a6b6b] dark:text-[#a09c9c] active:bg-black/10 dark:active:bg-white/10")}
            disabled={autoScrollSpeed <= 1}
            aria-label="Slower"
          >
            <Rewind size={18} />
          </button>
          <span className="text-xs font-medium text-[#781f19] dark:text-[#ffb067] min-w-[32px] text-center">
            {speedLabel}
          </span>
          <button 
            onClick={() => onChangeSpeed(Math.min(3, autoScrollSpeed + 1))}
            className={cn("p-2 rounded-full", autoScrollSpeed >= 3 ? "text-gray-300 dark:text-gray-600" : "text-[#8a6b6b] dark:text-[#a09c9c] active:bg-black/10 dark:active:bg-white/10")}
            disabled={autoScrollSpeed >= 3}
            aria-label="Faster"
          >
            <FastForward size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
