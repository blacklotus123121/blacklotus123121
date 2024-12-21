import React, { useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface GenerateFormProps {
  onGenerate: (data: FormData) => Promise<void>;
  type: 'image' | 'video';
  creditsRequired: number;
}

export const GenerateForm = ({ onGenerate, type, creditsRequired }: GenerateFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await onGenerate(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div className="flex flex-col items-center">
          {type === 'image' ? (
            <ImageIcon className="w-12 h-12 text-gray-400" />
          ) : (
            <Upload className="w-12 h-12 text-gray-400" />
          )}
          
          <div className="mt-4 text-center">
            <label className="cursor-pointer">
              <span className="text-brand-600 hover:text-brand-500">
                Upload a file
              </span>
              <input
                type="file"
                className="hidden"
                accept={type === 'image' ? 'image/*' : 'video/*'}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>
          
          {file && (
            <div className="mt-4 text-sm text-gray-600">
              Selected: {file.name}
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={!file || loading}
        className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Generating...' : `Generate (${creditsRequired} credits)`}
      </button>
    </form>
  );
};