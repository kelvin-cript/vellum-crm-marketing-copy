import React from 'react';
import { Calendar, Filter, X } from 'lucide-react';
import { DateFilter as DateFilterType } from '../types';

interface DateFilterProps {
  dateFilter: DateFilterType;
  onDateFilterChange: (filter: DateFilterType) => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({ dateFilter, onDateFilterChange }) => {
  const clearFilters = () => {
    onDateFilterChange({ startDate: '', endDate: '' });
  };

  const hasActiveFilters = dateFilter.startDate || dateFilter.endDate;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg mr-3">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Filtros de Período</h3>
        </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data Inicial
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={dateFilter.startDate}
              onChange={(e) => onDateFilterChange({ ...dateFilter, startDate: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data Final
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={dateFilter.endDate}
              onChange={(e) => onDateFilterChange({ ...dateFilter, endDate: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Período ativo:</strong>{' '}
            {dateFilter.startDate && `${new Date(dateFilter.startDate).toLocaleDateString('pt-BR')}`}
            {dateFilter.startDate && dateFilter.endDate && ' até '}
            {dateFilter.endDate && `${new Date(dateFilter.endDate).toLocaleDateString('pt-BR')}`}
          </p>
        </div>
      )}
    </div>
  );
};