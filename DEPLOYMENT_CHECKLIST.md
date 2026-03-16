# 🚀 Deployment Checklist

## Antes de Iniciar o Servidor

### ✅ Preparação Inicial

- [ ] **Node.js instalado**: `node --version` (v16+)
- [ ] **npm instalado**: `npm --version` (v8+)
- [ ] **Git configurado**: `git config --list`
- [ ] **Workspace estruturado**:
  ```
  Sistema de Gestão de Ligações/
  ├── server/
  ├── client/
  └── FIREBASE_SETUP.md
  ```

### ✅ Configuração do Backend

- [ ] **Entrar no diretório**: `cd server`
- [ ] **Remover node_modules antigos**: `rm -rf node_modules package-lock.json`
- [ ] **Instalar dependências**: `npm install`
- [ ] **Verificar pacotes instalados**: `npm list firebase-admin uuid`
- [ ] **Arquivo .env existe**: Checar `server/.env`
- [ ] **Firebase credentials**: Colocar `firebase-key.json` em `server/`

#### Conteúdo esperado do `server/.env`:
```env
FIREBASE_PROJECT_ID=agendaccb-73569
FIREBASE_DATABASE_URL=https://agendaccb-73569.firebaseio.com
FIREBASE_API_KEY=AIzaSyDx...
FIREBASE_AUTH_DOMAIN=agendaccb-73569.firebaseapp.com
FIREBASE_STORAGE_BUCKET=agendaccb-73569.appspot.com
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=1:...
FIREBASE_MEASUREMENT_ID=G...
PORT=5000
NODE_ENV=development
JWT_SECRET=seu_secret_aqui
```

#### Estrutura esperada de `server/`:
```
server/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── contatoController.js
│   │   └── dashboardController.js
│   ├── models/
│   │   ├── UsuarioFirebase.js
│   │   ├── ContatoFirebase.js
│   │   └── HistoricoLigacaoFirebase.js
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── index.js
├── config/
│   ├── config.js
│   ├── database.js
│   └── middlewares.js
├── .env
├── .env.example
├── firebase-key.json (NÃO fazer commit!)
├── package.json
└── package-lock.json
```

### ✅ Configuração do Frontend

- [ ] **Entrar no diretório**: `cd client`
- [ ] **Instalar dependências**: `npm install`
- [ ] **Verificar pacotes**: `npm list react vite tailwindcss`
- [ ] **Arquivo .env existe**: Checar `client/.env` (opcional para dev)
- [ ] **Porta 5173 disponível**: `lsof -i :5173` (Mac/Linux) ou `netstat -ano | findstr :5173` (Windows)

#### Estrutura esperada de `client/`:
```
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── .env (opcional)
├── package.json
├── vite.config.js
└── tailwind.config.js
```

### ✅ Configuração do Firebase

- [ ] **Projeto Firebase criado**: Verificar em [firebase.google.com/console](https://firebase.google.com/console)
- [ ] **Firestore Database ativo**: Vá a Firebase → Firestore Database
- [ ] **firebase-key.json baixado**: Arquivo em `server/`
- [ ] **Regras de Firestore atualizadas**: Vá a Firestore → Regras
- [ ] **Authentication ativo**: Vá a Firebase → Authentication → Email/Senha habilitado

#### Regras de Firestore (para desenvolvimento):
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

---

## Iniciando a Aplicação

### ✅ Passo 1: Terminal 1 - Backend

```bash
cd server
npm run dev
```

**Esperar por:**
```
✅ Firebase inicializado com arquivo de credenciais
✅ Firestore conectado ao projeto: agendaccb-73569
🚀 Servidor rodando em http://localhost:5000
```

### ✅ Passo 2: Terminal 2 - Frontend

```bash
cd client
npm run dev
```

**Esperar por:**
```
VITE v4.X.X ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

### ✅ Passo 3: Abrir no Navegador

1. Ir para **http://localhost:5173**
2. Página de login deve aparecer
3. Botões: "Registrar" e campos de email/senha

---

## Testando a Aplicação

### ✅ Teste 1: Registro de Usuário

1. Clique em **"Registrar"**
2. Preencha:
   - Email: `operador@empresa.com`
   - Senha: `Senha123!`
   - Nome: `João Silva`
   - Função: `Operador` (dropdown)
3. Clique em **"Registrar"**

**Esperado:**
- Usuário criado no Firebase
- Redirecionado para a página inicial
- Email aparece no canto superior

### ✅ Teste 2: Login

1. Se estiver registrado, faça logout
2. Preencha email e senha
3. Clique em **"Entrar"**

**Esperado:**
- Token JWT gerado
- Redirecionado para dashboard
- Menu principal aparece

### ✅ Teste 3: Importar Contatos

1. No menu, vá a **"Contatos"** → **"Importar"**
2. Prepare arquivo XLSX com colunas:
   ```
   Nome | CPF/CNPJ | Email | Telefone
   ```
3. Clique em **"Selecionar Arquivo"**
4. Clique em **"Importar"**

**Esperado:**
- Arquivo processado
- Contatos aparecem em "Meus Contatos"
- Firebase Firestore atualizado

### ✅ Teste 4: Registrar Ligação

1. Vá a **"Contatos"** → Selecione um contato
2. Clique em **"Registrar Ligação"**
3. Preencha:
   - Resultado: `Sucesso`, `Insucesso`, etc.
   - Anotações: Qualquer texto
   - Próximo contato: Data e hora (opcional)
4. Clique em **"Salvar"**

**Esperado:**
- Ligação registrada
- Status do contato atualizado
- Dashboard reflete nova ligação

### ✅ Teste 5: Dashboard

1. Vá a **"Dashboard"**
2. Verifique métricas:
   - Total de contatos
   - Ligações hoje
   - Taxa de sucesso
   - Gráficos de performance

**Esperado:**
- Números refletem dados importados e ligações registradas
- Gráficos carregam corretamente

### ✅ Teste 6: Relatórios

1. Vá a **"Relatórios"**
2. Veja:
   - Ranking de operadores
   - Contatos trabalhados
   - Performance por período

**Esperado:**
- Dados consistentes com dashboard
- Filtros funcionam corretamente

---

## Troubleshooting Comum

### ❌ Erro: "Cannot find module 'firebase-admin'"

**Solução:**
```bash
cd server
npm install firebase-admin uuid
npm install --save-dev
```

### ❌ Erro: "Port 5000 already in use"

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -i :5000
kill -9 <PID>
```

### ❌ Erro: "ENOENT: firebase-key.json not found"

**Solução:**
1. Baixar arquivo do Firebase Console
2. Colocar em `server/firebase-key.json`
3. Reiniciar servidor

### ❌ Erro: "PERMISSION_DENIED: Missing or insufficient permissions"

**Solução:**
1. Vá a **Firebase Console** → **Firestore** → **Regras**
2. Cole regras de desenvolvimento (veja acima)
3. Clique em **Publicar**
4. Reinicie o servidor

### ❌ Erro: "Port 5173 already in use"

**Windows:**
```bash
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -i :5173
kill -9 <PID>
```

### ❌ Contatos não aparecem após importar

1. Verifi que arquivo XLSX tem colunas corretas
2. Verifique console do backend para erros
3. Vá a **Firebase Console** → **Firestore** → **Collection `contatos`**
4. Confirme que documentos foram criados

### ❌ Dashboard mostra "0 contatos"

1. Importar pelo menos 1 contato
2. Aguarde 2 segundos
3. F5 para recarregar página
4. Verificar Firebase Firestore

---

## Garantia de Qualidade

### ✅ Segurança

- [ ] `.env` não foi commitado no Git
- [ ] `firebase-key.json` não foi commitado
- [ ] JWT_SECRET é seguro (mínimo 32 caracteres)
- [ ] Senhas são hashadas com bcrypt
- [ ] CORS está configurado apenas para localhost:5173

### ✅ Performance

- [ ] Firestore indexes foram criados
- [ ] API responde em < 1s
- [ ] Dashboard carrega em < 2s
- [ ] Importação de 1000+ contatos é rápida

### ✅ Funcionalidade

- [ ] Login/Logout funciona
- [ ] Contatos importam corretamente
- [ ] Ligações são registradas
- [ ] Dashboard atualiza em tempo real
- [ ] Relatórios exibem dados corretos
- [ ] Palavras-chave filtram contatos

---

## Próximos Passos para Produção

- [ ] Configurar variáveis de ambiente para produção
- [ ] Criar Firestore indexes recomendados
- [ ] Atualizar Firestore security rules
- [ ] Configurar CORS para domínio real
- [ ] Configurar HTTPS/SSL
- [ ] Configurar backups automáticos
- [ ] Implementar monitoramento (Cloud Logging)
- [ ] Implementar WhatsApp integration
- [ ] Testar em múltiplos navegadores
- [ ] Testar responsividade mobile

---

## Links Úteis

- **Firebase Console**: https://console.firebase.google.com/
- **Firebase Dashboard**: [Seu Projeto](https://console.firebase.google.com/u/0/project/agendaccb-73569/)
- **Documentação Firebase**: https://firebase.google.com/docs/
- **Documentação React**: https://react.dev/
- **Documentação Vite**: https://vitejs.dev/

---

**Status**: ✅ Pronto para os testes
**Última Atualização**: 2024
**Responsável**: Sistema de Gestão de Ligações Team
