import React from 'react';
import { UserPlus, Calendar, DollarSign, ShoppingCart, Phone, FileText } from 'lucide-react';
import { NewClientMetric } from '../types';

interface NewClientsSectionProps {
  newClients: NewClientMetric[];
  onExport: (data: any[], filename: string) => void;
}

export const NewClientsSection: React.FC<NewClientsSectionProps> = ({ 
  newClients, 
  onExport 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl mr-3">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Clientes Novos</h3>
            <p className="text-sm text-gray-600">Clientes que fizeram primeira compra nos últimos 5 dias</p>
          </div>
        </div>
        <button
          onClick={() => onExport(newClients, 'clientes-novos')}
          className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors text-sm font-medium"
        >
          Exportar
        </button>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {newClients.map((client, index) => (
          <div key={index} className="p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-200">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-900">{client.name}</p>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-emerald-500 mr-1" />
                <span className="font-bold text-lg text-emerald-600">
                  {client.daysSinceFirstPurchase} {client.daysSinceFirstPurchase === 1 ? 'dia' : 'dias'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
              <div>
                <p><strong>Primeira Compra:</strong> {new Date(client.firstPurchase).toLocaleDateString('pt-BR')}</p>
                <p><strong>Total de Pedidos:</strong> {client.totalOrders}</p>
              </div>
              <div>
                <p><strong>Cidade:</strong> {client.city}</p>
                <p><strong>Ticket Médio:</strong> R$ {client.averageOrderValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-emerald-200">
              <div className="flex items-center text-xs text-gray-500">
                <FileText className="w-3 h-3 mr-1" />
                <span className="truncate">{client.document}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Phone className="w-3 h-3 mr-1" />
                <span>{client.phone}</span>
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t border-emerald-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Total Gasto:</span>
                <span className="font-bold text-emerald-600 text-sm">
                  R$ {client.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="mt-1">
                <p className="text-xs text-gray-500 truncate">
                  <strong>Email:</strong> {client.email}
                </p>
              </div>
            </div>

            {/* Indicador visual de "novidade" */}
            <div className="mt-2">
              <div className="flex items-center justify-center">
                <div className="flex items-center px-2 py-1 bg-emerald-100 rounded-full">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs font-medium text-emerald-700">
                    Cliente Novo - {client.daysSinceFirstPurchase} {client.daysSinceFirstPurchase === 1 ? 'dia' : 'dias'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {newClients.length === 0 && (
        <div className="text-center py-8">
          <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum cliente novo nos últimos 5 dias</p>
          <p className="text-sm text-gray-400 mt-1">Clientes que fizeram primeira compra recentemente aparecerão aqui</p>
        </div>
      )}
    </div>
  );
};