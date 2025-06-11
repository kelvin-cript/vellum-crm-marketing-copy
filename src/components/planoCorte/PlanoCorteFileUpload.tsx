import React, { useCallback } from 'react';
import { Upload, FileSpreadsheet, AlertCircle, Trash2, Plus, Sparkles, Zap, Brain } from 'lucide-react';

interface PlanoCorteFileUploadProps {
  onFileLoad: (file: File) => void;
  onSampleDownload: () => void;
  onClearData?: () => void;
  hasData: boolean;
}

export const PlanoCorteFileUpload: React.FC<PlanoCorteFileUploadProps> = ({ 
  onFileLoad, 
  onSampleDownload, 
  onClearData,
  hasData 
}) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        onFileLoad(file);
        event.target.value = '';
      } else {
        alert('Por favor, selecione um arquivo Excel (.xlsx ou .xls)');
      }
    }
  }, [onFileLoad]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      onFileLoad(file);
    } else {
      alert('Por favor, solte um arquivo Excel (.xlsx ou .xls)');
    }
  }, [onFileLoad]);

  if (hasData) {
    return (
      <div className="space-y-4">
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed border-blue-400/30 rounded-2xl p-6 text-center hover:border-blue-400/50 hover:bg-blue-500/5 transition-all duration-300 cursor-pointer bg-blue-500/5 backdrop-blur-sm relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
            id="plano-corte-file-upload-compact"
          />
          <label htmlFor="plano-corte-file-upload-compact" className="cursor-pointer relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-3 group-hover:scale-110 transition-transform shadow-lg">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-medium text-blue-300 mb-1">
              Adicionar Planilha Excel
            </p>
            <p className="text-xs text-blue-400">
              Combine múltiplos arquivos .xlsx
            </p>
          </label>
        </div>
        
        {onClearData && (
          <button
            onClick={onClearData}
            className="w-full flex items-center justify-center px-4 py-3 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500/20 transition-all duration-300 text-sm font-medium border border-red-500/20 backdrop-blur-sm group"
          >
            <Trash2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Limpar Todos os Dados
          </button>
        )}
        
        <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 backdrop-blur-sm">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-emerald-300 font-medium mb-1">
                <strong>Múltiplas planilhas:</strong>
              </p>
              <p className="text-xs text-emerald-400">
                Você pode carregar várias planilhas Excel. Os dados serão combinados automaticamente para análise completa.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-blue-400/50 hover:bg-blue-500/5 transition-all duration-500 cursor-pointer group relative z-10"
      >
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
          id="plano-corte-file-upload"
        />
        <label htmlFor="plano-corte-file-upload" className="cursor-pointer">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-2xl relative">
            <Upload className="w-8 h-8 text-white" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          </div>
          <p className="text-lg font-medium text-white mb-2">
            Clique para selecionar ou arraste seu arquivo Excel aqui
          </p>
          <p className="text-sm text-gray-300">
            Formatos aceitos: .xlsx, .xls • Suporte a múltiplas planilhas
          </p>
        </label>
      </div>

      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 backdrop-blur-sm relative z-10">
        <div className="flex items-start">
          <div className="p-2 bg-blue-500/20 rounded-lg mr-3">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-sm text-blue-300 flex-1">
            <p className="font-medium mb-2 text-base">Estrutura da planilha Excel esperada:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-gray-400">
              <div className="space-y-1">
                <p><strong className="text-blue-400">Cliente:</strong> Nome do cliente</p>
                <p><strong className="text-blue-400">Email:</strong> Email do cliente</p>
                <p><strong className="text-blue-400">Status:</strong> Status do pedido</p>
              </div>
              <div className="space-y-1">
                <p><strong className="text-purple-400">Data Cadastro:</strong> Data de cadastro</p>
                <p><strong className="text-purple-400">Data Modificação:</strong> Última modificação</p>
                <p><strong className="text-purple-400">Valor Total:</strong> Valor do pedido</p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white/5 rounded-lg border border-blue-500/20">
              <p className="text-blue-400 font-medium mb-2">Status possíveis:</p>
              <div className="text-xs space-y-1">
                <p><strong>Aguardando Aprovação:</strong> Carrinho abandonado</p>
                <p><strong>Aguardando Retorno do Vendedor:</strong> Pedido enviado para vendedor</p>
                <p><strong>Configurando Arquivo:</strong> Cliente tentando subir projeto</p>
                <p><strong>Finalizado:</strong> Pedido concluído</p>
                <p><strong>Cancelado:</strong> Pedido cancelado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};