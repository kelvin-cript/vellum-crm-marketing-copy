import React, { useState, useEffect } from 'react';
import { Brain, Lightbulb, Target, TrendingUp, Users, Package, Mail, MessageCircle, Gift, Zap, Loader, AlertCircle, CheckCircle, RefreshCw, Trash2, Clock, Database } from 'lucide-react';
import { PlanoCorteProcessedData } from '../../types/planoCorte';

interface PlanoCorteAIInsightsProps {
  data: PlanoCorteProcessedData;
}

interface PlanoCorteAIInsight {
  id: string;
  category: 'conversao' | 'retencao' | 'carrinho' | 'configuracao' | 'cancelamento';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionType: 'email' | 'whatsapp' | 'desconto' | 'suporte' | 'estrategia';
  implementation: string[];
  expectedImpact: string;
  metrics: string[];
  icon: React.ReactNode;
}

export const PlanoCorteAIInsights: React.FC<PlanoCorteAIInsightsProps> = ({ data }) => {
  const [insights, setInsights] = useState<PlanoCorteAIInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hasGeneratedInsights, setHasGeneratedInsights] = useState(false);

  const categories = [
    { id: 'all', label: 'Todas', icon: <Brain className="w-4 h-4" /> },
    { id: 'conversao', label: 'Conversão', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'retencao', label: 'Retenção', icon: <Users className="w-4 h-4" /> },
    { id: 'carrinho', label: 'Carrinho', icon: <Package className="w-4 h-4" /> },
    { id: 'configuracao', label: 'Configuração', icon: <Target className="w-4 h-4" /> },
    { id: 'cancelamento', label: 'Cancelamentos', icon: <AlertCircle className="w-4 h-4" /> }
  ];

  const generateInsights = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simula geração de insights baseados nos dados
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedInsights = generatePlanoCorteInsights(data);
      setInsights(generatedInsights);
      setHasGeneratedInsights(true);
      
      console.log('✅ Insights do Plano de Corte gerados com sucesso');
    } catch (err) {
      setError('Erro ao gerar insights. Tente novamente.');
      console.error('❌ Erro ao gerar insights:', err);
    } finally {
      setLoading(false);
    }
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
      case 'desconto': return <Gift className="w-4 h-4" />;
      case 'suporte': return <Target className="w-4 h-4" />;
      case 'estrategia': return <Brain className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  if (data.totalPedidos === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/10 text-center">
        <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">IA Marketing - Plano de Corte</h3>
        <p className="text-gray-400">Carregue seus dados para receber insights personalizados</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mr-3">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">IA Marketing - Plano de Corte</h3>
              <p className="text-sm text-gray-400">Insights estratégicos para otimizar seu funil de vendas</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={generateInsights}
              disabled={loading}
              className={`flex items-center px-6 py-3 rounded-lg transition-colors text-sm font-medium disabled:opacity-50 ${
                hasGeneratedInsights 
                  ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30' 
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

        {hasGeneratedInsights && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-300'
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/10 text-center">
          <Loader className="w-8 h-8 text-purple-400 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-semibold text-white mb-2">Analisando dados do Plano de Corte...</h3>
          <p className="text-gray-400">Nossa IA está processando suas métricas para gerar insights personalizados</p>
        </div>
      )}

      {/* Estado inicial */}
      {!loading && !hasGeneratedInsights && (
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl shadow-lg p-8 border border-purple-500/20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Descubra Oportunidades no Seu Funil de Vendas
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Nossa IA analisará seus dados do Plano de Corte e gerará insights estratégicos para reduzir carrinho abandonado, 
            aumentar conversões e otimizar todo o processo de vendas.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-1">Otimização de Conversão</h4>
              <p className="text-sm text-gray-400">Estratégias para aumentar finalização</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white mb-1">Recuperação de Carrinho</h4>
              <p className="text-sm text-gray-400">Campanhas para carrinho abandonado</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-1">Suporte Proativo</h4>
              <p className="text-sm text-gray-400">Ajuda para configuração de arquivos</p>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-purple-500/20 mb-6">
            <p className="text-sm text-purple-300">
              <strong>Baseado em:</strong> {data.totalPedidos} pedidos • {data.totalClientes} clientes • 
              R$ {data.totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} em receita
            </p>
          </div>
        </div>
      )}

      {/* Insights Grid */}
      {!loading && filteredInsights.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInsights.map((insight) => (
            <div key={insight.id} className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-500/20 rounded-lg mr-3">
                    {insight.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{insight.title}</h4>
                    <div className="flex items-center mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(insight.priority)}`}>
                        {insight.priority === 'high' ? 'Alta Prioridade' : 
                         insight.priority === 'medium' ? 'Média Prioridade' : 'Baixa Prioridade'}
                      </span>
                      <div className="flex items-center ml-2 text-gray-400">
                        {getActionTypeIcon(insight.actionType)}
                        <span className="ml-1 text-xs capitalize">{insight.actionType}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">{insight.description}</p>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-white mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Implementação
                  </h5>
                  <ul className="space-y-1">
                    {insight.implementation.map((step, index) => (
                      <li key={index} className="text-sm text-gray-400 flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white mb-2 flex items-center">
                      <TrendingUp className="w-4 h-4 text-blue-400 mr-2" />
                      Impacto Esperado
                    </h5>
                    <p className="text-sm text-gray-400">{insight.expectedImpact}</p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-white mb-2 flex items-center">
                      <Target className="w-4 h-4 text-orange-400 mr-2" />
                      Métricas a Acompanhar
                    </h5>
                    <ul className="space-y-1">
                      {insight.metrics.map((metric, index) => (
                        <li key={index} className="text-sm text-gray-400">• {metric}</li>
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
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/10 text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-400">Nenhum insight encontrado para esta categoria</p>
        </div>
      )}
    </div>
  );
};

const generatePlanoCorteInsights = (data: PlanoCorteProcessedData): PlanoCorteAIInsight[] => {
  const insights: PlanoCorteAIInsight[] = [];

  // Insight 1: Carrinho Abandonado
  if (data.carrinhoAbandonado > 0) {
    insights.push({
      id: 'carrinho-abandonado-1',
      category: 'carrinho',
      title: 'Recuperar Carrinho Abandonado',
      description: `${data.carrinhoAbandonado} clientes abandonaram carrinho. Valor potencial: R$ ${(data.carrinhoAbandonadoClientes.reduce((sum, c) => sum + c.valorCarrinho, 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      priority: 'high',
      actionType: 'email',
      implementation: [
        'Criar sequência de email automática para carrinho abandonado',
        'Enviar primeiro email após 2 horas de abandono',
        'Oferecer desconto progressivo (5%, 10%, 15%) nos próximos emails'
      ],
      expectedImpact: 'Recuperação de 25-30% dos carrinhos abandonados',
      metrics: ['Taxa de recuperação de carrinho', 'Receita recuperada', 'Taxa de abertura de emails'],
      icon: '🛒'
    });
  }

  // Insight 2: Clientes configurando arquivo
  if (data.configurandoArquivo > 0) {
    insights.push({
      id: 'configuracao-arquivo-1',
      category: 'configuracao',
      title: 'Suporte para Configuração de Arquivo',
      description: `${data.configurandoArquivo} clientes estão com dificuldade para configurar arquivos. Valor em risco: R$ ${(data.clientesConfigurandoArquivo.reduce((sum, c) => sum + c.valorProjeto, 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      priority: 'high',
      actionType: 'suporte',
      implementation: [
        'Criar tutorial em vídeo passo-a-passo para upload de arquivos',
        'Implementar chat de suporte proativo para estes clientes',
        'Enviar WhatsApp com link direto para suporte técnico'
      ],
      expectedImpact: 'Redução de 60% no tempo de configuração',
      metrics: ['Taxa de sucesso na configuração', 'Tempo médio de configuração', 'Satisfação do cliente'],
      icon: '⚙️'
    });
  }

  // Insight 3: Taxa de conversão baixa
  if (data.taxaConversao < 50) {
    insights.push({
      id: 'conversao-baixa-1',
      category: 'conversao',
      title: 'Otimizar Taxa de Conversão',
      description: `Taxa de conversão atual: ${data.taxaConversao.toFixed(1)}%. Há oportunidade de melhoria significativa no funil.`,
      priority: 'medium',
      actionType: 'estrategia',
      implementation: [
        'Analisar pontos de atrito no processo de compra',
        'Simplificar formulários e reduzir etapas',
        'Implementar prova social e depoimentos de clientes'
      ],
      expectedImpact: 'Aumento de 15-20% na taxa de conversão',
      metrics: ['Taxa de conversão por etapa', 'Tempo no funil', 'Taxa de abandono por página'],
      icon: '📈'
    });
  }

  // Insight 4: Clientes recorrentes
  if (data.clientesRecorrentes.length > 0) {
    insights.push({
      id: 'clientes-recorrentes-1',
      category: 'retencao',
      title: 'Programa de Fidelidade VIP',
      description: `${data.clientesRecorrentes.length} clientes recorrentes geram valor significativo. Criar programa de benefícios exclusivos.`,
      priority: 'medium',
      actionType: 'estrategia',
      implementation: [
        'Criar programa VIP com descontos progressivos',
        'Oferecer atendimento prioritário para clientes recorrentes',
        'Implementar sistema de pontos por compras'
      ],
      expectedImpact: 'Aumento de 30% na retenção de clientes VIP',
      metrics: ['Taxa de retenção', 'Frequência de compra', 'Valor vitalício do cliente'],
      icon: '👑'
    });
  }

  // Insight 5: Cancelamentos
  if (data.pedidosCancelados > 0) {
    insights.push({
      id: 'cancelamentos-1',
      category: 'cancelamento',
      title: 'Reduzir Taxa de Cancelamento',
      description: `${data.pedidosCancelados} pedidos cancelados. Valor perdido: R$ ${data.valorPerdidoCancelamentos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      priority: 'high',
      actionType: 'estrategia',
      implementation: [
        'Implementar pesquisa de motivo de cancelamento',
        'Criar processo de retenção antes do cancelamento',
        'Oferecer alternativas como desconto ou parcelamento'
      ],
      expectedImpact: 'Redução de 40% na taxa de cancelamento',
      metrics: ['Taxa de cancelamento', 'Motivos de cancelamento', 'Taxa de retenção'],
      icon: '❌'
    });
  }

  // Insight 6: Aguardando vendedor
  if (data.aguardandoVendedor > 0) {
    insights.push({
      id: 'aguardando-vendedor-1',
      category: 'conversao',
      title: 'Acelerar Atendimento de Vendedores',
      description: `${data.aguardandoVendedor} clientes aguardando retorno do vendedor. Reduzir tempo de resposta.`,
      priority: 'medium',
      actionType: 'estrategia',
      implementation: [
        'Implementar SLA de 2 horas para resposta de vendedores',
        'Criar sistema de notificação automática para vendedores',
        'Treinar equipe para respostas mais rápidas e eficientes'
      ],
      expectedImpact: 'Redução de 50% no tempo de resposta',
      metrics: ['Tempo médio de resposta', 'Taxa de conversão pós-contato', 'Satisfação do cliente'],
      icon: '👤'
    });
  }

  return insights.slice(0, 8);
};