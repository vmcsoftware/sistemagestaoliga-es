import mongoose from 'mongoose';
const { Schema } = mongoose;

const usuarioSchema = new Schema(
  {
    nome: {
      type: String,
      required: [true, 'Digite seu nome'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Digite seu email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido'],
    },
    senha: {
      type: String,
      required: [true, 'Digite sua senha'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['operador', 'gerente', 'admin'],
      default: 'operador',
    },
    ativo: {
      type: Boolean,
      default: true,
    },
    meta: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Usuario = mongoose.model('Usuario', usuarioSchema);
