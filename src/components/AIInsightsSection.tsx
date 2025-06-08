import React, { useState, useEffect } from 'react';
import { Brain, Lightbulb, Target, TrendingUp, Users, Package, Mail, MessageCircle, Gift, Zap, Loader, AlertCircle, CheckCircle, RefreshCw, Trash2, Clock, Database } from 'lucide-react';
import { ProcessedData } from '../types';
import { generateMarketingInsights, AIInsight } from '../services/geminiService';
import { saveInsightsToCache, loadInsightsFromCache, clearInsightsCache, getCacheInfo } from '../services/cacheService';

interface AIInsightsSectionProps {
  data: ProcessedData;
}

export const AIInsightsSection: React.FC<AIInsightsSectionProps> = ({ data }) => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hasGeneratedInsights, setHasGeneratedInsights] = useState(false);
  const [cacheInfo, setCacheInfo] = useState<{ exists: boolean; timestamp?: number; age?: string }>({ exists: false });

  const categories = [
    { id: 'all', label: 'Todas', icon: <Brain className="w-4 h-4" /> },
    { id: 'campaigns', label: 'Campanhas', icon: <Mail className="w-4 h-4" /> },
    { id: 'products', label: 'Produtos', icon: <Package className="w-4 h-4" /> },
    { id: 'clients', label: 'Clientes', icon: <Users className="w-4 h-4" /> },
    { id: 'growth', label: 'Crescimento', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'retention', label: 'Retenção', icon: <Target className="w-4 h-4" /> }
  ];

  // Carrega insights do cache quando o componente monta ou os dados mudam
  useEffect(() => {
    if (data.totalOrders > 0) {
      const cachedInsights = loadInsightsFromCache(data);
      const cache = getCacheInfo();
      setCacheInfo(cache);
      
      if (cachedInsights && cachedInsights.length > 0) {
        setInsights(cachedInsights);
        setHasGeneratedInsights(true);
        console.log('📋 Insights carregados do cache automaticamente');
      }
    }
  }, [data]);

  const generateInsights = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🤖 Gerando novos insights com IA...');
      const aiInsights = await generateMarketingInsights(data);
      
      // Salva no cache
      saveInsightsToCache(aiInsights, data);
      
      setInsights(aiInsights);
      setHasGeneratedInsights(true);
      
      // Atualiza informações do cache
      const cache = getCacheInfo();
      setCacheInfo(cache);
      
      console.log('✅ Novos insights gerados e salvos no cache');
    } catch (err) {
      setError('Erro ao gerar insights. Tente novamente.');
      console.error('❌ Erro ao gerar insights:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCache = () => {
    clearInsightsCache();
    setInsights([]);
    setHasGeneratedInsights(false);
    setCacheInfo({ exists: false });
    console.log('🗑️ Cache limpo e insights removidos');
  };

  const filteredInsights = selectedCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.category === selectedCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActionTypeIcon = (actionType: string) => {
    switch (actionType) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'whatsapp': return <MessageCircle className="w-4 h-4" />;
      case 'coupon': return <Gift className="w-4 h-4" />;
      case 'promotion': return <Zap className="w-4 h-4" />;
      case 'strategy': return <Target className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  if (data.totalOrders === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
        <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">IA Marketing</h3>
        <p className="text-gray-600">Carregue seus dados para receber insights personalizados</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mr-3">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Inteligência Artificial Marketing</h3>
              <p className="text-sm text-gray-600">Insights e ações estratégicas personalizadas para seu negócio</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Informações do Cache */}
            {cacheInfo.exists && (
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                <Database className="w-4 h-4 text-blue-600" />
                <div className="text-xs">
                  <p className="text-blue-800 font-medium">Cache ativo</p>
                  <p className="text-blue-600">há {cacheInfo.age}</p>
                </div>
              </div>
            )}
            
            {/* Botão para limpar cache */}
            {hasGeneratedInsights && (
              <button
                onClick={handleClearCache}
                className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                title="Limpar cache e insights"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar Cache
              </button>
            )}
            
            {/* Botão principal */}
            <button
              onClick={generateInsights}
              disabled={loading}
              className={`flex items-center px-6 py-3 rounded-lg transition-colors text-sm font-medium disabled:opacity-50 ${
                hasGeneratedInsights 
                  ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                  : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 shadow-lg'
              }`}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Analisando...
                </>
              ) : hasGeneratedInsights ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Gerar Novos Insights
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Gerar Insights com IA
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filtros de Categoria - só aparecem se já gerou insights */}
        {hasGeneratedInsights && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Informações sobre o cache */}
        {cacheInfo.exists && hasGeneratedInsights && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <div className="text-sm">
                <p className="text-green-800 font-medium">
                  Insights carregados do cache (gerados há {cacheInfo.age})
                </p>
                <p className="text-green-600 text-xs mt-1">
                  Os insights são salvos automaticamente e recarregados quando você volta para esta aba. 
                  O cache é atualizado automaticamente quando os dados mudam.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
          <Loader className="w-8 h-8 text-purple-500 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Analisando seus dados...</h3>
          <p className="text-gray-600">Nossa IA está processando suas métricas para gerar insights personalizados</p>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Dica:</strong> Os insights serão salvos automaticamente e estarão disponíveis quando você voltar para esta aba.
            </p>
          </div>
        </div>
      )}

      {/* Estado inicial - sem insights gerados */}
      {!loading && !hasGeneratedInsights && (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg p-8 border border-purple-100 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Descubra Oportunidades Ocultas no Seu Negócio
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Nossa IA analisará seus dados de vendas e gerará insights estratégicos personalizados para aumentar suas vendas, reduzir cancelamentos e identificar oportunidades de crescimento.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Campanhas Inteligentes</h4>
              <p className="text-sm text-gray-600">Email marketing e WhatsApp personalizados</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Retenção de Clientes</h4>
              <p className="text-sm text-gray-600">Estratégias para reduzir cancelamentos</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Crescimento</h4>
              <p className="text-sm text-gray-600">Cross-selling e oportunidades de expansão</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-purple-200 mb-6">
            <p className="text-sm text-purple-800">
              <strong>Baseado em:</strong> {data.totalOrders} pedidos faturados • {data.totalClients} clientes únicos • R$ {data.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} em receita
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-center mb-2">
              <Database className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">Sistema de Cache Inteligente</span>
            </div>
            <p className="text-sm text-blue-700">
              Os insights gerados são salvos automaticamente e ficam disponíveis mesmo quando você navega entre as abas. 
              O cache é atualizado automaticamente quando seus dados mudam.
            </p>
          </div>
        </div>
      )}

      {/* Insights Grid */}
      {!loading && filteredInsights.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInsights.map((insight) => (
            <div key={insight.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    {insight.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{insight.title}</h4>
                    <div className="flex items-center mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(insight.priority)}`}>
                        {insight.priority === 'high' ? 'Alta Prioridade' : 
                         insight.priority === 'medium' ? 'Média Prioridade' : 'Baixa Prioridade'}
                      </span>
                      <div className="flex items-center ml-2 text-gray-500">
                        {getActionTypeIcon(insight.actionType)}
                        <span className="ml-1 text-xs capitalize">{insight.actionType}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{insight.description}</p>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Implementação
                  </h5>
                  <ul className="space-y-1">
                    {insight.implementation.map((step, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
                      Impacto Esperado
                    </h5>
                    <p className="text-sm text-gray-600">{insight.expectedImpact}</p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Target className="w-4 h-4 text-orange-500 mr-2" />
                      Métricas a Acompanhar
                    </h5>
                    <ul className="space-y-1">
                      {insight.metrics.map((metric, index) => (
                        <li key={index} className="text-sm text-gray-600">• {metric}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State para categoria filtrada */}
      {!loading && filteredInsights.length === 0 && insights.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum insight encontrado para esta categoria</p>
        </div>
      )}
    </div>
  );
};