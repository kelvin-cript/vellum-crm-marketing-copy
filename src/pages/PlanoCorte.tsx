import React, { useState } from 'react';
import { ArrowLeft, BarChart3, Users, Package, TrendingUp, DollarSign, XCircle, Clock, AlertTriangle, Target, Brain, Zap } from 'lucide-react';
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

            {/* Métricas de Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <PlanoCorteMetricCard
                title="Pedidos Finalizados"
                value={processedData.pedidosFinalizados.toLocaleString('pt-BR')}
                icon={<Package className="w-6 h-6 text-white" />}
                color="green"
                percentage={(processedData.pedidosFinalizados / processedData.totalPedidos) * 100}
                onExport={() => exportToCSV([{ finalizados: processedData.pedidosFinalizados }], 'pedidos-finalizados')}
              />

              <PlanoCorteMetricCard
                title="Carrinho Abandonado"
                value={processedData.carrinhoAbandonado.toLocaleString('pt-BR')}
                icon={<XCircle className="w-6 h-6 text-white" />}
                color="yellow"
                percentage={(processedData.carrinhoAbandonado / processedData.totalPedidos) * 100}
                onExport={() => exportToCSV(processedData.carrinhoAbandonadoClientes, 'carrinho-abandonado')}
              />

              <PlanoCorteMetricCard
                title="Aguardando Vendedor"
                value={processedData.aguardandoVendedor.toLocaleString('pt-BR')}
                icon={<Clock className="w-6 h-6 text-white" />}
                color="blue"
                percentage={(processedData.aguardandoVendedor / processedData.totalPedidos) * 100}
                onExport={() => exportToCSV([{ aguardandoVendedor: processedData.aguardandoVendedor }], 'aguardando-vendedor')}
              />

              <PlanoCorteMetricCard
                title="Configurando Arquivo"
                value={processedData.configurandoArquivo.toLocaleString('pt-BR')}
                icon={<AlertTriangle className="w-6 h-6 text-white" />}
                color="purple"
                percentage={(processedData.configurandoArquivo / processedData.totalPedidos) * 100}
                onExport={() => exportToCSV(processedData.clientesConfigurandoArquivo, 'configurando-arquivo')}
              />

              <PlanoCorteMetricCard
                title="Cancelados"
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
                value={`${processedData.taxaConversao.toFixed(1)}%`}
                icon={<TrendingUp className="w-6 h-6 text-white" />}
                color="green"
                trend={processedData.taxaConversao > 50 ? 'up' : 'down'}
                trendValue={processedData.taxaConversao > 50 ? 'Boa' : 'Pode melhorar'}
              />

              <PlanoCorteMetricCard
                title="Taxa de Cancelamento"
                value={`${processedData.taxaCancelamento.toFixed(1)}%`}
                icon={<XCircle className="w-6 h-6 text-white" />}
                color="red"
                trend={processedData.taxaCancelamento < 10 ? 'up' : 'down'}
                trendValue={processedData.taxaCancelamento < 10 ? 'Baixa' : 'Alta'}
              />

              <PlanoCorteMetricCard
                title="Valor Perdido (Cancelamentos)"
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
                    <p className="text-sm text-gray-400">Clientes com maior valor total gasto</p>
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
                        <p><strong>Status:</strong> {cliente.statusUltimoPedido}</p>
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
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Carrinho Abandonado</h3>
                    <p className="text-sm text-gray-400">Clientes que abandonaram o carrinho</p>
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
                        <p><strong>Urgência:</strong> {cliente.diasAbandonado > 7 ? 'Alta' : cliente.diasAbandonado > 3 ? 'Média' : 'Baixa'}</p>
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
            {/* Funil de Status */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mr-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Funil de Vendas por Status</h3>
                  <p className="text-sm text-gray-400">Distribuição de pedidos por status</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {processedData.funil.map((status, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-white text-sm">{status.status}</h4>
                      <span className="text-lg font-bold text-purple-400">{status.quantidade}</span>
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
                ))}
              </div>
            </div>

            {/* Clientes Configurando Arquivo */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mr-3">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Clientes Configurando Arquivo</h3>
                    <p className="text-sm text-gray-400">Clientes com dificuldade na configuração</p>
                  </div>
                </div>
                <button
                  onClick={() => exportToCSV(processedData.clientesConfigurandoArquivo, 'configurando-arquivo')}
                  className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors text-sm font-medium border border-purple-500/30"
                >
                  Exportar
                </button>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {processedData.clientesConfigurandoArquivo.map((cliente, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-white">{cliente.nome}</p>
                      <p className="font-bold text-lg text-purple-400">
                        R$ {cliente.valorProjeto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-2">
                      <div>
                        <p><strong>Dias Tentando:</strong> {cliente.diasTentandoConfigurar}</p>
                        <p><strong>Tentativas:</strong> {cliente.tentativasConfiguracao}</p>
                      </div>
                      <div>
                        <p><strong>Última Tentativa:</strong> {new Date(cliente.dataUltimaTentativa).toLocaleDateString('pt-BR')}</p>
                        <p><strong>Prioridade:</strong> {cliente.diasTentandoConfigurar > 5 ? 'Alta' : 'Média'}</p>
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
                    <h3 className="text-xl font-bold text-white">Clientes com Cancelamentos</h3>
                    <p className="text-sm text-gray-400">Clientes que cancelaram pedidos</p>
                  </div>
                </div>
                <button
                  onClick={() => exportToCSV(processedData.clientesCancelados, 'clientes-cancelados')}
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
                        <p><strong>Status:</strong> Requer atenção</p>
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
                  Análise completa do funil de vendas com IA
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
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-emerald-400 font-medium">{processedData.pedidosFinalizados}</span>
                  <span>finalizados</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                  <span className="text-yellow-400 font-medium">{processedData.carrinhoAbandonado}</span>
                  <span>abandonados</span>
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
                Sistema especializado para análise do Plano de Corte com métricas avançadas de conversão, 
                carrinho abandonado, configuração de arquivos e insights de IA para maximizar suas vendas
              </p>

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
                      Faça upload da sua planilha Excel (.xlsx) e descubra insights poderosos
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
                        <p className="text-sm text-gray-300">Baixe o exemplo com as colunas corretas</p>
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
                          <p className="text-xs text-gray-400">Análise de Funil</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-1.5 rounded-lg bg-green-500/20 border border-white/10">
                            <Package className="w-4 h-4 text-green-400" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-1">Finalizados</p>
                        <p className="text-sm font-bold text-green-400">847</p>
                      </div>

                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-1.5 rounded-lg bg-yellow-500/20 border border-white/10">
                            <XCircle className="w-4 h-4 text-yellow-400" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-1">Abandonados</p>
                        <p className="text-sm font-bold text-yellow-400">234</p>
                      </div>

                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-1.5 rounded-lg bg-blue-500/20 border border-white/10">
                            <Clock className="w-4 h-4 text-blue-400" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-1">Aguardando</p>
                        <p className="text-sm font-bold text-blue-400">156</p>
                      </div>

                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-1.5 rounded-lg bg-purple-500/20 border border-white/10">
                            <AlertTriangle className="w-4 h-4 text-purple-400" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-1">Configurando</p>
                        <p className="text-sm font-bold text-purple-400">89</p>
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
                        Navegue pelas diferentes análises do seu funil
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