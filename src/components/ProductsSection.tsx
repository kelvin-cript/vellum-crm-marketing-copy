import React from 'react';
import { Package, Star, AlertTriangle, TrendingUp } from 'lucide-react';
import { ProcessedData } from '../types';
import { RecurrentProductsSection } from './RecurrentProductsSection';

interface ProductsSectionProps {
  data: ProcessedData;
  onExport: (data: any[], filename: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ data, onExport }) => {
  return (
    <div className="space-y-8">
      {/* Grid com as 4 seções principais de produtos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Produtos Mais Vendidos */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-3">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Produtos Mais Vendidos</h3>
                <p className="text-sm text-gray-600">Produtos com maior volume de vendas</p>
              </div>
            </div>
            <button
              onClick={() => onExport(data.topProducts, 'produtos-mais-vendidos')}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
            >
              Exportar
            </button>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {data.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    {product.totalSales} vendas • {product.totalQuantity} unidades
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-lg text-green-600">
                    R$ {product.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-gray-500">
                    Médio: R$ {product.averagePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {data.topProducts.length === 0 && (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Nenhum produto encontrado</p>
            </div>
          )}
        </div>

        {/* Produtos de Qualidade */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mr-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Produtos de Qualidade</h3>
                <p className="text-sm text-gray-600">Produtos com melhor performance</p>
              </div>
            </div>
            <button
              onClick={() => onExport(data.productQuality, 'produtos-qualidade')}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
            >
              Exportar
            </button>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {data.productQuality.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-gray-600">
                      {product.averageRating.toFixed(1)} • {product.returnRate.toFixed(1)}% retorno
                    </span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-lg text-blue-600">
                    {product.qualityScore.toFixed(0)}
                  </p>
                  <p className="text-xs text-gray-500">Score de Qualidade</p>
                </div>
              </div>
            ))}
          </div>

          {data.productQuality.length === 0 && (
            <div className="text-center py-8">
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Nenhum produto de qualidade encontrado</p>
            </div>
          )}
        </div>

        {/* Produtos que Pararam de Vender */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl mr-3">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Produtos Inativos</h3>
                <p className="text-sm text-gray-600">Produtos sem vendas há mais de 30 dias</p>
              </div>
            </div>
            <button
              onClick={() => onExport(data.stoppedProducts, 'produtos-inativos')}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
            >
              Exportar
            </button>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {data.stoppedProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    Última venda: {new Date(product.lastSaleDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-lg text-red-600">
                    {product.daysSinceLastSale} dias
                  </p>
                  <p className="text-xs text-gray-500">
                    Perda: R$ {product.potentialLoss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {data.stoppedProducts.length === 0 && (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Nenhum produto inativo encontrado</p>
            </div>
          )}
        </div>

        {/* Potencial de Crescimento */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mr-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Potencial de Crescimento</h3>
                <p className="text-sm text-gray-600">Produtos com oportunidades de expansão</p>
              </div>
            </div>
            <button
              onClick={() => onExport(data.growthPotential, 'potencial-crescimento')}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
            >
              Exportar
            </button>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {data.growthPotential.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    Vendas atuais: {product.currentSales}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-lg text-purple-600">
                    +{product.growthRate.toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-500">
                    Potencial: R$ {product.potentialRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {data.growthPotential.length === 0 && (
            <div className="text-center py-8">
              <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Nenhum produto com potencial de crescimento encontrado</p>
            </div>
          )}
        </div>
      </div>

      {/* Nova seção: Produtos com Recorrência */}
      <RecurrentProductsSection 
        recurrentProducts={data.recurrentProducts} 
        onExport={onExport} 
      />
    </div>
  );
};