# ✅ Pré-Deploy Checklist

## 🔍 Antes de Fazer Deploy

### 1. Verificar Configurações

- [ ] `client/vite.config.js` tem `base: '/sistemagestaoliga-es/'`
- [ ] `firebase.json` tem rewrites configurados
- [ ] `client/public/404.html` existe e tem código de redirect
- [ ] `client/index.html` tem script de restore

### 2. Verificar Dependências

```bash
cd client
npm list webpack terser vite

# Deve mostrar todas instaladas
```

- [ ] terser instalado
- [ ] vite instalado
- [ ] react instalado

### 3. Limpar Build Antigo

```bash
cd client
rm -rf dist node_modules/.vite
npm run build
```

- [ ] Sem erros de build
- [ ] `dist/index.html` criado
- [ ] `dist/404.html` criado
- [ ] `dist/.nojekyll` criado

### 4. Verificar Tamanho dos Arquivos

```bash
ls -lh client/dist/

# Esperado:
# index.html ~5-10KB
# assets/ com .js e .css
# 404.html ~2KB
```

- [ ] index.html < 50KB
- [ ] Nenhum arquivo gigante (> 1MB)

### 5. Testar Localmente

```bash
cd client/dist
npx http-server -p 8080

# Acessar http://localhost:8080/sistemagestaoliga-es/
```

Teste as rotas:
- [ ] `/sistemagestaoliga-es/` carrega homepage
- [ ] `/sistemagestaoliga-es/login` carrega login
- [ ] `/sistemagestaoliga-es/dashboard` carrega dashboard
- [ ] Navegar entre rotas funciona
- [ ] Refresh F5 não quebra

### 6. Verificar Git Status

```bash
git status
```

- [ ] Todos os arquivos importantes commitados
- [ ] Nenhum merge conflicts
- [ ] `client/dist/` pronto para commit

### 7. Verificar Arquivo .gitignore

```bash
cat .gitignore | grep dist
```

- [ ] `dist/` NÃO está em .gitignore (precisa commitaremos)
- [ ] `node_modules/` está em .gitignore

**Se dist está ignorado:**
```bash
# Remove da exclusão
echo "!client/dist/" >> .gitignore
git add .gitignore
```

### 8. Fazer Commit Final

```bash
git add .
git commit -m "build: Final pre-deployment build

- Build frontend com vite
- SPA routing configurado
- Cache headers otimizado
- Pronto para GitHub Pages"

git push origin main
```

- [ ] Push bem-sucedido
- [ ] Sem erros

### 9. Verificar GitHub Pages Settings

Ir em: `GitHub » Settings » Pages`

- [ ] Source: `Deploy from a branch`
- [ ] Branch: `main`
- [ ] Folder: `/ (root)` ou `/docs`
- [ ] Custom domain: (deixar em branco se usar GitHub Pages)

### 10. Aguardar Deploy

```bash
# Monitoring no terminal
watch -n 5 "curl -I https://vmcsoftware.github.io/sistemagestaoliga-es/ 2>/dev/null | head -5"
```

Aguarde até:
```
HTTP/2 200
```

- [ ] Statuscode 200 (sucesso)
- [ ] < 2 minutos

---

## 🧪 Validação Pós-Deploy

### Teste 1: Página Inicial
```
https://vmcsoftware.github.io/sistemagestaoliga-es/
```
- [ ] Carrega
- [ ] Mostra "Sistema de Gestão de Ligações"
- [ ] CSS está correto

### Teste 2: Link Navigation
```
Clica em "Entrar" → vai para /login
```
- [ ] Sem recarregar página
- [ ] URL muda para .../login
- [ ] Formulário aparece

### Teste 3: Rota Direta
```
https://vmcsoftware.github.io/sistemagestaoliga-es/login
```
- [ ] Carrega corretamente
- [ ] Não mostra 404
- [ ] Sem erro em console

### Teste 4: Browser Back Button
```
Navega para /login → clica back
```
- [ ] Volta à homepage
- [ ] Sem recarga desnecessária

### Teste 5: Hard Refresh
```
Ctrl+Shift+R (força sem cache)
```
- [ ] Página carrega corretamente
- [ ] Sem quebras de CSS/JS

### Teste 6: Rotas Inexistentes
```
https://vmcsoftware.github.io/sistemagestaoliga-es/nao-existe
```
- [ ] Redireciona para home (não 404)
- [ ] Ou mostra página de erro da app

---

## 🔧 Comandos Úteis

```bash
# Status de deploy (GitHub Pages)
curl -I https://vmcsoftware.github.io/sistemagestaoliga-es/

# Ver logs do GitHub Actions
# GitHub » Actions » Deploy

# Limpar cache do navegador
# Chrome: Ctrl+Shift+Delete → "All time"

# Testar com cache limpo
curl -H "Cache-Control: no-cache" https://vmcsoftware.github.io/sistemagestaoliga-es/

# Verificar se 404.html está sendo servido
curl https://vmcsoftware.github.io/sistemagestaoliga-es/nao-existe/arquivo.html | head -20
```

---

## ❌ Problemas Comuns

### 1. "Página em branco"
- [ ] Abrir DevTools (F12) → Console
- [ ] Ver se há erro JavaScript
- [ ] Verificar se CSS está carregando (Network tab)

### 2. "404 Not Found"
- [ ] Verificar se `client/dist/` foi commitado
- [ ] Verificar se GitHub Pages deploy completou (Settings → Pages)
- [ ] Limpar cache do navegador

### 3. "CSS não carrega"
- [ ] Verificar se `base: '/sistemagestaoliga-es/'` está em vite.config.js
- [ ] Verificar DevTools → Network → CSS arquivo
- [ ] Status code deve ser 200, não 404

### 4. "Rota não funciona"
- [ ] Verificar 404.html no source (GitHub)
- [ ] Verificar sessionStorage no DevTools → Application
- [ ] Testar com `curl` para eliminar cache do navegador

### 5. "Deploy não atualiza"
- [ ] GitHub Actions pode estar falhando → Check Actions tab
- [ ] Esperar 2-3 minutos
- [ ] Limpar cache (Ctrl+Shift+Delete)
- [ ] Usar incognito window

---

## 📊 Checklist Final

```markdown
## PRÉ-DEPLOY
- [ ] Build executado sem erros
- [ ] Localmente funcionando
- [ ] Todos em git
- [ ] GitHub Pages ativado

## DEPLOY
- [ ] git push main
- [ ] Aguardar 2-3 min
- [ ] Verificar GitHub Actions

## PÓS-DEPLOY
- [ ] Testar rotas
- [ ] Testar refresh
- [ ] Testar sem cache
- [ ] ✅ VIVO!
```

---

**Quando tudo passar neste checklist, seu sistema está em produção! 🎉**
