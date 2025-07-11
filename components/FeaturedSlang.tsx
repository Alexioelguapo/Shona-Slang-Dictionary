
import React, { useState, useEffect } from 'react';
import { fetchFeaturedSlang } from '../services/geminiService';
import DefinitionCard from './DefinitionCard';
import Loader from './Loader';
import ErrorDisplay from './ErrorDisplay';
import type { SlangDefinition } from '../types';

const FeaturedSlang: React.FC = () => {
  const [featured, setFeatured] = useState<SlangDefinition | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFeatured = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchFeaturedSlang();
        setFeatured(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    getFeatured();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-gray-400 mb-4">Word of the Day</h2>
      {isLoading && <Loader />}
      {error && <ErrorDisplay message={error} />}
      {featured && !isLoading && <DefinitionCard data={featured} />}
    </div>
  );
};

export default FeaturedSlang;
