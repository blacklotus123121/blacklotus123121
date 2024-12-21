import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Coins } from 'lucide-react';
import { Logo } from './Logo';
import { UserMenu } from './UserMenu';

export const Navbar = () => {
  const { profile } = useAuthStore();

  return (
    <nav className="bg-gradient-to-r from-brand-800 to-brand-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <Link 
            to={profile ? '/dashboard' : '/'} 
            className="flex items-center hover:opacity-90 transition-opacity"
          >
            <Logo />
          </Link>

          <div className="flex items-center space-x-4">
            {profile ? (
              <>
                <div className="flex items-center bg-brand-700/50 px-3 py-1 rounded-full">
                  <Coins className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-semibold text-white">{profile.credits} credits</span>
                </div>
                {profile.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="bg-brand-700 text-white px-4 py-2 rounded-md hover:bg-brand-600 transition-colors"
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors"
                >
                  Dashboard
                </Link>
                <UserMenu />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-brand-200 px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};