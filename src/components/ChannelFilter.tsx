import React from 'react';
import { Store, Filter, X } from 'lucide-react';
import { ChannelFilter as ChannelFilterType } from '../types';

interface ChannelFilterProps {
  channelFilter: ChannelFilterType;
  onChannelFilterChange: (filter: ChannelFilterType) => void;
  availableChannels: string[];
}

export const ChannelFilter: React.FC<ChannelFilterProps> = ({ 
  channelFilter, 
  onChannelFilterChange, 
  availableChannels 
}) => {
  const toggleChannel = (channel: string) => {
    const currentChannels = channelFilter.selectedChannels;
    const isSelected = currentChannels.includes(channel);
    
    if (isSelected) {
      onChannelFilterChange({
        selectedChannels: currentChannels.filter(c => c !== channel)
      });
    } else {
      onChannelFilterChange({
        selectedChannels: [...currentChannels, channel]
      });
    }
  };

  const clearFilters = () => {
    onChannelFilterChange({ selectedChannels: [] });
  };

  const selectAll = () => {
    onChannelFilterChange({ selectedChannels: [...availableChannels] });
  };

  const hasActiveFilters = channelFilter.selectedChannels.length > 0;
  const isAllSelected = channelFilter.selectedChannels.length === availableChannels.length;

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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg mr-3">
            <Store className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Filtros por Canal</h3>
        </div>
        <div className="flex items-center space-x-2">
          {!isAllSelected && availableChannels.length > 0 && (
            <button
              onClick={selectAll}
              className="flex items-center px-3 py-1.5 text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors"
            >
              Todos
            </button>
          )}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 mr-1" />
              Limpar
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {availableChannels.map((channel) => {
          const isSelected = channelFilter.selectedChannels.includes(channel);
          return (
            <button
              key={channel}
              onClick={() => toggleChannel(channel)}
              className={`flex items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              <span className="text-lg mr-2">{getChannelIcon(channel)}</span>
              <span className="text-sm font-medium truncate">{channel}</span>
            </button>
          );
        })}
      </div>

      {hasActiveFilters && (
        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-800">
            <strong>Canais ativos:</strong>{' '}
            {channelFilter.selectedChannels.length === availableChannels.length 
              ? 'Todos os canais' 
              : channelFilter.selectedChannels.join(', ')
            }
          </p>
        </div>
      )}

      {availableChannels.length === 0 && (
        <div className="text-center py-4">
          <Store className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Nenhum canal disponível</p>
        </div>
      )}
    </div>
  );
};