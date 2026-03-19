import { hashPassword, comparePassword, validateEmail, validatePassword } from '../utils/validators.js';
import { generateToken } from '../utils/jwt.js';
import { criarUsuario, obterUsuarioPorEmail, obterUsuarioPorId, verificarEmailExistente } from '../models/Usuario.js';

export const registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Validações
    if (!nome || !email || !senha) {
      return res.status(400).json({ 
        sucesso: false,
        erro: 'Nome, email e senha são obrigatórios' 
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ 
        sucesso: false,
        erro: 'Email inválido' 
      });
    }

    if (!validatePassword(senha)) {
      return res.status(400).json({ 
        sucesso: false,
        erro: 'Senha deve ter no mínimo 6 caracteres' 
      });
    }

    // Verificar se email já existe
    const emailExiste = await verificarEmailExistente(email);
    if (emailExiste) {
      return res.status(400).json({ 
        sucesso: false,
        erro: 'Email já cadastrado' 
      });
    }

    // Criar usuário
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
      mensagem: 'Usuário criado com sucesso',
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        role: novoUsuario.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ 
      sucesso: false,
      erro: error.message 
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ 
        sucesso: false,
        erro: 'Email e senha são obrigatórios' 
      });
    }

    // Obter usuário
    const usuario = await obterUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ 
        sucesso: false,
        erro: 'Credenciais inválidas' 
      });
    }

    // Verificar senha
    const senhaValida = await comparePassword(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ 
        sucesso: false,
        erro: 'Credenciais inválidas' 
      });
    }

    // Gerar token
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
    res.status(500).json({ 
      sucesso: false,
      erro: error.message 
    });
  }
};

export const obterPerfil = async (req, res) => {
  try {
    const usuario = await obterUsuarioPorId(req.userId);
    if (!usuario) {
      return res.status(404).json({ 
        sucesso: false,
        erro: 'Usuário não encontrado' 
      });
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
    res.status(500).json({ 
      sucesso: false,
      erro: error.message 
    });
  }
};
