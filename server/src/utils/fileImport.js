import XLSX from 'xlsx';
import { criarContato, obterContatoPorCpfCnpj } from '../models/ContatoFirebase.js';
import { validarCpfCnpj, formatPhoneNumber } from './validators.js';

export const importarContatosXLSX = async (filePath, usuarioId) => {
  try {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const dados = XLSX.utils.sheet_to_json(worksheet);

    const importacao_id = Date.now().toString();
    const contatosImportados = [];
    const erros = [];

    for (let i = 0; i < dados.length; i++) {
      try {
        const linha = dados[i];
        
        // Validar campos obrigatórios
        const cpfCnpj = linha['CPF/CNPJ'] || linha['cpf_cnpj'] || linha['CPF'] || linha['CNPJ'];
        const nome = linha['Nome'] || linha['nome'];
        const telefone1 = linha['Telefone 1'] || linha['telefone1'] || linha['Telefone'];

        if (!cpfCnpj || !nome || !telefone1) {
          erros.push({
            linha: i + 2,
            erro: 'Campos obrigatórios não preenchidos (Nome, CPF/CNPJ, Telefone)',
          });
          continue;
        }

        // Validar CPF/CNPJ
        if (!validarCpfCnpj(cpfCnpj)) {
          erros.push({
            linha: i + 2,
            erro: 'CPF/CNPJ inválido',
          });
          continue;
        }

        // Verificar duplicidade
        const cpfCnpjLimpo = cpfCnpj.replace(/\D/g, '');
        const existe = await obterContatoPorCpfCnpj(cpfCnpjLimpo);
        if (existe) {
          erros.push({
            linha: i + 2,
            erro: 'Contato com este CPF/CNPJ já existe',
          });
          continue;
        }

        const novoContato = await criarContato({
          nome: nome.trim(),
          cpfCnpj: cpfCnpjLimpo,
          telefone1: formatPhoneNumber(telefone1),
          telefone2: linha['Telefone 2'] ? formatPhoneNumber(linha['Telefone 2']) : null,
          email: linha['Email'] || linha['email'] || null,
          endereco: linha['Endereço'] || linha['endereco'] || null,
          operador: usuarioId,
          importacao_id,
        });

        contatosImportados.push(novoContato);
      } catch (error) {
        erros.push({
          linha: i + 2,
          erro: error.message,
        });
      }
    }

    return {
      sucesso: true,
      contatosImportados: contatosImportados.length,
      erros,
      importacao_id,
    };
  } catch (error) {
    throw new Error(`Erro ao importar arquivo: ${error.message}`);
  }
};
