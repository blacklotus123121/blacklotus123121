import React from 'react';
import { Users, CreditCard, UserCheck, DollarSign } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard = ({ title, value, icon, trend }: StatsCardProps) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {trend && (
          <p className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '+' : '-'}{trend.value}% from last month
          </p>
        )}
      </div>
      <div className="p-3 bg-brand-50 rounded-full">
        {icon}
      </div>
    </div>
  </div>
);

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatsCard
        title="Total Users"
        value="1,234"
        icon={<Users className="h-6 w-6 text-brand-600" />}
        trend={{ value: 12, isPositive: true }}
      />
      <StatsCard
        title="Active Users"
        value="892"
        icon={<UserCheck className="h-6 w-6 text-green-600" />}
        trend={{ value: 8, isPositive: true }}
      />
      <StatsCard
        title="Total Credits Sold"
        value="45,678"
        icon={<CreditCard className="h-6 w-6 text-blue-600" />}
        trend={{ value: 15, isPositive: true }}
      />
      <StatsCard
        title="Revenue"
        value="R$ 12,345"
        icon={<DollarSign className="h-6 w-6 text-yellow-600" />}
        trend={{ value: 5, isPositive: true }}
      />
    </div>
  );
};