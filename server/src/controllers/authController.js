import { 
  criarUsuario, 
  obterUsuarioPorEmail, 
  obterUsuarioPorId, 
  listarUsuarios,
  verificarEmailExistente 
} from '../models/UsuarioFirebase.js';
import { hashPassword, comparePassword } from '../utils/validators.js';
import { generateToken } from '../utils/jwt.js';

export const registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const usuarioExistente = await obterUsuarioPorEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    const senhaHash = await hashPassword(senha);
    const novoUsuario = await criarUsuario({
      nome,
      email,
      senha: senhaHash,
      role: 'operador',
    });

    const token = generateToken(novoUsuario.id, novoUsuario.role);

    res.status(201).json({
      sucesso: true,
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        role: novoUsuario.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    }

    const usuario = await obterUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const senhaValida = await comparePassword(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = generateToken(usuario.id, usuario.role);

    res.json({
      sucesso: true,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const obterPerfil = async (req, res) => {
  try {
    const usuario = await obterUsuarioPorId(req.userId);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json({
      sucesso: true,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
        meta: usuario.meta,
      },
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const listarUsuariosController = async (req, res) => {
  try {
    const usuarios = await listarUsuarios();

    res.json({
      sucesso: true,
      usuarios: usuarios.map(u => ({
        id: u.id,
        nome: u.nome,
        email: u.email,
        role: u.role,
        ativo: u.ativo,
      })),
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
