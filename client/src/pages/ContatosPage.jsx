import React, { useState, useEffect } from 'react';
import { Search, Upload, Phone, MessageCircle, Edit2, Trash2, Eye, Plus } from 'lucide-react';
import { apiCall } from '../services/api';
import { Navbar } from '../components/Navbar';
import { FormularioContato } from '../components/FormularioContato';

export const ContatosPage = () => {
  const [contatos, setContatos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [busca, setBusca] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paginacao, setPaginacao] = useState({});
  const [mostraFormulario, setMostraFormulario] = useState(false);
  const [contatoSelecionado, setContatoSelecionado] = useState(null);

  useEffect(() => {
    carregarContatos();
  }, [filtro, page, busca]);

  const carregarContatos = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page,
        limite: 10,
        status: filtro !== 'todos' ? filtro : undefined,
        busca,
      });

      const resultado = await apiCall('GET', `/contatos?${query}`);
      if (resultado.sucesso) {
        setContatos(resultado.contatos);
        setPaginacao(resultado.paginacao);
      }
    } catch (error) {
      console.error('Erro ao carregar contatos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImportacao = async (arquivo) => {
    const formData = new FormData();
    formData.append('arquivo', arquivo);

    try {
      const resultado = await fetch('http://localhost:5000/api/contatos/importar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      }).then((res) => res.json());

      if (resultado.sucesso) {
        alert(`${resultado.contatosImportados} contatos importados com sucesso!`);
        carregarContatos();
      } else {
        alert(`Erros na importação: ${resultado.erros.length}`);
      }
    } catch (error) {
      alert('Erro ao importar arquivo');
    }
  };

  const handleWhatsApp = (telefone) => {
    const numero = telefone.replace(/\D/g, '');
    window.open(`https://wa.me/${numero}`, '_blank');
  };

  const handleDeletar = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este contato?')) {
      try {
        const resultado = await apiCall('DELETE', `/contatos/${id}`);
        if (resultado.sucesso) {
          carregarContatos();
        }
      } catch (error) {
        console.error('Erro ao deletar:', error);
      }
    }
  };

  const statusBadges = {
    nao_ligado: 'bg-gray-500/20 text-gray-300 border-gray-500',
    success: 'bg-green-500/20 text-green-300 border-green-500',
    insucesso: 'bg-red-500/20 text-red-300 border-red-500',
    nao_atendeu: 'bg-yellow-500/20 text-yellow-300 border-yellow-500',
    numero_invalido: 'bg-orange-500/20 text-orange-300 border-orange-500',
    agendado: 'bg-blue-500/20 text-blue-300 border-blue-500',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navbar />

      {mostraFormulario && (
        <FormularioContato onClose={() => setMostraFormulario(false)} onSave={carregarContatos} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">Gestão de Contatos</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setMostraFormulario(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              <Plus size={20} />
              <span>Novo Contato</span>
            </button>
            <label className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg cursor-pointer transition">
              <Upload size={20} />
              <span>Importar XLSX</span>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => e.target.files[0] && handleImportacao(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nome, CPF, CNPJ ou telefone..."
                value={busca}
                onChange={(e) => {
                  setBusca(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <select
              value={filtro}
              onChange={(e) => {
                setFiltro(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="todos">Todos os Status</option>
              <option value="nao_ligado">Não Ligado</option>
              <option value="success">Sucesso</option>
              <option value="insucesso">Insucesso</option>
              <option value="nao_atendeu">Não Atendeu</option>
              <option value="numero_invalido">Número Inválido</option>
              <option value="agendado">Agendado</option>
            </select>
          </div>
        </div>

        {/* Tabela de Contatos */}
        <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10 border-b border-white/10">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nome</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">CPF/CNPJ</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Telefone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Última Ligação</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {contatos.map((contato, idx) => (
                  <tr
                    key={contato._id}
                    className={`border-b border-white/10 hover:bg-white/5 transition ${
                      idx % 2 === 0 ? 'bg-white/2' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-sm">{contato.nome}</td>
                    <td className="px-6 py-4 text-sm font-mono">{contato.cpfCnpj}</td>
                    <td className="px-6 py-4 text-sm">{contato.telefone1}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${
                          statusBadges[contato.status] || statusBadges.nao_ligado
                        }`}
                      >
                        {contato.status.replace(/_/g, ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {contato.ultimaLigacao
                        ? new Date(contato.ultimaLigacao).toLocaleDateString('pt-BR')
                        : 'Nunca'}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => {
                          setContatoSelecionado(contato);
                          setMostraFormulario(true);
                        }}
                        className="inline-flex items-center space-x-1 p-2 hover:bg-white/10 rounded transition"
                        title="Ver/Editar"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleWhatsApp(contato.telefone1)}
                        className="inline-flex items-center space-x-1 p-2 hover:bg-green-500/20 rounded transition"
                        title="WhatsApp"
                      >
                        <MessageCircle size={16} className="text-green-400" />
                      </button>
                      <button
                        onClick={() => handleDeletar(contato._id)}
                        className="inline-flex items-center space-x-1 p-2 hover:bg-red-500/20 rounded transition"
                        title="Deletar"
                      >
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {contatos.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              {loading ? 'Carregando...' : 'Nenhum contato encontrado'}
            </div>
          )}
        </div>

        {/* Paginação */}
        {paginacao.totalPaginas > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: paginacao.totalPaginas }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-4 py-2 rounded transition ${
                  page === p
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
