import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import {
  BarChart3,
  Users,
  FileText,
  Zap,
  Shield,
  Smartphone,
  ArrowRight,
  Check,
} from 'lucide-react';

export const HomePage = () => {
  const { token, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation - usando novo Navbar com variant home */}
      <Navbar variant="home" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
            <span className="text-sm font-semibold text-purple-300">
              ✨ Versão 1.0 - Pronto para Usar
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Sistema Completo de Gestão de Ligações
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Aplicação web moderna e responsiva para gerenciar contatos, registrar ligações comerciais e acompanhar performance em tempo real com Firebase.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {token && user ? (
              <Link
                to="/dashboard"
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-semibold flex items-center justify-center gap-2"
              >
                Ir para Dashboard <ArrowRight size={20} />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-semibold flex items-center justify-center gap-2"
                >
                  Começar Agora <ArrowRight size={20} />
                </Link>
                <a
                  href="#features"
                  className="px-8 py-3 border border-purple-500/50 rounded-lg hover:bg-purple-500/10 transition-all font-semibold"
                >
                  Ver Funcionalidades
                </a>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8 border-t border-slate-700/50">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">100%</div>
              <div className="text-sm text-slate-400">Responsivo</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">Real-time</div>
              <div className="text-sm text-slate-400">Dados ao vivo</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400">Seguro</div>
              <div className="text-sm text-slate-400">Firebase Auth</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50 border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Funcionalidades Principais</h2>
          <p className="text-center text-slate-400 mb-16">Tudo que você precisa para gerenciar vendas com eficiência</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl backdrop-blur-sm bg-slate-700/30 border border-cyan-500/30 hover:border-cyan-500/60 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Gestão de Contatos</h3>
              <p className="text-slate-400">
                Importe, organize e gerencie uma lista completa de contatos com CPF/CNPJ, telefone e email.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-cyan-400" />
                  Importar de Excel
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-cyan-400" />
                  Buscar e filtrar
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-cyan-400" />
                  Agendamento automático
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl backdrop-blur-sm bg-slate-700/30 border border-purple-500/30 hover:border-purple-500/60 transition-all hover:shadow-lg hover:shadow-purple-500/20">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Dashboard em Tempo Real</h3>
              <p className="text-slate-400">
                Visualize métricas, gráficos e performance dos operadores em tempo real.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-purple-400" />
                  Métricas instantâneas
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-purple-400" />
                  Gráficos dinâmicos
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-purple-400" />
                  Taxa de sucesso
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl backdrop-blur-sm bg-slate-700/30 border border-pink-500/30 hover:border-pink-500/60 transition-all hover:shadow-lg hover:shadow-pink-500/20">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center mb-4">
                <FileText size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Relatórios Detalhados</h3>
              <p className="text-slate-400">
                Gere relatórios por operador, período e performance com análises aprofundadas.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-pink-400" />
                  Por operador
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-pink-400" />
                  Por período
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-pink-400" />
                  Ranking
                </li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-xl backdrop-blur-sm bg-slate-700/30 border border-cyan-500/30 hover:border-cyan-500/60 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Registro de Ligações</h3>
              <p className="text-slate-400">
                Registre resultados de ligações com histórico completo e múltiplos status.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-cyan-400" />
                  Múltiplos resultados
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-cyan-400" />
                  Histórico completo
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-cyan-400" />
                  Anotações
                </li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-xl backdrop-blur-sm bg-slate-700/30 border border-purple-500/30 hover:border-purple-500/60 transition-all hover:shadow-lg hover:shadow-purple-500/20">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Segurança em Primeiro Lugar</h3>
              <p className="text-slate-400">
                Autenticação JWT segura, criptografia de senhas e Firebase com regras de acesso.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-purple-400" />
                  JWT Token
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-purple-400" />
                  Bcrypt Hash
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-purple-400" />
                  Firebase Rules
                </li>
              </ul>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-xl backdrop-blur-sm bg-slate-700/30 border border-pink-500/30 hover:border-pink-500/60 transition-all hover:shadow-lg hover:shadow-pink-500/20">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center mb-4">
                <Smartphone size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Responsivo</h3>
              <p className="text-slate-400">
                Interface moderna que funciona perfeitamente em desktop, tablet e mobile.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-pink-400" />
                  Desktop
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-pink-400" />
                  Tablet
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-pink-400" />
                  Mobile
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Comece Agora Grátis</h2>
          <p className="text-xl text-slate-400 mb-8">
            Teste todas as funcionalidades do sistema sem restrições. Firebase grátis com limite generoso.
          </p>

          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-8 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-2xl font-bold text-cyan-400">1GB</div>
                <p className="text-sm text-slate-400">Armazenamento</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">50k</div>
                <p className="text-sm text-slate-400">Leituras ao dia</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-400">∞</div>
                <p className="text-sm text-slate-400">Contatos</p>
              </div>
            </div>

            {token && user ? (
              <Link
                to="/dashboard"
                className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-semibold"
              >
                Ir para Dashboard →
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-semibold"
              >
                Registre-se Grátis →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50 border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stack Técnico Moderno</h2>
          <p className="text-slate-400 mb-12">Construído com as melhores tecnologias da atualidade</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
              <div className="text-2xl mb-2">⚛️</div>
              <p className="font-semibold text-sm">React 18</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
              <div className="text-2xl mb-2">⚡</div>
              <p className="font-semibold text-sm">Vite</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
              <div className="text-2xl mb-2">🎨</div>
              <p className="font-semibold text-sm">TailwindCSS</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
              <div className="text-2xl mb-2">🔥</div>
              <p className="font-semibold text-sm">Firebase</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
              <div className="text-2xl mb-2">🟢</div>
              <p className="font-semibold text-sm">Node.js</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
              <div className="text-2xl mb-2">🚀</div>
              <p className="font-semibold text-sm">Express</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentação
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Termos
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Segurança</h3>
              <p className="text-sm text-slate-400">
                Firebase Firestore com regras de segurança avançadas
              </p>
            </div>
          </div>

          <div className="border-t border-slate-700/50 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center gap-2 mb-4 sm:mb-0">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center font-bold">
                  📞
                </div>
                <span className="font-semibold">Sistema de Gestão de Ligações</span>
              </div>
              <p className="text-sm text-slate-400">
                © 2024 vmcsoftware. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
