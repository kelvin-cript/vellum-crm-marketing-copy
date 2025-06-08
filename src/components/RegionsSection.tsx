import React from 'react';
import { MapPin, Users, DollarSign, ShoppingCart } from 'lucide-react';
import { ProcessedData } from '../types';

interface RegionsSectionProps {
  data: ProcessedData;
  onExport: (data: any[], filename: string) => void;
}

export const RegionsSection: React.FC<RegionsSectionProps> = ({ data, onExport }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl mr-3">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Performance por Região</h3>
        </div>
        <button
          onClick={() => onExport(data.regionMetrics, 'performance-regioes')}
          className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium"
        >
          Exportar
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.regionMetrics.map((region, index) => (
          <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-2">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{region.city}</h4>
                  <p className="text-xs text-gray-500">{region.state}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Pedidos</span>
                <div className="flex items-center">
                  <ShoppingCart className="w-3 h-3 text-blue-500 mr-1" />
                  <span className="font-semibold text-gray-900">{region.orders}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Receita</span>
                <span className="font-bold text-green-600 text-sm">
                  R$ {region.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Ticket Médio</span>
                <div className="flex items-center">
                  <DollarSign className="w-3 h-3 text-purple-500 mr-1" />
                  <span className="font-semibold text-purple-600 text-sm">
                    R$ {region.averageOrderValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Clientes Únicos</span>
                <div className="flex items-center">
                  <Users className="w-3 h-3 text-orange-500 mr-1" />
                  <span className="font-semibold text-orange-600 text-sm">
                    {region.uniqueClients}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min((region.revenue / Math.max(...data.regionMetrics.map(r => r.revenue))) * 100, 100)}%` 
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {((region.revenue / data.regionMetrics.reduce((sum, r) => sum + r.revenue, 0)) * 100).toFixed(1)}% da receita total
              </p>
            </div>
          </div>
        ))}
      </div>

      {data.regionMetrics.length === 0 && (
        <div className="text-center py-8">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhuma região encontrada nos dados</p>
        </div>
      )}
    </div>
  );
};