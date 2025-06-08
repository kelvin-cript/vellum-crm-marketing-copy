import React from 'react';
import { BarChart3, Database, TrendingUp, Zap, Sparkles, Cpu, Brain, Target, Rocket, Star, Award } from 'lucide-react';
import { useDataProcessor } from './hooks/useDataProcessor';
import { FileUpload } from './components/FileUpload';
import { DateFilter } from './components/DateFilter';
import { ChannelFilter } from './components/ChannelFilter';
import { Dashboard } from './components/Dashboard';
import { LaptopMockup } from './components/LaptopMockup';

function App() {
  const { 
    processedData, 
    dateFilter, 
    setDateFilter, 
    channelFilter, 
    setChannelFilter, 
    availableChannels, 
    loadData, 
    clearData,
    exportToCSV,
    downloadSampleCSV,
    hasData 
  } = useDataProcessor();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Efeitos de fundo futurísticos aprimorados */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-slate-900/60 to-slate-900"></div>
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:60px_60px]"></div>
      
      {/* Orbes flutuantes com efeitos melhorados */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      <div className="absolute top-10 right-1/3 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-3000"></div>

      {/* Partículas flutuantes aprimoradas */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-70"></div>
      <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-50"></div>
      <div className="absolute top-1/2 right-1/6 w-4 h-4 bg-pink-400 rounded-full animate-bounce opacity-40"></div>
      <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>

      {/* Header futurístico aprimorado */}
      <header className="relative bg-white/5 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl mr-4 shadow-2xl relative">
                <BarChart3 className="w-10 h-10 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Vellum CRM Marketing
                </h1>
                <p className="text-sm text-gray-300 flex items-center mt-1">
                  <Brain className="w-4 h-4 mr-2" />
                  Clareza para vender com inteligência
                </p>
              </div>
            </div>
            
            {hasData && (
              <div className="flex items-center space-x-6 text-sm text-gray-300">
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                  <Database className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium">{processedData.totalOrders + processedData.cancelledOrders}</span>
                  <span>registros</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-emerald-400 font-medium">{processedData.totalOrders}</span>
                  <span>faturados</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                  <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                  <span className="text-red-400 font-medium">{processedData.cancelledOrders}</span>
                  <span>cancelados</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!hasData ? (
          /* Interface Inicial Futurística Aprimorada */
          <div className="max-w-6xl mx-auto">
            {/* Hero Section Aprimorada */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-3xl mb-8 shadow-2xl relative">
                <Brain className="w-14 h-14 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
                {/* Partículas orbitais */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 -left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
              
              <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Transforme dados em
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block mt-2">
                  decisões inteligentes
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Plataforma de análise com inteligência artificial que revela oportunidades ocultas, 
                otimiza vendas e acelera o crescimento do seu negócio com insights precisos e acionáveis
              </p>

              {/* Badges de credibilidade */}
              <div className="flex items-center justify-center space-x-6 mb-12">
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-500/30">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium text-sm">IA Avançada</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30">
                  <Rocket className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 font-medium text-sm">Tempo Real</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/30">
                  <Star className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-medium text-sm">Resultados Garantidos</span>
                </div>
              </div>
              
              {/* Features Grid Futurísticas Aprimoradas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg relative z-10">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-3 text-lg relative z-10">Análise Preditiva</h3>
                  <p className="text-sm text-gray-400 relative z-10">IA que antecipa tendências e oportunidades</p>
                </div>
                
                <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg relative z-10">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-3 text-lg relative z-10">Insights Instantâneos</h3>
                  <p className="text-sm text-gray-400 relative z-10">Resultados em segundos, não em horas</p>
                </div>
                
                <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg relative z-10">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-3 text-lg relative z-10">Automação Inteligente</h3>
                  <p className="text-sm text-gray-400 relative z-10">Campanhas que se otimizam sozinhas</p>
                </div>

                <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg relative z-10">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-3 text-lg relative z-10">Crescimento Acelerado</h3>
                  <p className="text-sm text-gray-400 relative z-10">ROI comprovado em 30 dias</p>
                </div>
              </div>
            </div>

            {/* Headline Persuasiva no Espaço dos Filtros */}
            <div className="text-center mb-16 relative">
              <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-12 border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-blue-500/20"></div>
                
                {/* Partículas decorativas */}
                <div className="absolute top-6 left-6 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute top-8 right-8 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-50"></div>
                <div className="absolute bottom-6 left-1/3 w-4 h-4 bg-pink-400 rounded-full animate-bounce opacity-40"></div>
                
                <div className="relative z-10">
                  <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                    Pare de Adivinhar.
                    <span className="block">Comece a Vender com Certeza.</span>
                  </h3>
                  
                  <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                    Cada decisão baseada em dados reais. Cada campanha otimizada por IA. 
                    Cada cliente convertido com precisão cirúrgica.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
                      <div className="text-3xl font-bold text-emerald-400 mb-2">+127%</div>
                      <div className="text-sm text-gray-400">Aumento médio em vendas</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
                      <div className="text-3xl font-bold text-blue-400 mb-2">-68%</div>
                      <div className="text-sm text-gray-400">Redução em cancelamentos</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                      <div className="text-3xl font-bold text-purple-400 mb-2">30 dias</div>
                      <div className="text-sm text-gray-400">Para ver resultados</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid - Layout Melhorado */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* MacBook Mockup Moderno */}
              <div className="order-2 lg:order-1">
                <LaptopMockup />
              </div>

              {/* Upload Section Futurística - Mais Compacta */}
              <div className="order-1 lg:order-2 space-y-8">
                {/* Carregar Dados - Compacto */}
                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
                  <div className="absolute top-4 right-4 w-16 h-16 bg-purple-500/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-blue-500/10 rounded-full blur-xl"></div>
                  
                  <div className="text-center mb-6 relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-2xl">
                      <Database className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Carregar Dados
                    </h3>
                    <p className="text-gray-300">
                      Faça upload da sua planilha e descubra insights poderosos
                    </p>
                  </div>

                  <FileUpload 
                    onFileLoad={loadData} 
                    onSampleDownload={downloadSampleCSV} 
                    hasData={hasData} 
                  />

                  {/* Stats Preview Compactas */}
                  <div className="mt-6 grid grid-cols-3 gap-4 relative z-10">
                    <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">15+</div>
                      <div className="text-xs text-gray-400 mt-1">Métricas</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">8</div>
                      <div className="text-xs text-gray-400 mt-1">Análises</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                      <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">AI</div>
                      <div className="text-xs text-gray-400 mt-1">Insights</div>
                    </div>
                  </div>
                </div>

                {/* Modelo de Planilha - Mais Compacto */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                  
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-3 shadow-lg">
                        <Database className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Modelo de Planilha</h3>
                        <p className="text-sm text-gray-300">Baixe o exemplo com as colunas corretas</p>
                      </div>
                    </div>
                    <button
                      onClick={downloadSampleCSV}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 group"
                    >
                      <Database className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Baixar
                    </button>
                  </div>

                  <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20 backdrop-blur-sm relative z-10">
                    <div className="text-xs text-blue-300">
                      <p className="font-medium mb-2 flex items-center">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Colunas principais necessárias:
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-gray-400">
                        <div>
                          <p><strong className="text-blue-400">Order:</strong> Número do pedido</p>
                          <p><strong className="text-blue-400">Creation Date:</strong> Data (YYYY-MM-DD)</p>
                          <p><strong className="text-blue-400">Client Name:</strong> Nome do cliente</p>
                          <p><strong className="text-blue-400">Status:</strong> Faturado/Cancelado</p>
                        </div>
                        <div>
                          <p><strong className="text-purple-400">SKU Name:</strong> Nome do produto</p>
                          <p><strong className="text-purple-400">SKU Total Price:</strong> Valor total</p>
                          <p><strong className="text-purple-400">Email:</strong> Email do cliente</p>
                          <p><strong className="text-purple-400">City:</strong> Cidade do cliente</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Dashboard Principal Futurístico */
          <div className="space-y-8">
            {/* Headline Persuasiva para Dashboard Ativo */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-blue-500/20"></div>
                
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    Seus Dados Estão Falando. Você Está Ouvindo?
                  </h2>
                  <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                    Cada métrica conta uma história. Cada insight revela uma oportunidade. 
                    Transforme números em estratégias vencedoras.
                  </p>
                </div>
              </div>
            </div>

            {/* Controles - Layout Reorganizado conforme a imagem */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Coluna da Esquerda: Filtros */}
              <div className="lg:col-span-2 space-y-6">
                {/* Filtros de Período */}
                <DateFilter dateFilter={dateFilter} onDateFilterChange={setDateFilter} />
                
                {/* Filtros por Canal */}
                <ChannelFilter 
                  channelFilter={channelFilter} 
                  onChannelFilterChange={setChannelFilter}
                  availableChannels={availableChannels}
                />
              </div>
              
              {/* Coluna da Direita: Gerenciar Dados */}
              <div className="lg:col-span-1">
                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 border border-white/10 relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                  <div className="text-center relative z-10 h-full flex flex-col justify-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg mx-auto">
                      <Database className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Gerenciar Dados</h3>
                    <FileUpload 
                      onFileLoad={loadData} 
                      onSampleDownload={downloadSampleCSV} 
                      onClearData={clearData}
                      hasData={hasData} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard */}
            <Dashboard data={processedData} onExport={exportToCSV} />
          </div>
        )}
      </main>

      {/* Footer Futurístico */}
      <footer className="relative bg-white/5 backdrop-blur-2xl border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl mr-4 shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Vellum CRM Marketing
              </h3>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              © 2025 Vellum CRM Marketing. Sistema inteligente para análise de vendas, cancelamentos e identificação de oportunidades com tecnologia de inteligência artificial avançada.
            </p>
            <div className="flex items-center justify-center mt-6 space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-2" />
                <span>Análise Preditiva</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                <span>Tempo Real</span>
              </div>
              <div className="flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                <span>IA Avançada</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;