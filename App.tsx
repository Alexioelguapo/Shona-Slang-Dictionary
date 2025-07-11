import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import DefinitionCard from './components/DefinitionCard';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';
import FeaturedSlang from './components/FeaturedSlang';
import LimitReachedModal from './components/LimitReachedModal';
import { fetchSlangDefinition } from './services/geminiService';
import { useSearchLimiter } from './hooks/useSearchLimiter';
import type { SlangDefinition } from './types';

const App: React.FC = () => {
  const [definition, setDefinition] = useState<SlangDefinition | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [showLimitModal, setShowLimitModal] = useState<boolean>(false);

  const { searchesRemaining, canSearch, incrementSearchCount } = useSearchLimiter();

  const handleSearch = useCallback(async (term: string) => {
    if (!canSearch) {
      setShowLimitModal(true);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setDefinition(null);
    setHasSearched(true);
    
    try {
      incrementSearchCount();
      const result = await fetchSlangDefinition(term);
      setDefinition(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while searching.");
      }
      setDefinition(null); // Ensure no old definition is shown on error
    } finally {
      setIsLoading(false);
    }
  }, [canSearch, incrementSearchCount]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
        <style>{`
          .animate-fade-in { 
            animation: fadeIn 0.5s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {showLimitModal && <LimitReachedModal onClose={() => setShowLimitModal(false)} />}
        <Header />
        <main>
          <SearchBar 
            onSearch={handleSearch} 
            isLoading={isLoading} 
            canSearch={canSearch}
            searchesRemaining={searchesRemaining}
          />
          
          <div className="mt-8">
            {isLoading && <Loader />}
            {error && <ErrorDisplay message={error} />}
            
            {definition && !isLoading && (
              <DefinitionCard data={definition} />
            )}
            
            {!isLoading && !error && !definition && !hasSearched && (
              <FeaturedSlang />
            )}

            {!isLoading && !error && !definition && hasSearched && (
                <div className="text-center text-gray-400 p-8 bg-gray-800/30 rounded-lg">
                    <h3 className="text-2xl font-semibold">No definition found.</h3>
                    <p>Try another search term or check your spelling.</p>
                </div>
            )}
          </div>
        </main>
        <footer className="text-center mt-12 py-4 text-gray-500 text-sm space-y-2">
            <p>Powered by Google Gemini. Definitions are AI-generated and may not be perfectly accurate.</p>
            <p>
                Enjoying the dictionary?{' '}
                <a
                    href="#" // In a real app, this would be a link to a service like Buy Me a Coffee
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-cyan-400 hover:text-cyan-300 underline decoration-dotted underline-offset-2 transition-colors"
                >
                    Buy me a coffee ☕
                </a>
            </p>
        </footer>
      </div>
    </div>
  );
};

export default App;