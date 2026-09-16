export function Header() {
  return (
    <header className="pt-safe-top bg-gradient-to-b from-[#fdfbf7] to-transparent dark:from-[#1a1c29] pb-4 px-4 sticky top-0 z-40 backdrop-blur-sm">
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">🪔</span>
          <h1 className="text-2xl font-semibold text-[#781f19] dark:text-[#ffb067]">
            Aarti Sangrah
          </h1>
        </div>
      </div>
    </header>
  );
}
