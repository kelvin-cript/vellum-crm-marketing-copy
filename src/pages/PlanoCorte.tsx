import React, { useState } from 'react';
import { ArrowLeft, BarChart3, Users, Package, TrendingUp, DollarSign, XCircle, Clock, AlertTriangle, Target, Brain, Zap, CheckCircle, UserCheck } from 'lucide-react';
import { usePlanoCorteProcessor } from '../hooks/usePlanoCorteProcessor';
import { PlanoCorteFileUpload } from '../components/planoCorte/PlanoCorteFileUpload';
import { PlanoCorteFiltersComponent } from '../components/planoCorte/PlanoCorteFilters';
import { PlanoCorteMetricCard } from '../components/planoCorte/PlanoCorteMetricCard';
import { PlanoCorteAIInsights } from '../components/planoCorte/PlanoCorteAIInsights';

interface PlanoCorteProps {
  onBack: () => void;
}

export const PlanoCorte: React.FC<PlanoCorteProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const {
    rawData,
    processedData,
    filters,
    setFilters,
    availableStatus,
    loadExcelData,
    clearData,
    exportToCSV,
    downloadSampleExcel,
    hasData
  } = usePlanoCorteProcessor();

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'clientes', label: 'Clientes', icon: <Users className="w-5 h-5" /> },
    { id: 'funil', label: 'Funil de Vendas', icon: <Target className="w-5 h-5" /> },
    { id: 'ai-insights', label: 'IA Insights', icon: <Brain className="w-5 h-5" /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <PlanoCorteMetricCard
                title="Receita Total"
                value={`R$ ${processedData.totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                icon={<DollarSign className="w-6 h-6 text-white" />}
                color="green"
                trend="up"
                trendValue="+12.5%"
                onExport={() => exportToCSV([{ receita: processedData.totalReceita }], 'receita-total')}
              />
              
              <PlanoCorteMetricCard
                title="Total de Pedidos"
                value={processedData.totalPedidos.toLocaleString('pt-BR')}
                icon={<Package className="w-6 h-6 text-white" />}
                color="blue"
                trend="up"
                trendValue="+8.3%"
                onExport={() => exportToCSV([{ pedidos: processedData.totalPedidos }], 'total-pedidos')}
              />

              <PlanoCorteMetricCard
                title="Clientes Únicos"
                value={processedData.totalClientes.toLocaleString('pt-BR')}
                icon={<Users className="w-6 h-6 text-white" />}
                color="purple"
                trend="up"
                trendValue="+15.2%"
                onExport={() => exportToCSV([{ clientes: processedData.totalClientes }], 'total-clientes')}
              />
              
              <PlanoCorteMetricCard
                title="Ticket Médio"
                value={`R$ ${processedData.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                icon={<TrendingUp className="w-6 h-6 text-white" />}
                color="orange"
                trend="up"
                trendValue="+5.7%"
                onExport={() => exportToCSV([{ ticketMedio: processedData.ticketMedio }], 'ticket-medio')}
              />
            </div>

            {/* Funil de Status Completo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              <PlanoCorteMetricCard
                title="Aguardando Aprovação"
                subtitle="Carrinho abandonado"
                value={processedData.aguardandoAprovacao.toLocaleString('pt-BR')}
                icon={<XCircle className="w-6 h-6 text-white" />}
                color="yellow"
                percentage={(processedData.aguardandoAprovacao / processedData.totalPedidos) * 100}
                onExport={() => exportToCSV(processedData.carrinhoAbandonadoClientes, 'aguardando-aprovacao')}
              />

              <PlanoCorteMetricCard
                title="Aguardando Vendedor"
                subtitle="Enviado para análise"
                value={processedData.aguardandoVendedor.toLocaleString('pt-BR')}
                icon={<Clock className="w-6 h-6 text-white" />}
                color="blue"
                percentage={(processedData.aguardandoVendedor / processedData.totalPedidos) * 100}
                onExport={() => exportToCSV(processedData.clientesAguardandoVendedor, 'aguardando-vendedor')}
              />

              <PlanoCorteMetricCard
                title="Aprovados"
                subtitle="Pagos, em produção"
                value={processedData.aprovados.toLocaleString('pt-BR')}
                icon={<CheckCircle className="w-6 h-6 text-white" />}
                color="purple"
                percentage={(processedData.aprovados / processedData.totalPedidos) * 100}
                onExport={() => exportToCSV(processedData.clientesAprovados, 'pedidos-aprovados')}
              />

              <PlanoCorteMetricCard
                title="Finalizados"
                subtitle="Prontos na fábrica"
                value={processedData.finalizados.toLocaleString('pt-BR')}
                icon={<Package className="w-6 h-6 text-white" />}
                color="green"
                percentage={(processedData.finalizados / processedData.totalPedidos) * 100}
                onExport={() => exportToCSV([{ finalizados: processedData.finalizados }], 'pedidos-finalizados')}
              />

              <PlanoCorteMetricCard
                title="Entregues"
                subtitle="Entregues ao cliente"
                value={processedData.entregues.toLocaleString('pt-BR')}
                icon={<UserCheck className="w-6 h-6 text-white" />}
                color="teal"
                percentage={(processedData.entregues / processedData.totalPedidos) * 100}
                onExport={() => exportToCSV([{ entregues: processedData.entregues }], 'pedidos-entregues')}
              />

              <PlanoCorteMetricCard
                title="Cancelados"
                subtitle="Pedidos cancelados"
                value={processedData.pedidosCancelados.toLocaleString('pt-BR')}
                icon={<XCircle className="w-6 h-6 text-white" />}
                color="red"
                percentage={(processedData.pedidosCancelados / processedData.totalPedidos) * 100}
                onExport={() => exportToCSV(processedData.clientesCancelados, 'pedidos-cancelados')}
              />
            </div>

            {/* Métricas de Performance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PlanoCorteMetricCard
                title="Taxa de Conversão"
                subtitle="Aprovados + Finalizados + Entregues"
                value={`${processedData.taxaConversao.toFixed(1)}%`}
                icon={<TrendingUp className="w-6 h-6 text-white" />}
                color="green"
                trend={processedData.taxaConversao > 50 ? 'up' : 'down'}
                trendValue={processedData.taxaConversao > 50 ? 'Boa conversão' : 'Pode melhorar'}
              />

              <PlanoCorteMetricCard
                title="Taxa de Cancelamento"
                value={`${processedData.taxaCancelamento.toFixed(1)}%`}
                icon={<XCircle className="w-6 h-6 text-white" />}
                color="red"
                trend={processedData.taxaCancelamento < 10 ? 'up' : 'down'}
                trendValue={processedData.taxaCancelamento < 10 ? 'Baixa taxa' : 'Taxa elevada'}
              />

              <PlanoCorteMetricCard
                title="Valor Perdido"
                subtitle="Total em cancelamentos"
                value={`R$ ${processedData.valorPerdidoCancelamentos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                icon={<DollarSign className="w-6 h-6 text-white" />}
                color="red"
                trend="down"
                trendValue="Oportunidade de recuperação"
              />
            </div>
          </div>
        );

      case 'clientes':
        return (
          <div className="space-y-8">
            {/* Melhores Clientes */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Melhores Clientes</h3>
                    <p className="text-sm text-gray-400">Clientes com maior valor efetivamente gasto</p>
                  </div>
                </div>
                <button
                  onClick={() => exportToCSV(processedData.melhoresClientes, 'melhores-clientes')}
                  className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium border border-blue-500/30"
                >
                  Exportar
                </button>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {processedData.melhoresClientes.slice(0, 10).map((cliente, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-white">{cliente.nome}</p>
                      <p className="font-bold text-lg text-green-400">
                        R$ {cliente.totalGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-2">
                      <div>
                        <p><strong>Pedidos:</strong> {cliente.totalPedidos}</p>
                        <p><strong>Ticket Médio:</strong> R$ {cliente.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      </div>
                      <div>
                        <p><strong>Último Pedido:</strong> {new Date(cliente.ultimoPedido).toLocaleDateString('pt-BR')}</p>
                        <p><strong>Status:</strong> <span className={`px-2 py-1 rounded text-xs ${
                          cliente.statusUltimoPedido.toLowerCase().includes('entregue') ? 'bg-green-500/20 text-green-400' :
                          cliente.statusUltimoPedido.toLowerCase().includes('finalizado') ? 'bg-blue-500/20 text-blue-400' :
                          cliente.statusUltimoPedido.toLowerCase().includes('aprovado') ? 'bg-purple-500/20 text-purple-400' :
                          cliente.statusUltimoPedido.toLowerCase().includes('aguardando') ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>{cliente.statusUltimoPedido}</span></p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      <p><strong>Email:</strong> {cliente.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clientes Recorrentes */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mr-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Clientes Recorrentes</h3>
                    <p className="text-sm text-gray-400">Clientes com 2 ou mais pedidos</p>
                  </div>
                </div>
                <button
                  onClick={() => exportToCSV(processedData.clientesRecorrentes, 'clientes-recorrentes')}
                  className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors text-sm font-medium border border-green-500/30"
                >
                  Exportar
                </button>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {processedData.clientesRecorrentes.slice(0, 10).map((cliente, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-white">{cliente.nome}</p>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          cliente.clienteAtivo ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {cliente.clienteAtivo ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-2">
                      <div>
                        <p><strong>Pedidos:</strong> {cliente.totalPedidos}</p>
                        <p><strong>Total Gasto:</strong> R$ {cliente.totalGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      </div>
                      <div>
                        <p><strong>Intervalo Médio:</strong> {cliente.intervaloMedioPedidos} dias</p>
                        <p><strong>Último Pedido:</strong> {new Date(cliente.ultimoPedido).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      <p><strong>Email:</strong> {cliente.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carrinho Abandonado */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl mr-3">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Carrinho Abandonado</h3>
                    <p className="text-sm text-gray-400">Clientes que enviaram projeto mas não finalizaram</p>
                  </div>
                </div>
                <button
                  onClick={() => exportToCSV(processedData.carrinhoAbandonadoClientes, 'carrinho-abandonado')}
                  className="px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-lg hover:bg-yellow-500/30 transition-colors text-sm font-medium border border-yellow-500/30"
                >
                  Exportar
                </button>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {processedData.carrinhoAbandonadoClientes.slice(0, 10).map((cliente, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-white">{cliente.nome}</p>
                      <p className="font-bold text-lg text-yellow-400">
                        R$ {cliente.valorCarrinho.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-2">
                      <div>
                        <p><strong>Dias Abandonado:</strong> {cliente.diasAbandonado}</p>
                        <p><strong>Data Cadastro:</strong> {new Date(cliente.dataCadastro).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div>
                        <p><strong>Última Modificação:</strong> {new Date(cliente.dataUltimaModificacao).toLocaleDateString('pt-BR')}</p>
                        <p><strong>Urgência:</strong> <span className={`px-2 py-1 rounded text-xs ${
                          cliente.diasAbandonado > 7 ? 'bg-red-500/20 text-red-400' : 
                          cliente.diasAbandonado > 3 ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {cliente.diasAbandonado > 7 ? 'Alta' : cliente.diasAbandonado > 3 ? 'Média' : 'Baixa'}
                        </span></p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      <p><strong>Email:</strong> {cliente.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aguardando Vendedor */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-3">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Aguardando Retorno do Vendedor</h3>
                    <p className="text-sm text-gray-400">Projetos enviados para análise de vendedores</p>
                  </div>
                </div>
                <button
                  onClick={() => exportToCSV(processedData.clientesAguardandoVendedor, 'aguardando-vendedor')}
                  className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium border border-blue-500/30"
                >
                  Exportar
                </button>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {processedData.clientesAguardandoVendedor.slice(0, 10).map((cliente, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-white">{cliente.nome}</p>
                      <p className="font-bold text-lg text-blue-400">
                        R$ {cliente.valorProjeto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-2">
                      <div>
                        <p><strong>Dias Aguardando:</strong> {cliente.diasAguardando}</p>
                        <p><strong>Data Envio:</strong> {new Date(cliente.dataEnvio).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div>
                        <p><strong>Urgência:</strong> <span className={`px-2 py-1 rounded text-xs ${
                          cliente.urgencia === 'Alta' ? 'bg-red-500/20 text-red-400' : 
                          cliente.urgencia === 'Média' ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-green-500/20 text-green-400'
                        }`}>{cliente.urgencia}</span></p>
                        <p><strong>SLA:</strong> {cliente.diasAguardando > 3 ? '⚠️ Atrasado' : '✅ No prazo'}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      <p><strong>Email:</strong> {cliente.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'funil':
        return (
          <div className="space-y-8">
            {/* Funil de Status Detalhado */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mr-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Funil Completo de Vendas</h3>
                  <p className="text-sm text-gray-400">Fluxo completo desde o projeto até a entrega</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {processedData.funil.map((status, index) => {
                  const getStatusColor = (statusName: string) => {
                    const lower = statusName.toLowerCase();
                    if (lower.includes('aguardando aprovação')) return 'border-yellow-500/30 bg-yellow-500/10';
                    if (lower.includes('aguardando retorno')) return 'border-blue-500/30 bg-blue-500/10';
                    if (lower.includes('aprovado')) return 'border-purple-500/30 bg-purple-500/10';
                    if (lower.includes('finalizado')) return 'border-green-500/30 bg-green-500/10';
                    if (lower.includes('entregue')) return 'border-teal-500/30 bg-teal-500/10';
                    if (lower.includes('cancelado')) return 'border-red-500/30 bg-red-500/10';
                    return 'border-gray-500/30 bg-gray-500/10';
                  };

                  const getStatusIcon = (statusName: string) => {
                    const lower = statusName.toLowerCase();
                    if (lower.includes('aguardando aprovação')) return '⏳';
                    if (lower.includes('aguardando retorno')) return '👤';
                    if (lower.includes('aprovado')) return '✅';
                    if (lower.includes('finalizado')) return '📦';
                    if (lower.includes('entregue')) return '🚚';
                    if (lower.includes('cancelado')) return '❌';
                    return '📋';
                  };

                  return (
                    <div key={index} className={`p-4 rounded-xl border ${getStatusColor(status.status)}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{getStatusIcon(status.status)}</span>
                          <h4 className="font-semibold text-white text-sm">{status.status}</h4>
                        </div>
                        <span className="text-lg font-bold text-white">{status.quantidade}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Percentual:</span>
                          <span className="text-purple-300 font-medium">{status.percentual.toFixed(1)}%</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Valor Total:</span>
                          <span className="text-green-400 font-medium">
                            R$ {status.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
                            style={{ width: `${status.percentual}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Clientes Aprovados */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mr-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Pedidos Aprovados</h3>
                    <p className="text-sm text-gray-400">Projetos pagos e em produção</p>
                  </div>
                </div>
                <button
                  onClick={() => exportToCSV(processedData.clientesAprovados, 'pedidos-aprovados')}
                  className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors text-sm font-medium border border-purple-500/30"
                >
                  Exportar
                </button>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {processedData.clientesAprovados.slice(0, 10).map((cliente, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-white">{cliente.nome}</p>
                      <p className="font-bold text-lg text-purple-400">
                        R$ {cliente.valorPedido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-2">
                      <div>
                        <p><strong>Dias Aprovado:</strong> {cliente.diasAprovado}</p>
                        <p><strong>Data Aprovação:</strong> {new Date(cliente.dataAprovacao).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div>
                        <p><strong>Status Produção:</strong> <span className={`px-2 py-1 rounded text-xs ${
                          cliente.statusProducao === 'Atraso' ? 'bg-red-500/20 text-red-400' :
                          cliente.statusProducao === 'Atenção' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>{cliente.statusProducao}</span></p>
                        <p><strong>Prazo:</strong> {cliente.diasAprovado <= 10 ? '✅ No prazo' : cliente.diasAprovado <= 15 ? '⚠️ Atenção' : '🚨 Atrasado'}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      <p><strong>Email:</strong> {cliente.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clientes Cancelados */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl mr-3">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Pedidos Cancelados</h3>
                    <p className="text-sm text-gray-400">Projetos que foram cancelados</p>
                  </div>
                </div>
                <button
                  onClick={() => exportToCSV(processedData.clientesCancelados, 'pedidos-cancelados')}
                  className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium border border-red-500/30"
                >
                  Exportar
                </button>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {processedData.clientesCancelados.map((cliente, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-white">{cliente.nome}</p>
                      <p className="font-bold text-lg text-red-400">
                        R$ {cliente.valorPerdido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-2">
                      <div>
                        <p><strong>Cancelamentos:</strong> {cliente.pedidosCancelados}</p>
                        <p><strong>Último Cancelamento:</strong> {new Date(cliente.ultimoCancelamento).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div>
                        <p><strong>Dias Desde Cancelamento:</strong> {cliente.diasUltimoCancelamento}</p>
                        <p><strong>Status:</strong> <span className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-400">Requer atenção</span></p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      <p><strong>Email:</strong> {cliente.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'ai-insights':
        return <PlanoCorteAIInsights data={processedData} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Efeitos de fundo futurísticos */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-slate-900/60 to-slate-900"></div>
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:60px_60px]"></div>
      
      {/* Orbes flutuantes */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Header */}
      <header className="relative bg-white/5 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors mr-4"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="p-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl mr-4 shadow-2xl relative">
                <Target className="w-10 h-10 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Plano de Corte CRM
                </h1>
                <p className="text-sm text-gray-300 flex items-center mt-1">
                  <Brain className="w-4 h-4 mr-2" />
                  Análise completa do funil: Projeto → Aprovação → Produção → Entrega
                </p>
              </div>
            </div>
            
            {hasData && (
              <div className="flex items-center space-x-6 text-sm text-gray-300">
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                  <Package className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium">{processedData.totalPedidos}</span>
                  <span>pedidos</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-green-400 font-medium">{processedData.entregues}</span>
                  <span>entregues</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                  <span className="text-yellow-400 font-medium">{processedData.aguardandoAprovacao}</span>
                  <span>pendentes</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!hasData ? (
          /* Interface Inicial */
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-3xl mb-8 shadow-2xl relative">
                <Target className="w-14 h-14 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
              </div>
              
              <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Otimize seu
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block mt-2">
                  funil de vendas
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Sistema especializado para análise do Plano de Corte. Acompanhe todo o fluxo: 
                desde o projeto enviado pelo cliente até a entrega final, passando por aprovação, 
                produção e todos os pontos críticos do seu negócio.
              </p>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto mb-12 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Fluxo Completo do Plano de Corte</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <span className="text-xl">⏳</span>
                    <div>
                      <p className="text-sm font-medium text-yellow-300">Aguardando Aprovação</p>
                      <p className="text-xs text-gray-400">Cliente enviou projeto, carrinho abandonado</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <span className="text-xl">👤</span>
                    <div>
                      <p className="text-sm font-medium text-blue-300">Aguardando Vendedor</p>
                      <p className="text-xs text-gray-400">Projeto enviado para análise do vendedor</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <span className="text-xl">✅</span>
                    <div>
                      <p className="text-sm font-medium text-purple-300">Aprovado</p>
                      <p className="text-xs text-gray-400">Cliente pagou, projeto em produção</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <span className="text-xl">📦</span>
                    <div>
                      <p className="text-sm font-medium text-green-300">Finalizado</p>
                      <p className="text-xs text-gray-400">Pronto na fábrica, aguardando entrega</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <span className="text-xl">🚚</span>
                    <div>
                      <p className="text-sm font-medium text-teal-300">Entregue</p>
                      <p className="text-xs text-gray-400">Entregue ao transportador ou cliente</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <span className="text-xl">❌</span>
                    <div>
                      <p className="text-sm font-medium text-red-300">Cancelado</p>
                      <p className="text-xs text-gray-400">Projeto cancelado em qualquer etapa</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-6 mb-12">
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-500/30">
                  <Target className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium text-sm">Funil Completo</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30">
                  <Zap className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 font-medium text-sm">Análise Excel</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/30">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-medium text-sm">IA Insights</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="order-1 lg:order-2 space-y-8">
                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
                  
                  <div className="text-center mb-6 relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-2xl">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Carregar Dados Excel
                    </h3>
                    <p className="text-gray-300">
                      Faça upload da sua planilha Excel (.xlsx) com os dados do Plano de Corte
                    </p>
                  </div>

                  <PlanoCorteFileUpload 
                    onFileLoad={loadExcelData} 
                    onSampleDownload={downloadSampleExcel} 
                    hasData={hasData} 
                  />
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                  
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-3 shadow-lg">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Modelo de Planilha Excel</h3>
                        <p className="text-sm text-gray-300">Baixe o exemplo com os status corretos</p>
                      </div>
                    </div>
                    <button
                      onClick={downloadSampleExcel}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 group"
                    >
                      <Package className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Baixar
                    </button>
                  </div>
                </div>
              </div>

              <div className="order-2 lg:order-1">
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-8 shadow-2xl border-4 border-gray-700 relative overflow-hidden">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-600/20 via-transparent to-gray-800/20 pointer-events-none"></div>
                  
                  <div className="bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 rounded-2xl p-6 h-80 relative overflow-hidden border border-purple-500/20">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-blue-500/10"></div>
                    
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl mr-3 flex items-center justify-center shadow-lg">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Plano de Corte
                          </h3>
                          <p className="text-xs text-gray-400">Funil de Vendas</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-1.5 rounded-lg bg-teal-500/20 border border-white/10">
                            <UserCheck className="w-4 h-4 text-teal-400" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-1">Entregues</p>
                        <p className="text-sm font-bold text-teal-400">429</p>
                      </div>

                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-1.5 rounded-lg bg-green-500/20 border border-white/10">
                            <Package className="w-4 h-4 text-green-400" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-1">Finalizados</p>
                        <p className="text-sm font-bold text-green-400">187</p>
                      </div>

                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-1.5 rounded-lg bg-purple-500/20 border border-white/10">
                            <CheckCircle className="w-4 h-4 text-purple-400" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-1">Aprovados</p>
                        <p className="text-sm font-bold text-purple-400">93</p>
                      </div>

                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-1.5 rounded-lg bg-yellow-500/20 border border-white/10">
                            <XCircle className="w-4 h-4 text-yellow-400" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-1">Pendentes</p>
                        <p className="text-sm font-bold text-yellow-400">156</p>
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 h-32 relative overflow-hidden border border-white/10">
                      <div className="flex items-end justify-between h-full relative z-10 px-2">
                        {[...Array(8)].map((_, i) => {
                          const height = 20 + Math.sin((Date.now() / 1000 + i) * 0.8) * 25;
                          return (
                            <div 
                              key={i}
                              className="bg-gradient-to-t from-purple-500 via-purple-400 to-purple-300 rounded-t-sm transition-all duration-1000"
                              style={{ 
                                width: '8px',
                                height: `${height}px`,
                                boxShadow: '0 0 10px #a855f740'
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Dashboard Principal */
          <div className="space-y-8">
            {/* Navegação por Abas */}
            <div className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-blue-500/10"></div>
              
              <div className="p-8 border-b border-white/10 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl mr-4 shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Análises do Plano de Corte
                      </h2>
                      <p className="text-gray-300 flex items-center mt-1">
                        <Zap className="w-4 h-4 mr-2" />
                        Acompanhe todo o funil: Projeto → Aprovação → Produção → Entrega
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`group p-4 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden ${
                        activeTab === tab.id
                          ? 'border-purple-500/50 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-purple-500/20 text-white shadow-lg shadow-purple-500/25'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:border-purple-400/30 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-blue-500/10 hover:text-white'
                      }`}
                    >
                      <div className="relative z-10">
                        <div className="flex items-center mb-3">
                          <div className={`p-2 rounded-xl mr-3 transition-all duration-300 ${
                            activeTab === tab.id 
                              ? 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg' 
                              : 'bg-white/10 group-hover:bg-gradient-to-r group-hover:from-purple-500/50 group-hover:to-blue-500/50'
                          }`}>
                            {tab.icon}
                          </div>
                          <span className="font-semibold text-sm">{tab.label}</span>
                        </div>
                      </div>

                      {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-b-2xl"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filtros */}
            <PlanoCorteFiltersComponent 
              filters={filters}
              onFiltersChange={setFilters}
              availableStatus={availableStatus}
            />

            {/* Conteúdo da Aba Ativa */}
            {renderTabContent()}
          </div>
        )}
      </main>
    </div>
  );
};