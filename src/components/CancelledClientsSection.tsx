import React from 'react';
import { UserX, AlertTriangle, Phone, FileText } from 'lucide-react';
import { CancelledClientMetric } from '../types';

interface CancelledClientsSectionProps {
  cancelledClients: CancelledClientMetric[];
  onExport: (data: any[], filename: string) => void;
}

export const CancelledClientsSection: React.FC<CancelledClientsSectionProps> = ({ 
  cancelledClients, 
  onExport 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl mr-3">
            <UserX className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Clientes com Cancelamentos</h3>
            <p className="text-sm text-gray-600">Clientes que cancelaram pedidos no período</p>
          </div>
        </div>
        <button
          onClick={() => onExport(cancelledClients, 'clientes-cancelamentos')}
          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
        >
          Exportar
        </button>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {cancelledClients.map((client, index) => (
          <div key={index} className="p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors border border-red-200">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-900">{client.name}</p>
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-red-500 mr-1" />
                <span className="font-bold text-lg text-red-600">
                  {client.cancellationRate.toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
              <div>
                <p><strong>Cancelamentos:</strong> {client.cancelledOrders}</p>
                <p><strong>Total de Pedidos:</strong> {client.totalOrders}</p>
              </div>
              <div>
                <p><strong>Cidade:</strong> {client.city}</p>
                <p><strong>Último Cancelamento:</strong> {new Date(client.lastCancellation).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-red-200">
              <div className="flex items-center text-xs text-gray-500">
                <FileText className="w-3 h-3 mr-1" />
                <span className="truncate">{client.document}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Phone className="w-3 h-3 mr-1" />
                <span>{client.phone}</span>
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t border-red-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Perda Potencial:</span>
                <span className="font-bold text-red-600 text-sm">
                  R$ {client.potentialLoss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="mt-1">
                <p className="text-xs text-gray-500 truncate">
                  <strong>Email:</strong> {client.email}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cancelledClients.length === 0 && (
        <div className="text-center py-8">
          <UserX className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum cliente com cancelamentos no período</p>
        </div>
      )}
    </div>
  );
};