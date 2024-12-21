import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Video } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { profile } = useAuthStore();

  const generateOptions = [
    {
      title: 'Generate Image',
      icon: Image,
      credits: 10,
      description: 'Create stunning deepfake images in seconds',
      type: 'image',
    },
    {
      title: 'Generate Video',
      icon: Video,
      credits: 15,
      description: 'Transform videos with advanced deepfake technology',
      type: 'video',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2 text-brand-900">Dashboard</h1>
      <p className="text-lg text-brand-700 mb-8">Create amazing deepfake content</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {generateOptions.map((option) => (
          <div key={option.title} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-brand-800 to-brand-900 p-6">
              <option.icon className="w-12 h-12 text-white mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">{option.title}</h2>
              <p className="text-brand-100">{option.description}</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-brand-600">
                  {option.credits} credits per generation
                </span>
              </div>
              <button
                onClick={() => navigate(`/generate/${option.type}`)}
                disabled={!profile || profile.credits < option.credits}
                className={`w-full py-3 px-4 rounded-md transition-all ${
                  profile?.credits >= option.credits
                    ? 'bg-red-600 hover:bg-red-500 text-white transform hover:-translate-y-1'
                    : 'bg-gray-300 cursor-not-allowed text-gray-500'
                }`}
              >
                Generate Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};