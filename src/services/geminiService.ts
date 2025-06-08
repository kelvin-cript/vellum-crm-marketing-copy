import { GoogleGenerativeAI } from '@google/generative-ai';
import { ProcessedData } from '../types';

const API_KEY = 'AIzaSyBK8ebsBiq8XhP6Ri-WVZHRk9SUQaFck68';
const genAI = new GoogleGenerativeAI(API_KEY);

export interface AIInsight {
  id: string;
  category: 'campaigns' | 'products' | 'clients' | 'growth' | 'retention';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionType: 'email' | 'whatsapp' | 'coupon' | 'promotion' | 'strategy';
  implementation: string[];
  expectedImpact: string;
  metrics: string[];
  icon: React.ReactNode;
}

export const generateMarketingInsights = async (data: ProcessedData): Promise<AIInsight[]> => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      }
    });

    const prompt = `
Você é um especialista em marketing digital e CRM com mais de 15 anos de experiência. Analise os dados de vendas abaixo e forneça insights estratégicos e ações práticas para melhorar o desempenho do negócio.

DADOS DO NEGÓCIO:
- Receita Total: R$ ${data.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
- Pedidos Faturados: ${data.totalOrders}
- Pedidos Cancelados: ${data.cancelledOrders}
- Taxa de Cancelamento: ${data.cancellationRate.toFixed(1)}%
- Clientes Únicos: ${data.totalClients}
- Ticket Médio: R$ ${data.averageOrderValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

TOP 5 PRODUTOS MAIS VENDIDOS:
${data.topProducts.slice(0, 5).map((p, i) => `${i+1}. ${p.name} - ${p.totalSales} vendas - R$ ${p.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`).join('\n')}

TOP 5 CLIENTES:
${data.topClients.slice(0, 5).map((c, i) => `${i+1}. ${c.name} - ${c.totalOrders} pedidos - R$ ${c.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`).join('\n')}

CANAIS DE VENDA:
${data.channelPerformance.map((c, i) => `${i+1}. ${c.channelName} - ${c.orders} pedidos - R$ ${c.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`).join('\n')}

CLIENTES CANCELADOS (TOP 3):
${data.cancelledClients.slice(0, 3).map((c, i) => `${i+1}. ${c.name} - ${c.cancelledOrders} cancelamentos - Taxa: ${c.cancellationRate.toFixed(1)}%`).join('\n')}

PRODUTOS CANCELADOS (TOP 3):
${data.cancelledProducts.slice(0, 3).map((p, i) => `${i+1}. ${p.name} - Taxa: ${p.cancellationRate.toFixed(1)}%`).join('\n')}

CUPONS MAIS USADOS:
${data.topCoupons.slice(0, 3).map((c, i) => `${i+1}. ${c.name} - ${c.usageCount} usos - R$ ${c.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`).join('\n')}

PRODUTOS COMPRADOS JUNTOS:
${data.productCombinations.slice(0, 3).map((c, i) => `${i+1}. ${c.productA} + ${c.productB} - ${c.combinationCount} vezes - Confiança: ${c.confidenceScore.toFixed(1)}%`).join('\n')}

REGIÕES TOP:
${data.regionMetrics.slice(0, 3).map((r, i) => `${i+1}. ${r.city} - ${r.orders} pedidos - R$ ${r.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`).join('\n')}

Com base nesses dados, forneça exatamente 8 insights estratégicos no formato JSON abaixo. Cada insight deve ser uma ação prática e específica que pode ser implementada imediatamente:

{
  "insights": [
    {
      "id": "insight-1",
      "category": "campaigns|products|clients|growth|retention",
      "title": "Título do insight (máximo 60 caracteres)",
      "description": "Descrição detalhada do problema/oportunidade identificada (máximo 200 caracteres)",
      "priority": "high|medium|low",
      "actionType": "email|whatsapp|coupon|promotion|strategy",
      "implementation": [
        "Passo 1 específico e prático",
        "Passo 2 específico e prático",
        "Passo 3 específico e prático"
      ],
      "expectedImpact": "Impacto esperado com números específicos quando possível",
      "metrics": [
        "Métrica 1 para acompanhar",
        "Métrica 2 para acompanhar",
        "Métrica 3 para acompanhar"
      ]
    }
  ]
}

DIRETRIZES IMPORTANTES:
1. Seja específico e prático - evite generalidades
2. Inclua números e percentuais quando relevante
3. Foque em ações que podem ser implementadas em 30 dias
4. Considere o perfil do negócio (e-commerce/marketplace)
5. Priorize ações com maior ROI potencial
6. Inclua campanhas de email marketing, WhatsApp, cupons e promoções
7. Considere cross-selling e upselling
8. Analise oportunidades de retenção e reativação
9. Identifique produtos com potencial de crescimento
10. Sugira ações para reduzir cancelamentos

Categorias:
- campaigns: Campanhas de marketing (email, WhatsApp, etc.)
- products: Estratégias de produto e cross-selling
- clients: Retenção, reativação e segmentação de clientes
- growth: Crescimento de vendas e expansão
- retention: Redução de churn e fidelização

Tipos de ação:
- email: Campanhas de email marketing
- whatsapp: Campanhas via WhatsApp
- coupon: Criação de cupons e descontos
- promotion: Promoções e ofertas especiais
- strategy: Estratégias gerais de negócio

Responda APENAS com o JSON válido, sem texto adicional.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Remove possíveis caracteres extras e parse do JSON
    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
    const parsedResponse = JSON.parse(cleanText);
    
    // Adiciona ícones aos insights
    const insightsWithIcons = parsedResponse.insights.map((insight: any) => ({
      ...insight,
      icon: getIconForCategory(insight.category)
    }));

    return insightsWithIcons;
  } catch (error) {
    console.error('Erro ao gerar insights:', error);
    
    // Fallback com insights pré-definidos baseados nos dados
    return generateFallbackInsights(data);
  }
};

const getIconForCategory = (category: string) => {
  const icons = {
    campaigns: '📧',
    products: '📦',
    clients: '👥',
    growth: '📈',
    retention: '🎯'
  };
  return icons[category as keyof typeof icons] || '💡';
};

const generateFallbackInsights = (data: ProcessedData): AIInsight[] => {
  const insights: AIInsight[] = [];

  // Insight 1: Taxa de cancelamento alta
  if (data.cancellationRate > 10) {
    insights.push({
      id: 'fallback-1',
      category: 'retention',
      title: 'Reduzir Taxa de Cancelamento',
      description: `Taxa de cancelamento de ${data.cancellationRate.toFixed(1)}% está acima do ideal. Implementar estratégias de retenção.`,
      priority: 'high',
      actionType: 'email',
      implementation: [
        'Criar campanha de email para clientes com pedidos cancelados',
        'Implementar pesquisa de motivos de cancelamento',
        'Oferecer desconto de 15% para nova compra'
      ],
      expectedImpact: 'Redução de 30% na taxa de cancelamento em 60 dias',
      metrics: ['Taxa de cancelamento', 'Taxa de conversão de reativação', 'Receita recuperada'],
      icon: '🎯'
    });
  }

  // Insight 2: Cross-selling
  if (data.productCombinations.length > 0) {
    const topCombo = data.productCombinations[0];
    insights.push({
      id: 'fallback-2',
      category: 'products',
      title: 'Campanha de Cross-Selling',
      description: `Produtos ${topCombo.productA} e ${topCombo.productB} são comprados juntos ${topCombo.combinationCount} vezes.`,
      priority: 'medium',
      actionType: 'promotion',
      implementation: [
        'Criar bundle promocional com os produtos mais vendidos juntos',
        'Implementar recomendação automática no checkout',
        'Campanha de email com oferta especial do combo'
      ],
      expectedImpact: 'Aumento de 25% no ticket médio',
      metrics: ['Ticket médio', 'Taxa de conversão de cross-sell', 'Receita por cliente'],
      icon: '📦'
    });
  }

  // Insight 3: Clientes VIP
  if (data.topClients.length > 0) {
    insights.push({
      id: 'fallback-3',
      category: 'clients',
      title: 'Programa VIP para Top Clientes',
      description: `${data.topClients.length} clientes representam grande parte da receita. Criar programa de fidelidade.`,
      priority: 'high',
      actionType: 'strategy',
      implementation: [
        'Criar programa VIP com benefícios exclusivos',
        'Oferecer frete grátis permanente para VIPs',
        'Acesso antecipado a novos produtos'
      ],
      expectedImpact: 'Aumento de 40% na retenção de clientes VIP',
      metrics: ['Taxa de retenção VIP', 'Frequência de compra', 'Lifetime Value'],
      icon: '👥'
    });
  }

  // Insight 4: Cupons
  if (data.topCoupons.length > 0) {
    const topCoupon = data.topCoupons[0];
    insights.push({
      id: 'fallback-4',
      category: 'campaigns',
      title: 'Otimizar Estratégia de Cupons',
      description: `Cupom ${topCoupon.name} teve ${topCoupon.usageCount} usos. Expandir estratégia de cupons.`,
      priority: 'medium',
      actionType: 'coupon',
      implementation: [
        'Criar cupons segmentados por perfil de cliente',
        'Implementar cupons de primeira compra',
        'Cupons de reativação para clientes inativos'
      ],
      expectedImpact: 'Aumento de 20% na conversão de novos clientes',
      metrics: ['Taxa de uso de cupons', 'Conversão de novos clientes', 'ROI de campanhas'],
      icon: '📧'
    });
  }

  return insights.slice(0, 8); // Retorna no máximo 8 insights
};