# 🚀 Guia de Deployment - GitHub Pages + Backend API

## Visão Geral

Seu aplicativo está configurado para:
- ✅ **Frontend**: Deploy automático no GitHub Pages
- ✅ **Backend**: Roda em servidor separado (Railway, Heroku, etc)
- ✅ **CI/CD**: Automático com GitHub Actions

---

## ⚙️ Passo 1: Configurar GitHub Pages

### 1.1 Habilitar GitHub Pages

1. Vá para **GitHub** → Seu repositório → **Settings**
2. Na barra lateral esquerda, clique em **Pages**
3. Em **Source**, selecione: `Deploy from a branch`
4. Escolha a branch: `main`
5. Escolha a pasta: `/root` (deixar como padrão)
6. Clique em **Save**

### 1.2 Verificar URL padrão

Sua URL será algo como:
```
https://vmcsoftware.github.io/sistemagestaoliga-es/
```

> Após salvar, aguarde 2-3 minutos para o primeiro deploy

---

## 🔌 Passo 2: Configurar Backend API

### Opção A: Railway (Recomendado)

1. Acesse [railway.app](https://railway.app)
2. Conecte sua conta GitHub
3. Crie um novo projeto a partir do repositório
4. Configure as variáveis de ambiente (ver abaixo)
5. Deploy automático acontece a cada push no `main`

**Copie a URL da API** (ex: `https://seu-app.railway.app`)

### Opção B: Heroku

1. Faça login em [heroku.com](https://heroku.com)
2. Crie um novo app
3. Conecte ao repositório GitHub
4. Configure as variáveis de ambiente
5. Ative "Automatic Deploys"

**Copie a URL da API** (ex: `https://seu-app.herokuapp.com`)

---

## 🔐 Passo 3: Adicionar Variáveis de Ambiente no GitHub

### Para o Frontend

1. Vá para **Settings** → **Secrets & Variables** → **Actions**
2. Clique em **New repository secret**
3. Adicione essas variáveis:

```
VITE_API_URL=https://seu-backend.railway.app
```

### Para o Backend (Railway/Heroku)

Configure as seguintes variáveis no seu serviço de hosting:

```env
FIREBASE_PROJECT_ID=agendaccb-73569
FIREBASE_DATABASE_URL=https://agendaccb-73569.firebaseio.com
FIREBASE_API_KEY=AIzaSyDx...
FIREBASE_AUTH_DOMAIN=agendaccb-73569.firebaseapp.com
FIREBASE_STORAGE_BUCKET=agendaccb-73569.appspot.com
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=1:...
FIREBASE_MEASUREMENT_ID=G...
PORT=3000
NODE_ENV=production
JWT_SECRET=um_secret_bem_seguro_aqui
```

---

## 📋 Passo 4: Atualizar arquivo de configuração

### Cliente (.env.local)

Crie arquivo `client/.env.local`:

```env
VITE_API_URL=https://seu-backend.railway.app
VITE_DEBUG=false
```

### Servidor (.env)

Certifique-se de ter um `.env` no servidor com todas as variáveis necessárias.

---

## ✅ Testar o Deployment

### 1. Fazer um push para verificar build

```bash
git add .
git commit -m "chore: Configure GitHub Pages deployment"
git push origin main
```

### 2. Verificar o workflow

1. Vá para **GitHub** → **Actions**
2. Procure pelo workflow "Deploy Frontend to GitHub Pages"
3. Aguarde a conclusão (verde ✓)

### 3. Acessar o site

Acesse: `https://vmcsoftware.github.io/sistemagestaoliga-es/`

### 4. Testar login

- Faça login com suas credenciais
- A API chamará o backend externo

---

## 🐛 Troubleshooting

### "404 - Página não encontrada"

**Problema**: Vite está procurando arquivos no caminho errado  
**Solução**: Verifique se `base: '/sistemagestaoliga-es/'` está correto em `vite.config.js`

### "API retorna 404 ou timeout"

**Problema**: A URL da API está incorreta ou o backend não está rodando  
**Solução**:
1. Verifique a URL do backend em **GitHub Secrets**
2. Teste a URL do backend diretamente no navegador
3. Verifique se o backend está rodando

### "CORS error"

**Problema**: Frontend e backend têm domínios diferentes  
**Solução**: No backend (server), verifique o `cors()` config:

```javascript
app.use(cors({
  origin: ['https://vmcsoftware.github.io', 'http://localhost:3000'],
  credentials: true,
}));
```

---

## 📊 Monitorar Deployments

### GitHub Actions

1. **Settings** → **Secrets & Variables** → **Actions**
2. Visualize histórico de builds em **Actions** → **Deploy Frontend to GitHub Pages**

### Backend (Railway)

1. Acesse painel do Railway
2. Veja logs em tempo real
3. Configure webhooks se necessário

---

## 🔄 Workflow Automático

Toda vez que você **fazer um push** no branch `main`:

1. ✅ GitHub Actions executa o build do React
2. ✅ Frontend é publicado no GitHub Pages
3. ✅ Deploy automático (sem intervenção manual)
4. ✅ Backend recebe requests da aplicação

---

## 📱 URLs Finais (Exemplo)

- **Frontend**: `https://vmcsoftware.github.io/sistemagestaoliga-es/`
- **Backend API**: `https://seu-app.railway.app/api`
- **Login**: `https://vmcsoftware.github.io/sistemagestaoliga-es/login`

---

## ⚡ Próximos Passos

- [ ] Configurar Railway ou Heroku para backend
- [ ] Adicionar secret `VITE_API_URL` no GitHub
- [ ] Fazer um push test para ativar workflow
- [ ] Verificar GitHub Pages → Settings
- [ ] Testar login com API real
- [ ] Configurar domínio customizado (opcional)

---

**Documentação completa**: Ver [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
