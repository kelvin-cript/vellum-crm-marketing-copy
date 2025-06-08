import React from 'react';
import { Users, UserCheck, Crown, Repeat, UserPlus, UserX } from 'lucide-react';
import { ProcessedData } from '../types';
import { NewClientsSection } from './NewClientsSection';
import { InactiveClientsSection } from './InactiveClientsSection';

interface ClientsSectionProps {
  data: ProcessedData;
  onExport: (data: any[], filename: string) => void;
}

export const ClientsSection: React.FC<ClientsSectionProps> = ({ data, onExport }) => {
  return (
    <div className="space-y-8">
      {/* Grid com as 4 seções de clientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Melhores Clientes */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-3">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Melhores Clientes</h3>
                <p className="text-sm text-gray-600">Clientes com maior valor total gasto</p>
              </div>
            </div>
            <button
              onClick={() => onExport(data.topClients, 'melhores-clientes')}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
            >
              Exportar
            </button>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {data.topClients.map((client, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">{client.name}</p>
                  <p className="font-bold text-lg text-green-600">
                    R$ {client.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                  <div>
                    <p><strong>Pedidos:</strong> {client.totalOrders}</p>
                    <p><strong>Cidade:</strong> {client.city}</p>
                  </div>
                  <div>
                    <p><strong>Ticket Médio:</strong> R$ {client.averageOrderValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    <p><strong>Última Compra:</strong> {new Date(client.lastPurchase).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  <p><strong>Email:</strong> {client.email}</p>
                  <p><strong>Telefone:</strong> {client.phone}</p>
                </div>
              </div>
            ))}
          </div>

          {data.topClients.length === 0 && (
            <div className="text-center py-8">
              <Crown className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Nenhum cliente encontrado</p>
            </div>
          )}
        </div>

        {/* Clientes Recorrentes */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mr-3">
                <Repeat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Clientes Recorrentes</h3>
                <p className="text-sm text-gray-600">Clientes com 2 ou mais compras</p>
              </div>
            </div>
            <button
              onClick={() => onExport(data.recurrentClients, 'clientes-recorrentes')}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
            >
              Exportar
            </button>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {data.recurrentClients.map((client, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">{client.name}</p>
                  <div className="flex items-center">
                    <UserCheck className="w-4 h-4 text-green-500 mr-1" />
                    <span className="font-bold text-lg text-green-600">
                      {client.purchaseCount}x
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                  <div>
                    <p><strong>Total Gasto:</strong> R$ {client.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div>
                    <p><strong>Intervalo Médio:</strong> {client.averageTimeBetweenPurchases} dias</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  <p><strong>Email:</strong> {client.email}</p>
                  <p><strong>Telefone:</strong> {client.phone}</p>
                </div>
              </div>
            ))}
          </div>

          {data.recurrentClients.length === 0 && (
            <div className="text-center py-8">
              <Repeat className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Nenhum cliente recorrente encontrado</p>
            </div>
          )}
        </div>
      </div>

      {/* Novas seções: Clientes Novos e Clientes Inativos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NewClientsSection 
          newClients={data.newClients} 
          onExport={onExport} 
        />
        
        <InactiveClientsSection 
          inactiveClients={data.inactiveClients} 
          onExport={onExport} 
        />
      </div>
    </div>
  );
};