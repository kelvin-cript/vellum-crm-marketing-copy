import React from 'react';
import { Calendar, Filter, X, DollarSign, Tag } from 'lucide-react';
import { PlanoCorteFilters } from '../../types/planoCorte';

interface PlanoCorteFiltersProps {
  filters: PlanoCorteFilters;
  onFiltersChange: (filters: PlanoCorteFilters) => void;
  availableStatus: string[];
}

export const PlanoCorteFiltersComponent: React.FC<PlanoCorteFiltersProps> = ({ 
  filters, 
  onFiltersChange, 
  availableStatus 
}) => {
  const clearFilters = () => {
    onFiltersChange({
      dataInicio: '',
      dataFim: '',
      status: [],
      valorMinimo: 0,
      valorMaximo: 0
    });
  };

  const toggleStatus = (status: string) => {
    const currentStatus = filters.status;
    const isSelected = currentStatus.includes(status);
    
    if (isSelected) {
      onFiltersChange({
        ...filters,
        status: currentStatus.filter(s => s !== status)
      });
    } else {
      onFiltersChange({
        ...filters,
        status: [...currentStatus, status]
      });
    }
  };

  const hasActiveFilters = filters.dataInicio || filters.dataFim || filters.status.length > 0 || 
                          filters.valorMinimo > 0 || filters.valorMaximo > 0;

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('finalizado')) return 'bg-green-100 text-green-700 border-green-300';
    if (statusLower.includes('cancelado')) return 'bg-red-100 text-red-700 border-red-300';
    if (statusLower.includes('aguardando aprovação')) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    if (statusLower.includes('aguardando retorno')) return 'bg-blue-100 text-blue-700 border-blue-300';
    if (statusLower.includes('configurando')) return 'bg-purple-100 text-purple-700 border-purple-300';
    return 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const getStatusIcon = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('finalizado')) return '✅';
    if (statusLower.includes('cancelado')) return '❌';
    if (statusLower.includes('aguardando aprovação')) return '⏳';
    if (statusLower.includes('aguardando retorno')) return '👤';
    if (statusLower.includes('configurando')) return '⚙️';
    return '📋';
  };

  return (
    <div className="space-y-6">
      {/* Filtros de Data */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg mr-3">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Filtros de Período</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center px-3 py-1.5 text-sm text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 mr-1" />
              Limpar Filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Data Inicial
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={filters.dataInicio}
                onChange={(e) => onFiltersChange({ ...filters, dataInicio: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Data Final
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={filters.dataFim}
                onChange={(e) => onFiltersChange({ ...filters, dataFim: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros de Valor */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg mr-3">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">Filtros de Valor</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Valor Mínimo (R$)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                min="0"
                step="0.01"
                value={filters.valorMinimo || ''}
                onChange={(e) => onFiltersChange({ ...filters, valorMinimo: parseFloat(e.target.value) || 0 })}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                placeholder="0,00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Valor Máximo (R$)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                min="0"
                step="0.01"
                value={filters.valorMaximo || ''}
                onChange={(e) => onFiltersChange({ ...filters, valorMaximo: parseFloat(e.target.value) || 0 })}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                placeholder="0,00"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros de Status */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg mr-3">
            <Tag className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">Filtros por Status</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {availableStatus.map((status) => {
            const isSelected = filters.status.includes(status);
            return (
              <button
                key={status}
                onClick={() => toggleStatus(status)}
                className={`flex items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                    : 'border-white/20 bg-white/5 text-gray-300 hover:border-purple-400/50 hover:bg-purple-500/10'
                }`}
              >
                <span className="text-lg mr-2">{getStatusIcon(status)}</span>
                <span className="text-sm font-medium truncate">{status}</span>
              </button>
            );
          })}
        </div>

        {filters.status.length > 0 && (
          <div className="mt-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <p className="text-sm text-purple-300">
              <strong>Status ativos:</strong> {filters.status.join(', ')}
            </p>
          </div>
        )}
      </div>

      {hasActiveFilters && (
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-4 border border-blue-500/20">
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-blue-400 mr-2" />
            <div className="text-sm text-blue-300">
              <p className="font-medium">Filtros ativos aplicados aos dados</p>
              <p className="text-xs text-blue-400 mt-1">
                Os resultados mostrados refletem apenas os dados que atendem aos critérios selecionados
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};