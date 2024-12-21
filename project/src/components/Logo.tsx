import React from 'react';
import { Flame } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Flame className="h-8 w-8 text-red-600 animate-pulse" />
      <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
        DeepInferno
      </span>
    </div>
  );
};