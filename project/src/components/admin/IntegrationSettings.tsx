import React from 'react';
import { CreditCard, Webhook, Key } from 'lucide-react';

interface IntegrationSection {
  title: string;
  icon: React.ReactNode;
  fields: {
    key: string;
    label: string;
    type: string;
    placeholder: string;
  }[];
}

export const IntegrationSettings = () => {
  const sections: IntegrationSection[] = [
    {
      title: 'Payment Gateway',
      icon: <CreditCard className="h-6 w-6 text-brand-600" />,
      fields: [
        {
          key: 'pix_key',
          label: 'PIX Key',
          type: 'text',
          placeholder: 'Enter your PIX key'
        },
        {
          key: 'api_token',
          label: 'API Token',
          type: 'password',
          placeholder: 'Enter payment gateway API token'
        },
        {
          key: 'webhook_url',
          label: 'Webhook URL',
          type: 'url',
          placeholder: 'Enter webhook URL for payment notifications'
        }
      ]
    },
    {
      title: 'Deepfake API',
      icon: <Key className="h-6 w-6 text-indigo-600" />,
      fields: [
        {
          key: 'deepfake_api_key',
          label: 'API Key',
          type: 'password',
          placeholder: 'Enter Deepfake API key'
        },
        {
          key: 'deepfake_endpoint',
          label: 'API Endpoint',
          type: 'url',
          placeholder: 'Enter Deepfake API endpoint'
        }
      ]
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement save logic
  };

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.title} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            {section.icon}
            <h2 className="text-xl font-semibold">{section.title}</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {section.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
              ))}
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
};