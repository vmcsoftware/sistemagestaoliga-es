import mongoose from 'mongoose';
const { Schema } = mongoose;

const historicoLigacaoSchema = new Schema(
  {
    contato_id: {
      type: Schema.Types.ObjectId,
      ref: 'Contato',
      required: [true, 'Contato é obrigatório'],
    },
    operador_id: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: [true, 'Operador é obrigatório'],
    },
    data: {
      type: Date,
      default: Date.now,
    },
    resultado: {
      type: String,
      enum: ['success', 'insucesso', 'nao_atendeu', 'numero_invalido', 'agendado'],
      required: [true, 'Resultado é obrigatório'],
    },
    observacao: {
      type: String,
      trim: true,
    },
    duracao: {
      type: Number, // em segundos
    },
    proximaLigacao: {
      type: Date,
    },
  },
  { timestamps: true }
);

historicoLigacaoSchema.index({ contato_id: 1 });
historicoLigacaoSchema.index({ operador_id: 1 });
historicoLigacaoSchema.index({ data: -1 });

export const HistoricoLigacao = mongoose.model('HistoricoLigacao', historicoLigacaoSchema);
