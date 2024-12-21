import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  linkText: string;
  linkTo: string;
  error?: string;
}

export const AuthLayout = ({ 
  children, 
  title, 
  subtitle, 
  linkText, 
  linkTo, 
  error 
}: AuthLayoutProps) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-brand-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-900">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-brand-600">
            {subtitle}{' '}
            <Link to={linkTo} className="font-medium text-red-600 hover:text-red-500">
              {linkText}
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};