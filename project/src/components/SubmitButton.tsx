import React from 'react';

interface SubmitButtonProps {
  loading: boolean;
  loadingText: string;
  text: string;
}

export const SubmitButton = ({ loading, loadingText, text }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? loadingText : text}
    </button>
  );
};