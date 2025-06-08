import React from 'react';
import { ShoppingBag, TrendingUp, Target, Zap } from 'lucide-react';
import { ProcessedData } from '../types';

interface ProductCombinationsSectionProps {
  data: ProcessedData;
  onExport: (data: any[], filename: string) => void;
}

export const ProductCombinationsSection: React.FC<ProductCombinationsSectionProps> = ({ data, onExport }) => {
  const getRecommendationColor = (strength: string) => {
    switch (strength) {
      case 'Alta': return 'text-green-600 bg-green-100';
      case 'Média': return 'text-yellow-600 bg-yellow-100';
      case 'Baixa': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRecommendationIcon = (strength: string) => {
    switch (strength) {
      case 'Alta': return <Zap className="w-4 h-4" />;
      case 'Média': return <TrendingUp className="w-4 h-4" />;
      case 'Baixa': return <Target className="w-4 h-4" />;
      default: return <ShoppingBag className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl mr-3">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Produtos Comprados Juntos</h3>
            <p className="text-sm text-gray-600">Análise de combinações para cross-selling</p>
          </div>
        </div>
        <button
          onClick={() => onExport(data.productCombinations, 'produtos-comprados-juntos')}
          className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors text-sm font-medium"
        >
          Exportar
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.productCombinations.map((combination, index) => (
          <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRecommendationColor(combination.recommendationStrength)}`}>
                    {getRecommendationIcon(combination.recommendationStrength)}
                    <span className="ml-1">{combination.recommendationStrength}</span>
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">Combinação #{index + 1}</h4>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Produto Principal</p>
                <p className="font-semibold text-gray-900 text-sm truncate" title={combination.productA}>
                  {combination.productA}
                </p>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center">
                  <span className="text-cyan-600 text-xs font-bold">+</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Produto Complementar</p>
                <p className="font-semibold text-gray-900 text-sm truncate" title={combination.productB}>
                  {combination.productB}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-600">Vendas Juntos</p>
                  <p className="font-bold text-cyan-600">{combination.combinationCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600">Confiança</p>
                  <p className="font-bold text-purple-600">{combination.confidenceScore.toFixed(1)}%</p>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Receita Combinada</span>
                  <span className="font-bold text-green-600 text-sm">
                    R$ {combination.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Ticket Médio</span>
                  <span className="font-semibold text-gray-700 text-sm">
                    R$ {combination.averageOrderValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min((combination.confidenceScore / 100) * 100, 100)}%` 
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Força da recomendação: {combination.recommendationStrength}
              </p>
            </div>
          </div>
        ))}
      </div>

      {data.productCombinations.length === 0 && (
        <div className="text-center py-8">
          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhuma combinação de produtos encontrada</p>
          <p className="text-sm text-gray-400 mt-1">É necessário ter pedidos com múltiplos produtos</p>
        </div>
      )}
    </div>
  );
};