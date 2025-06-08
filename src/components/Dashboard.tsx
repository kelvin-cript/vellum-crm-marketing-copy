import React, { useState } from 'react';
import { DollarSign, ShoppingCart, Users, TrendingUp, XCircle, Percent } from 'lucide-react';
import { ProcessedData } from '../types';
import { MetricCard } from './MetricCard';
import { ProductsSection } from './ProductsSection';
import { ClientsSection } from './ClientsSection';
import { ChannelsSection } from './ChannelsSection';
import { ChannelGrowthSection } from './ChannelGrowthSection';
import { CancelledClientsSection } from './CancelledClientsSection';
import { CancelledProductsSection } from './CancelledProductsSection';
import { CouponsSection } from './CouponsSection';
import { RegionsSection } from './RegionsSection';
import { CouriersSection } from './CouriersSection';
import { ProductCombinationsSection } from './ProductCombinationsSection';
import { AIInsightsSection } from './AIInsightsSection';
import { TabNavigation } from './TabNavigation';

interface DashboardProps {
  data: ProcessedData;
  onExport: (data: any[], filename: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, onExport }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Calcula percentuais para as métricas principais
  const totalOrdersIncludingCancelled = data.totalOrders + data.cancelledOrders;
  const billedOrdersPercentage = totalOrdersIncludingCancelled > 0 ? (data.totalOrders / totalOrdersIncludingCancelled) * 100 : 0;
  const cancelledOrdersPercentage = totalOrdersIncludingCancelled > 0 ? (data.cancelledOrders / totalOrdersIncludingCancelled) * 100 : 0;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Métricas Principais com Percentuais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <MetricCard
                title="Receita Total (Faturados)"
                value={`R$ ${data.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                icon={<DollarSign className="w-6 h-6 text-white" />}
                color="green"
                trend="up"
                trendValue="+12.5%"
                percentage={100} // Receita sempre 100% da receita faturada
              />
              
              <MetricCard
                title="Pedidos Faturados"
                value={data.totalOrders.toLocaleString('pt-BR')}
                icon={<ShoppingCart className="w-6 h-6 text-white" />}
                color="blue"
                trend="up"
                trendValue="+8.3%"
                percentage={billedOrdersPercentage}
              />

              <MetricCard
                title="Pedidos Cancelados"
                value={data.cancelledOrders.toLocaleString('pt-BR')}
                icon={<XCircle className="w-6 h-6 text-white" />}
                color="red"
                trend="down"
                trendValue={`${data.cancellationRate.toFixed(1)}%`}
                percentage={cancelledOrdersPercentage}
              />
              
              <MetricCard
                title="Clientes Únicos"
                value={data.totalClients.toLocaleString('pt-BR')}
                icon={<Users className="w-6 h-6 text-white" />}
                color="purple"
                trend="up"
                trendValue="+15.2%"
                percentage={100} // Clientes únicos sempre 100% dos clientes
              />
              
              <MetricCard
                title="Ticket Médio"
                value={`R$ ${data.averageOrderValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                icon={<TrendingUp className="w-6 h-6 text-white" />}
                color="orange"
                trend="up"
                trendValue="+5.7%"
                percentage={100} // Ticket médio sempre 100% do valor médio
              />
            </div>

            {/* Crescimento por Canais */}
            <ChannelGrowthSection 
              channelGrowth={data.channelGrowth} 
              onExport={onExport} 
            />

            {/* Performance por Canais */}
            <ChannelsSection data={data} onExport={onExport} />
          </div>
        );

      case 'products':
        return (
          <div className="space-y-8">
            <ProductsSection data={data} onExport={onExport} />
            <CancelledProductsSection 
              cancelledProducts={data.cancelledProducts} 
              onExport={onExport} 
            />
          </div>
        );

      case 'clients':
        return (
          <div className="space-y-8">
            <ClientsSection data={data} onExport={onExport} />
            <CancelledClientsSection 
              cancelledClients={data.cancelledClients} 
              onExport={onExport} 
            />
          </div>
        );

      case 'marketing':
        return (
          <div className="space-y-8">
            <CouponsSection data={data} onExport={onExport} />
          </div>
        );

      case 'geography':
        return (
          <div className="space-y-8">
            <RegionsSection data={data} onExport={onExport} />
          </div>
        );

      case 'logistics':
        return (
          <div className="space-y-8">
            <CouriersSection data={data} onExport={onExport} />
          </div>
        );

      case 'crossselling':
        return (
          <div className="space-y-8">
            <ProductCombinationsSection data={data} onExport={onExport} />
          </div>
        );

      case 'ai-insights':
        return (
          <div className="space-y-8">
            <AIInsightsSection data={data} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Navegação por Abas */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Conteúdo da Aba Ativa */}
      {renderTabContent()}
    </div>
  );
};