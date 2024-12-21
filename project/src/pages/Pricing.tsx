import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Star, QrCode } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

interface Plan {
  id: string;
  name: string;
  credits: number;
  price: number;
  icon: React.ComponentType;
  features: string[];
  popular?: boolean;
}

interface PaymentModalProps {
  plan: Plan;
  onClose: () => void;
}

const PaymentModal = ({ plan, onClose }: PaymentModalProps) => {
  const [pixCode, setPixCode] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePixPayment = async () => {
    setLoading(true);
    try {
      const { data: settings } = await supabase
        .from('payment_gateway_settings')
        .select('pix_key')
        .single();

      if (settings?.pix_key) {
        // In a real application, you would:
        // 1. Call your payment gateway API to generate a PIX code
        // 2. Display the QR code and payment instructions
        // 3. Listen for webhook notifications to confirm payment
        setPixCode('PIX-CODE-EXAMPLE-123'); // Simulated PIX code
      }
    } catch (error) {
      console.error('Error generating PIX payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Payment for {plan.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        <div className="text-center space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-brand-900">R$ {plan.price}</p>
            <p className="text-sm text-gray-600">{plan.credits} credits</p>
          </div>

          {!pixCode ? (
            <button
              onClick={generatePixPayment}
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-500 disabled:opacity-50"
            >
              {loading ? 'Generating PIX...' : 'Generate PIX Payment'}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-gray-200 rounded-lg p-4">
                <QrCode className="w-32 h-32 mx-auto mb-4" />
                <p className="text-sm font-mono bg-gray-50 p-2 rounded break-all">
                  {pixCode}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Scan the QR code or copy the PIX code to complete your payment
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Pricing = () => {
  const navigate = useNavigate();
  const { profile } = useAuthStore();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      credits: 100,
      price: 9.99,
      icon: Shield,
      features: [
        '100 Generation Credits',
        'Basic Support',
        'Standard Quality',
        '24h Generation Time'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      credits: 500,
      price: 39.99,
      icon: Zap,
      features: [
        '500 Generation Credits',
        'Priority Support',
        'HD Quality',
        '12h Generation Time'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      credits: 2000,
      price: 149.99,
      icon: Star,
      features: [
        '2000 Generation Credits',
        '24/7 Support',
        '4K Quality',
        '6h Generation Time'
      ]
    }
  ];

  const handlePurchase = async (plan: Plan) => {
    if (!profile) {
      navigate('/login');
      return;
    }
    setSelectedPlan(plan);
  };

  return (
    <div className="py-12 bg-gradient-to-br from-brand-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-brand-900 sm:text-5xl">
            Unleash Your Creativity
          </h2>
          <p className="mt-4 text-xl text-brand-600">
            Transform your content with cutting-edge deepfake technology
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all ${
                plan.popular ? 'ring-2 ring-red-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 rounded-bl-lg">
                  Popular
                </div>
              )}
              <div className="px-6 py-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-brand-600 to-red-500 text-white mx-auto">
                  <plan.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-center text-2xl font-bold text-brand-900">
                  {plan.name}
                </h3>
                <div className="mt-4 flex justify-center items-end">
                  <span className="text-5xl font-extrabold text-brand-900">
                    R$ {plan.price}
                  </span>
                </div>
                <p className="mt-2 text-center text-brand-600">
                  {plan.credits} credits
                </p>
              </div>
              <div className="px-6 pb-8">
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-red-500 mr-3">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePurchase(plan)}
                  className={`mt-8 w-full py-3 px-4 rounded-md transition-colors ${
                    plan.popular
                      ? 'bg-red-600 hover:bg-red-500 text-white'
                      : 'bg-brand-600 hover:bg-brand-500 text-white'
                  }`}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
};