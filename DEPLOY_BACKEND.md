# 🚀 Deploy Backend - Railway vs Heroku

## ⭐ Opção 1: Railway (Recomendado - Mais Fácil)

### Passo 1: Criar Conta no Railway

1. Acesse: **https://railway.app**
2. Clique em **"Start Project"**
3. Escolha: **"Deploy from GitHub repo"**
4. Conecte sua conta GitHub
5. Autorize o Railway

---

### Passo 2: Criar Novo Projeto

1. Clique em **"New Project"**
2. Selecione: **"Deploy from GitHub repo"**
3. Procure por: `sistemagestaoliga-es`
4. Selecione o repositório
5. Escolha a **branch**: `main`
6. Railway criará o projeto automaticamente

---

### Passo 3: Configurar Variáveis de Ambiente

1. No painel do Railway, clique na aba **"Variables"**
2. Clique em **"Add Variable"**
3. Adicione cada uma destas variáveis:

```env
FIREBASE_PROJECT_ID=agendaccb-73569
FIREBASE_DATABASE_URL=https://agendaccb-73569.firebaseio.com
FIREBASE_API_KEY=AIzaSyDx...  (copie do seu Firebase)
FIREBASE_AUTH_DOMAIN=agendaccb-73569.firebaseapp.com
FIREBASE_STORAGE_BUCKET=agendaccb-73569.appspot.com
FIREBASE_MESSAGING_SENDER_ID=...  (copie do Firebase)
FIREBASE_APP_ID=1:...  (copie do Firebase)
FIREBASE_MEASUREMENT_ID=G...  (copie do Firebase)
PORT=3000
NODE_ENV=production
JWT_SECRET=seu_secret_bem_seguro_aqui_minimo_32_caracteres
```

**Como encontrar as credenciais Firebase:**
1. Vá para **Firebase Console** → Seu projeto
2. Clique em ⚙️ **Configurações do Projeto**
3. Abra a aba **"Contas de serviço"**
4. Clique em **"Gerar nova chave privada"**
5. Copie os valores de `project_id`, `firebase_url`, etc.

---

### Passo 4: Conectar Banco de Dados Firebase

⚠️ **IMPORTANTE**: O banco de dados Firebase é **gratuito** e já está configurado. Railway apenas roda o backend Node.js que se conecta ao Firebase.

Não precisa fazer nada aqui - o backend em Railway se conectará automaticamente ao Firebase usando as variáveis.

---

### Passo 5: Deploy Automático

1. Railway detecta alterações no GitHub automaticamente
2. Sempre que você faz `git push origin main`:
   - ✅ Railway faz build
   - ✅ Instala dependências
   - ✅ Inicia servidor
   - ✅ Seu backend está online

---

### Passo 6: Obter URL da API

1. No painel do Railway, vá para **"Deployments"**
2. Procure por **"Public URL"** ou **"Railway URL"**
3. Será algo como: `https://seu-app-prod.railway.app`
4. **Copie essa URL!**

Exemplo completo:
```
https://seu-app-prod.railway.app/api/auth/login
https://seu-app-prod.railway.app/api/contatos
```

---

### Passo 7: Adicionar Secret no GitHub

1. Vá para seu repositório:
   - GitHub → **Settings** → **Secrets and variables** → **Actions**

2. Clique em **"New repository secret"**

3. Adicione:
   ```
   Name: VITE_API_URL
   Value: https://seu-app-prod.railway.app
   ```

4. Clique em **"Add secret"**

---

### Passo 8: Testar a Conexão

#### Teste 1: Verificar se backend está rodando
```bash
Acesse no navegador:
https://seu-app-prod.railway.app/api/health

Esperado: Retorna status 200 OK
```

#### Teste 2: Testar login localmente
```bash
1. Crie arquivo .env na pasta client:
   VITE_API_URL=https://seu-app-prod.railway.app

2. Execute: npm run dev
3. Tente fazer login
4. Verifique no console do navegador se há erros
```

#### Teste 3: Testar no GitHub Pages
```bash
1. Aguarde 5 minutos para atualizar cache
2. Acesse: https://vmcsoftware.github.io/sistemagestaoliga-es/
3. Tente fazer login
4. Verifique no console se funciona
```

---

## 🟣 Opção 2: Heroku (Alternativa)

### ⚠️ Aviso: Heroku mudou modelo de preços em 2022

Heroku agora é pago, mas você pode tentar com créditos gratuitos.

### Passo 1: Criar Conta

1. Acesse: **https://heroku.com**
2. Clique em **"Sign up"**
3. Preencha dados e confirme email

---

### Passo 2: Instalar Heroku CLI

**Windows:**
```powershell
choco install heroku-cli
```

**Mac:**
```bash
brew install heroku/brew/heroku
```

**Linux:**
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

---

### Passo 3: Login no Heroku

```bash
heroku login
# Será aberta uma aba do navegador para autenticar
```

---

### Passo 4: Criar App no Heroku

```bash
cd c:\Users\vinic\OneDrive\Documents\Sistema de Gestão de Ligações\server
heroku create seu-app-name
# Exemplo: heroku create sistema-gestao-ligacoes
```

---

### Passo 5: Adicionar Variáveis de Ambiente

```bash
heroku config:set FIREBASE_PROJECT_ID=agendaccb-73569 --app seu-app-name
heroku config:set FIREBASE_DATABASE_URL=https://agendaccb-73569.firebaseio.com --app seu-app-name
heroku config:set NODE_ENV=production --app seu-app-name
heroku config:set JWT_SECRET=seu_secret_aqui --app seu-app-name
# ... e todas as outras variáveis Firebase
```

Ou via painel:
1. Heroku Dashboard → Seu App → **Settings**
2. Clique em **"Reveal Config Vars"**
3. Adicione cada variável manualmente

---

### Passo 6: Deploy

```bash
git push heroku main
# Heroku detecta changes e faz deploy automaticamente
```

---

### Passo 7: Obter URL

```bash
heroku open --app seu-app-name
# Abre a URL do seu app
```

Será algo como: `https://sistema-gestao-ligacoes.herokuapp.com`

---

## 📊 Comparação: Railway vs Heroku

| Aspecto | Railway | Heroku |
|---------|---------|--------|
| **Facilidade** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Preço** | Grátis até $5/mês | Pago (saiu free tier) |
| **Setup** | Clica botões | CLI + config |
| **GitHub Integration** | Automático | Manual |
| **Deploy Automático** | ✅ Sim | ✅ Sim |
| **Recomendado** | ✅ SIM | ❌ Uso Railway |

---

## ✅ Checklist Final

### Antes de ir pra produção:

- [ ] Backend rodando localmente: `npm start`
- [ ] Variáveis Firebase configuradas
- [ ] Railway/Heroku app criado
- [ ] Variáveis de ambiente adicionadas
- [ ] Deploy feito com sucesso
- [ ] API respondendo em https://seu-app.../api/health
- [ ] Secret `VITE_API_URL` adicionado no GitHub
- [ ] Frontend testado com API externa
- [ ] Login funcionando completamente

---

## 🔗 URLs Finais (Exemplo)

```
Frontend: https://vmcsoftware.github.io/sistemagestaoliga-es/
Backend:  https://seu-app-prod.railway.app

Fluxo:
1. Usuário acessa GitHub Pages
2. Faz login
3. Frontend chama API:
   - https://seu-app-prod.railway.app/api/auth/login
4. Backend processa no Railway
5. Dashboard carrega com dados do Firebase
```

---

## 🐛 Troubleshooting

### "CORS Error" ao fazer login

**Problema**: Frontend não consegue chamr API
**Solução**: Adicione no `server/src/index.js`:

```javascript
app.use(cors({
  origin: [
    'https://vmcsoftware.github.io',
    'https://seu-app.railway.app',
    'http://localhost:5173'
  ],
  credentials: true,
}));
```

### "API retorna 401 em produção"

**Problema**: Token JWT não está sendo validado
**Solução**: Verifique se `JWT_SECRET` é igual em:
- Arquivo `.env` local
- Railway/Heroku config vars

### "Firebase conexão recusada"

**Problema**: Credenciais Firebase incorretas
**Solução**: 
1. Copie novamente as credenciais do Firebase
2. Atualize em Railway/Heroku
3. Reinicie o app

---

## 📞 Suporte

- **Railway Help**: https://docs.railway.app
- **Heroku Help**: https://devcenter.heroku.com
- **Firebase Docs**: https://firebase.google.com/docs

---

**🎉 Parabéns! Seu backend está em produção!**
