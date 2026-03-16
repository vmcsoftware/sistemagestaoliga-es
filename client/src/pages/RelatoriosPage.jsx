import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileText } from 'lucide-react';
import { apiCall } from '../services/api';
import { Navbar } from '../components/Navbar';

export const RelatoriosPage = () => {
  const [relatorioOperadores, setRelatorioOperadores] = useState([]);
  const [relatorioContatos, setRelatorioContatos] = useState([]);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarRelatorios();
  }, []);

  const carregarRelatorios = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        dataInicio,
        dataFim,
      });

      const [operadores, contatos] = await Promise.all([
        apiCall('GET', `/dashboard/relatorio/operador?${query}`),
        apiCall('GET', `/dashboard/relatorio/contatos-trabalhados?${query}`),
      ]);

      if (operadores.sucesso) setRelatorioOperadores(operadores.relatorio);
      if (contatos.sucesso) setRelatorioContatos(contatos.contatos);
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error);
    } finally {
      setLoading(false);
    }
  };

  const gerarPDF = () => {
    alert('Funcionalidade de exportação PDF em desenvolvimento');
  };

  const gerarExcel = () => {
    alert('Funcionalidade de exportação Excel em desenvolvimento');
  };

  // Dados para gráfico de pizza (distribuição de status)
  const statusData = [
    { name: 'Sucessos', value: relatorioOperadores.reduce((a, b) => a + b.sucessos, 0) },
    { name: 'Insucessos', value: relatorioOperadores.reduce((a, b) => a + b.insucessos, 0) },
    { name: 'Agendados', value: relatorioOperadores.reduce((a, b) => a + b.agendados, 0) },
  ];

  const COLORS = ['#10b981', '#ef4444', '#3b82f6'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Relatórios</h1>

        {/* Filtros */}
        <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Data Início</label>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Data Fim</label>
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={carregarRelatorios}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
              >
                Filtrar
              </button>
              <button
                onClick={gerarPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
              >
                <Download size={18} />
                <span>PDF</span>
              </button>
              <button
                onClick={gerarExcel}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
              >
                <Download size={18} />
                <span>Excel</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gráfico de Operadores */}
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4">Desempenho por Operador</h3>
            {relatorioOperadores.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={relatorioOperadores}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="operador" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sucessos" fill="#10b981" />
                  <Bar dataKey="insucessos" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400">Sem dados</p>
            )}
          </div>

          {/* Gráfico de Pizza */}
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4">Distribuição de Resultados</h3>
            {statusData.some((d) => d.value > 0) ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400">Sem dados</p>
            )}
          </div>
        </div>

        {/* Tabela de Operadores */}
        <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 overflow-hidden mb-8">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-bold">Relatório por Operador</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Operador</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Total Ligações</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Sucessos</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Insucessos</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Taxa Sucesso</th>
                </tr>
              </thead>
              <tbody>
                {relatorioOperadores.map((operador) => (
                  <tr key={operador._id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="px-6 py-4">{operador.operador}</td>
                    <td className="px-6 py-4">{operador.totalLigacoes}</td>
                    <td className="px-6 py-4 text-green-400">{operador.sucessos}</td>
                    <td className="px-6 py-4 text-red-400">{operador.insucessos}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                        {operador.taxaSucesso}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {relatorioOperadores.length === 0 && (
              <div className="p-8 text-center text-gray-400">Sem dados para exibir</div>
            )}
          </div>
        </div>

        {/* Tabela de Contatos */}
        <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-bold">Contatos Trabalhados</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nome</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">CPF/CNPJ</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Última Ligação</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Tentativas</th>
                </tr>
              </thead>
              <tbody>
                {relatorioContatos.slice(0, 20).map((contato) => (
                  <tr key={contato._id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="px-6 py-4">{contato.nome}</td>
                    <td className="px-6 py-4 font-mono text-sm">{contato.cpfCnpj}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                        {contato.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {contato.ultimaLigacao
                        ? new Date(contato.ultimaLigacao).toLocaleDateString('pt-BR')
                        : 'Nunca'}
                    </td>
                    <td className="px-6 py-4">{contato.tentativas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {relatorioContatos.length === 0 && (
              <div className="p-8 text-center text-gray-400">Sem dados para exibir</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
