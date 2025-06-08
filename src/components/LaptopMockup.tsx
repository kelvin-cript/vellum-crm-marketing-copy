import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Package, TrendingUp, DollarSign, Zap, Brain, Target } from 'lucide-react';

export const LaptopMockup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMetric, setCurrentMetric] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0.5);

  useEffect(() => {
    // Animação de entrada
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Rotação das métricas
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % 6);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animação do brilho
    const glowInterval = setInterval(() => {
      setGlowIntensity(prev => prev === 0.5 ? 0.8 : 0.5);
    }, 3000);
    return () => clearInterval(glowInterval);
  }, []);

  const metrics = [
    { icon: <DollarSign className="w-5 h-5" />, label: 'Receita', value: 'R$ 2.847.392', color: 'text-emerald-400', bgColor: 'bg-emerald-500/20' },
    { icon: <Users className="w-5 h-5" />, label: 'Clientes', value: '1.247', color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
    { icon: <Package className="w-5 h-5" />, label: 'Produtos', value: '3.891', color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
    { icon: <TrendingUp className="w-5 h-5" />, label: 'Crescimento', value: '+24.5%', color: 'text-orange-400', bgColor: 'bg-orange-500/20' },
    { icon: <Brain className="w-5 h-5" />, label: 'IA Insights', value: '12', color: 'text-pink-400', bgColor: 'bg-pink-500/20' },
    { icon: <Target className="w-5 h-5" />, label: 'Conversão', value: '94.2%', color: 'text-cyan-400', bgColor: 'bg-cyan-500/20' }
  ];

  return (
    <div className={`relative transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      {/* MacBook Pro Moderno */}
      <div className="relative">
        {/* Tela do MacBook */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-t-3xl p-6 shadow-2xl border-4 border-gray-700 relative overflow-hidden">
          {/* Borda da tela com efeito metálico */}
          <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-br from-gray-600/20 via-transparent to-gray-800/20 pointer-events-none"></div>
          
          {/* Webcam e sensores */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-700 rounded-full border border-gray-600"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          </div>
          
          {/* Conteúdo da Tela */}
          <div className="bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 rounded-2xl p-6 h-80 relative overflow-hidden border border-purple-500/20">
            {/* Efeitos de fundo futurísticos */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-blue-500/10"></div>
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]"></div>
            
            {/* Partículas flutuantes */}
            <div className="absolute top-8 right-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-16 left-12 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-40"></div>
            <div className="absolute bottom-20 right-16 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-30"></div>
            <div className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-50"></div>
            
            {/* Header futurístico */}
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl mr-3 flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Vellum CRM
                  </h3>
                  <p className="text-xs text-gray-400">Análise Inteligente</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
              </div>
            </div>

            {/* Dashboard Cards Futurísticos */}
            <div className="grid grid-cols-3 gap-3 mb-6 relative z-10">
              {metrics.slice(0, 6).map((metric, index) => (
                <div 
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 transition-all duration-700 transform hover:scale-105 ${
                    currentMetric === index ? 'scale-105 shadow-lg border-purple-400/50 bg-white/10' : 'scale-100'
                  }`}
                  style={{
                    boxShadow: currentMetric === index ? `0 0 20px ${metric.color.replace('text-', '').replace('-400', '')}40` : 'none'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-1.5 rounded-lg ${metric.bgColor} border border-white/10`}>
                      <div className={metric.color}>
                        {metric.icon}
                      </div>
                    </div>
                    {currentMetric === index && (
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{metric.label}</p>
                  <p className={`text-sm font-bold ${metric.color}`}>{metric.value}</p>
                </div>
              ))}
            </div>

            {/* Gráfico Futurístico */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 h-32 relative overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-pink-500/5"></div>
              
              {/* Linhas de grade futurísticas */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" style={{ top: `${25 + i * 25}%` }}></div>
                ))}
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="absolute h-full w-px bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" style={{ left: `${16.66 + i * 16.66}%` }}></div>
                ))}
              </div>
              
              {/* Barras do gráfico com efeito neon */}
              <div className="flex items-end justify-between h-full relative z-10 px-2">
                {[...Array(12)].map((_, i) => {
                  const height = 20 + Math.sin((Date.now() / 1000 + i) * 0.8) * 25;
                  const glowColor = ['purple', 'blue', 'pink', 'cyan'][i % 4];
                  return (
                    <div 
                      key={i}
                      className={`bg-gradient-to-t from-${glowColor}-500 via-${glowColor}-400 to-${glowColor}-300 rounded-t-sm transition-all duration-1000 relative`}
                      style={{ 
                        width: '6px',
                        height: `${height}px`,
                        animationDelay: `${i * 0.1}s`,
                        boxShadow: `0 0 10px ${glowColor === 'purple' ? '#a855f7' : glowColor === 'blue' ? '#3b82f6' : glowColor === 'pink' ? '#ec4899' : '#06b6d4'}40`
                      }}
                    >
                      {/* Efeito de brilho no topo */}
                      <div className={`absolute -top-1 left-0 right-0 h-2 bg-${glowColor}-300 rounded-full blur-sm opacity-60`}></div>
                    </div>
                  );
                })}
              </div>
              
              {/* Linha de tendência */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 15 }}>
                <path
                  d="M 20 80 Q 60 60 100 70 T 180 50 T 260 45"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Indicadores de status futurísticos */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <div className="flex items-center space-x-1 bg-green-500/20 px-2 py-1 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">Online</span>
              </div>
              <div className="flex items-center space-x-1 bg-blue-500/20 px-2 py-1 rounded-full border border-blue-500/30">
                <Zap className="w-3 h-3 text-blue-400" />
                <span className="text-xs text-blue-400 font-medium">IA Ativa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Base do MacBook */}
        <div className="bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-b-3xl p-6 shadow-2xl relative overflow-hidden">
          {/* Efeito metálico na base */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 via-gray-500/20 to-gray-600/10 rounded-b-3xl"></div>
          
          <div className="bg-gray-700 rounded-2xl p-3 relative">
            {/* Teclado futurístico */}
            <div className="space-y-1.5">
              {/* Primeira fileira */}
              <div className="grid grid-cols-13 gap-1">
                {[...Array(13)].map((_, i) => (
                  <div key={i} className="bg-gray-600 rounded h-2.5 shadow-inner border border-gray-500/50"></div>
                ))}
              </div>
              {/* Segunda fileira */}
              <div className="grid grid-cols-12 gap-1">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-gray-600 rounded h-2.5 shadow-inner border border-gray-500/50"></div>
                ))}
              </div>
              {/* Terceira fileira */}
              <div className="grid grid-cols-11 gap-1">
                {[...Array(11)].map((_, i) => (
                  <div key={i} className="bg-gray-600 rounded h-2.5 shadow-inner border border-gray-500/50"></div>
                ))}
              </div>
              {/* Barra de espaço */}
              <div className="flex justify-center">
                <div className="bg-gray-600 rounded h-2.5 w-32 shadow-inner border border-gray-500/50"></div>
              </div>
            </div>
            
            {/* Trackpad futurístico */}
            <div className="bg-gray-600 rounded-xl h-8 w-20 mx-auto mt-3 shadow-inner border border-gray-500/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/30 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Efeito de brilho dinâmico */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-pink-500/20 rounded-3xl blur-2xl -z-10 transition-opacity duration-3000"
          style={{ opacity: glowIntensity }}
        ></div>
        
        {/* Reflexo na mesa */}
        <div className="absolute -bottom-6 left-4 right-4 h-6 bg-gradient-to-b from-gray-800/30 to-transparent rounded-full blur-lg"></div>
      </div>

      {/* Elementos flutuantes futurísticos */}
      <div className="absolute -top-6 -left-6 bg-gradient-to-br from-emerald-400/80 to-emerald-600/80 rounded-2xl shadow-lg p-3 animate-float backdrop-blur-sm border border-emerald-300/30">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-emerald-300 rounded-full animate-pulse shadow-lg"></div>
          <span className="text-sm font-bold text-white">+127 vendas</span>
        </div>
        <div className="text-xs text-emerald-100 mt-1">Tempo real</div>
      </div>

      <div className="absolute -top-4 -right-8 bg-gradient-to-br from-blue-400/80 to-blue-600/80 rounded-2xl shadow-lg p-3 animate-float-delayed backdrop-blur-sm border border-blue-300/30">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse shadow-lg"></div>
          <span className="text-sm font-bold text-white">R$ 45.2k</span>
        </div>
        <div className="text-xs text-blue-100 mt-1">Hoje</div>
      </div>

      <div className="absolute -bottom-6 left-12 bg-gradient-to-br from-purple-400/80 to-purple-600/80 rounded-2xl shadow-lg p-3 animate-float backdrop-blur-sm border border-purple-300/30">
        <div className="flex items-center space-x-2">
          <Brain className="w-4 h-4 text-purple-100" />
          <span className="text-sm font-bold text-white">IA Insights</span>
        </div>
        <div className="text-xs text-purple-100 mt-1">12 novos</div>
      </div>

      <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-pink-400/80 to-pink-600/80 rounded-2xl shadow-lg p-3 animate-float-delayed backdrop-blur-sm border border-pink-300/30">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-pink-100" />
          <span className="text-sm font-bold text-white">94.2%</span>
        </div>
        <div className="text-xs text-pink-100 mt-1">Conversão</div>
      </div>
    </div>
  );
};

// CSS personalizado para animações futurísticas
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-12px) rotate(1deg); }
  }
  
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(-1deg); }
  }
  
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float-delayed 4s ease-in-out infinite 2s;
  }
  
  .grid-cols-13 {
    grid-template-columns: repeat(13, minmax(0, 1fr));
  }
`;
document.head.appendChild(style);