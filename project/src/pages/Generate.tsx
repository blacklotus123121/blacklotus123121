import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GenerateForm } from '../components/GenerateForm';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

export const Generate = () => {
  const { type } = useParams<{ type: 'image' | 'video' }>();
  const navigate = useNavigate();
  const { profile } = useAuthStore();

  const creditsRequired = type === 'image' ? 10 : 15;

  const handleGenerate = async (formData: FormData) => {
    if (!profile || profile.credits < creditsRequired) {
      navigate('/pricing');
      return;
    }

    try {
      // Get API configuration
      const { data: apiConfig } = await supabase
        .from('api_configs')
        .select('*')
        .single();

      if (!apiConfig) {
        throw new Error('API configuration not found');
      }

      // Here you would:
      // 1. Upload the file to storage
      // 2. Call your AI service API
      // 3. Update user credits
      // 4. Save the result

      // For now, we'll just show a success message
      alert('Generation started! Check back soon for results.');
      navigate('/dashboard');
    } catch (error) {
      console.error('Generation error:', error);
      alert('An error occurred during generation');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">
        Generate {type === 'image' ? 'Image' : 'Video'}
      </h1>
      <p className="text-gray-600 mb-8">
        Upload your source file to begin the generation process
      </p>

      <div className="bg-white rounded-lg shadow-md p-6">
        <GenerateForm
          type={type || 'image'}
          onGenerate={handleGenerate}
          creditsRequired={creditsRequired}
        />
      </div>
    </div>
  );
};