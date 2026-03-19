# 🚀 Setup Completo - Sistema de Gestão de Ligações com Cloud Functions

## 📊 Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                  GitHub Pages (Frontend)                    │
│  https://vmcsoftware.github.io/sistemagestaoliga-es/       │
│  (React 18 + Vite + TailwindCSS)                            │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP com JWT
                       ↓
┌─────────────────────────────────────────────────────────────┐
│          Firebase Cloud Functions (Backend)                 │
│  https://us-central1-agendaccb-73569.cloudfunctions.net/   │
│  (Node.js Serverless - sem servidores para gerenciar)      │
└──────────────────────┬──────────────────────────────────────┘
                       │ Firestore + Auth
                       ↓
┌─────────────────────────────────────────────────────────────┐
│              Firebase (Google Cloud)                        │
│  ├─ Firestore Database (NoSQL)                             │
│  ├─ Authentication (Login/Register)                        │
│  ├─ Cloud Storage (Uploads)                               │
│  └─ Security Rules (Proteção)                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Pré-requisitos

- [ ] Node.js 18+ instalado
- [ ] npm ou yarn
- [ ] Conta Google com Firebase ativado
- [ ] Git configurado
- [ ] GitHub com repositório criado

---

## 📖 Guia Passo-a-Passo

### Fase 1: Setup Local

#### 1.1 Clonar Repositório

```bash
git clone https://github.com/vmcsoftware/sistemagestaoliga-es.git
cd sistemagestaoliga-es
```

#### 1.2 Instalar Dependências

```bash
# Frontend
cd client
npm install

# Backend (Cloud Functions)
cd ../functions
npm install

cd ..
```

#### 1.3 Instalar Firebase CLI (global)

```bash
npm install -g firebase-tools
```

#### 1.4 Fazer Login no Firebase

```bash
firebase login
# Abre navegador para autenticar
```

#### 1.5 Selecionar Projeto

```bash
firebase use agendaccb-73569
# Ou: firebase use --add → escolhe o projeto interativamente
```

---

### Fase 2: Testes Locais

#### 2.1 Testar Frontend

```bash
cd client
npm run dev
# Abre em http://localhost:5173
```

#### 2.2 Testar Cloud Functions (Emulador)

```bash
# Em outro terminal
cd functions
npm start
# Abre em http://localhost:5001/agendaccb-73569/us-central1
# UI do emulador em http://localhost:4000
```

#### 2.3 Processos Simultâneos

Se quiser rodar ambos nos mesmos terminal:

```bash
# Terminal 1
npm run dev  # client

# Terminal 2
npm start    # functions
```

#### 2.4 Testar Login (Manual)

No emulador:

```bash
# Abrir http://localhost:5173
# Clicar "Login"
# Email: test@example.com
# Senha: 123456
```

Se não funcionar, verificar:
1. Console do navegador (F12) - erros de CORS?
2. Terminal do emulador - erros de autenticação?
3. Firestore está inicializado?

---

### Fase 3: Deploy para Produção

#### 3.1 Frontend no GitHub Pages

```bash
cd client

# Build para produção
npm run build

# Fazer commit
git add .
git commit -m "build: Generate production bundle"
git push origin main
```

GitHub Actions fará deploy automaticamente em 2-3 minutos.

URL: `https://vmcsoftware.github.io/sistemagestaoliga-es/`

#### 3.2 Variáveis de Ambiente (Cloud Functions)

As variáveis de produção são definidas automaticamente pelo Firebase:

```bash
firebase functions:config:set env.jwt_secret="seu_secret_super_seguro"
```

Atualmente baseado em `.env` local, que você não faz commit.

#### 3.3 Deploy Cloud Functions

```bash
cd functions

# Fazer deploy
firebase deploy --only functions

# Ou com script
npm run deploy
```

Saída esperada:

```
✔  Deploy complete!

Function URL (auth_login):
https://us-central1-agendaccb-73569.cloudfunctions.net/auth_login

Function URL (contatos_listar):
https://us-central1-agendaccb-73569.cloudfunctions.net/contatos_listar

...
```

#### 3.4 Verificar Deploy

```bash
# Health check
curl https://us-central1-agendaccb-73569.cloudfunctions.net/health

# Esperado:
# {"status":"ok","timestamp":"2026-03-18T...","environment":"production"}
```

---

### Fase 4: Testes End-to-End

#### 4.1 Testar Frontend em Produção

```bash
# Abra:
https://vmcsoftware.github.io/sistemagestaoliga-es/
```

Verificar:
- [ ] Página carrega
- [ ] Redireciona para /login
- [ ] Formulário de login aparece

#### 4.2 Testar Login

```bash
# Dados válidos
Email: seu-email@example.com
Senha: sua-senha

# Clicar Login
# Se funcionar → localStorage tem token → Dashboard carrega
```

#### 4.3 Testar Contatos

No Dashboard:
- [ ] Contatos carregam (ou lista vazia se nenhum)
- [ ] Clicar "Novo Contato"
- [ ] Preencher dados
- [ ] Clicar "Salvar"
- [ ] Contato aparece na lista

#### 4.4 Testar Ligações

Em um contato:
- [ ] Clicar "Registrar Ligação"
- [ ] Preencher resultado
- [ ] Clicar "Registrar"
- [ ] Histórico atualiza

---

## 🔧 Troubleshooting

### Erro: "Cloud Functions não responde"

```bash
# 1. Verificar se o deploy completou
firebase functions:list

# 2. Ver logs
firebase functions:log

# 3. Tentar re-deploy
firebase deploy --only functions
```

### Erro: "CORS bloqueado"

```bash
# Verificar se as origens estão corretas em functions/src/index.js
# Adicionar novo origem:
cors: {
  origin: ['http://localhost:5173', 'https://seu-site.com']
}

# Fazer novo deploy
npm run deploy
```

### Erro: "Token inválido"

```bash
# JWT_SECRET deve ser o MESMO em produção e local
# Verificar:
firebase functions:config:get

# Se JWT_SECRET não está definido, adicionar:
firebase functions:config:set env.jwt_secret="novo_secret"

#Re-deploy:
firebase deploy --only functions
```

### Erro: "Contatos não carregam"

1. Verificar se usuário está logado (localStorage tem 'token'?)
2. Verificar Firestore se tem dados (Firebase Console → Firestore)
3. Fazer POST para criar contato test
4. Ver logs: `firebase functions:log`

---

## 📋 Checklist Final

### Desenvolvimento
- [ ] Código compila sem erros
- [ ] Frontend roda localmente (npm run dev)
- [ ] Cloud Functions rodas localmente (npm start)
- [ ] Login funciona localmente
- [ ] Contatos carregam localmente
- [ ] Ligações podem ser registradas

### Produção
- [ ] Frontend buildado (npm run build)
- [ ] GitHub Pages ativado (Settings → Pages)
- [ ] Cloud Functions deployadas (firebase deploy)
- [ ] Frontend carrega em GitHub Pages
- [ ] Login funciona em produção
- [ ] Contatos carregam em produção
- [ ] Dados são salvos no Firestore

---

## 🎯 Próximas Melhorias

- [ ] Upload de arquivo (XLS com contatos)
- [ ] Relatórios/Dashboard
- [ ] Notificações push
- [ ] Autenticação com Google
- [ ] 2FA

---

## 📞 Suporte

Erro não listado aqui?

1. Ver logs: `firebase functions:log`
2. Ver console do navegador (F12)
3. Verificar Firestore Console
4. GitHub Issues: https://github.com/vmcsoftware/sistemagestaoliga-es/issues

---

**Parabéns! Sistema em produção! 🚀**

Para dúvidas específicas, veja:
- `functions/README.md` - Cloud Functions
- `FIREBASE_CLOUD_FUNCTIONS.md` - Arquitetura detalhada
- `GITHUB_PAGES_SETUP.md` - Frontend setup
