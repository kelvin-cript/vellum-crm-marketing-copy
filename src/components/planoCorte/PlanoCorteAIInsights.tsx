import React, { useState, useEffect } from 'react';
import { Brain, Lightbulb, Target, TrendingUp, Users, Package, Mail, MessageCircle, Gift, Zap, Loader, AlertCircle, CheckCircle, RefreshCw, Trash2, Clock, Database } from 'lucide-react';
import { PlanoCorteProcessedData } from '../../types/planoCorte';

interface PlanoCorteAIInsightsProps {
  data: PlanoCorteProcessedData;
}

interface PlanoCorteAIInsight {
  id: string;
  category: 'conversao' | 'retencao' | 'carrinho' | 'vendedor' | 'producao' | 'cancelamento';
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
    { id: 'vendedor', label: 'Vendedores', icon: <Target className="w-4 h-4" /> },
    { id: 'producao', label: 'Produção', icon: <CheckCircle className="w-4 h-4" /> },
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
            acelerar aprovações, otimizar a produção e aumentar a taxa de conversão.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-1">Otimização de Conversão</h4>
              <p className="text-sm text-gray-400">Estratégias para aumentar aprovações</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white mb-1">Recuperação de Carrinho</h4>
              <p className="text-sm text-gray-400">Campanhas para projetos abandonados</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-1">Acelerar Vendedores</h4>
              <p className="text-sm text-gray-400">Otimização do tempo de resposta</p>
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

  // Insight 1: Carrinho Abandonado (Aguardando Aprovação)
  if (data.aguardandoAprovacao > 0) {
    insights.push({
      id: 'carrinho-abandonado-1',
      category: 'carrinho',
      title: 'Recuperar Projetos Abandonados',
      description: `${data.aguardandoAprovacao} clientes enviaram projetos mas não finalizaram. Valor potencial: R$ ${(data.carrinhoAbandonadoClientes.reduce((sum, c) => sum + c.valorCarrinho, 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      priority: 'high',
      actionType: 'email',
      implementation: [
        'Criar sequência de email automática para projetos abandonados',
        'Enviar primeiro email após 4 horas de abandono',
        'Oferecer desconto progressivo (5%, 10%, 15%) nos próximos emails',
        'Incluir tutorial de como finalizar o pedido'
      ],
      expectedImpact: 'Recuperação de 25-30% dos projetos abandonados',
      metrics: ['Taxa de recuperação de projetos', 'Receita recuperada', 'Taxa de abertura de emails'],
      icon: '🛒'
    });
  }

  // Insight 2: Aguardando Vendedor
  if (data.aguardandoVendedor > 0) {
    insights.push({
      id: 'aguardando-vendedor-1',
      category: 'vendedor',
      title: 'Acelerar Resposta dos Vendedores',
      description: `${data.aguardandoVendedor} clientes aguardando retorno há mais tempo que o ideal. Reduzir tempo de resposta para aumentar conversão.`,
      priority: 'high',
      actionType: 'estrategia',
      implementation: [
        'Implementar SLA de 2 horas para resposta de vendedores',
        'Criar sistema de notificação automática para vendedores',
        'Implementar dashboard de acompanhamento para gestores',
        'Treinar equipe para respostas mais rápidas e eficientes'
      ],
      expectedImpact: 'Redução de 50% no tempo médio de resposta',
      metrics: ['Tempo médio de resposta', 'Taxa de conversão pós-contato', 'Satisfação do cliente'],
      icon: '👤'
    });
  }

  // Insight 3: Taxa de conversão baixa
  if (data.taxaConversao < 60) {
    insights.push({
      id: 'conversao-baixa-1',
      category: 'conversao',
      title: 'Otimizar Taxa de Conversão',
      description: `Taxa de conversão atual: ${data.taxaConversao.toFixed(1)}%. Há oportunidade significativa de melhoria no funil.`,
      priority: 'medium',
      actionType: 'estrategia',
      implementation: [
        'Analisar pontos de atrito entre envio de projeto e aprovação',
        'Simplificar processo de aprovação automática',
        'Implementar chat proativo durante o processo',
        'Criar FAQ específico para dúvidas sobre aprovação'
      ],
      expectedImpact: 'Aumento de 15-20% na taxa de conversão',
      metrics: ['Taxa de conversão por etapa', 'Tempo no funil', 'Taxa de abandono por status'],
      icon: '📈'
    });
  }

  // Insight 4: Clientes com pedidos aprovados há muito tempo
  if (data.aprovados > 0) {
    insights.push({
      id: 'producao-atraso-1',
      category: 'producao',
      title: 'Acelerar Produção',
      description: `${data.aprovados} pedidos aprovados aguardando finalização. Monitorar prazo de produção para evitar insatisfação.`,
      priority: 'medium',
      actionType: 'estrategia',
      implementation: [
        'Implementar acompanhamento automático de prazo de produção',
        'Enviar atualizações por WhatsApp sobre status do pedido',
        'Criar sistema de alerta para pedidos próximos do prazo',
        'Implementar compensação para atrasos (desconto futuro)'
      ],
      expectedImpact: 'Redução de 30% nas reclamações sobre prazo',
      metrics: ['Tempo médio de produção', 'Taxa de atraso', 'NPS do cliente'],
      icon: '⚙️'
    });
  }

  // Insight 5: Clientes recorrentes
  if (data.clientesRecorrentes.length > 0) {
    insights.push({
      id: 'clientes-recorrentes-1',
      category: 'retencao',
      title: 'Programa VIP para Clientes Recorrentes',
      description: `${data.clientesRecorrentes.length} clientes recorrentes geram valor significativo. Criar programa de benefícios exclusivos.`,
      priority: 'medium',
      actionType: 'estrategia',
      implementation: [
        'Criar programa VIP com aprovação mais rápida',
        'Oferecer desconto progressivo por número de projetos',
        'Implementar linha direta de atendimento VIP',
        'Envio prioritário para clientes recorrentes'
      ],
      expectedImpact: 'Aumento de 30% na retenção de clientes VIP',
      metrics: ['Taxa de retenção', 'Frequência de projetos', 'Valor vitalício do cliente'],
      icon: '👑'
    });
  }

  // Insight 6: Cancelamentos
  if (data.pedidosCancelados > 0) {
    insights.push({
      id: 'cancelamentos-1',
      category: 'cancelamento',
      title: 'Reduzir Taxa de Cancelamento',
      description: `${data.pedidosCancelados} pedidos cancelados. Valor perdido: R$ ${data.valorPerdidoCancelamentos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      priority: 'high',
      actionType: 'estrategia',
      implementation: [
        'Implementar pesquisa automática de motivo de cancelamento',
        'Criar processo de retenção antes do cancelamento',
        'Oferecer alternativas como mudança de prazo ou desconto',
        'Analisar padrões de cancelamento por tipo de projeto'
      ],
      expectedImpact: 'Redução de 40% na taxa de cancelamento',
      metrics: ['Taxa de cancelamento', 'Motivos de cancelamento', 'Taxa de retenção'],
      icon: '❌'
    });
  }

  // Insight 7: WhatsApp para clientes aguardando
  if (data.aguardandoVendedor > 0 || data.aguardandoAprovacao > 0) {
    insights.push({
      id: 'whatsapp-followup-1',
      category: 'conversao',
      title: 'Follow-up via WhatsApp',
      description: `Implementar follow-up via WhatsApp para acelerar processo de aprovação e reduzir abandono.`,
      priority: 'medium',
      actionType: 'whatsapp',
      implementation: [
        'Configurar mensagens automáticas via WhatsApp para cada status',
        'Criar templates personalizados por tipo de situação',
        'Implementar chatbot para dúvidas frequentes',
        'Enviar lembretes proativos sobre projetos pendentes'
      ],
      expectedImpact: 'Aumento de 40% na taxa de resposta vs email',
      metrics: ['Taxa de resposta WhatsApp', 'Tempo de conversão', 'Satisfação do cliente'],
      icon: '📱'
    });
  }

  // Insight 8: Otimização de processo
  insights.push({
    id: 'otimizacao-processo-1',
    category: 'conversao',
    title: 'Otimizar Fluxo do Processo',
    description: `Mapear e otimizar cada etapa do funil para reduzir tempo total desde projeto até entrega.`,
    priority: 'medium',
    actionType: 'estrategia',
    implementation: [
      'Mapear tempo médio de cada etapa do processo',
      'Identificar gargalos e pontos de melhoria',
      'Implementar aprovação automática para projetos padrão',
      'Criar indicadores de performance por etapa'
    ],
    expectedImpact: 'Redução de 25% no tempo total do processo',
    metrics: ['Tempo por etapa', 'Throughput do processo', 'Taxa de automação'],
    icon: '⚡'
  });

  return insights.slice(0, 8);
};