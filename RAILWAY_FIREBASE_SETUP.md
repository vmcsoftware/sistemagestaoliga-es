# 🔧 Adicionar Variáveis Firebase no Railway - Guia Prático

## 📋 Resumo das Variáveis Necessárias

```env
FIREBASE_PROJECT_ID=agendaccb-73569
FIREBASE_DATABASE_URL=https://agendaccb-73569.firebaseio.com
FIREBASE_API_KEY=AIzaSyDxxx...
FIREBASE_AUTH_DOMAIN=agendaccb-73569.firebaseapp.com
FIREBASE_STORAGE_BUCKET=agendaccb-73569.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:xxx
FIREBASE_MEASUREMENT_ID=G-XXXXXXXX
PORT=3000
NODE_ENV=production
JWT_SECRET=seu_secret_bem_seguro_aqui_minimo_32_caracteres
CLIENT_URL=https://vmcsoftware.github.io/sistemagestaoliga-es
```

---

## 🔑 Passo 1: Obter Credenciais do Firebase

### 1.1 Acessar Firebase Console

1. Abra: **https://console.firebase.google.com**
2. Clique no seu projeto: **agendaccb-73569**
3. Clique na engrenagem ⚙️ no canto superior esquerdo
4. Selecione: **Configurações do Projeto**

### 1.2 Ir para "Contas de Serviço"

1. Clique na aba: **"Contas de Serviço"**
2. Clique no botão: **"Gerar nova chave privada"**
3. Um arquivo `.json` será baixado (guarde-o)

### 1.3 Extrair Valores do JSON

Abra o arquivo baixado em um editor de texto. Você verá:

```json
{
  "type": "service_account",
  "project_id": "agendaccb-73569",
  "private_key_id": "xxx123",
  "private_key": "-----BEGIN PRIVATE KEY-----...",
  "client_email": "firebase-adminsdk-xxx@agendaccb-73569.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

**Valores que você vai usar:**
- `project_id` → **FIREBASE_PROJECT_ID**
- `client_email` → será usando em código

### 1.4 Encontrar Outros Valores

Volta no Firebase Console e vai para:
- **Construir** → **Firestore Database** (ou **Realtime Database**)
- Você verá a URL do banco: `https://agendaccb-73569.firebaseio.com`
  - Isso é seu **FIREBASE_DATABASE_URL**

---

## 🚂 Passo 2: Adicionar Variáveis no Railway

### 2.1 Acessar Painel do Railway

1. Abra: **https://railway.app**
2. Faça login com sua conta GitHub
3. Clique no projeto: **sistemagestaoliga-es**

### 2.2 Ir para "Variables"

1. No menu esquerdo, procure por abas/seções
2. Clique em: **"Variables"** ou **"Environment"**

>Se não ver, tente:
> - Settings → Environment Variables
> - Ou procure por um ícone de 🔐

### 2.3 Adicionar Primeira Variável

1. Clique em: **"Add Variable"** ou **"New Variable"**
2. Preencha:
   ```
   Key: FIREBASE_PROJECT_ID
   Value: agendaccb-73569
   ```
3. Clique em **"Save"** ou **"Add"**

### 2.4 Continuar Adicionando

Repita o processo para cada variável:

#### Variável 2: DATABASE_URL
```
Key: FIREBASE_DATABASE_URL
Value: https://agendaccb-73569.firebaseio.com
```

#### Variável 3: API_KEY
```
Key: FIREBASE_API_KEY
Value: AIzaSyDxxx... (copie do Firebase Console)
```

>Como encontrar FIREBASE_API_KEY:
>1. Firebase Console → Seu Projeto
>2. Configurações → Project Settings
>3. Aba "General"
>4. Procure por "Web API Key"
>5. Ou vá em **Autenticação** → Clique em um método → Copie "Web API Key"

#### Variável 4: AUTH_DOMAIN
```
Key: FIREBASE_AUTH_DOMAIN
Value: agendaccb-73569.firebaseapp.com
```

#### Variável 5: STORAGE_BUCKET
```
Key: FIREBASE_STORAGE_BUCKET
Value: agendaccb-73569.appspot.com
```

#### Variável 6: MESSAGING_SENDER_ID
```
Key: FIREBASE_MESSAGING_SENDER_ID
Value: 123456789 (encontre no JSON baixado como "client_id")
```

#### Variável 7: APP_ID
```
Key: FIREBASE_APP_ID
Value: 1:123456789:web:xxx (do JSON como "client_id" com prefixo)
```

>Alternativa: Vá em Firebase → Project Settings → Apps → Seu App Web → Copie "appId"

#### Variável 8: MEASUREMENT_ID
```
Key: FIREBASE_MEASUREMENT_ID
Value: G-XXXXXXXX
```

>Encontre em: Firebase → Project Settings → Integrations → Google Analytics → ID de Medição

#### Variável 9: NODE_ENV
```
Key: NODE_ENV
Value: production
```

#### Variável 10: PORT
```
Key: PORT
Value: 3000
```

#### Variável 11: JWT_SECRET
```
Key: JWT_SECRET
Value: seu_secret_super_seguro_minimo_32_caracteres_aleatorios
```

>Gere um secret seguro em: https://generate-random.org/

#### Variável 12: CLIENT_URL (para CORS)
```
Key: CLIENT_URL
Value: https://vmcsoftware.github.io/sistemagestaoliga-es
```

---

## ✅ Verificar se Tudo Está Certo

### Após adicionar todas as variáveis:

1. Clique em **"Save"** ou **"Apply"**
2. Railway reiniciará automaticamente
3. Verifique se há erros no **"Logs"** ou **"Deployments"**

### Teste 1: Verificar se backend está rodando

```
Abra no navegador:
https://seu-app-prod.railway.app/api/health

Esperado: Retorna { status: "ok" } ou status 200
```

### Teste 2: Tentar fazer login localmente

```bash
1. Crie arquivo .env na pasta client:
   VITE_API_URL=https://seu-app-prod.railway.app

2. npm run dev

3. Tente fazer login

4. Cheque console (F12) para erros
```

### Teste 3: Ver logs do Railway

1. No painel do Railway
2. Clique em **"Logs"**
3. Procure por erros de conexão Firebase
4. Se houver erro, é porque uma variável está errada

---

## 🐛 Troubleshooting

### Erro: "FIREBASE_PROJECT_ID is undefined"

**Problema**: Variável não foi adicionada
**Solução**: 
1. Volte para Variables
2. Verifique se está lá
3. Se não, adicione novamente
4. Clique Save
5. Aguarde 2-3 minutos para rebuild

### Erro: "Cannot connect to Firebase"

**Problema**: Credenciais erradas
**Solução**:
1. Copie novamente do Firebase Console
2. Verifique cada caractere (às vezes tem espaços)
3. Atualize em Railway
4. Reinicie

### Erro: "CORS error" no frontend

**Problema**: Frontend não consegue chamar backend
**Solução**: Verifique se `CLIENT_URL` foi adicionada

### Backend retorna 401 em produção

**Problema**: JWT_SECRET diferente
**Solução**: 
1. Use o MESMO JWT_SECRET em Railway e localmente
2. Se mudou, todos os tokens antigos ficam inválidos
3. Faça login novamente

---

## 📝 Checklist

- [ ] Acessei Firebase Console
- [ ] Baixei chave privada
- [ ] Copiei FIREBASE_PROJECT_ID
- [ ] Copiei FIREBASE_DATABASE_URL
- [ ] Copiei FIREBASE_API_KEY
- [ ] Copiei FIREBASE_AUTH_DOMAIN
- [ ] Copiei FIREBASE_STORAGE_BUCKET
- [ ] Copiei MESSAGING_SENDER_ID
- [ ] Copiei APP_ID
- [ ] Copiei MEASUREMENT_ID
- [ ] Adicionei NODE_ENV=production
- [ ] Adicionei PORT=3000
- [ ] Gerei JWT_SECRET
- [ ] Adicionei CLIENT_URL
- [ ] Railway reiniciou
- [ ] Backend respondendo em /api/health
- [ ] Login funcionando com API Railway

---

## 🎯 Próximo Passo

Após adicionar todas as variáveis:

1. **Adicione GitHub Secret**:
   - GitHub → Settings → Secrets
   - Add: `VITE_API_URL=https://seu-app-prod.railway.app`

2. **Teste no GitHub Pages**:
   - Espere 5 minutos
   - Acesse seu site
   - Tente fazer login

3. **Se tudo funcionar**:
   ```
   ✅ Backend em Railway funcionando
   ✅ Frontend em GitHub Pages funcionando
   ✅ Login completo funcionando
   ```

---

**Pronto! Sistema em produção! 🚀**
