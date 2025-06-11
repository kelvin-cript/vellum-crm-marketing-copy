import { useState, useCallback, useMemo } from 'react';
import { PlanoCorteData, PlanoCorteProcessedData, PlanoCorteFilters } from '../types/planoCorte';
import * as XLSX from 'xlsx';

export const usePlanoCorteProcessor = () => {
  const [rawData, setRawData] = useState<PlanoCorteData[]>([]);
  const [filters, setFilters] = useState<PlanoCorteFilters>({
    dataInicio: '',
    dataFim: '',
    status: [],
    valorMinimo: 0,
    valorMaximo: 0
  });

  const availableStatus = useMemo(() => {
    const statusSet = new Set<string>();
    rawData.forEach(item => {
      if (item.status) {
        statusSet.add(item.status);
      }
    });
    return Array.from(statusSet).sort();
  }, [rawData]);

  const filteredData = useMemo(() => {
    return rawData.filter(item => {
      // Filtro por data
      if (filters.dataInicio || filters.dataFim) {
        const itemDate = new Date(item.dataModificacao || item.dataCadastro);
        const startDate = filters.dataInicio ? new Date(filters.dataInicio + 'T00:00:00') : null;
        const endDate = filters.dataFim ? new Date(filters.dataFim + 'T23:59:59') : null;

        if (startDate && itemDate < startDate) return false;
        if (endDate && itemDate > endDate) return false;
      }

      // Filtro por status
      if (filters.status.length > 0 && !filters.status.includes(item.status)) {
        return false;
      }

      // Filtro por valor
      if (filters.valorMinimo > 0 && item.valorTotal < filters.valorMinimo) {
        return false;
      }
      if (filters.valorMaximo > 0 && item.valorTotal > filters.valorMaximo) {
        return false;
      }

      return true;
    });
  }, [rawData, filters]);

  const processedData = useMemo((): PlanoCorteProcessedData => {
    if (filteredData.length === 0) {
      return {
        totalClientes: 0,
        totalPedidos: 0,
        totalReceita: 0,
        ticketMedio: 0,
        pedidosFinalizados: 0,
        pedidosCancelados: 0,
        carrinhoAbandonado: 0,
        aguardandoVendedor: 0,
        configurandoArquivo: 0,
        valorPerdidoCancelamentos: 0,
        taxaCancelamento: 0,
        taxaConversao: 0,
        tempoMedioAprovacaoFinalizacao: 0,
        melhoresClientes: [],
        clientesRecorrentes: [],
        carrinhoAbandonadoClientes: [],
        clientesCancelados: [],
        clientesConfigurandoArquivo: [],
        metricas30Dias: {
          novosClientes: 0,
          pedidosFinalizados: 0,
          receitaGerada: 0,
          carrinhoAbandonado: 0,
          taxaConversao: 0,
          crescimentoReceita: 0
        },
        funil: [],
        temposPorStatus: []
      };
    }

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

    // Métricas básicas
    const totalPedidos = filteredData.length;
    const totalClientes = new Set(filteredData.map(item => item.email)).size;
    
    const pedidosFinalizados = filteredData.filter(item => 
      item.status.toLowerCase().includes('finalizado')
    );
    const pedidosCancelados = filteredData.filter(item => 
      item.status.toLowerCase().includes('cancelado')
    );
    const carrinhoAbandonado = filteredData.filter(item => 
      item.status.toLowerCase().includes('aguardando aprovação')
    );
    const aguardandoVendedor = filteredData.filter(item => 
      item.status.toLowerCase().includes('aguardando retorno do vendedor')
    );
    const configurandoArquivo = filteredData.filter(item => 
      item.status.toLowerCase().includes('configurando arquivo')
    );

    const totalReceita = pedidosFinalizados.reduce((sum, item) => sum + item.valorTotal, 0);
    const valorPerdidoCancelamentos = pedidosCancelados.reduce((sum, item) => sum + item.valorTotal, 0);
    const ticketMedio = pedidosFinalizados.length > 0 ? totalReceita / pedidosFinalizados.length : 0;
    const taxaCancelamento = totalPedidos > 0 ? (pedidosCancelados.length / totalPedidos) * 100 : 0;
    const taxaConversao = totalPedidos > 0 ? (pedidosFinalizados.length / totalPedidos) * 100 : 0;

    // Análise de clientes
    const clienteMap = new Map();
    
    filteredData.forEach(item => {
      const cliente = clienteMap.get(item.email) || {
        nome: item.cliente,
        email: item.email,
        pedidos: [],
        totalGasto: 0,
        totalPedidos: 0,
        primeiroPedido: item.dataCadastro,
        ultimoPedido: item.dataModificacao || item.dataCadastro,
        statusUltimoPedido: item.status
      };

      cliente.pedidos.push({
        status: item.status,
        valor: item.valorTotal,
        data: item.dataModificacao || item.dataCadastro
      });

      if (item.status.toLowerCase().includes('finalizado')) {
        cliente.totalGasto += item.valorTotal;
      }
      
      cliente.totalPedidos += 1;
      
      if (new Date(item.dataCadastro) < new Date(cliente.primeiroPedido)) {
        cliente.primeiroPedido = item.dataCadastro;
      }
      
      if (new Date(item.dataModificacao || item.dataCadastro) > new Date(cliente.ultimoPedido)) {
        cliente.ultimoPedido = item.dataModificacao || item.dataCadastro;
        cliente.statusUltimoPedido = item.status;
      }

      clienteMap.set(item.email, cliente);
    });

    // Melhores clientes
    const melhoresClientes = Array.from(clienteMap.values())
      .map(cliente => {
        const diasDesdeUltimoPedido = Math.ceil(
          (now.getTime() - new Date(cliente.ultimoPedido).getTime()) / (1000 * 60 * 60 * 24)
        );
        const clienteDesde = Math.ceil(
          (now.getTime() - new Date(cliente.primeiroPedido).getTime()) / (1000 * 60 * 60 * 24)
        );

        return {
          nome: cliente.nome,
          email: cliente.email,
          totalPedidos: cliente.totalPedidos,
          totalGasto: cliente.totalGasto,
          ticketMedio: cliente.totalPedidos > 0 ? cliente.totalGasto / cliente.totalPedidos : 0,
          ultimoPedido: cliente.ultimoPedido,
          statusUltimoPedido: cliente.statusUltimoPedido,
          diasDesdeUltimoPedido,
          primeiroPedido: cliente.primeiroPedido,
          clienteDesde
        };
      })
      .sort((a, b) => b.totalGasto - a.totalGasto)
      .slice(0, 50);

    // Clientes recorrentes (2+ pedidos)
    const clientesRecorrentes = Array.from(clienteMap.values())
      .filter(cliente => cliente.totalPedidos >= 2)
      .map(cliente => {
        const pedidosOrdenados = cliente.pedidos.sort((a, b) => 
          new Date(a.data).getTime() - new Date(b.data).getTime()
        );
        
        let totalDias = 0;
        for (let i = 1; i < pedidosOrdenados.length; i++) {
          const diasDiff = Math.ceil(
            (new Date(pedidosOrdenados[i].data).getTime() - new Date(pedidosOrdenados[i-1].data).getTime()) / (1000 * 60 * 60 * 24)
          );
          totalDias += diasDiff;
        }
        
        const intervaloMedioPedidos = pedidosOrdenados.length > 1 ? 
          Math.ceil(totalDias / (pedidosOrdenados.length - 1)) : 0;

        const diasDesdeUltimoPedido = Math.ceil(
          (now.getTime() - new Date(cliente.ultimoPedido).getTime()) / (1000 * 60 * 60 * 24)
        );

        return {
          nome: cliente.nome,
          email: cliente.email,
          totalPedidos: cliente.totalPedidos,
          totalGasto: cliente.totalGasto,
          ticketMedio: cliente.totalPedidos > 0 ? cliente.totalGasto / cliente.totalPedidos : 0,
          ultimoPedido: cliente.ultimoPedido,
          statusUltimoPedido: cliente.statusUltimoPedido,
          intervaloMedioPedidos,
          clienteAtivo: diasDesdeUltimoPedido <= (intervaloMedioPedidos * 1.5)
        };
      })
      .sort((a, b) => b.totalPedidos - a.totalPedidos)
      .slice(0, 30);

    // Carrinho abandonado
    const carrinhoAbandonadoClientes = carrinhoAbandonado.map(item => {
      const diasAbandonado = Math.ceil(
        (now.getTime() - new Date(item.dataModificacao || item.dataCadastro).getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        nome: item.cliente,
        email: item.email,
        valorCarrinho: item.valorTotal,
        diasAbandonado,
        dataUltimaModificacao: item.dataModificacao || item.dataCadastro,
        dataCadastro: item.dataCadastro
      };
    })
    .sort((a, b) => b.valorCarrinho - a.valorCarrinho)
    .slice(0, 30);

    // Clientes cancelados
    const clientesCanceladosMap = new Map();
    pedidosCancelados.forEach(item => {
      const cliente = clientesCanceladosMap.get(item.email) || {
        nome: item.cliente,
        email: item.email,
        pedidosCancelados: 0,
        valorPerdido: 0,
        ultimoCancelamento: item.dataModificacao || item.dataCadastro
      };

      cliente.pedidosCancelados += 1;
      cliente.valorPerdido += item.valorTotal;
      
      if (new Date(item.dataModificacao || item.dataCadastro) > new Date(cliente.ultimoCancelamento)) {
        cliente.ultimoCancelamento = item.dataModificacao || item.dataCadastro;
      }

      clientesCanceladosMap.set(item.email, cliente);
    });

    const clientesCancelados = Array.from(clientesCanceladosMap.values())
      .map(cliente => ({
        ...cliente,
        diasUltimoCancelamento: Math.ceil(
          (now.getTime() - new Date(cliente.ultimoCancelamento).getTime()) / (1000 * 60 * 60 * 24)
        )
      }))
      .sort((a, b) => b.valorPerdido - a.valorPerdido)
      .slice(0, 20);

    // Clientes configurando arquivo
    const clientesConfigurandoArquivo = configurandoArquivo.map(item => {
      const diasTentandoConfigurar = Math.ceil(
        (now.getTime() - new Date(item.dataModificacao || item.dataCadastro).getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        nome: item.cliente,
        email: item.email,
        valorProjeto: item.valorTotal,
        diasTentandoConfigurar,
        dataUltimaTentativa: item.dataModificacao || item.dataCadastro,
        tentativasConfiguracao: 1 // Pode ser expandido se houver mais dados
      };
    })
    .sort((a, b) => b.valorProjeto - a.valorProjeto)
    .slice(0, 20);

    // Métricas dos últimos 30 dias
    const dados30Dias = filteredData.filter(item => 
      new Date(item.dataCadastro) >= thirtyDaysAgo
    );
    
    const metricas30Dias = {
      novosClientes: new Set(dados30Dias.map(item => item.email)).size,
      pedidosFinalizados: dados30Dias.filter(item => 
        item.status.toLowerCase().includes('finalizado')
      ).length,
      receitaGerada: dados30Dias
        .filter(item => item.status.toLowerCase().includes('finalizado'))
        .reduce((sum, item) => sum + item.valorTotal, 0),
      carrinhoAbandonado: dados30Dias.filter(item => 
        item.status.toLowerCase().includes('aguardando aprovação')
      ).length,
      taxaConversao: dados30Dias.length > 0 ? 
        (dados30Dias.filter(item => item.status.toLowerCase().includes('finalizado')).length / dados30Dias.length) * 100 : 0,
      crescimentoReceita: 15.5 // Placeholder - pode ser calculado com dados históricos
    };

    // Funil de status
    const statusCount = new Map();
    const statusValue = new Map();
    
    filteredData.forEach(item => {
      statusCount.set(item.status, (statusCount.get(item.status) || 0) + 1);
      statusValue.set(item.status, (statusValue.get(item.status) || 0) + item.valorTotal);
    });

    const funil = Array.from(statusCount.entries()).map(([status, quantidade]) => ({
      status,
      quantidade,
      percentual: (quantidade / totalPedidos) * 100,
      valorTotal: statusValue.get(status) || 0,
      tempoMedioStatus: 5 // Placeholder - pode ser calculado com dados de tempo
    }));

    // Tempos por status (placeholder - seria necessário dados de transição)
    const temposPorStatus = Array.from(statusCount.entries()).map(([status, clientesNesteTempo]) => ({
      status,
      tempoMedio: Math.random() * 10 + 1, // Placeholder
      menorTempo: 1,
      maiorTempo: 15,
      clientesNesteTempo
    }));

    return {
      totalClientes,
      totalPedidos,
      totalReceita,
      ticketMedio,
      pedidosFinalizados: pedidosFinalizados.length,
      pedidosCancelados: pedidosCancelados.length,
      carrinhoAbandonado: carrinhoAbandonado.length,
      aguardandoVendedor: aguardandoVendedor.length,
      configurandoArquivo: configurandoArquivo.length,
      valorPerdidoCancelamentos,
      taxaCancelamento,
      taxaConversao,
      tempoMedioAprovacaoFinalizacao: 7.5, // Placeholder
      melhoresClientes,
      clientesRecorrentes,
      carrinhoAbandonadoClientes,
      clientesCancelados,
      clientesConfigurandoArquivo,
      metricas30Dias,
      funil,
      temposPorStatus
    };
  }, [filteredData]);

  const loadExcelData = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const parsedData: PlanoCorteData[] = jsonData.map((row: any) => ({
          cliente: row['Cliente'] || row['cliente'] || '',
          email: row['Email'] || row['email'] || '',
          status: row['Status'] || row['status'] || '',
          dataCadastro: formatDate(row['Data Cadastro'] || row['data_cadastro'] || row['dataCadastro']),
          dataModificacao: formatDate(row['Data Modificação'] || row['data_modificacao'] || row['dataModificacao']),
          valorTotal: parseFloat(row['Valor Total'] || row['valor_total'] || row['valorTotal'] || '0') || 0
        })).filter(item => item.cliente && item.email);

        if (parsedData.length > 0) {
          setRawData(prevData => {
            const newData = [...prevData, ...parsedData];
            console.log(`Dados do Plano de Corte carregados: ${parsedData.length} registros. Total: ${newData.length}`);
            return newData;
          });
        } else {
          alert('Nenhum dado válido foi encontrado no arquivo Excel. Verifique se as colunas estão corretas.');
        }
      } catch (error) {
        console.error('Erro ao processar arquivo Excel:', error);
        alert('Erro ao processar o arquivo Excel. Verifique se é um arquivo .xlsx válido.');
      }
    };

    reader.onerror = () => {
      alert('Erro ao ler o arquivo.');
    };

    reader.readAsArrayBuffer(file);
  }, []);

  const formatDate = (dateValue: any): string => {
    if (!dateValue) return '';
    
    try {
      // Se for um número (Excel date serial)
      if (typeof dateValue === 'number') {
        const date = XLSX.SSF.parse_date_code(dateValue);
        return `${date.y}-${String(date.m).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`;
      }
      
      // Se for string, tenta converter
      const date = new Date(dateValue);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
      
      return '';
    } catch (e) {
      console.warn('Erro ao converter data:', dateValue);
      return '';
    }
  };

  const clearData = useCallback(() => {
    setRawData([]);
    setFilters({
      dataInicio: '',
      dataFim: '',
      status: [],
      valorMinimo: 0,
      valorMaximo: 0
    });
  }, []);

  const exportToCSV = useCallback((data: any[], filename: string) => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    
    const formatValue = (value: any): string => {
      if (value === null || value === undefined) return '';
      
      if (typeof value === 'number') {
        return value.toLocaleString('pt-BR', { 
          minimumFractionDigits: 2,
          maximumFractionDigits: 2 
        });
      }
      
      const stringValue = String(value);
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      
      return stringValue;
    };
    
    const csvContent = [
      headers.map(header => `"${header}"`).join(','),
      ...data.map(row => 
        headers.map(header => formatValue(row[header])).join(',')
      )
    ].join('\n');
    
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const downloadSampleExcel = useCallback(() => {
    const sampleData = [
      {
        'Cliente': 'João Silva',
        'Email': 'joao.silva@email.com',
        'Status': 'Finalizado',
        'Data Cadastro': '2024-01-15',
        'Data Modificação': '2024-01-20',
        'Valor Total': 1250.50
      },
      {
        'Cliente': 'Maria Santos',
        'Email': 'maria.santos@email.com',
        'Status': 'Aguardando Aprovação',
        'Data Cadastro': '2024-01-18',
        'Data Modificação': '2024-01-18',
        'Valor Total': 890.00
      },
      {
        'Cliente': 'Pedro Costa',
        'Email': 'pedro.costa@email.com',
        'Status': 'Configurando Arquivo',
        'Data Cadastro': '2024-01-20',
        'Data Modificação': '2024-01-22',
        'Valor Total': 2100.75
      },
      {
        'Cliente': 'Ana Oliveira',
        'Email': 'ana.oliveira@email.com',
        'Status': 'Cancelado',
        'Data Cadastro': '2024-01-10',
        'Data Modificação': '2024-01-25',
        'Valor Total': 750.00
      }
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Plano de Corte');
    XLSX.writeFile(wb, 'exemplo-plano-de-corte.xlsx');
  }, []);

  return {
    rawData,
    processedData,
    filters,
    setFilters,
    availableStatus,
    loadExcelData,
    clearData,
    exportToCSV,
    downloadSampleExcel,
    hasData: rawData.length > 0
  };
};