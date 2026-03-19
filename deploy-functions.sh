#!/bin/bash

echo "🔥 Firebase Cloud Functions - Deploy Script"
echo "=========================================="

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para printar com cor
print_step() {
  echo -e "${BLUE}▶ $1${NC}"
}

print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

# Step 1: Verificar Firebase CLI
print_step "Verificando Firebase CLI..."
if ! command -v firebase &> /dev/null; then
  print_warning "Firebase CLI não encontrado"
  echo "Instalando..."
  npm install -g firebase-tools
else
  print_success "Firebase CLI encontrado"
fi

# Step 2: Fazer login
print_step "Verificando autenticação Firebase..."
firebase projects:list > /dev/null 2>&1
if [ $? -ne 0 ]; then
  print_warning "Não autenticado. Faça login..."
  firebase login
else
  print_success "Autenticado"
fi

# Step 3: Selecionar projeto
print_step "Selecionando projeto..."
firebase use agendaccb-73569
print_success "Projeto selecionado"

# Step 4: Entrar na pasta functions
print_step "Entrando na pasta functions..."
cd functions || exit 1

# Step 5: Instalar dependências
print_step "Instalando dependências..."
npm install
print_success "Dependências instaladas"

# Step 6: Deploy
print_step "Fazendo deploy das Cloud Functions..."
firebase deploy --only functions

if [ $? -eq 0 ]; then
  print_success "Deploy concluído com sucesso!"
  echo ""
  echo "${GREEN}URLs das funções:${NC}"
  echo "- Auth Register: https://us-central1-agendaccb-73569.cloudfunctions.net/auth_register"
  echo "- Auth Login: https://us-central1-agendaccb-73569.cloudfunctions.net/auth_login"
  echo "- Contatos List: https://us-central1-agendaccb-73569.cloudfunctions.net/contatos_listar"
  echo "- Contatos Create: https://us-central1-agendaccb-73569.cloudfunctions.net/contatos_criar"
  echo "- Health Check: https://us-central1-agendaccb-73569.cloudfunctions.net/health"
  echo ""
  print_success "Sistema pronto para produção!"
else
  print_warning "Erro no deploy. Verifique os logs acima."
  exit 1
fi
