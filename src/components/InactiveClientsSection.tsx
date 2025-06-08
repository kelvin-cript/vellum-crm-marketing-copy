import React from 'react';
import { UserX, Clock, AlertTriangle, DollarSign, Phone, FileText, Calendar } from 'lucide-react';
import { InactiveClientMetric } from '../types';

interface InactiveClientsSectionProps {
  inactiveClients: InactiveClientMetric[];
  onExport: (data: any[], filename: string) => void;
}

export const InactiveClientsSection: React.FC<InactiveClientsSectionProps> = ({ 
  inactiveClients, 
  onExport 
}) => {
  const getDaysColor = (days: number) => {
    if (days > 120) return 'text-red-600';
    if (days > 90) return 'text-orange-600';
    return 'text-yellow-600';
  };

  const getDaysBgColor = (days: number) => {
    if (days > 120) return 'bg-red-100';
    if (days > 90) return 'bg-orange-100';
    return 'bg-yellow-100';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl mr-3">
            <UserX className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Clientes Inativos</h3>
            <p className="text-sm text-gray-600">Clientes recorrentes (3+ compras) inativos há mais de 90 dias</p>
          </div>
        </div>
        <button
          onClick={() => onExport(inactiveClients, 'clientes-inativos')}
          className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-sm font-medium"
        >
          Exportar
        </button>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {inactiveClients.map((client, index) => (
          <div key={index} className="p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-900">{client.name}</p>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-amber-500 mr-1" />
                <span className={`font-bold text-lg ${getDaysColor(client.daysSinceLastPurchase)}`}>
                  {client.daysSinceLastPurchase} dias
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
              <div>
                <p><strong>Última Compra:</strong> {new Date(client.lastPurchase).toLocaleDateString('pt-BR')}</p>
                <p><strong>Total de Compras:</strong> {client.totalPurchases}</p>
              </div>
              <div>
                <p><strong>Cidade:</strong> {client.city}</p>
                <p><strong>Intervalo Médio:</strong> {client.averageTimeBetweenPurchases} dias</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-amber-200">
              <div className="flex items-center text-xs text-gray-500">
                <FileText className="w-3 h-3 mr-1" />
                <span className="truncate">{client.document}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Phone className="w-3 h-3 mr-1" />
                <span>{client.phone}</span>
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t border-amber-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Total Gasto:</span>
                    <span className="font-bold text-green-600 text-sm">
                      R$ {client.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-600">Ticket Médio:</span>
                    <span className="font-semibold text-blue-600 text-sm">
                      R$ {client.averageOrderValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Perda Potencial:</span>
                    <span className="font-bold text-red-600 text-sm">
                      R$ {client.potentialLoss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-2">
                <p className="text-xs text-gray-500 truncate">
                  <strong>Email:</strong> {client.email}
                </p>
              </div>
            </div>

            {/* Indicador de urgência */}
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <div className={`flex items-center px-2 py-1 rounded-full ${getDaysBgColor(client.daysSinceLastPurchase)}`}>
                  <AlertTriangle className={`w-3 h-3 mr-1 ${getDaysColor(client.daysSinceLastPurchase)}`} />
                  <span className={`text-xs font-medium ${getDaysColor(client.daysSinceLastPurchase)}`}>
                    {client.daysSinceLastPurchase > 120 ? 'Urgente' : 
                     client.daysSinceLastPurchase > 90 ? 'Atenção' : 'Monitorar'}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Cliente recorrente há {client.daysSinceLastPurchase} dias inativo
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {inactiveClients.length === 0 && (
        <div className="text-center py-8">
          <UserX className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum cliente recorrente inativo encontrado</p>
          <p className="text-sm text-gray-400 mt-1">Clientes com 3+ compras inativos há mais de 90 dias aparecerão aqui</p>
        </div>
      )}
    </div>
  );
};