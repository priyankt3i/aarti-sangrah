import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search size={20} className="text-[#a38a8a] dark:text-[#8a8d9d]" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by deity, title..."
        className="w-full pl-10 pr-10 py-3 bg-white dark:bg-[#232635] border border-[#e2d5c3] dark:border-[#2a2d3d] rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e1a774] dark:focus:ring-[#c2410c] text-[#4a1515] dark:text-[#f3e7d3] placeholder-[#a38a8a] dark:placeholder-[#8a8d9d]"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-3 flex items-center"
          aria-label="Clear search"
        >
          <X size={20} className="text-[#a38a8a] dark:text-[#8a8d9d]" />
        </button>
      )}
    </div>
  );
}
