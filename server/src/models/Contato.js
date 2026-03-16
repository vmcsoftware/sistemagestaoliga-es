import mongoose from 'mongoose';
const { Schema } = mongoose;

const contatoSchema = new Schema(
  {
    nome: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
    },
    cpfCnpj: {
      type: String,
      required: [true, 'CPF ou CNPJ é obrigatório'],
      unique: true,
      trim: true,
    },
    telefone1: {
      type: String,
      required: [true, 'Telefone 1 é obrigatório'],
      trim: true,
    },
    telefone2: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    endereco: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['nao_ligado', 'success', 'insucesso', 'nao_atendeu', 'numero_invalido', 'agendado'],
      default: 'nao_ligado',
    },
    ultimaLigacao: {
      type: Date,
    },
    proximaLigacao: {
      type: Date,
    },
    observacoes: {
      type: String,
      trim: true,
    },
    operador: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
    },
    tentativas: {
      type: Number,
      default: 0,
    },
    importacao_id: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Index para busca rápida
contatoSchema.index({ nome: 'text', cpfCnpj: 1, telefone1: 1 });
contatoSchema.index({ status: 1 });
contatoSchema.index({ operador: 1 });

export const Contato = mongoose.model('Contato', contatoSchema);
