import React from 'react';
import { Tag, Users, DollarSign, TrendingUp } from 'lucide-react';
import { ProcessedData } from '../types';

interface CouponsSectionProps {
  data: ProcessedData;
  onExport: (data: any[], filename: string) => void;
}

export const CouponsSection: React.FC<CouponsSectionProps> = ({ data, onExport }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl mr-3">
            <Tag className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Cupons Mais Utilizados</h3>
        </div>
        <button
          onClick={() => onExport(data.topCoupons, 'cupons-mais-usados')}
          className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors text-sm font-medium"
        >
          Exportar
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.topCoupons.map((coupon, index) => (
          <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-2">
                  <Tag className="w-4 h-4 text-pink-600" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm truncate">{coupon.name}</h4>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Usos</span>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900">{coupon.usageCount}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Receita</span>
                <span className="font-bold text-green-600 text-sm">
                  R$ {coupon.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Ticket Médio</span>
                <div className="flex items-center">
                  <DollarSign className="w-3 h-3 text-blue-500 mr-1" />
                  <span className="font-semibold text-blue-600 text-sm">
                    R$ {coupon.averageOrderValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Clientes Únicos</span>
                <div className="flex items-center">
                  <Users className="w-3 h-3 text-purple-500 mr-1" />
                  <span className="font-semibold text-purple-600 text-sm">
                    {coupon.uniqueClients}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min((coupon.usageCount / Math.max(...data.topCoupons.map(c => c.usageCount))) * 100, 100)}%` 
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {((coupon.usageCount / data.topCoupons.reduce((sum, c) => sum + c.usageCount, 0)) * 100).toFixed(1)}% dos usos
              </p>
            </div>
          </div>
        ))}
      </div>

      {data.topCoupons.length === 0 && (
        <div className="text-center py-8">
          <Tag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum cupom encontrado nos dados</p>
        </div>
      )}
    </div>
  );
};