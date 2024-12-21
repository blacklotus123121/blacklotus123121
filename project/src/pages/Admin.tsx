import React, { useState } from 'react';
import { Layout, Users, Settings, LayoutDashboard } from 'lucide-react';
import { DashboardStats } from '../components/admin/DashboardStats';
import { UsersList } from '../components/admin/UsersList';
import { IntegrationSettings } from '../components/admin/IntegrationSettings';
import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';

type TabType = 'dashboard' | 'users' | 'integrations';

export const Admin = () => {
  const { profile } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Redirect if not admin
  if (!profile || profile.email !== 'luccmick131@gmail.com') {
    return <Navigate to="/dashboard" replace />;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'integrations', label: 'Integrations', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
        </div>
        <nav className="space-y-1 px-3">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as TabType)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === id
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5 mr-2" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="py-8 px-6">
          <div className="space-y-6">
            {activeTab === 'dashboard' && (
              <>
                <DashboardStats />
                <UsersList />
              </>
            )}
            {activeTab === 'users' && <UsersList />}
            {activeTab === 'integrations' && <IntegrationSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};