import React from 'react';
import { Truck, Package, Users, MapPin, DollarSign } from 'lucide-react';
import { ProcessedData } from '../types';

interface CouriersSectionProps {
  data: ProcessedData;
  onExport: (data: any[], filename: string) => void;
}

export const CouriersSection: React.FC<CouriersSectionProps> = ({ data, onExport }) => {
  const getTransportIcon = (courierName: string) => {
    const name = courierName.toLowerCase();
    if (name.includes('sedex') || name.includes('correios')) return '📮';
    if (name.includes('rodonaves')) return '🚛';
    if (name.includes('pac')) return '📦';
    if (name.includes('moto')) return '🏍️';
    if (name.includes('retirar') || name.includes('loja')) return '🏪';
    return '🚚';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl mr-3">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Performance das Transportadoras</h3>
        </div>
        <button
          onClick={() => onExport(data.courierMetrics, 'performance-transportadoras')}
          className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors text-sm font-medium"
        >
          Exportar
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.courierMetrics.map((courier, index) => (
          <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <span className="text-xl mr-2">{getTransportIcon(courier.name)}</span>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm truncate">{courier.name}</h4>
                  <p className="text-xs text-gray-500">Transportadora</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Entregas</span>
                <div className="flex items-center">
                  <Package className="w-3 h-3 text-blue-500 mr-1" />
                  <span className="font-semibold text-gray-900">{courier.orders}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Receita</span>
                <span className="font-bold text-green-600 text-sm">
                  R$ {courier.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Ticket Médio</span>
                <div className="flex items-center">
                  <DollarSign className="w-3 h-3 text-purple-500 mr-1" />
                  <span className="font-semibold text-purple-600 text-sm">
                    R$ {courier.averageOrderValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Clientes</span>
                <div className="flex items-center">
                  <Users className="w-3 h-3 text-orange-500 mr-1" />
                  <span className="font-semibold text-orange-600 text-sm">
                    {courier.uniqueClients}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Cidades</span>
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 text-teal-500 mr-1" />
                  <span className="font-semibold text-teal-600 text-sm">
                    {courier.citiesServed}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min((courier.orders / Math.max(...data.courierMetrics.map(c => c.orders))) * 100, 100)}%` 
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {((courier.orders / data.courierMetrics.reduce((sum, c) => sum + c.orders, 0)) * 100).toFixed(1)}% das entregas
              </p>
            </div>
          </div>
        ))}
      </div>

      {data.courierMetrics.length === 0 && (
        <div className="text-center py-8">
          <Truck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhuma transportadora encontrada nos dados</p>
        </div>
      )}
    </div>
  );
};