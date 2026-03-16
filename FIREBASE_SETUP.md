# Firebase Setup Guide 🔥

## 📋 Índice
1. [Obtenção do Firebase](#obtenção-do-firebase)
2. [Configuração do Projeto](#configuração-do-projeto)
3. [Credenciais de Serviço](#credenciais-de-serviço)
4. [Estrutura do Firestore](#estrutura-do-firestore)
5. [Regras de Segurança](#regras-de-segurança)
6. [Testando a Conexão](#testando-a-conexão)
7. [Troubleshooting](#troubleshooting)

---

## 🔧 Obtenção do Firebase

### Opção 1: Usando o Arquivo de Credenciais (RECOMENDADO)

#### Passo 1: Acessar Firebase Console
1. Vá para [firebase.google.com](https://firebase.google.com/)
2. Faça login com sua conta Google
3. Clique em "Ir para o console"
4. Selecione o projeto **agendaccb-73569**

#### Passo 2: Gerar Chave de Serviço
1. No menu à esquerda, clique em ⚙️ **Configurações do Projeto**
2. Vá até a aba **Contas de Serviço**
3. Clique em **Gerar Nova Chave Privada**
4. Um arquivo JSON será baixado automaticamente (ex: `agendaccb-73569-xxxxx.json`)
5. **Copie esse arquivo para o diretório raiz do servidor:**
   ```bash
   server/firebase-key.json
   ```

#### Passo 3: Verificar o Arquivo
O arquivo `firebase-key.json` deve conter:
```json
{
  "type": "service_account",
  "project_id": "agendaccb-73569",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "firebase-adminsdk-...@agendaccb-73569.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "..."
}
```

### Opção 2: Usando Variáveis de Ambiente

Se preferir não usar arquivo fisicamente:
1. Copie o conteúdo do arquivo JSON
2. Coloque em uma variável de ambiente `GOOGLE_APPLICATION_CREDENTIALS`
3. O Firebase Admin SDK buscará automaticamente

---

## 🏗️ Configuração do Projeto

### 1. Instalar Dependências
```bash
cd server
npm install
```

### 2. Configurar .env
Certifique-se de que `.env` contém:
```env
FIREBASE_API_KEY=AIzaSyDx...
FIREBASE_AUTH_DOMAIN=agendaccb-73569.firebaseapp.com
FIREBASE_DATABASE_URL=https://agendaccb-73569.firebaseio.com
FIREBASE_PROJECT_ID=agendaccb-73569
FIREBASE_STORAGE_BUCKET=agendaccb-73569.appspot.com
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=1:...
FIREBASE_MEASUREMENT_ID=G...
```

### 3. Iniciar o Servidor
```bash
npm run dev
```

Você deve ver:
```
✅ Firebase inicializado com arquivo de credenciais
✅ Firestore conectado ao projeto: agendaccb-73569
🚀 Servidor rodando em http://localhost:5000
```

---

## 🔐 Credenciais de Serviço

### Localização do Arquivo
- **Desenvolvimento**: `server/firebase-key.json` (arquivo local)
- **Produção**: Variável de ambiente `GOOGLE_APPLICATION_CREDENTIALS`

### ⚠️ SEGURANÇA CRÍTICA
- **NUNCA** commita `firebase-key.json` no Git
- Adicione ao `.gitignore`:
  ```
  firebase-key.json
  *.json
  .env
  ```
- Use secrets no seu CI/CD (GitHub Actions, etc.)

---

## 📊 Estrutura do Firestore

### Coleções Principais

#### `usuarios` Collection
```javascript
{
  id: "user_uuid",
  email: "operador@empresa.com",
  senha: "hash_bcrypt",
  nome: "João Silva",
  funcao: "operador",
  departamento: "Vendas",
  ativo: true,
  dataCriacao: Timestamp,
  dataAtualizacao: Timestamp
}
```

#### `contatos` Collection
```javascript
{
  id: "contact_uuid",
  nome: "Empresa ABC Ltda",
  cpfCnpj: "12345678000195",
  email: "contato@empresa.com",
  telefone: "+55 11 98765-4321",
  status: "nao_ligado",
  dataImportacao: Timestamp,
  importacao_id: "batch_uuid"
}
```

#### `historico_ligacoes` Collection
```javascript
{
  id: "call_uuid",
  contatoId: "contact_uuid",
  operadorId: "user_uuid",
  dataLigacao: Timestamp,
  resultado: "success",
  anotacoes: "Cliente aceitou proposta"
}
```

---

## 🔒 Regras de Segurança

### Desenvolvimento
```firestore
rules_version = '3';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Produção
```firestore
rules_version = '3';
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /usuarios/{userId} {
      allow read: if request.auth.uid == userId || isAdmin();
      allow write: if isAdmin();
      allow list: if isAdmin();
    }
    
    match /contatos/{document=**} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update, delete: if isAdmin();
    }
    
    match /historico_ligacoes/{document=**} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update, delete: if isAdmin();
    }
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return request.auth != null && 
             get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.funcao == 'admin';
    }
  }
}
```

---

## ✅ Testando a Conexão

### 1. Iniciar Servidor
```bash
npm run dev
```

### 2. Registrar Usuário
```bash
curl -X POST http://localhost:5000/api/auth/registrar \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@empresa.com",
    "senha": "senha123",
    "nome": "Teste",
    "funcao": "operador"
  }'
```

### 3. Verificar no Firebase Console
1. Vá para [firebase.google.com/console](https://firebase.google.com/console)
2. Abra o projeto **agendaccb-73569**
3. Vá a **Firestore Database** → Collection `usuarios`
4. Deve aparecer o novo usuário

### 4. Fazer Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@empresa.com",
    "senha": "senha123"
  }'
```

---

## 🐛 Troubleshooting

| Erro | Solução |
|------|---------|
| "Cannot find module 'firebase-admin'" | `npm install firebase-admin uuid` |
| "GOOGLE_APPLICATION_CREDENTIALS not set" | Coloque `firebase-key.json` em `server/` |
| "Missing Permission" | Atualize regras de segurança do Firestore |
| "Invalid service account" | Verifique se arquivo JSON é válido |
| "Database not found" | Confirme `projectId` no `.env` |
4. **Backup**: Configure backup automático no Firestore
5. **Monitoramento**: Use Firebase Console para monitorar uso

## Recursos Adicionais

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Admin SDK](https://firebase.google.com/docs/database/admin/start)
- [Firestore Rules](https://firebase.google.com/docs/firestore/security/start)
- [Firebase CLI](https://firebase.google.com/docs/cli)
