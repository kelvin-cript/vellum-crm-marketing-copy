import React from 'react';
import { PackageX, AlertTriangle, TrendingDown } from 'lucide-react';
import { CancelledProductMetric } from '../types';

interface CancelledProductsSectionProps {
  cancelledProducts: CancelledProductMetric[];
  onExport: (data: any[], filename: string) => void;
}

export const CancelledProductsSection: React.FC<CancelledProductsSectionProps> = ({ 
  cancelledProducts, 
  onExport 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl mr-3">
            <PackageX className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Produtos Mais Cancelados</h3>
            <p className="text-sm text-gray-600">Produtos com maior taxa de cancelamento</p>
          </div>
        </div>
        <button
          onClick={() => onExport(cancelledProducts, 'produtos-cancelados')}
          className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium"
        >
          Exportar
        </button>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {cancelledProducts.map((product, index) => (
          <div key={index} className="p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-900 truncate flex-1 mr-4">{product.name}</p>
              <div className="flex items-center">
                <TrendingDown className="w-4 h-4 text-orange-500 mr-1" />
                <span className="font-bold text-lg text-orange-600">
                  {product.cancellationRate.toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
              <div>
                <p><strong>Cancelados:</strong> {product.cancelledQuantity} unidades</p>
                <p><strong>Total Vendido:</strong> {product.totalQuantity} unidades</p>
              </div>
              <div>
                <p><strong>Último Cancelamento:</strong> {new Date(product.lastCancellation).toLocaleDateString('pt-BR')}</p>
                <p><strong>Principal Motivo:</strong> {product.topCancellationReason}</p>
              </div>
            </div>
            
            <div className="pt-2 border-t border-orange-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Perda Potencial:</span>
                <span className="font-bold text-orange-600 text-sm">
                  R$ {product.potentialLoss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="mt-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(product.cancellationRate, 100)}%` 
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Taxa de cancelamento: {product.cancellationRate.toFixed(1)}%
              </p>
            </div>
          </div>
        ))}
      </div>

      {cancelledProducts.length === 0 && (
        <div className="text-center py-8">
          <PackageX className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum produto cancelado no período</p>
        </div>
      )}
    </div>
  );
};