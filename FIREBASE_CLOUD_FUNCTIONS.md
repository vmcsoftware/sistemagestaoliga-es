# 🔥 Firebase Cloud Functions - Guia Completo

## 📊 Arquitetura Serverless (100% Firebase)

```
┌─────────────────────────────────────────────────────────┐
│         GitHub Pages (Frontend React)                   │
│  https://vmcsoftware.github.io/sistemagestaoliga-es/   │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ HTTP Calls
                       ▼
┌─────────────────────────────────────────────────────────┐
│        Firebase Cloud Functions (Backend)               │
│    https://us-central1-agendaccb-73569.cloudfunctions.net/
│                                                         │
│  ├─ /api/auth/login         (Cloud Function)          │
│  ├─ /api/auth/register      (Cloud Function)          │
│  ├─ /api/contatos/list      (Cloud Function)          │
│  ├─ /api/contatos/create    (Cloud Function)          │
│  └─ /api/ligacoes/register  (Cloud Function)          │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ Read/Write
                       ▼
┌─────────────────────────────────────────────────────────┐
│         Firebase (Google Cloud)                         │
│                                                         │
│  ├─ Firestore Database (dados)                         │
│  ├─ Authentication (login/register)                    │
│  ├─ Cloud Storage (uploads)                            │
│  └─ Security Rules (proteção)                          │
└─────────────────────────────────────────────────────────┘
```

## ✅ Benefícios dessa Arquitetura

| Aspecto | Benefício |
|---------|-----------|
| **Custo** | 2M invocações/mês = GRATUITO |
| **Escalabilidade** | Automática (Google gerencia) |
| **Manutenção** | Zero - Google cuida dos servidores |
| **Segurança** | SSL automático, firewalls |
| **Integração** | Tudo na mesma conta Google/Firebase |
| **Deployment** | `firebase deploy` - pronto |

---

## 🚀 Passo 1: Preparar Ambiente Local

### 1.1 Instalar Firebase CLI

```bash
npm install -g firebase-tools
```

### 1.2 Fazer Login

```bash
firebase login
```

Abre navegador → Autoriza acesso → Volta para terminal

### 1.3 Inicializar Functions

```bash
cd servidor  # OU se não tiver pasta ainda, crie
firebase init functions
```

Responda:
```
? Are you ready to proceed? → Yes
? Which JavaScript language? → JavaScript (ou TypeScript se preferir)
? Do you want to use ESLint? → No (por enquanto)
? Do you want to install dependencies now? → Yes
```

Isso cria estrutura:
```
functions/
├─ .eslintrc.json
├─ index.js
├─ package.json
└─ node_modules/
```

---

## 📝 Passo 2: Criar Cloud Functions

### 2.1 Entender Estrutura

```javascript
// functions/index.js

const functions = require('firebase-functions');
const cors = require('cors');
const admin = require('firebase-admin');

// Inicializar Firebase Admin SDK
admin.initializeApp();

// Toda chamada HTTP
const corsHandler = cors({ origin: 'https://vmcsoftware.github.io' });

// Exemplo: Função para listar contatos
exports.listarContatos = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const db = admin.firestore();
      const snapshot = await db.collection('contatos').get();
      const contatos = shadow.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      res.json(contatos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});
```

### 2.2 Migrar do Node.js/Express para Cloud Functions

**Código Express Antigo:**
```javascript
app.get('/api/contatos', (req, res) => {
  // ... lógica
});
```

**Cloud Function Novo:**
```javascript
exports.contatos_list = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    // ... mesma lógica
  });
});
```

### 2.3 Estrutura Recomendada

```
functions/
├─ index.js (expressós globais)
├─ routes/
│  ├─ auth.js (login, register)
│  ├─ contatos.js (CRUD contatos)
│  └─ ligacoes.js (registrar ligações)
├─ middleware/
│  └─ auth.js (verificar JWT)
├─ package.json
└─ node_modules/
```

**index.js:**
```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Importar rotas
const authRoutes = require('./routes/auth');
const contatosRoutes = require('./routes/contatos');
const ligacoesRoutes = require('./routes/ligacoes');

// Exportar como Cloud Functions
exports.auth_login = authRoutes.login;
exports.auth_register = authRoutes.register;
exports.contatos_list = contatosRoutes.list;
exports.contatos_create = contatosRoutes.create;
exports.ligacoes_register = ligacoesRoutes.register;
```

---

## 🔐 Passo 3: Autenticação e Segurança

### 3.1 JWT no Cloud Functions

```javascript
// middleware/auth.js
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const verifyToken = async (req) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    throw new Error('Token não fornecido');
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

exports.verifyToken = verifyToken;
```

### 3.2 Cloud Functions com Autenticação

```javascript
// routes/contatos.js
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors');
const { verifyToken } = require('../middleware/auth');

const corsHandler = cors({ 
  origin: 'https://vmcsoftware.github.io' 
});

exports.list = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      // Verificar JWT
      const user = await verifyToken(req);
      
      // Listar contatos do usuário
      const db = admin.firestore();
      const snapshot = await db.collection('contatos')
        .where('userId', '==', user.id)
        .get();
      
      const contatos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      res.json({
        success: true,
        data: contatos
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error.message
      });
    }
  });
});
```

---

## 🎯 Passo 4: Fazer Deploy

### 4.1 Preparar para Deploy

```bash
# Na pasta functions/
npm install

# Testar localmente (opcional)
firebase emulators:start functions
```

### 4.2 Deploy

```bash
firebase deploy --only functions
```

Saída esperada:
```
✔ Deploy complete!

Function URL (auth_login):
https://us-central1-agendaccb-73569.cloudfunctions.net/auth_login

Function URL (auth_register):
https://us-central1-agendaccb-73569.cloudfunctions.net/auth_register

... (mais funções)
```

### 4.3 Copiar URLs das Funções

Anote todas as URLs geradas. Você vai usar no frontend.

---

## 🔗 Passo 5: Conectar Frontend ao Backend

### 5.1 Criar arquivo de configuração

**client/src/config/firebase-functions.js:**
```javascript
// URLs das Cloud Functions
export const API_ENDPOINTS = {
  // Auth
  LOGIN: 'https://us-central1-agendaccb-73569.cloudfunctions.net/auth_login',
  REGISTER: 'https://us-central1-agendaccb-73569.cloudfunctions.net/auth_register',
  
  // Contatos
  CONTATOS_LIST: 'https://us-central1-agendaccb-73569.cloudfunctions.net/contatos_list',
  CONTATOS_CREATE: 'https://us-central1-agendaccb-73569.cloudfunctions.net/contatos_create',
  CONTATOS_UPDATE: 'https://us-central1-agendaccb-73569.cloudfunctions.net/contatos_update',
  CONTATOS_DELETE: 'https://us-central1-agendaccb-73569.cloudfunctions.net/contatos_delete',
  
  // Ligações
  LIGACOES_REGISTER: 'https://us-central1-agendaccb-73569.cloudfunctions.net/ligacoes_register',
};
```

### 5.2 Usar nos Services

**client/src/services/api.js:**
```javascript
import axios from 'axios';
import { API_ENDPOINTS } from '../config/firebase-functions';

export const authService = {
  login: async (email, password) => {
    const response = await axios.post(API_ENDPOINTS.LOGIN, {
      email,
      password
    });
    return response.data;
  },
  
  register: async (data) => {
    const response = await axios.post(API_ENDPOINTS.REGISTER, data);
    return response.data;
  }
};

export const contatosService = {
  list: async (token) => {
    const response = await axios.get(API_ENDPOINTS.CONTATOS_LIST, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  create: async (data, token) => {
    const response = await axios.post(API_ENDPOINTS.CONTATOS_CREATE, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};
```

---

## ⚙️ Passo 6: Variáveis de Ambiente

### 6.1 Criar arquivo .env.local (Local)

**functions/.env.local:**
```
JWT_SECRET=seu_secret_super_seguro_minimo_32_caracteres
FIREBASE_PROJECT_ID=agendaccb-73569
```

### 6.2 Definir em Produção

```bash
firebase functions:config:set env.jwt_secret="seu_secret"
```

### 6.3 Usar em Cloud Functions

```javascript
const functions = require('firebase-functions');

const JWT_SECRET = functions.config().env?.jwt_secret || process.env.JWT_SECRET;
```

---

## 🧪 Passo 7: Testar

### Local (Emulator)

```bash
cd functions
firebase emulators:start --only functions
```

Acessa: http://localhost:5001

```javascript
// Teste no frontend ou Postman
fetch('http://localhost:5001/agendaccb-73569/us-central1/auth_login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@example.com', password: '123456' })
})
```

### Produção

```bash
# Fazer login
curl https://us-central1-agendaccb-73569.cloudfunctions.net/auth_login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

---

## 📋 Migração Passo-a-Passo do Servidor Atual

### O Que Você Tem Agora
```
server/
├─ src/
│  ├─ index.js (servidor Express)
│  ├─ controllers/
│  │  ├─ authController.js
│  │  ├─ contatoController.js
│  │  └─ dashboardController.js
│  ├─ routes/
│  │  ├─ authRoutes.js
│  │  ├─ contatoRoutes.js
│  │  └─ dashboardRoutes.js
│  └─ ...
```

### O Que Você Vai Ter
```
functions/
├─ index.js (exporta Cloud Functions)
├─ routes/
│  ├─ auth.js (login, register)
│  ├─ contatos.js (list, create, update, delete)
│  └─ ligacoes.js (register)
├─ middleware/
│  └─ auth.js (verificar JWT)
├─ utils/
│  └─ firebase.js (inicializar admin SDK)
└─ package.json
```

### Migração:

1. **Auth**
   - Express route `/api/auth/login` → Cloud Function `auth_login`
   - Express route `/api/auth/register` → Cloud Function `auth_register`

2. **Contatos**
   - GET `/api/contatos` → Cloud Function `contatos_list`
   - POST `/api/contatos` → Cloud Function `contatos_create`
   - PUT `/api/contatos/:id` → Cloud Function `contatos_update`
   - DELETE `/api/contatos/:id` → Cloud Function `contatos_delete`

3. **Ligações**
   - POST `/api/ligacoes` → Cloud Function `ligacoes_register`

---

## 🎯 Checklist de Deployment

- [ ] Instalei Firebase CLI: `npm install -g firebase-tools`
- [ ] Fiz login: `firebase login`
- [ ] Inicializei functions: `firebase init functions`
- [ ] Criei estrutura de rotas (auth.js, contatos.js, etc)
- [ ] Migrei lógica do Express para Cloud Functions
- [ ] Adicionei CORS correto
- [ ] Testei localmente com emulator
- [ ] Fiz deploy: `firebase deploy --only functions`
- [ ] Copiei URLs das funções
- [ ] Atualizei config no frontend
- [ ] Testei login no frontend
- [ ] Testei criar contato
- [ ] Testei registrar ligação
- [ ] GitHub Pages carrega e faz requisições corretas

---

## 💰 Custos (Base Gratuita)

```
Plano Spark (Gratuito):
- 125.000 invocações/mês = GRATUITO
- 40GB armazenamento = GRATUITO
- 1GB tráfego = GRATUITO

Seu app (estimado):
- 100 múltiplos requisições/dia = 3.000/mês
- Bem dentro do limite gratuito!
```

---

## 📚 Referências

- [Firebase Cloud Functions Docs](https://firebase.google.com/docs/functions)
- [Cloud Functions HTTP Guide](https://firebase.google.com/docs/functions/http-events)
- [Firebase Admin SDK](https://firebase.google.com/docs/database/admin/start)
- [CORS in Cloud Functions](https://firebase.google.com/docs/functions/http-events#using_http_requests)

---

## 🎉 Próximos Passos

1. **Prepare Functions** → firebase init functions
2. **Migre Código** → Auth, Contatos, Ligações
3. **Teste Local** → firebase emulators:start
4. **Deploy** → firebase deploy --only functions
5. **Conecte Frontend** → Atualize URLs
6. **Teste End-to-End** → Login → Contatos → Ligações

**Arquitetura 100% serverless pronta! 🔥**
