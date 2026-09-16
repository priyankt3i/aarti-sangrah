import { cn } from '../lib/utils';

interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export function CategoryChips({ categories, selectedCategory, onSelect }: CategoryChipsProps) {
  return (
    <div className="flex overflow-x-auto pb-2 -mx-4 px-4 gap-2 scrollbar-hide">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border",
            selectedCategory === category
              ? "bg-[#781f19] text-[#fdfbf7] border-[#781f19] dark:bg-[#c2410c] dark:text-[#fdfbf7] dark:border-[#c2410c]"
              : "bg-white text-[#8a6b6b] border-[#e2d5c3] dark:bg-[#232635] dark:text-[#a09c9c] dark:border-[#2a2d3d]"
          )}
        >
          {category === 'all' ? 'All' : category}
        </button>
      ))}
    </div>
  );
}
