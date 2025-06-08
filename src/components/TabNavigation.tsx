import React from 'react';
import { 
  BarChart3, 
  Users, 
  Package, 
  Store, 
  Tag, 
  MapPin, 
  Truck, 
  ShoppingBag,
  Brain,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: Tab[] = [
    {
      id: 'overview',
      label: 'Visão Geral',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Métricas principais e performance por canais'
    },
    {
      id: 'products',
      label: 'Produtos',
      icon: <Package className="w-5 h-5" />,
      description: 'Análise de produtos e oportunidades'
    },
    {
      id: 'clients',
      label: 'Clientes',
      icon: <Users className="w-5 h-5" />,
      description: 'Perfil e comportamento dos clientes'
    },
    {
      id: 'marketing',
      label: 'Marketing',
      icon: <Tag className="w-5 h-5" />,
      description: 'Cupons e campanhas promocionais'
    },
    {
      id: 'geography',
      label: 'Geografia',
      icon: <MapPin className="w-5 h-5" />,
      description: 'Performance por regiões'
    },
    {
      id: 'logistics',
      label: 'Logística',
      icon: <Truck className="w-5 h-5" />,
      description: 'Análise de transportadoras'
    },
    {
      id: 'crossselling',
      label: 'Cross-Selling',
      icon: <ShoppingBag className="w-5 h-5" />,
      description: 'Produtos comprados juntos'
    },
    {
      id: 'ai-insights',
      label: 'IA Marketing',
      icon: <Brain className="w-5 h-5" />,
      description: 'Insights e ações estratégicas com IA'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 mb-8 relative overflow-hidden">
      {/* Efeitos de fundo futurísticos */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-blue-500/10"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      
      {/* Partículas decorativas */}
      <div className="absolute top-4 right-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-4 left-8 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-40"></div>
      
      <div className="p-8 border-b border-white/10 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl mr-4 shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Análises Inteligentes
              </h2>
              <p className="text-gray-300 flex items-center mt-1">
                <Zap className="w-4 h-4 mr-2" />
                Navegue pelas diferentes dimensões do seu negócio
              </p>
            </div>
          </div>
          
          {/* Indicador de IA ativa */}
          <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/30">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 font-medium text-sm">IA Ativa</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <p className="text-gray-400 max-w-3xl">
          Cada aba revela insights únicos sobre seu negócio. Use a inteligência artificial para descobrir 
          oportunidades ocultas e otimizar suas estratégias de vendas.
        </p>
      </div>
      
      <div className="p-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`group p-4 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden ${
                activeTab === tab.id
                  ? 'border-purple-500/50 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-purple-500/20 text-white shadow-lg shadow-purple-500/25'
                  : 'border-white/10 bg-white/5 text-gray-300 hover:border-purple-400/30 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-blue-500/10 hover:text-white'
              }`}
            >
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
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
                <p className="text-xs leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  {tab.description}
                </p>
              </div>

              {/* Indicador ativo */}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-b-2xl"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};