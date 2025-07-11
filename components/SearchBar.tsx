import React, { useState } from 'react';
import { SearchIcon } from './icons';

interface SearchBarProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
  canSearch: boolean;
  searchesRemaining: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading, canSearch, searchesRemaining }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && canSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={canSearch ? "e.g. Dhuterere, Pfee, Mbinga..." : "Daily search limit reached"}
          className="w-full pl-4 pr-32 py-4 text-lg bg-gray-800 border-2 border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isLoading || !canSearch}
          aria-label="Search for a slang term"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-12 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          disabled={isLoading || !canSearch}
        >
            <SearchIcon />
            <span className="ml-2">Search</span>
        </button>
      </div>
      {canSearch && (
        <p className="text-center text-sm text-gray-500 mt-3">
          You have {searchesRemaining} searches left today.
        </p>
      )}
    </form>
  );
};

export default SearchBar;