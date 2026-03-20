# 🚀 Cloud Functions Deployment - Guia Completo

## 📋 Pré-Requisitos

### 1. Firebase Project Configurado

Seu projeto: `agendaccb-73569`

Verificar:
```bash
firebase projects:list
```

Deve listar seu projeto.

### 2. CLI Instalado

```bash
# Verificar versão
firebase --version

# Atualizar se necessário
npm install -g firebase-tools
```

### 3. Autenticado no Firebase

```bash
firebase login
# Abrirá navegador, faça login com sua conta Google
```

Verificar:
```bash
firebase auth:list
```

---

## 🏗️ Estrutura Cloud Functions

Seus 9 endpoints:

```
Authentication (3 funções)
├─ POST /api/auth/register
├─ POST /api/auth/login
└─ GET  /api/auth/perfil

Contatos (4 funções)
├─ GET    /api/contatos (listar)
├─ POST   /api/contatos (criar)
├─ PUT    /api/contatos/:id (atualizar)
└─ DELETE /api/contatos/:id (deletar)

Ligações (1 função)
└─ POST /api/ligacoes/registrar

Health Check (1 função)
└─ GET  /api/health
```

---

## 🔧 Preparar Functions para Deploy

### Passo 1: Configurar Variáveis Ambiente

```bash
cd functions
```

Criar `.env.local`:
```env
FIREBASE_API_KEY=seu_api_key
FIREBASE_AUTH_DOMAIN=agendaccb-73569.firebaseapp.com
FIREBASE_DATABASE_URL=https://agendaccb-73569.firebasebase.com
FIREBASE_PROJECT_ID=agendaccb-73569
FIREBASE_STORAGE_BUCKET=agendaccb-73569.appspot.com
FIREBASE_MESSAGING_SENDER_ID=seu_id
FIREBASE_APP_ID=seu_app_id
JWT_SECRET=seu_secret_super_seguro
```

**⚠️ CRÍTICO:** Este arquivo NÃO pode ser commitado (está em .gitignore)

### Passo 2: Instalar Dependências

```bash
cd functions
npm install

# Verificar
npm list firebase-functions firebase-admin
```

### Passo 3: Testar Localmente

```bash
# No terminal, em /functions
npm run serve
```

Deve mostrar:
```
✓ Functions emulator running on http://localhost:5001
✓ Firestore emulator running on http://localhost:8080
```

### Passo 4: Testar Endpoints

Em outro terminal:
```bash
# Health check
curl http://localhost:5001/agendaccb-73569/us-central1/healthCheck

# Register
curl -X POST http://localhost:5001/agendaccb-73569/us-central1/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@teste.com",
    "password": "Senha123!",
    "nome": "Teste"
  }'
```

- [ ] Responses sem erros
- [ ] Status code 200/201

---

## 🚀 Deploy para Firebase

### Opção A: Deploy Completo (Frontend + Backend)

```bash
# Garanta estar na pasta raiz do projeto
cd /path/to/project

# Build frontend
cd client && npm run build && cd ..

# Deploy tudo
firebase deploy

# Aguarde 3-5 minutos
```

Tipos de recursos deployados:
- Functions (backend)
- Hosting (frontend no GitHub Pages)
- Firestore (database)

### Opção B: Deploy Apenas Functions

```bash
firebase deploy --only functions

# Ou apenas uma função:
firebase deploy --only functions:register
```

Mais rápido se já fez deploy do frontend.

### Opção C: Deploy Apenas Hosting

```bash
firebase deploy --only hosting
```

Para quando só mudou frontend.

---

## ✅ Verificar Deploy

### 1. Functions Deployadas

```bash
firebase functions:list
```

Deve listar:
```
✓ register
✓ login
✓ perfil
✓ listarContatos
✓ criarContato
✓ atualizarContato
✓ deletarContato
✓ registrarLigacao
✓ healthCheck
```

### 2. Testar Endpoints em Produção

```bash
# URL de produção
BASE_URL="https://us-central1-agendaccb-73569.cloudfunctions.net"

# Health check
curl $BASE_URL/healthCheck

# Register
curl -X POST $BASE_URL/register \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@teste.com", "password":"Senha123!", "nome":"Teste"}'
```

Status esperado: `200` ou `201`, nunca `500`

### 3. Ver Logs

```bash
# Últimos logs
firebase functions:log

# Monitorar em tempo real
firebase functions:log --follow

# Log de função específica
firebase functions:log --follow --function=register
```

---

## 🔐 Variáveis de Ambiente em Produção

### Firebase Cloud Functions Runtime Config (DEPRECIADO)

Usar **Secret Manager** em vez disso:

```bash
# Criar secret
gcloud secrets create JWT_SECRET --data-file=-
# (colar seu secret e Ctrl+D)

# Deploy com secret
firebase deploy --only functions
```

Acessar em functions:
```javascript
const functions = require('firebase-functions');

// Runtime config (novo jeito)
const secret = functions.config().jwt?.secret;
```

---

## 📊 Monitoramento

### Firebase Console

Ir em: `Firebase Console → Project → Functions`

Ver:
- [ ] Status de cada function (green = running)
- [ ] Execuções (30 dias)
- [ ] Erros/warnings
- [ ] Performance (latência)

### Via CLI

```bash
# Estatísticas
firebase functions:describe <function-name>

# Exemplo
firebase functions:describe register
```

---

## 🐛 Troubleshooting

### "Function não encontrada"

```bash
# Verificar se foi deployado
firebase functions:list

# Se faltando, fazer deploy novamente
firebase deploy --only functions
```

### "Erro 500 em produção"

```bash
# Ver logs
firebase functions:log

# Ver erro específico
firebase functions:log --follow --function=<nome>
```

Se precisar debugar localmente:
```bash
npm run serve # em /functions
```

### "Timeout (> 60s)"

Cloud Functions tem limite de 60s por padrão.

Se function demora muito:
1. Otimizar código
2. Aumentar timeout em `firebase.json`:

```json
"functions": {
  "timeoutSeconds": 300,
  "memory": "256MB"
}
```

### "Banco de dados não conecta"

Verificar:
```bash
# Firestore ativado?
firebase firestore:list

# Regras de segurança
firebase firestore:get-metadata access-rules
```

Padrão durante desenvolvimento:
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 📈 Escalabilidade & Limites

### Quotas Cloud Functions

| Limite | Valor |
|--------|-------|
| Execuções/mês | FREE: 2M/mês |
| Duração máxima | 60 segundos |
| Memória máxima | 8GB |
| Instâncias concorrentes | 1000 |

Se precisar mais: `firebase deploy --only functions --region us-central1,europe-west1`

---

## 🔗 Conectar Frontend do Backend em Produção

Seu frontend já está configurado em `client/src/config/api-endpoints.js`:

```javascript
const API_URL = isDevelopment 
  ? 'http://localhost:5001/agendaccb-73569/us-central1'
  : 'https://us-central1-agendaccb-73569.cloudfunctions.net'
```

Isso é automático! 🎯

Quando fizer:
```bash
npm run build  # Detecta ambiente produção
firebase deploy
```

Frontend conectará automaticamente às Cloud Functions.

---

## 📝 Checklist de Deploy

```markdown
## ANTES
- [ ] `.env.local` preenchido (NÃO commitar!)
- [ ] `npm install` em /functions
- [ ] Testado localmente com `npm run serve`
- [ ] Todos os testes passando

## DEPLOY
- [ ] `firebase deploy --only functions`
- [ ] Aguardar 2-3 minutos
- [ ] Verificar `firebase functions:list`

## DEPOIS
- [ ] Testar endpoints em produção
- [ ] Ver logs com `firebase functions:log`
- [ ] Verificar Firestore no console

## ✅ TUDO PRONTO!
```

---

## 🎯 Resumo

**Para deploy:**
```bash
cd functions
npm install
npm run serve  # Testar localmente
# ... após teste bem-sucedido
firebase deploy --only functions
```

**Para monitorar:**
```bash
firebase functions:log --follow
```

**Para debugar:**
```bash
# Escolher um error no log
firebase functions:log --function=register
```

---

**Cloud Functions deployadas e monitoradas com sucesso! 🚀**
