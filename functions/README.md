# 🔥 Firebase Cloud Functions - Backend Serverless

## 📁 Estrutura

```
functions/
├── src/
│   ├── index.js              # 🎯 Entry point principal - exporta todas as funções
│   ├── routes/
│   │   ├── auth.js           # Autenticação (login, register, perfil)
│   │   └── contatos.js       # CRUD de contatos e ligações
│   ├── models/
│   │   ├── Usuario.js        # Operações Firestore para usuários
│   │   ├── Contato.js        # Operações Firestore para contatos
│   │   └── HistoricoLigacao.js # Operações para histórico
│   ├── middleware/
│   │   └── auth.js           # Verificação de JWT e proteção de rotas
│   └── utils/
│       ├── jwt.js            # Geração e verificação de tokens
│       └── validators.js     # Hash de senhas e validações
├── package.json              # Dependências
├── .gitignore
└── agendaccb-73569-firebase-adminsdk-fbsvc-426624b2ba.json  # Credenciais Firebase
```

## 🚀 Como Usar

### 1. Instalar Dependências

```bash
cd functions
npm install
```

### 2. Testar Localmente (com Emulador)

```bash
npm start
```

Acessa: `http://localhost:5001/agendaccb-73569/us-central1`

### 3. Deploy para Produção

```bash
npm run deploy
```

URLs geradas:
- `https://us-central1-agendaccb-73569.cloudfunctions.net/auth_login`
- `https://us-central1-agendaccb-73569.cloudfunctions.net/contatos_listar`
- etc...

### 4. Ver Logs

```bash
npm run logs
firebase functions:log
```

---

## 📡 Cloud Functions Disponíveis

### 🔐 Autenticação

| Função | Método | Descrição |
|--------|--------|-----------|
| `auth_register` | POST | Registrar novo usuário |
| `auth_login` | POST | Fazer login |
| `auth_perfil` | GET | Obter perfil do usuário (requer JWT) |

### 📋 Contatos

| Função | Método | Autenticação | Descrição |
|--------|--------|-------------|-----------|
| `contatos_listar` | GET | ✅ JWT | Listar contatos |
| `contatos_criar` | POST | ✅ JWT | Criar novo contato |
| `contatos_obter` | GET | ✅ JWT | Obter 1 contato + histórico |
| `contatos_atualizar` | PUT | ✅ JWT | Atualizar contato |
| `contatos_deletar` | DELETE | ✅ JWT | Deletar contato |
| `contatos_pendentes` | GET | ✅ JWT | Listar pendentes |

### 📞 Ligações

| Função | Método | Autenticação | Descrição |
|--------|--------|-------------|-----------|
| `ligacoes_registrar` | POST | ✅ JWT | Registrar ligação (e atualizar contato) |

---

## 🔑 Variáveis de Ambiente

```env
NODE_ENV=production
JWT_SECRET=seu_secret_bem_seguro_minimo_32_caracteres
```

Para ambiente local, criar `.env.local`:

```env
JWT_SECRET=dev-secret-para-local
```

---

## 🔗 Exemplos de Uso

### Login

```bash
curl -X POST https://us-central1-agendaccb-73569.cloudfunctions.net/auth_login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "senha": "123456"
  }'

# Resposta:
{
  "sucesso": true,
  "usuario": {
    "id": "123abc",
    "nome": "João",
    "email": "usuario@example.com",
    "role": "operador"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Listar Contatos (com autenticação)

```bash
curl -X GET 'https://us-central1-agendaccb-73569.cloudfunctions.net/contatos_listar?page=1&limite=10' \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# Resposta:
{
  "sucesso": true,
  "contatos": [...],
  "paginacao": {
    "total": 50,
    "pagina": 1,
    "limite": 10,
    "totalPaginas": 5
  }
}
```

### Registrar Ligação

```bash
curl -X POST https://us-central1-agendaccb-73569.cloudfunctions.net/ligacoes_registrar \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "contatoId": "doc123",
    "resultado": "conectado",
    "observacao": "Interessado no produto",
    "duracao": 120,  # segundos
    "proximaLigacao": "2026-03-25"
  }'
```

---

## 🆘 Troubleshooting

### "Credenciais não encontradas"
```bash
# Copiar arquivo de credenciais
cp ../agendaccb-73569-firebase-adminsdk-fbsvc-426624b2ba.json ./
```

### "Erro ao fazer deploy"
```bash
# Fazer login novamente
firebase logout
firebase login

# Selecionar projeto correto
firebase use agendaccb-73569

# Tentar deploy
firebase deploy --only functions
```

### "Timeout em testes locais"
```bash
# Aumentar timeout no package.json
# Editar: scripts → start
firebase emulators:start --only functions --inspect-functions
```

---

## 📚 Referências

- [Firebase Cloud Functions Docs](https://firebase.google.com/docs/functions)
- [Admin SDK Reference](https://firebase.google.com/docs/database/admin/start)
- [Cloud Functions Pricing](https://firebase.google.com/pricing)

---

## ✅ Checklist de Deploy

- [ ] `npm install` completou sem erros
- [ ] Arquivo de credenciais está em `functions/`
- [ ] `npm start` funciona localmente
- [ ] TesteiPOST `/auth_login` no emulador
- [ ] Testei GET `/contatos_listar` com JWT no emulador
- [ ] `firebase deploy --only functions` completou
- [ ] URLs do deploy foram copiadas para o frontend
- [ ] Frontend consegue fazer login em produção
- [ ] Contatos carregam depois do login

---

**Sistema pronto para escala! ☁️**
