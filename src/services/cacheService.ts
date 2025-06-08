import { AIInsight } from './geminiService';

const CACHE_KEY = 'vellum-ai-insights-cache';
const CACHE_VERSION = '1.0';

interface CacheData {
  version: string;
  timestamp: number;
  dataHash: string;
  insights: AIInsight[];
}

// Gera um hash simples dos dados para verificar se mudaram
const generateDataHash = (data: any): string => {
  const dataString = JSON.stringify({
    totalRevenue: data.totalRevenue,
    totalOrders: data.totalOrders,
    cancelledOrders: data.cancelledOrders,
    totalClients: data.totalClients,
    topProductsCount: data.topProducts.length,
    channelsCount: data.channelPerformance.length
  });
  
  let hash = 0;
  for (let i = 0; i < dataString.length; i++) {
    const char = dataString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
};

export const saveInsightsToCache = (insights: AIInsight[], data: any): void => {
  try {
    const cacheData: CacheData = {
      version: CACHE_VERSION,
      timestamp: Date.now(),
      dataHash: generateDataHash(data),
      insights
    };
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    console.log('✅ Insights salvos no cache com sucesso');
  } catch (error) {
    console.error('❌ Erro ao salvar insights no cache:', error);
  }
};

export const loadInsightsFromCache = (data: any): AIInsight[] | null => {
  try {
    const cachedDataString = localStorage.getItem(CACHE_KEY);
    if (!cachedDataString) {
      console.log('📝 Nenhum cache de insights encontrado');
      return null;
    }
    
    const cachedData: CacheData = JSON.parse(cachedDataString);
    
    // Verifica se a versão do cache é compatível
    if (cachedData.version !== CACHE_VERSION) {
      console.log('🔄 Versão do cache incompatível, limpando cache');
      clearInsightsCache();
      return null;
    }
    
    // Verifica se os dados mudaram
    const currentDataHash = generateDataHash(data);
    if (cachedData.dataHash !== currentDataHash) {
      console.log('📊 Dados mudaram, cache invalidado');
      clearInsightsCache();
      return null;
    }
    
    // Verifica se o cache não está muito antigo (24 horas)
    const cacheAge = Date.now() - cachedData.timestamp;
    const maxAge = 24 * 60 * 60 * 1000; // 24 horas em millisegundos
    
    if (cacheAge > maxAge) {
      console.log('⏰ Cache expirado (mais de 24 horas), limpando');
      clearInsightsCache();
      return null;
    }
    
    console.log('✅ Insights carregados do cache com sucesso');
    return cachedData.insights;
  } catch (error) {
    console.error('❌ Erro ao carregar insights do cache:', error);
    clearInsightsCache();
    return null;
  }
};

export const clearInsightsCache = (): void => {
  try {
    localStorage.removeItem(CACHE_KEY);
    console.log('🗑️ Cache de insights limpo');
  } catch (error) {
    console.error('❌ Erro ao limpar cache:', error);
  }
};

export const getCacheInfo = (): { exists: boolean; timestamp?: number; age?: string } => {
  try {
    const cachedDataString = localStorage.getItem(CACHE_KEY);
    if (!cachedDataString) {
      return { exists: false };
    }
    
    const cachedData: CacheData = JSON.parse(cachedDataString);
    const ageInMinutes = Math.floor((Date.now() - cachedData.timestamp) / (1000 * 60));
    
    let ageString = '';
    if (ageInMinutes < 60) {
      ageString = `${ageInMinutes} minutos`;
    } else {
      const ageInHours = Math.floor(ageInMinutes / 60);
      ageString = `${ageInHours} horas`;
    }
    
    return {
      exists: true,
      timestamp: cachedData.timestamp,
      age: ageString
    };
  } catch (error) {
    return { exists: false };
  }
};