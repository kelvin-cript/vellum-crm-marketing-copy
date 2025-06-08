export interface SalesData {
  order: string;
  creationDate: string;
  clientName: string;
  clientLastName: string;
  clientDocument: string;
  email: string;
  phone: string;
  city: string;
  courrier: string;
  status: string;
  coupon: string;
  paymentSystemName: string;
  skuValue: number;
  skuTotal: number;
  quantitySku: number;
  skuName: string;
  discountsNames: string;
}

export interface ProcessedData {
  totalRevenue: number;
  totalOrders: number;
  totalClients: number;
  averageOrderValue: number;
  cancelledOrders: number;
  cancellationRate: number;
  topProducts: ProductMetric[];
  topClients: ClientMetric[];
  channelPerformance: ChannelMetric[];
  channelGrowth: ChannelGrowthMetric[];
  recurrentClients: RecurrentClientMetric[];
  newClients: NewClientMetric[];
  inactiveClients: InactiveClientMetric[];
  cancelledClients: CancelledClientMetric[];
  productQuality: ProductQualityMetric[];
  stoppedProducts: StoppedProductMetric[];
  cancelledProducts: CancelledProductMetric[];
  recurrentProducts: RecurrentProductMetric[];
  growthPotential: GrowthPotentialMetric[];
  topCoupons: CouponMetric[];
  regionMetrics: RegionMetric[];
  courierMetrics: CourierMetric[];
  productCombinations: ProductCombinationMetric[];
}

export interface ProductMetric {
  name: string;
  totalSales: number;
  totalRevenue: number;
  totalQuantity: number;
  averagePrice: number;
}

export interface ClientMetric {
  name: string;
  document: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  firstPurchase: string;
  lastPurchase: string;
}

export interface ChannelMetric {
  channel: string;
  channelName: string;
  orders: number;
  revenue: number;
  averageOrderValue: number;
  topProduct: string;
  topProductQuantity?: number;
  marketShare: number;
}

export interface ChannelGrowthMetric {
  channelName: string;
  currentPeriodOrders: number;
  previousPeriodOrders: number;
  growthRate: number;
  growthDirection: 'up' | 'down' | 'stable';
  currentRevenue: number;
  previousRevenue: number;
  revenueGrowthRate: number;
}

export interface RecurrentClientMetric {
  name: string;
  document: string;
  email: string;
  phone: string;
  purchaseCount: number;
  totalSpent: number;
  averageTimeBetweenPurchases: number;
}

export interface NewClientMetric {
  name: string;
  document: string;
  email: string;
  phone: string;
  city: string;
  firstPurchase: string;
  daysSinceFirstPurchase: number;
  totalSpent: number;
  totalOrders: number;
  averageOrderValue: number;
}

export interface InactiveClientMetric {
  name: string;
  document: string;
  email: string;
  phone: string;
  city: string;
  lastPurchase: string;
  daysSinceLastPurchase: number;
  totalPurchases: number;
  totalSpent: number;
  averageOrderValue: number;
  averageTimeBetweenPurchases: number;
  potentialLoss: number;
}

export interface CancelledClientMetric {
  name: string;
  document: string;
  email: string;
  phone: string;
  city: string;
  cancelledOrders: number;
  totalOrders: number;
  cancellationRate: number;
  potentialLoss: number;
  lastCancellation: string;
}

export interface ProductQualityMetric {
  name: string;
  totalSales: number;
  returnRate: number;
  averageRating: number;
  qualityScore: number;
}

export interface StoppedProductMetric {
  name: string;
  lastSaleDate: string;
  daysSinceLastSale: number;
  previousMonthSales: number;
  potentialLoss: number;
}

export interface CancelledProductMetric {
  name: string;
  cancelledQuantity: number;
  totalQuantity: number;
  cancellationRate: number;
  potentialLoss: number;
  lastCancellation: string;
  topCancellationReason: string;
}

export interface RecurrentProductMetric {
  name: string;
  totalSales: number;
  monthsWithSales: number;
  averageMonthlySales: number;
  totalRevenue: number;
  averageMonthlyRevenue: number;
  consistencyScore: number;
  lastSaleDate: string;
  firstSaleDate: string;
  recurrencyStrength: 'Alta' | 'Média' | 'Baixa';
}

export interface GrowthPotentialMetric {
  name: string;
  currentSales: number;
  growthRate: number;
  potentialRevenue: number;
  marketOpportunity: number;
}

export interface CouponMetric {
  name: string;
  usageCount: number;
  totalRevenue: number;
  averageOrderValue: number;
  uniqueClients: number;
}

export interface RegionMetric {
  city: string;
  state: string;
  orders: number;
  revenue: number;
  averageOrderValue: number;
  uniqueClients: number;
  topProduct: string;
  cancelledOrders: number;
  cancellationRate: number;
}

export interface CourierMetric {
  name: string;
  orders: number;
  revenue: number;
  averageOrderValue: number;
  uniqueClients: number;
  citiesServed: number;
}

export interface ProductCombinationMetric {
  productA: string;
  productB: string;
  combinationCount: number;
  totalRevenue: number;
  averageOrderValue: number;
  confidenceScore: number;
  recommendationStrength: 'Alta' | 'Média' | 'Baixa';
}

export interface DateFilter {
  startDate: string;
  endDate: string;
}

export interface ChannelFilter {
  selectedChannels: string[];
}