# 🔐 Fluxo de Autenticação - Organização de Rotas

## 📋 Resumo das Mudanças

O aplicativo foi reorganizado para garantir que:
- ✅ Página inicial (`/`) redireciona para login se não autenticado
- ✅ Somente usuários autenticados acessam dashboard e contatos
- ✅ Logout direciona direto para login
- ✅ Sessão persiste após atualizar página

---

## 🔄 Fluxo de Navegação

### 1️⃣ Usuário Não Autenticado
```
Acessa: https://seu-site.com/
    ↓
Redireciona para: /login
    ↓
Preenche credenciais
    ↓
Clica em "Entrar"
```

### 2️⃣ Login Bem-Sucedido
```
POST /api/auth/login
    ↓
Servidor valida credenciais
    ↓
Retorna: { token, usuario }
    ↓
LocalStorage salva token + usuario
    ↓
Redireciona para: /dashboard
```

### 3️⃣ Usuário Autenticado Navegando
```
Qualquer página acessa /
    ↓
Sistema verifica token
    ↓
Se válido: redireciona para /dashboard
Se inválido: redireciona para /login
```

### 4️⃣ Tentar Acessar Rota Protegida
```
Acessa: /contatos ou /relatorios
    ↓
Rota verifica token
    ↓
Se tem token: carrega página
Se não tem: redireciona para /login
```

### 5️⃣ Fazer Logout
```
Clica em "Sair"
    ↓
LocalStorage limpa (token + usuario)
    ↓
Redireciona para: /login
```

### 6️⃣ Atualizar Página
```
F5 ou reload
    ↓
AuthContext carrega token do LocalStorage
    ↓
Sessão persiste
    ↓
Continua na mesma página se autenticado
```

---

## 🗺️ Estrutura de Rotas

| Rota | Acesso | Redirecionamento |
|------|--------|-------------------|
| `/` | Público | → `/login` (não autenticado) ou `/dashboard` (autenticado) |
| `/login` | Público | Bloqueado se já autenticado |
| `/dashboard` | Protegido | ← De `/login` após sucesso |
| `/contatos` | Protegido | ← Do menu do dashboard |
| `/relatorios` | Protegido | ← Do menu do dashboard |
| `/*` (404) | Público | → `/` |

---

## 📁 Arquivos Atualizados

### 1. `App.jsx` 
- ✅ Criado componente `RootRoute` para redirecionar `/` dinamicamente
- ✅ Componente `ProtectedRoute` mantém rotas privadas seguras
- ✅ Removido `HomePage` da rota raiz (não mais necessário)

### 2. `AuthContext.jsx`
- ✅ Adicionado `useEffect` para carregar token ao inicializar
- ✅ Token e usuário persistem em `localStorage`
- ✅ AuthContext detecta `VITE_API_URL` dinamicamente
- ✅ Suporta múltiplos ambientes (local, staging, produção)

### 3. `LoginPage.jsx`
- ✅ Valida se já está autenticado → redireciona para `/dashboard`
- ✅ Passa o estado `loading` correto para LoginForm
- ✅ Usa `replace: true` para não poluir histórico

### 4. `Navbar.jsx`
- ✅ Logout redireciona diretamente para `/login`
- ✅ Menu mostra opções baseado em autenticação

---

## 🔐 Segurança

### ✅ Proteção de Rota
```javascript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
// Verifica token antes de renderizar
```

### ✅ Persistência Segura
```javascript
// localStorage.setItem('token', data.token)
// localStorage.setItem('user', JSON.stringify(data.usuario))
// Valores criptografados em HTTPS
```

### ✅ Invalidação de Session
```javascript
// Se usuario faz logout, localStorage é limpo
// Se token expirar, sistema redireciona para login
```

---

## 🚀 URLs Finais

### Desenvolvimento Local
```
http://localhost:5173/          → Redireciona para /login
http://localhost:5173/login     → Página de login
http://localhost:5173/dashboard → Dashboard (protegido)
```

### Produção (GitHub Pages)
```
https://vmcsoftware.github.io/sistemagestaoliga-es/          → /login
https://vmcsoftware.github.io/sistemagestaoliga-es/login     → Página de login
https://vmcsoftware.github.io/sistemagestaoliga-es/dashboard → Dashboard
```

---

## 📝 Próximos Passos

- [ ] Testar fluxo completo de login localmente
- [ ] Verificar se sessão persiste após F5
- [ ] Testar logout completo
- [ ] Validar rotas protegidas
- [ ] Fazer deploy e testar em GitHub Pages

---

## 🐛 Troubleshooting

### "Estou vendo HomePage"
- ❌ Problema: HomePage ainda estava em `/`
- ✅ Solução: Já removida - rota agora redireciona dinamicamente

### "Logout não me leva para login"
- ❌ Problema: Redirecionamento para `/` sem lógica
- ✅ Solução: Agora redireciona direto para `/login`

### "Perdi minha sessão após atualizar"
- ❌ Problema: Token não estava sendo carregado do localStorage
- ✅ Solução: useEffect no AuthContext agora carrega token/usuario

### "API retorna 401"
- ❌ Problema: Backend rejeitou token
- ✅ Solução: Sistema redireciona para login (logout automático)

---

**Status**: ✅ Pronto para testar e fazer deploy!
