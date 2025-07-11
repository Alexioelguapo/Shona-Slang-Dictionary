import React from 'react';
import { StarIcon, SpeakerWaveIcon, LockIcon } from './icons';

interface LimitReachedModalProps {
    onClose: () => void;
}

const PremiumFeature: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <li className="flex items-start space-x-4">
        <div className="flex-shrink-0 text-cyan-400">{icon}</div>
        <div>
            <h4 className="font-semibold text-lg text-white">{title}</h4>
            <p className="text-gray-400">{description}</p>
        </div>
    </li>
);

const LimitReachedModal: React.FC<LimitReachedModalProps> = ({ onClose }) => {
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 modal-overlay"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-lg m-4 p-8 modal-content relative">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg">
                        <StarIcon className="h-8 w-8" />
                    </div>
                    <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">Go Premium!</h3>
                    <p className="mt-2 text-gray-400">You've reached your daily free search limit.</p>
                </div>

                <ul className="mt-8 space-y-5">
                    <PremiumFeature
                        icon={<LockIcon className="h-6 w-6" />}
                        title="Unlimited Searches"
                        description="Look up as many slang terms as you want, any time."
                    />
                    <PremiumFeature
                        icon={<SpeakerWaveIcon className="h-6 w-6" />}
                        title="AI-Powered Audio"
                        description="Hear how terms are pronounced with high-quality audio."
                    />
                    <PremiumFeature
                        icon={<StarIcon className="h-6 w-6" />}
                        title="Save Your Favorites"
                        description="Keep a personal list of your most-used slang terms."
                    />
                </ul>

                <div className="mt-8 space-y-3">
                    <button
                        type="button"
                        className="w-full flex items-center justify-center h-14 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-105"
                    >
                        Upgrade to Pro
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full h-14 px-6 text-gray-400 font-semibold rounded-full hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-600 transition-colors"
                    >
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LimitReachedModal;
