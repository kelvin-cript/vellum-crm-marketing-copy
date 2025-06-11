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
  pedidosFinalizados: number;
  pedidosCancelados: number;
  carrinhoAbandonado: number;
  aguardandoVendedor: number;
  configurandoArquivo: number;
  valorPerdidoCancelamentos: number;
  taxaCancelamento: number;
  taxaConversao: number;
  tempoMedioAprovacaoFinalizacao: number;
  melhoresClientes: PlanoCorteClienteMetric[];
  clientesRecorrentes: PlanoCorteClienteRecorrente[];
  carrinhoAbandonadoClientes: PlanoCorteCarrinhoAbandonado[];
  clientesCancelados: PlanoCorteClienteCancelado[];
  clientesConfigurandoArquivo: PlanoCorteConfigurandoArquivo[];
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
  tentativasContato?: number;
}

export interface PlanoCorteClienteCancelado {
  nome: string;
  email: string;
  pedidosCancelados: number;
  valorPerdido: number;
  ultimoCancelamento: string;
  motivoCancelamento?: string;
  diasUltimoCancelamento: number;
}

export interface PlanoCorteConfigurandoArquivo {
  nome: string;
  email: string;
  valorProjeto: number;
  diasTentandoConfigurar: number;
  dataUltimaTentativa: string;
  tentativasConfiguracao: number;
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