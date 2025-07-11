import { useState, useEffect, useCallback } from 'react';
import { MAX_FREE_SEARCHES, USAGE_STORAGE_KEY } from '../constants';

interface UsageData {
  date: string;
  count: number;
}

const getTodayString = () => new Date().toISOString().split('T')[0];

export const useSearchLimiter = () => {
  const [usage, setUsage] = useState<UsageData>({ date: getTodayString(), count: 0 });

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(USAGE_STORAGE_KEY);
      if (storedData) {
        const parsedData: UsageData = JSON.parse(storedData);
        if (parsedData.date === getTodayString()) {
          setUsage(parsedData);
        } else {
          // It's a new day, reset the data in localStorage
          const newDayUsage = { date: getTodayString(), count: 0 };
          localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(newDayUsage));
          setUsage(newDayUsage);
        }
      }
    } catch (error) {
      console.error("Could not read usage data from localStorage", error);
    }
  }, []);

  const incrementSearchCount = useCallback(() => {
    setUsage(prevUsage => {
      const newCount = prevUsage.count + 1;
      // Ensure we don't increment past the max, though UI should prevent this
      if (newCount > MAX_FREE_SEARCHES) return prevUsage; 
      
      const newUsage = { ...prevUsage, count: newCount };
      try {
        localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(newUsage));
      } catch (error) {
        console.error("Could not save usage data to localStorage", error);
      }
      return newUsage;
    });
  }, []);

  const searchesRemaining = Math.max(0, MAX_FREE_SEARCHES - usage.count);
  const canSearch = searchesRemaining > 0;

  return { searchesRemaining, canSearch, incrementSearchCount };
};
