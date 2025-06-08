import React from 'react';
import { TrendingUp, TrendingDown, Minus, Store, Zap, AlertTriangle, Target, BarChart3 } from 'lucide-react';
import { ChannelGrowthMetric } from '../types';

interface ChannelGrowthSectionProps {
  channelGrowth: ChannelGrowthMetric[];
  onExport: (data: any[], filename: string) => void;
}

export const ChannelGrowthSection: React.FC<ChannelGrowthSectionProps> = ({ 
  channelGrowth, 
  onExport 
}) => {
  const getGrowthIcon = (direction: string) => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-400" />;
      default:
        return <Minus className="w-5 h-5 text-gray-400" />;
    }
  };

  const getGrowthColor = (direction: string, rate: number) => {
    if (direction === 'up') {
      if (rate > 20) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      return 'text-green-400 bg-green-500/10 border-green-500/30';
    }
    if (direction === 'down') {
      if (rate < -20) return 'text-red-400 bg-red-500/10 border-red-500/30';
      return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
    }
    return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
  };

  const getPerformanceLevel = (rate: number) => {
    if (rate > 30) return { level: 'Excepcional', icon: <Zap className="w-4 h-4" />, color: 'text-emerald-400' };
    if (rate > 15) return { level: 'Excelente', icon: <TrendingUp className="w-4 h-4" />, color: 'text-green-400' };
    if (rate > 5) return { level: 'Bom', icon: <Target className="w-4 h-4" />, color: 'text-blue-400' };
    if (rate > -5) return { level: 'Estável', icon: <Minus className="w-4 h-4" />, color: 'text-gray-400' };
    if (rate > -15) return { level: 'Atenção', icon: <AlertTriangle className="w-4 h-4" />, color: 'text-orange-400' };
    return { level: 'Crítico', icon: <TrendingDown className="w-4 h-4" />, color: 'text-red-400' };
  };

  const getChannelIcon = (channelName: string) => {
    switch (channelName) {
      case 'Mercado Livre':
        return '🛒';
      case 'Madeira Madeira':
        return '🏠';
      case 'Magazine Luiza':
        return '🏪';
      case 'Leroy Merlin':
        return '🔨';
      default:
        return '🌐';
    }
  };

  // Análise comparativa entre canais
  const bestPerformer = channelGrowth.reduce((best, current) => 
    current.growthRate > best.growthRate ? current : best
  , channelGrowth[0] || { growthRate: -Infinity });

  const worstPerformer = channelGrowth.reduce((worst, current) => 
    current.growthRate < worst.growthRate ? current : worst
  , channelGrowth[0] || { growthRate: Infinity });

  const averageGrowth = channelGrowth.length > 0 
    ? channelGrowth.reduce((sum, channel) => sum + channel.growthRate, 0) / channelGrowth.length 
    : 0;

  return (
    <div className="bg-gradient-to-br from-slate-900/50 via-purple-900/20 to-slate-900/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-purple-500/20 relative overflow-hidden">
      {/* Efeitos de fundo futurísticos */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-blue-500/10"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      
      {/* Partículas flutuantes */}
      <div className="absolute top-8 right-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-16 left-12 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-40"></div>
      <div className="absolute bottom-20 right-16 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-30"></div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center">
          <div className="p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl mr-4 shadow-lg">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Análise de Crescimento por Canal
            </h3>
            <p className="text-gray-300 mt-1">Comparação inteligente de performance e tendências</p>
          </div>
        </div>
        <button
          onClick={() => onExport(channelGrowth, 'crescimento-canais')}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Exportar Análise
        </button>
      </div>

      {/* Resumo Executivo */}
      {channelGrowth.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-right">
                <p className="text-emerald-400 text-2xl font-bold">#{channelGrowth.findIndex(c => c.channelName === bestPerformer.channelName) + 1}</p>
                <p className="text-xs text-gray-400">Ranking</p>
              </div>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Melhor Performance</h4>
            <p className="text-emerald-400 font-semibold">{bestPerformer.channelName}</p>
            <p className="text-2xl font-bold text-emerald-400 mt-2">+{bestPerformer.growthRate.toFixed(1)}%</p>
            <p className="text-xs text-gray-400 mt-1">Crescimento em pedidos</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-right">
                <p className="text-blue-400 text-2xl font-bold">{channelGrowth.length}</p>
                <p className="text-xs text-gray-400">Canais</p>
              </div>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Média Geral</h4>
            <p className="text-blue-400 font-semibold">Todos os Canais</p>
            <p className={`text-2xl font-bold mt-2 ${averageGrowth >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>
              {averageGrowth >= 0 ? '+' : ''}{averageGrowth.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-400 mt-1">Crescimento médio</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-500/20 rounded-xl">
                <TrendingDown className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-right">
                <p className="text-red-400 text-2xl font-bold">#{channelGrowth.findIndex(c => c.channelName === worstPerformer.channelName) + 1}</p>
                <p className="text-xs text-gray-400">Ranking</p>
              </div>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Precisa Atenção</h4>
            <p className="text-red-400 font-semibold">{worstPerformer.channelName}</p>
            <p className="text-2xl font-bold text-red-400 mt-2">{worstPerformer.growthRate.toFixed(1)}%</p>
            <p className="text-xs text-gray-400 mt-1">Variação em pedidos</p>
          </div>
        </div>
      )}
      
      {/* Cards dos Canais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {channelGrowth.map((channel, index) => {
          const performance = getPerformanceLevel(channel.growthRate);
          const isTopPerformer = channel.channelName === bestPerformer.channelName;
          const isWorstPerformer = channel.channelName === worstPerformer.channelName;
          
          return (
            <div 
              key={index} 
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden ${
                isTopPerformer ? 'border-emerald-500/50 shadow-emerald-500/20' :
                isWorstPerformer ? 'border-red-500/50 shadow-red-500/20' :
                'border-white/10 hover:border-purple-500/30'
              }`}
              style={{
                boxShadow: isTopPerformer ? '0 0 30px rgba(16, 185, 129, 0.2)' :
                          isWorstPerformer ? '0 0 30px rgba(239, 68, 68, 0.2)' : 'none'
              }}
            >
              {/* Badge de ranking */}
              <div className="absolute top-4 right-4">
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  index === 0 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  index === 1 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  index === 2 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                  'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  #{index + 1}
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{getChannelIcon(channel.channelName)}</span>
                  <div>
                    <h4 className="font-bold text-white text-lg">{channel.channelName}</h4>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getGrowthColor(channel.growthDirection, channel.growthRate)}`}>
                      {getGrowthIcon(channel.growthDirection)}
                      <span className="ml-1">{performance.level}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Métricas de Pedidos */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-300">Análise de Pedidos</span>
                    <div className={`p-2 rounded-lg ${performance.color.replace('text-', 'bg-').replace('400', '500/20')}`}>
                      {performance.icon}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Período Atual</p>
                      <p className="font-bold text-white text-lg">{channel.currentPeriodOrders}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Período Anterior</p>
                      <p className="font-bold text-gray-300 text-lg">{channel.previousPeriodOrders}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Variação em Pedidos</span>
                      <span className={`font-bold text-lg ${
                        channel.growthRate > 0 ? 'text-emerald-400' : 
                        channel.growthRate < 0 ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {channel.growthRate > 0 ? '+' : ''}{channel.growthRate.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Métricas de Receita */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-300">Análise de Receita</span>
                    <div className="text-2xl">💰</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Receita Atual</span>
                      <span className="font-bold text-emerald-400 text-lg">
                        R$ {channel.currentRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Crescimento Receita</span>
                      <span className={`font-bold text-lg ${
                        channel.revenueGrowthRate > 0 ? 'text-emerald-400' : 
                        channel.revenueGrowthRate < 0 ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {channel.revenueGrowthRate > 0 ? '+' : ''}{channel.revenueGrowthRate.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Comparação com Média */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-300">vs. Média Geral</span>
                    <div className="text-xl">📊</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Diferença da Média</span>
                      <span className={`font-bold text-sm ${
                        (channel.growthRate - averageGrowth) > 0 ? 'text-emerald-400' : 
                        (channel.growthRate - averageGrowth) < 0 ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {(channel.growthRate - averageGrowth) > 0 ? '+' : ''}{(channel.growthRate - averageGrowth).toFixed(1)}pp
                      </span>
                    </div>
                    
                    {/* Barra de progresso comparativa */}
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          channel.growthRate > averageGrowth ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
                          channel.growthRate < averageGrowth ? 'bg-gradient-to-r from-red-500 to-red-400' :
                          'bg-gradient-to-r from-gray-500 to-gray-400'
                        }`}
                        style={{ 
                          width: `${Math.min(Math.abs(channel.growthRate - averageGrowth) * 2, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Indicador de tendência */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-center">
                  <div className={`flex items-center px-4 py-2 rounded-full ${getGrowthColor(channel.growthDirection, channel.growthRate)}`}>
                    {getGrowthIcon(channel.growthDirection)}
                    <span className="ml-2 text-sm font-medium">
                      {channel.growthDirection === 'up' ? 'Em Crescimento' :
                       channel.growthDirection === 'down' ? 'Em Declínio' : 'Estável'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {channelGrowth.length === 0 && (
        <div className="text-center py-16 relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-500 to-gray-600 rounded-3xl mb-6">
            <Store className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Dados Insuficientes</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Para análise de crescimento, é necessário ter dados de períodos anteriores para comparação.
          </p>
        </div>
      )}
    </div>
  );
};