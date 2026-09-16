import { usePreferences } from '../hooks/usePreferences';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { LanguageSelector } from '../components/LanguageSelector';

export function Settings() {
  const { preferences, updatePreference, resetPreferences } = usePreferences();

  return (
    <div className="pb-24">
      <Header />
      
      <main className="px-4 mt-6 max-w-md mx-auto space-y-8">
        <h2 className="text-2xl font-medium text-[#781f19] dark:text-[#ffb067]">
          Settings
        </h2>
        
        <section className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a38a8a] dark:text-[#8a8d9d]">
            Language
          </h3>
          <div className="bg-white dark:bg-[#232635] p-4 rounded-xl shadow-sm border border-[#e2d5c3] dark:border-[#2a2d3d]">
            <p className="text-sm text-[#8a6b6b] dark:text-[#a09c9c] mb-3">
              Default language for discovering Aartis.
            </p>
            <LanguageSelector 
              selected={preferences.language} 
              onChange={(lang) => {
                if (lang !== 'all') updatePreference('language', lang);
              }} 
              showAll={false}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a38a8a] dark:text-[#8a8d9d]">
            Accessibility
          </h3>
          <div className="bg-white dark:bg-[#232635] rounded-xl shadow-sm border border-[#e2d5c3] dark:border-[#2a2d3d] divide-y divide-[#e2d5c3] dark:divide-[#2a2d3d]">
            <label className="p-4 flex items-center justify-between cursor-pointer">
              <div>
                <span className="block text-[#4a1515] dark:text-[#f3e7d3]">Reduced Motion</span>
                <span className="block text-xs text-[#8a6b6b] dark:text-[#a09c9c] mt-1">Minimize animations across the app</span>
              </div>
              <input 
                type="checkbox" 
                checked={preferences.reducedMotion}
                onChange={(e) => updatePreference('reducedMotion', e.target.checked)}
                className="w-5 h-5 accent-[#781f19] dark:accent-[#c2410c] rounded"
              />
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a38a8a] dark:text-[#8a8d9d]">
            Reading Experience
          </h3>
          <div className="bg-white dark:bg-[#232635] rounded-xl shadow-sm border border-[#e2d5c3] dark:border-[#2a2d3d] divide-y divide-[#e2d5c3] dark:divide-[#2a2d3d]">
            <label className="p-4 flex items-center justify-between cursor-pointer">
              <div>
                <span className="block text-[#4a1515] dark:text-[#f3e7d3]">Keep Screen Awake</span>
                <span className="block text-xs text-[#8a6b6b] dark:text-[#a09c9c] mt-1">Prevent phone from sleeping while reading</span>
              </div>
              <input 
                type="checkbox" 
                checked={preferences.keepAwake}
                onChange={(e) => updatePreference('keepAwake', e.target.checked)}
                className="w-5 h-5 accent-[#781f19] dark:accent-[#c2410c] rounded"
              />
            </label>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#4a1515] dark:text-[#f3e7d3]">Default Text Size</span>
                <span className="text-sm text-[#8a6b6b] dark:text-[#a09c9c]">{preferences.fontSize}px</span>
              </div>
              <input 
                type="range" 
                min="16" max="40" step="2"
                value={preferences.fontSize}
                onChange={(e) => updatePreference('fontSize', parseInt(e.target.value, 10))}
                className="w-full accent-[#781f19] dark:accent-[#c2410c]"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#4a1515] dark:text-[#f3e7d3]">Default Autoscroll Speed</span>
                <span className="text-sm text-[#8a6b6b] dark:text-[#a09c9c]">
                  {preferences.autoScrollSpeed === 1 ? 'Slow' : preferences.autoScrollSpeed === 2 ? 'Medium' : 'Fast'}
                </span>
              </div>
              <input 
                type="range" 
                min="1" max="3" step="1"
                value={preferences.autoScrollSpeed}
                onChange={(e) => updatePreference('autoScrollSpeed', parseInt(e.target.value, 10))}
                className="w-full accent-[#781f19] dark:accent-[#c2410c]"
              />
            </div>
          </div>
        </section>

        <section className="pt-4">
          <button 
            onClick={resetPreferences}
            className="w-full py-3 rounded-xl font-medium text-[#781f19] dark:text-[#ffb067] border border-[#781f19] dark:border-[#ffb067] hover:bg-[#781f19]/5 dark:hover:bg-[#ffb067]/5 transition-colors"
          >
            Reset All Preferences
          </button>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}
