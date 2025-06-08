import React from 'react';
import { Repeat, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { RecurrentProductMetric } from '../types';

interface RecurrentProductsSectionProps {
  recurrentProducts: RecurrentProductMetric[];
  onExport: (data: any[], filename: string) => void;
}

export const RecurrentProductsSection: React.FC<RecurrentProductsSectionProps> = ({ 
  recurrentProducts, 
  onExport 
}) => {
  const getRecurrencyColor = (strength: string) => {
    switch (strength) {
      case 'Alta': return 'text-green-600 bg-green-100';
      case 'Média': return 'text-yellow-600 bg-yellow-100';
      case 'Baixa': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRecurrencyIcon = (strength: string) => {
    switch (strength) {
      case 'Alta': return <TrendingUp className="w-4 h-4" />;
      case 'Média': return <Calendar className="w-4 h-4" />;
      case 'Baixa': return <Repeat className="w-4 h-4" />;
      default: return <Repeat className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl mr-3">
            <Repeat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Produtos com Recorrência</h3>
            <p className="text-sm text-gray-600">Produtos vendidos em 3+ meses diferentes</p>
          </div>
        </div>
        <button
          onClick={() => onExport(recurrentProducts, 'produtos-recorrentes')}
          className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium"
        >
          Exportar
        </button>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {recurrentProducts.map((product, index) => (
          <div key={index} className="p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors border border-indigo-200">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-900 truncate flex-1 mr-4">{product.name}</p>
              <div className="flex items-center">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRecurrencyColor(product.recurrencyStrength)}`}>
                  {getRecurrencyIcon(product.recurrencyStrength)}
                  <span className="ml-1">{product.recurrencyStrength}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
              <div>
                <p><strong>Meses com Vendas:</strong> {product.monthsWithSales}</p>
                <p><strong>Total de Vendas:</strong> {product.totalSales}</p>
              </div>
              <div>
                <p><strong>Média Mensal:</strong> {product.averageMonthlySales.toFixed(1)} vendas</p>
                <p><strong>Score Consistência:</strong> {product.consistencyScore.toFixed(1)}%</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
              <div>
                <p><strong>Primeira Venda:</strong> {new Date(product.firstSaleDate).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <p><strong>Última Venda:</strong> {new Date(product.lastSaleDate).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
            
            <div className="pt-2 border-t border-indigo-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Receita Total:</span>
                    <span className="font-bold text-green-600 text-sm">
                      R$ {product.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Receita Mensal Média:</span>
                    <span className="font-bold text-blue-600 text-sm">
                      R$ {product.averageMonthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(product.consistencyScore, 100)}%` 
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Consistência de vendas: {product.consistencyScore.toFixed(1)}%
              </p>
            </div>
          </div>
        ))}
      </div>

      {recurrentProducts.length === 0 && (
        <div className="text-center py-8">
          <Repeat className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum produto recorrente encontrado</p>
          <p className="text-sm text-gray-400 mt-1">Produtos vendidos em 3+ meses diferentes aparecerão aqui</p>
        </div>
      )}
    </div>
  );
};