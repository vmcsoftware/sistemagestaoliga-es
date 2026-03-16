import React, { useState } from 'react';
import { X, Phone, MessageCircle } from 'lucide-react';
import { apiCall } from '../services/api';

export const FormularioContato = ({ contato, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    contato || {
      nome: '',
      cpfCnpj: '',
      telefone1: '',
      telefone2: '',
      email: '',
      endereco: '',
      status: 'nao_ligado',
      observacoes: '',
      resultado: '',
      proximaLigacao: '',
    }
  );
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!formData.nome || !formData.cpfCnpj || !formData.telefone1) {
      setErro('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setLoading(true);
      let resultado;

      if (contato && contato._id && formData.resultado) {
        // Registrar ligação
        resultado = await apiCall('POST', `/contatos/${contato._id}/ligacao`, {
          resultado: formData.resultado,
          observacao: formData.observacoes,
          proximaLigacao: formData.proximaLigacao,
        });
      } else {
        // Criar novo contato ou atualizar status
        resultado = await apiCall('PATCH', `/contatos/${contato?._id}/status`, {
          status: formData.status,
        });
      }

      if (resultado.sucesso) {
        onSave();
        onClose();
      } else {
        setErro(resultado.erro || 'Erro ao salvar');
      }
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const numero = formData.telefone1.replace(/\D/g, '');
    window.open(`https://wa.me/${numero}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-sm bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-2xl p-6 max-w-2xl w-full border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {contato ? 'Registrar Ligação' : 'Novo Contato'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {erro && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
              {erro}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Nome *"
              value={formData.nome}
              onChange={(value) => setFormData({ ...formData, nome: value })}
              placeholder="Nome do cliente"
            />
            <InputField
              label="CPF/CNPJ *"
              value={formData.cpfCnpj}
              onChange={(value) => setFormData({ ...formData, cpfCnpj: value })}
              placeholder="000.000.000-00"
            />
            <InputField
              label="Telefone 1 *"
              value={formData.telefone1}
              onChange={(value) => setFormData({ ...formData, telefone1: value })}
              placeholder="(11) 99999-9999"
            />
            <InputField
              label="Telefone 2"
              value={formData.telefone2}
              onChange={(value) => setFormData({ ...formData, telefone2: value })}
              placeholder="(11) 98888-8888"
            />
            <InputField
              label="Email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              placeholder="email@example.com"
            />
            <InputField
              label="Endereço"
              value={formData.endereco}
              onChange={(value) => setFormData({ ...formData, endereco: value })}
              placeholder="Endereço do cliente"
            />
          </div>

          {contato && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <SelectField
                label="Resultado da Ligação *"
                value={formData.resultado}
                onChange={(value) => setFormData({ ...formData, resultado: value })}
                options={[
                  { value: '', label: 'Selecione...' },
                  { value: 'success', label: '✅ Sucesso' },
                  { value: 'insucesso', label: '❌ Insucesso' },
                  { value: 'nao_atendeu', label: '📲 Não Atendeu' },
                  { value: 'numero_invalido', label: '⚠️ Número Inválido' },
                  { value: 'agendado', label: '📅 Agendado' },
                ]}
              />
              {formData.resultado === 'agendado' && (
                <InputField
                  label="Data/Hora do Retorno"
                  type="datetime-local"
                  value={formData.proximaLigacao}
                  onChange={(value) => setFormData({ ...formData, proximaLigacao: value })}
                />
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Observações
            </label>
            <textarea
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              placeholder="Notas sobre a ligação..."
              rows="3"
            />
          </div>

          <div className="flex justify-between gap-2 pt-6 border-t border-white/10">
            <div className="flex gap-2">
              {contato && (
                <>
                  <button
                    type="button"
                    onClick={() => window.open(`tel:${formData.telefone1}`)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                  >
                    <Phone size={18} />
                    <span>Ligar</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
                  >
                    <MessageCircle size={18} />
                    <span>WhatsApp</span>
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg transition font-semibold"
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, type = 'text', value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
