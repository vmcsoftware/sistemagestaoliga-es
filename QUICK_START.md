# ⚡ Quick Start Guide

## 1️⃣ Preparação (5 minutos)

### Baixar Firebase Credentials
1. Vá a [firebase.google.com/console](https://firebase.google.com/console)
2. Selecione projeto **agendaccb-73569**
3. ⚙️ Configurações → Contas de Serviço
4. "Gerar Nova Chave Privada"
5. Salve o arquivo JSON como `firebase-key.json` em `server/`

### Clonar Repositório (ou verificar estrutura)
```bash
cd "Sistema de Gestão de Ligações"
ls -la
# Deve ter: server/, client/, .env, .env.example, etc.
```

---

## 2️⃣ Instalar Dependências (2 minutos)

### Backend
```bash
cd server
npm install
```

### Frontend (em novo terminal)
```bash
cd client
npm install
```

---

## 3️⃣ Iniciar Servidores

### Terminal 1: Backend
```bash
cd server
npm run dev
```
✅ Esperar por: `✅ Firestore conectado ao projeto: agendaccb-73569`

### Terminal 2: Frontend
```bash
cd client
npm run dev
```
✅ Esperar por: `http://localhost:5173`

### Terminal 3: Abrir no Navegador
```bash
# Automaticamente abre http://localhost:5173
# Ou vá manualmente:
http://localhost:5173
```

---

## 4️⃣ Criar Conta de Teste (1 minuto)

1. Clique em **"Registrar"**
2. Preencha:
   - Email: `teste@empresa.com`
   - Senha: `Senha123!`
   - Nome: `João Teste`
   - Função: **Operador**
3. Clique em **"Registrar"**

---

## 5️⃣ Importar Contatos (2 minutos)

### Preparar Arquivo Excel
Crie arquivo `contatos.xlsx` com colunas:
```
| Nome              | CPF/CNPJ        | Email              | Telefone         |
|-------------------|-----------------|------------------|------------------|
| Empresa ABC       | 12345678000195  | contato@abc.com   | +55 11 98765-4321|
| Empresa XYZ       | 98765432000123  | contato@xyz.com   | +55 21 99876-5432|
```

### Importar
1. Menu → **Contatos** → **Importar**
2. Selecione arquivo
3. Clique **"Importar"**
4. ✅ Contatos aparecem em segundos

---

## 6️⃣ Registrar Ligação (1 minuto)

1. **Contatos** → Selecione um contato
2. Botão **"Registrar Ligação"**
3. Preencha:
   - **Resultado**: Sucesso / Insucesso / Não Atendeu
   - **Anotações**: Qualquer texto (opcional)
4. **"Salvar"**
5. ✅ Dashboard atualiza automaticamente

---

## 7️⃣ Ver Dashboard

1. Menu → **Dashboard**
2. Veja gráficos e métricas em tempo real
3. Filtre por período ou operador

---

## 🎯 Estrutura Rápida da Aplicação

```
CRM para Vendas
│
├─ 🔐 Login / Registro
│
├─ 👥 Gerenciar Contatos
│  ├─ Importar (Excel)
│  ├─ Ver Lista
│  ├─ Buscar/Filtrar
│  └─ Registrar Ligações
│
├─ 📊 Dashboard
│  ├─ Métricas Gerais
│  ├─ Gráficos de Performance
│  └─ Ranking de Operadores
│
├─ 📈 Relatórios
│  ├─ Operador
│  ├─ Contatos Trabalhados
│  └─ Análise de Período
│
└─ ⚙️ Configurações (Admin)
   ├─ Gerenciar Usuários
   └─ Configurações Gerais
```

---

## 🏗️ Arquitetura Técnica

```
┌─────────────────────────────────────┐
│         NAVEGADOR (React)           │
│    http://localhost:5173            │
│  - Dashboard                        │
│  - Contatos                         │
│  - Relatórios                       │
│  - Configurações                    │
└────────────────┬────────────────────┘
                 │ HTTP/REST
┌────────────────▼────────────────────┐
│      API EXPRESS (Node.js)          │
│    http://localhost:5000            │
│  - /api/auth                        │
│  - /api/contatos                    │
│  - /api/dashboard                   │
│  - /api/relatorios                  │
└────────────────┬────────────────────┘
                 │ SDK Firebase
┌────────────────▼────────────────────┐
│    FIREBASE FIRESTORE (NoSQL)       │
│     agendaccb-73569                 │
│  - Collection: usuarios             │
│  - Collection: contatos             │
│  - Collection: historico_ligacoes   │
└─────────────────────────────────────┘
```

---

## 🐛 Problemas Comuns e Soluções

| Problema | Solução |
|----------|---------|
| "Port 5000 in use" | Mude `PORT=5001` no `.env` ou feche outro app |
| "firebase-key.json not found" | Coloque arquivo em `server/` |
| "Cannot find module 'firebase-admin'" | `cd server && npm install firebase-admin` |
| Contatos não aparecem | Importe arquivo XLSX com colunas corretas |
| Dashboard branco | Aperte F5 para recarregar ou verifique console (F12) |
| Senha não aceita | Mínimo 6 caracteres, sem espaços |

---

## 📱 URLs Principais

| Página | URL |
|--------|-----|
| Aplicação | http://localhost:5173 |
| API Saúde | http://localhost:5000/health |
| Firebase Console | [firebase.google.com/console](https://firebase.google.com/console) |
| Seu Projeto Firebase | [Projeto agendaccb-73569](https://console.firebase.google.com/u/0/project/agendaccb-73569/) |

---

## 📚 Arquivos Principais

| Arquivo | Função |
|---------|--------|
| `FIREBASE_SETUP.md` | Guia completo do Firebase |
| `DEPLOYMENT_CHECKLIST.md` | Checklist antes de usar |
| `server/.env` | Configurações do backend |
| `server/src/index.js` | Entrada da API |
| `client/src/App.jsx` | Entrada do React |

---

## ✅ Checklist de Início

- [ ] Firebase credentials baixadas
- [ ] `firebase-key.json` em `server/`
- [ ] `npm install` executado em `server/` e `client/`
- [ ] Backend iniciado em terminal
- [ ] Frontend iniciado em terminal
- [ ] Navegador aberto em http://localhost:5173
- [ ] Conta criada com sucesso
- [ ] Contatos importados
- [ ] Primeira ligação registrada
- [ ] Dashboard mostra dados

---

## 🚀 Tudo Pronto!

A aplicação está **100% funcional**. Próximos passos:

1. Usar normalmente (importar contatos, registrar chamadas)
2. Adicionar mais operadores (Admin → Gerenciar Usuários)
3. Visualizar relatórios e métricas
4. (Opcional) Configurar integração WhatsApp
5. (Opcional) Fazer deploy em produção

---

**Dúvidas?** Veja `FIREBASE_SETUP.md` ou `DEPLOYMENT_CHECKLIST.md`

---

## 1️⃣ Preparar o Ambiente

### Defina as Variáveis
O arquivo `server/.env` já está configurado para desenvolvimento local.
Se usar MongoDB Atlas, atualize:

```env
MONGODB_URI=mongodb+srv://seu-usuario:sua-senha@cluster.mongodb.net/crm-contatos
```

---

## 2️⃣ Instalar Dependências

### Abra 2 Terminais

**Terminal 1 - Backend:**
```bash
cd server
npm install
```

**Terminal 2 - Frontend:**
```bash
cd client
npm install
```

⏱️ Isso pode levar 2-3 minutos...

---

## 3️⃣ Iniciar os Servidores

### Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Você verá:
```
✅ Servidor rodando em http://localhost:5000
📊 Ambiente: development
```

### Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

Você verá:
```
  ➜  Local:   http://localhost:5173
```

---

## 4️⃣ Acessar a Aplicação

Abra seu navegador em: **http://localhost:5173**

---

## 5️⃣ Criar Primeira Conta (ou Usar de Teste)

### Registrar Nova Conta:
1. Clique em "Criar conta"
2. Preencha nome, email e senha
3. Clique em "Registrar"

### Usar Conta de Teste:
Se quiser apenas testar, crie uma conta de teste:

```bash
# Via curl
curl -X POST http://localhost:5000/api/auth/registrar \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Operador",
    "email": "joao@example.com",
    "senha": "123456"
  }'
```

---

## 6️⃣ Explorar a Aplicação

### Dashboard 📊
- Veja métricas em tempo real
- Gráficos de desempenho
- Alertas inteligentes
- Ranking de operadores

### Contatos 📋
- Clique em "Importar XLSX" para carregar contatos
- [Baixe modelo de arquivo aqui](#modelo-de-arquivo)
- Busque contatos por nome, CPF ou telefone
- Clique em um contato para registrar ligação

### Relatórios 📈
- Selecione intervalo de datas
- Veja desempenho por operador
- Analise contatos trabalhados
- Exporte dados (em desenvolvimento)

---

## 📄 Modelo de Arquivo para Importação

Crie um arquivo **contatos.xlsx** com as colunas:

| Nome | CPF/CNPJ | Telefone 1 | Telefone 2 | Email | Endereço |
|------|----------|-----------|-----------|-------|----------|
| João Silva | 123.456.789-00 | (11) 98765-4321 | (11) 3456-7890 | joao@example.com | Rua A, 123 |
| Maria Santos | 12.345.678/0001-90 | (11) 99876-5432 | | maria@example.com | Rua B, 456 |
| José Costa | 987.654.321-00 | (11) 97654-3210 | (11) 2345-6789 | jose@example.com | Rua C, 789 |

⚠️ Campos obrigatórios: **Nome**, **CPF/CNPJ**, **Telefone 1**

---

## 🐛 Problemas Comuns?

### ❌ "Cannot connect to MongoDB"
```bash
# No terminal, verifique se MongoDB está rodando
mongod --version
# Se instalou, inicie o serviço
# Windows: Services ou `mongod` no CMD
# Mac: `brew services start mongodb-community`
# Linux: `sudo systemctl start mongod`
```

### ❌ "Port 5000 already in use"
Em outro terminal você pode ter deixado o servidor rodando:
```bash
# Encontre e mate o processo
lsof -ti:5000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :5000   # Windows (anote o PID)
taskkill /PID <PID> /F         # Windows
```

### ❌ "CORS error"
Apenas indique ao backend qual é a URL do seu frontend:

```env
# server/.env
CLIENT_URL=http://localhost:5173
```

### ❌ Componentes não aparecem
```bash
# Limpe cache e reinstale
cd client
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📚 Guias Detalhados

- [DEVELOPMENT.md](DEVELOPMENT.md) - Guia completo de desenvolvimento
- [README.md](README.md) - Documentação da aplicação

---

## 🎯 O Que Fazer Agora?

### ✅ Próximas Etapas

1. **Registre uma conta de teste**
2. **Importe contatos** via arquivo XLSX
3. **Registre algumas ligações** nos contatos
4. **Explore o Dashboard** para ver as métricas
5. **Gere relatórios** por intervalo de datas

### 🔗 URLs Principais

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Docs: http://localhost:5000/api/health

### 📞 Scripts Úteis

**Reiniciar Backend:**
```bash
cd server
npm run dev
```

**Reiniciar Frontend:**
```bash
cd client
npm run dev
```

**Limpar Base de Dados (MongoDB):**
```bash
# No terminal MongoDB
use crm-contatos
db.dropDatabase()
```

---

## 🎓 Estrutura de Arquivos Importantes

```
├── server/
│   ├── .env              ← Configure aqui
│   ├── src/index.js      ← Servidor principal
│   └── src/models/       ← Estrutura do banco de dados
│
├── client/
│   ├── src/App.jsx       ← Rotas da aplicação
│   └── src/pages/        ← Páginas principais
│
├── README.md             ← Documentação
├── DEVELOPMENT.md        ← Guia de desenvolvimento
└── QUICK_START.md        ← Este arquivo!
```

---

## 🎨 Recursos Visuais

A aplicação possui:
- 🌙 Design moderno com gradientes
- 🎨 Tema neon (azul, roxo, rosa)
- ⚡ Animações suaves
- 📱 Totalmente responsivo
- 🌐 Ícones intuitivos

---

## 🆘 Ainda com Dúvidas?

1. Verifique [DEVELOPMENT.md](DEVELOPMENT.md)
2. Leia os comentários no código
3. Abra a aba "Console" no navegador para ver erros
4. Verifique os logs do servidor no terminal

---

## 🚀 Próximos Passos Avançados

Após familiarizar-se com a aplicação:

- [ ] Implementar autenticação por email
- [ ] Adicionar notificações em tempo real
- [ ] Criar campos personalizados
- [ ] Integrar com sistemas CRM existentes
- [ ] Adicionar análise preditiva

---

**Bom uso! 🎉**

Desenvolvido com ❤️ para operadores de vendas.
