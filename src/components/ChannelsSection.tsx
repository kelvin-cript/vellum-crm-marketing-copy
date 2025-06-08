import React from 'react';
import { Store, TrendingUp, ShoppingCart, Package } from 'lucide-react';
import { ProcessedData } from '../types';

interface ChannelsSectionProps {
  data: ProcessedData;
  onExport: (data: any[], filename: string) => void;
}

export const ChannelsSection: React.FC<ChannelsSectionProps> = ({ data, onExport }) => {
  const getChannelIcon = (channelName: string) => {
    switch (channelName) {
      case 'Mercado Livre':
        return '🛒';
      case 'Madeira Madeira':
        return '🏠';
      case 'Magazine Luiza':
        return '🏪';
      case 'Leroy Merlin':
        return '🔨';
      default:
        return '🌐';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl mr-3">
            <Store className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Performance por Canal</h3>
        </div>
        <button
          onClick={() => onExport(data.channelPerformance, 'performance-canais')}
          className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium"
        >
          Exportar
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.channelPerformance.map((channel, index) => (
          <div key={index} className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getChannelIcon(channel.channelName)}</span>
                <div>
                  <h4 className="font-bold text-gray-900">{channel.channelName}</h4>
                  <p className="text-xs text-gray-500">{channel.channel}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pedidos</span>
                <div className="flex items-center">
                  <ShoppingCart className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="font-semibold text-gray-900">{channel.orders}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Receita</span>
                <span className="font-bold text-green-600">
                  R$ {channel.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ticket Médio</span>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-purple-500 mr-1" />
                  <span className="font-semibold text-purple-600">
                    R$ {channel.averageOrderValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Nova métrica: Produto mais vendido */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Top Produto</span>
                <div className="flex items-center">
                  <Package className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="font-semibold text-orange-600 text-xs truncate max-w-20" title={channel.topProduct}>
                    {channel.topProduct || 'N/A'}
                  </span>
                </div>
              </div>

              {channel.topProductQuantity && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Qtd. Top Produto</span>
                  <span className="font-semibold text-gray-700 text-sm">
                    {channel.topProductQuantity} un.
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min((channel.revenue / Math.max(...data.channelPerformance.map(c => c.revenue))) * 100, 100)}%` 
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {((channel.revenue / data.channelPerformance.reduce((sum, c) => sum + c.revenue, 0)) * 100).toFixed(1)}% do total
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};