export interface PlanoCorteData {
  cliente: string;
  email: string;
  status: string;
  dataCadastro: string;
  dataModificacao: string;
  valorTotal: number;
}

export interface PlanoCorteProcessedData {
  totalClientes: number;
  totalPedidos: number;
  totalReceita: number;
  ticketMedio: number;
  aguardandoAprovacao: number; // Carrinho abandonado
  aguardandoVendedor: number;  // Enviado para vendedor
  aprovados: number;           // Pagos, em produção
  finalizados: number;         // Prontos na fábrica
  entregues: number;           // Entregues ao cliente/transportador
  pedidosCancelados: number;
  valorPerdidoCancelamentos: number;
  taxaCancelamento: number;
  taxaConversao: number;
  tempoMedioAprovacaoFinalizacao: number;
  melhoresClientes: PlanoCorteClienteMetric[];
  clientesRecorrentes: PlanoCorteClienteRecorrente[];
  carrinhoAbandonadoClientes: PlanoCorteCarrinhoAbandonado[];
  clientesAguardandoVendedor: PlanoCorteAguardandoVendedor[];
  clientesCancelados: PlanoCorteClienteCancelado[];
  clientesAprovados: PlanoCorteClienteAprovado[];
  metricas30Dias: PlanoCorteMetrica30Dias;
  funil: PlanoCorteStatusFunil[];
  temposPorStatus: PlanoCorteTempoStatus[];
}

export interface PlanoCorteClienteMetric {
  nome: string;
  email: string;
  totalPedidos: number;
  totalGasto: number;
  ticketMedio: number;
  ultimoPedido: string;
  statusUltimoPedido: string;
  diasDesdeUltimoPedido: number;
  primeiroPedido: string;
  clienteDesde: number; // dias
}

export interface PlanoCorteClienteRecorrente {
  nome: string;
  email: string;
  totalPedidos: number;
  totalGasto: number;
  ticketMedio: number;
  ultimoPedido: string;
  statusUltimoPedido: string;
  intervaloMedioPedidos: number; // dias
  clienteAtivo: boolean;
}

export interface PlanoCorteCarrinhoAbandonado {
  nome: string;
  email: string;
  valorCarrinho: number;
  diasAbandonado: number;
  dataUltimaModificacao: string;
  dataCadastro: string;
}

export interface PlanoCorteAguardandoVendedor {
  nome: string;
  email: string;
  valorProjeto: number;
  diasAguardando: number;
  dataEnvio: string;
  urgencia: 'Alta' | 'Média' | 'Baixa';
}

export interface PlanoCorteClienteCancelado {
  nome: string;
  email: string;
  pedidosCancelados: number;
  valorPerdido: number;
  ultimoCancelamento: string;
  diasUltimoCancelamento: number;
}

export interface PlanoCorteClienteAprovado {
  nome: string;
  email: string;
  valorPedido: number;
  diasAprovado: number;
  dataAprovacao: string;
  statusProducao: 'Normal' | 'Atenção' | 'Atraso';
}

export interface PlanoCorteMetrica30Dias {
  novosClientes: number;
  pedidosFinalizados: number;
  receitaGerada: number;
  carrinhoAbandonado: number;
  taxaConversao: number;
  crescimentoReceita: number;
}

export interface PlanoCorteStatusFunil {
  status: string;
  quantidade: number;
  percentual: number;
  valorTotal: number;
  tempoMedioStatus: number;
}

export interface PlanoCorteTempoStatus {
  status: string;
  tempoMedio: number; // em dias
  menorTempo: number;
  maiorTempo: number;
  clientesNesteTempo: number;
}

export interface PlanoCorteFilters {
  dataInicio: string;
  dataFim: string;
  status: string[];
  valorMinimo: number;
  valorMaximo: number;
}