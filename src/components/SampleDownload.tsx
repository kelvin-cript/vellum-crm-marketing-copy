import React from 'react';
import { Download, FileSpreadsheet, Info, Zap, Brain } from 'lucide-react';

interface SampleDownloadProps {
  onDownload: () => void;
}

export const SampleDownload: React.FC<SampleDownloadProps> = ({ onDownload }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/10 relative overflow-hidden">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      <div className="absolute top-4 right-4 w-12 h-12 bg-blue-500/10 rounded-full blur-lg animate-pulse"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 bg-purple-500/10 rounded-full blur-md animate-pulse delay-1000"></div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mr-4 shadow-2xl">
            <FileSpreadsheet className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Modelo de Planilha</h3>
            <p className="text-sm text-gray-300 flex items-center mt-1">
              <Brain className="w-4 h-4 mr-2" />
              Baixe o exemplo com as colunas corretas para análise IA
            </p>
          </div>
        </div>
        <button
          onClick={onDownload}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 group"
        >
          <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Baixar Exemplo
        </button>
      </div>

      <div className="bg-blue-500/10 rounded-2xl p-6 border border-blue-500/20 backdrop-blur-sm relative z-10">
        <div className="flex items-start">
          <div className="p-3 bg-blue-500/20 rounded-xl mr-4">
            <Info className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-sm text-blue-300 flex-1">
            <p className="font-medium mb-4 text-lg flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Colunas obrigatórias na planilha:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-400">
              <div className="space-y-2">
                <div className="p-3 bg-white/5 rounded-xl border border-blue-500/20">
                  <p className="text-blue-400 font-semibold mb-2">Dados do Pedido</p>
                  <p><strong>Order:</strong> Número do pedido</p>
                  <p><strong>Creation Date:</strong> Data de criação (YYYY-MM-DD)</p>
                  <p><strong>Status:</strong> Status do pedido (Faturado/Cancelado)</p>
                  <p><strong>Courrier:</strong> Transportadora</p>
                </div>
                
                <div className="p-3 bg-white/5 rounded-xl border border-purple-500/20">
                  <p className="text-purple-400 font-semibold mb-2">Dados do Cliente</p>
                  <p><strong>Client Name:</strong> Nome do cliente</p>
                  <p><strong>Client Last Name:</strong> Sobrenome do cliente</p>
                  <p><strong>Client Document:</strong> CPF/CNPJ do cliente</p>
                  <p><strong>Email:</strong> Email do cliente</p>
                  <p><strong>Phone:</strong> Telefone do cliente</p>
                  <p><strong>City:</strong> Cidade do cliente</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="p-3 bg-white/5 rounded-xl border border-pink-500/20">
                  <p className="text-pink-400 font-semibold mb-2">Dados do Produto</p>
                  <p><strong>SKU Name:</strong> Nome do produto</p>
                  <p><strong>SKU Value:</strong> Valor unitário do produto</p>
                  <p><strong>SKU Total Price:</strong> Valor total do item</p>
                  <p><strong>Quantity_SKU:</strong> Quantidade do produto</p>
                </div>
                
                <div className="p-3 bg-white/5 rounded-xl border border-emerald-500/20">
                  <p className="text-emerald-400 font-semibold mb-2">Dados de Pagamento</p>
                  <p><strong>Payment System Name:</strong> Forma de pagamento</p>
                  <p><strong>Coupon:</strong> Cupom utilizado</p>
                  <p><strong>Discounts Names:</strong> Descontos aplicados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};