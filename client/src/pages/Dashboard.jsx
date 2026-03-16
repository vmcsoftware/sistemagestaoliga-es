import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { apiCall } from '../services/api';
import { Navbar } from './Navbar';

export const Dashboard = () => {
  const [metricas, setMetricas] = useState(null);
  const [graficos, setGraficos] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [dashboardRes, alertasRes] = await Promise.all([
        apiCall('GET', '/dashboard'),
        apiCall('GET', '/dashboard/alertas'),
      ]);

      if (dashboardRes.sucesso) {
        setMetricas(dashboardRes.metricas);
        setGraficos(dashboardRes.graficosLigacoes);
        setRanking(dashboardRes.ranking);
      }

      if (alertasRes.sucesso) {
        setAlertas(alertasRes.alertas);
      }
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !metricas) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-2xl text-gray-400">Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alertas */}
        {alertas.length > 0 && (
          <div className="mb-8 space-y-3">
            {alertas.map((alerta, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-l-4 backdrop-blur-sm ${
                  alerta.prioridade === 'alta'
                    ? 'bg-red-500/10 border-red-500 text-red-200'
                    : 'bg-yellow-500/10 border-yellow-500 text-yellow-200'
                }`}
              >
                <p className="font-bold">{alerta.titulo}</p>
                <p className="text-sm">{alerta.mensagem}</p>
              </div>
            ))}
          </div>
        )}

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <MetricaCard
            titulo="Total de Contatos"
            valor={metricas.totalContatos}
            icone="📊"
            cor="from-blue-500 to-cyan-500"
          />
          <MetricaCard
            titulo="Ligações Hoje"
            valor={metricas.ligacoesHoje}
            icone="☎️"
            cor="from-purple-500 to-pink-500"
          />
          <MetricaCard
            titulo="Sucessos"
            valor={metricas.ligacoesSucesso}
            icone="✅"
            cor="from-green-500 to-green-600"
          />
          <MetricaCard
            titulo="Insucessos"
            valor={metricas.ligacoesSemSucesso}
            icone="❌"
            cor="from-red-500 to-pink-500"
          />
          <MetricaCard
            titulo="Taxa Sucesso"
            valor={`${metricas.taxaSucesso}%`}
            icone="📈"
            cor="from-yellow-500 to-orange-500"
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gráfico de Ligações nos Últimos 7 Dias */}
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <TrendingUp size={20} />
              <span>Ligações - Últimos 7 Dias</span>
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graficos}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="data" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                />
                <Line type="monotone" dataKey="ligacoes" stroke="#a78bfa" strokeWidth={3} dot={{ fill: '#c084fc' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Ranking de Operadores */}
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <BarChart3 size={20} />
              <span>Top 5 Operadores</span>
            </h3>
            <div className="space-y-3">
              {ranking.map((operador, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <span>{operador.operador[0]?.nome || 'Desconhecido'}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-400">{operador.sucessos} sucessos</p>
                    <p className="text-sm text-gray-400">{operador.totalLigacoes} ligações</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricaCard = ({ titulo, valor, icone, cor }) => {
  return (
    <div className={`bg-gradient-to-br ${cor} p-6 rounded-xl shadow-lg transform hover:scale-105 transition`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-200 text-sm font-medium">{titulo}</p>
          <p className="text-3xl font-bold mt-2">{valor}</p>
        </div>
        <div className="text-4xl">{icone}</div>
      </div>
    </div>
  );
};
