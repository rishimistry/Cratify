import React from 'react';
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

export default function StatCard({ title, value, change, isPositive, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 rounded-full bg-gray-50">{icon}</div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <div className="flex items-center mt-2">
          <span
            className={`flex items-center text-sm font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? (
              <FiArrowUp className="mr-1 h-4 w-4" />
            ) : (
              <FiArrowDown className="mr-1 h-4 w-4" />
            )}
            {change}
          </span>
          <span className="text-xs text-gray-500 ml-2">vs last month</span>
        </div>
      </div>
    </div>
  );
} 