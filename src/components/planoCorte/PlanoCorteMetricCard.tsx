import React from 'react';
import { Download, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PlanoCorteMetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  percentage?: number;
  color?: string;
  onExport?: () => void;
}

export const PlanoCorteMetricCard: React.FC<PlanoCorteMetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  percentage,
  color = 'blue',
  onExport
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600',
    teal: 'from-teal-500 to-teal-600',
    yellow: 'from-yellow-500 to-yellow-600',
    pink: 'from-pink-500 to-pink-600'
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500 mr-1" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500 mr-1" />;
      case 'neutral':
        return <Minus className="w-4 h-4 text-gray-500 mr-1" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      case 'neutral':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-xl shadow-lg`}>
          {icon}
        </div>
        {onExport && (
          <button
            onClick={onExport}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Exportar dados"
          >
            <Download className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-300">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
        
        {percentage !== undefined && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Participação</span>
            <span className="text-sm font-semibold text-blue-400">
              {percentage.toFixed(1)}%
            </span>
          </div>
        )}
        
        {subtitle && (
          <p className="text-sm text-gray-400">{subtitle}</p>
        )}

        {trend && trendValue && (
          <div className="flex items-center mt-2">
            {getTrendIcon()}
            <span className={`text-sm font-medium ${getTrendColor()}`}>
              {trendValue}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};