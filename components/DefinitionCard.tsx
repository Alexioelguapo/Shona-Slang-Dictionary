import React from 'react';
import type { SlangDefinition } from '../types';
import { SpeakerWaveIcon } from './icons';

interface DefinitionCardProps {
  data: SlangDefinition;
}

const AudioButtonPlaceholder: React.FC = () => (
    <button
        disabled
        className="text-gray-600 hover:text-gray-500 cursor-not-allowed ml-2 inline-block align-middle"
        title="Audio Pronunciation (Premium Feature)"
        aria-label="Audio Pronunciation (Premium Feature)"
    >
        <SpeakerWaveIcon className="h-6 w-6" />
    </button>
);


const DefinitionCard: React.FC<DefinitionCardProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 sm:p-8 rounded-2xl shadow-lg transition-all duration-300 w-full animate-fade-in">
      <h2 className="text-4xl sm:text-5xl font-bold text-white capitalize mb-3 font-serif inline-flex items-center">
        {data.term}
        <AudioButtonPlaceholder />
      </h2>
      <p className="text-gray-300 text-lg mb-6 leading-relaxed">{data.definition}</p>

      <div className="mt-6 border-t border-gray-700 pt-6">
        <h3 className="text-xl font-semibold text-cyan-300 mb-3">Usage Example</h3>
        <blockquote className="bg-gray-900/60 p-4 rounded-lg border-l-4 border-cyan-400">
          <p className="text-white italic text-lg flex items-center">
            "{data.exampleShona}"
            <AudioButtonPlaceholder />
          </p>
          <p className="text-gray-400 mt-2 text-md">
            <span className="font-semibold">Translation:</span> "{data.exampleEnglish}"
          </p>
        </blockquote>
      </div>
    </div>
  );
};

export default DefinitionCard;