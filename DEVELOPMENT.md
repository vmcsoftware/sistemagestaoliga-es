# Guia de Desenvolvimento

## Setup Inicial

### 1. Instalar Dependências

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 2. Configurar Banco de Dados

A aplicação usa MongoDB. Você pode:

**Opção 1: MongoDB Local**
- Instale MongoDB Community Edition
- Inicie o serviço: `mongod`
- O servidor conectará automaticamente em `mongodb://localhost:27017/crm-contatos`

**Opção 2: MongoDB Atlas (Cloud)**
- Crie conta em https://www.mongodb.com/cloud/atlas
- Crie um cluster gratuito
- Copie a string de conexão
- Atualize `MONGODB_URI` no arquivo `.env` do servidor

### 3. Iniciar a Aplicação

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

A aplicação estará disponível em:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## Dados de Teste

Use estas credenciais para testar:
```
Email: teste@example.com
Senha: senha123
```

Para criar um usuário de teste, faça um POST em http://localhost:5000/api/auth/registrar:
```json
{
  "nome": "Operador Teste",
  "email": "teste@example.com",
  "senha": "senha123"
}
```

## Estrutura de Pastas Explicada

### Backend (`server/`)

```
server/
├── config/
│   ├── config.js         # Variáveis de ambiente
│   └── database.js       # Conexão MongoDB
├── src/
│   ├── controllers/
│   │   ├── authController.js      # Login, registro
│   │   ├── contatoController.js   # CRUD de contatos
│   │   └── dashboardController.js # Métricas e relatórios
│   ├── models/
│   │   ├── Usuario.js         # Schema de usuários
│   │   ├── Contato.js         # Schema de contatos
│   │   └── HistoricoLigacao.js # Schema de histórico
│   ├── routes/
│   │   ├── authRoutes.js    # Rotas de autenticação
│   │   ├── contatoRoutes.js # Rotas de contatos
│   │   └── dashboardRoutes.js # Rotas de dashboard
│   ├── middleware/
│   │   └── auth.js # Middlewares de autenticação
│   ├── utils/
│   │   ├── validators.js  # Validação de CPF/CNPJ
│   │   ├── jwt.js         # Geração de tokens
│   │   └── fileImport.js  # Importação de arquivos
│   └── index.js           # Servidor principal
├── .env                   # Variáveis de ambiente
├── package.json
└── README.md
```

### Frontend (`client/`)

```
client/
├── src/
│   ├── pages/
│   │   ├── LoginPage.jsx      # Página de login
│   │   ├── Dashboard.jsx      # Dashboard principal
│   │   ├── ContatosPage.jsx   # Gestão de contatos
│   │   └── RelatoriosPage.jsx # Relatórios
│   ├── components/
│   │   ├── Navbar.jsx              # Barra superior
│   │   ├── LoginForm.jsx           # Formulário de login
│   │   └── FormularioContato.jsx   # Formulário de contato/ligação
│   ├── context/
│   │   └── AuthContext.jsx # Contexto de autenticação
│   ├── services/
│   │   └── api.js # Cliente HTTP para API
│   ├── styles/
│   │   └── index.css # Estilos globais
│   ├── App.jsx        # Componente raiz com rotas
│   └── main.jsx       # Entrada da aplicação
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Fluxo de Autenticação

1. Usuário entra credenciais na página de login
2. Frontend faz POST para `/api/auth/login`
3. Backend valida credenciais e retorna JWT
4. Frontend armazena JWT no localStorage
5. Todas as requisições subsequentes incluem `Authorization: Bearer <token>`
6. Middleware `autenticar` valida o token antes de processar a requisição

## Fluxo de Importação de Contatos

1. Usuário seleciona arquivo XLSX na página de Contatos
2. Frontend faz POST multipart para `/api/contatos/importar`
3. Backend:
   - Lê arquivo com biblioteca `exceljs`
   - Valida cada contato (CPF/CNPJ, campos obrigatórios)
   - Verificar duplicidade
   - Salva contatos válidos no MongoDB
   - Retorna quantidade de sucessos e erros
4. Frontend recarrega lista de contatos

## Fluxo de Registro de Ligação

1. Operador clica em um contato
2. Abre modale com formulário
3. Operador preenche:
   - Resultado (sucesso, insucesso, etc)
   - Observações
   - Se agendado, data/hora do retorno
4. Frontend faz POST para `/api/contatos/:id/ligacao`
5. Backend:
   - Cria registro em `HistoricoLigacao`
   - Atualiza status do contato
   - Incrementa contador de tentativas
6. Dashboard atualiza em tempo real

## Endpoints da API

### Autenticação

```
POST   /api/auth/registrar           Registrar novo usuário
POST   /api/auth/login               Fazer login
GET    /api/auth/perfil              Obter dados do usuário autenticado
GET    /api/auth/usuarios            Listar todos os usuários (admin/gerente)
```

### Contatos

```
GET    /api/contatos                 Listar contatos (com paginação)
GET    /api/contatos/:id             Obter detalhes de um contato
GET    /api/contatos/pendentes       Listar contatos pendentes
POST   /api/contatos/importar        Importar contatos de arquivo
POST   /api/contatos/:id/ligacao     Registrar ligação
PATCH  /api/contatos/:id/status      Atualizar status
DELETE /api/contatos/:id             Deletar contato
```

### Dashboard e Relatórios

```
GET    /api/dashboard                Métricas e gráficos do dashboard
GET    /api/dashboard/alertas        Alertas inteligentes
GET    /api/dashboard/relatorio/operador              Relatório por operador
GET    /api/dashboard/relatorio/contatos-trabalhados  Contatos trabalhos
```

## Status de Contatos

- `nao_ligado` - Nunca foi ligado
- `success` - Ligação realizada com sucesso
- `insucesso` - Ligação realizada mas sem sucesso
- `nao_atendeu` - Cliente não atendeu
- `numero_invalido` - Número de telefone inválido
- `agendado` - Aguardando retorno agendado

## Campos de Busca

Você pode buscar contatos por:
- Nome (busca case-insensitive)
- CPF/CNPJ (apenas números)
- Telefone (apenas números)
- Status
- Data de última ligação

## Suporte a WhatsApp

Quando um operador clica em "WhatsApp", a aplicação:
1. Pega o número de telefone
2. Remove caracteres não-numéricos
3. Abre `https://wa.me/{numero}`
4. O cliente WhatsApp abre (se instalado) com chat pronto

Exemplo: `wa.me/5511987654321`

## Alerts Inteligentes

O sistema automaticamente identifica:
- ⚠️ Contatos não trabalhados (status = nao_ligado)
- ⏰ Agendamentos vencidos (proxima_ligacao <= hoje)
- 🔄 Múltiplas tentativas sem sucesso (tentativas >= 3)

## Filtros e Paginação

- **Page**: Número da página (padrão 1)
- **Limite**: Itens por página (padrão 10)
- **Status**: Filtrar por status
- **Busca**: Busca por nome/CPF/CNPJ/telefone

Exemplo: `/api/contatos?page=2&limite=20&status=nao_ligado&busca=João`

## Variáveis de Ambiente

### Backend (.env)

```
PORT=5000                                          # Porta do servidor
MONGODB_URI=mongodb://localhost:27017/crm-contatos # String conexão MongoDB
JWT_SECRET=seu-secret-seguro                       # Chave para assinar JWT
JWT_EXPIRE=7d                                      # Expiração do token
NODE_ENV=development                               # Ambiente (development/production)
CLIENT_URL=http://localhost:5173                   # URL do frontend (CORS)
```

## Scripts Disponíveis

### Backend

```bash
npm install    # Instalar dependências
npm run dev    # Iniciar com nodemon (desenvolvimento)
npm start      # Iniciar em produção
```

### Frontend

```bash
npm install    # Instalar dependências
npm run dev    # Iniciar servidor de desenvolvimento
npm run build  # Build para produção
npm run preview # Visualizar build
```

## Troubleshooting

### "Cannot find module 'mongoose'"
- Solução: `cd server && npm install`

### "Port 5000 already in use"
- Solução: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)
- Ou altere PORT em .env

### "CORS error from client"
- Certifique que `CLIENT_URL` em .env corresponde ao URL do frontend

### "MongoNetworkError"
- Certifique que MongoDB está rodando
- Ou atualize a string de conexão para MongoDB Atlas

## Performance

- Índices MongoDB criados automaticamente para campos de busca frequente
- Paginação implementada no frontend e backend
- Lazy loading de componentes
- Otimização de imagens

## Segurança

- Senhas são hasheadas com bcryptjs
- JWT assinado com SECRET
- Validação de entrada em todos os endpoints
- CORS configurado para apenas frontend
- Roles de usuário para controle de acesso

## Próximos Passos

1. Implementar exportação em PDF/Excel
2. Adicionar notificações por email
3. Sistema de metas de vendas
4. Dashboard com análise preditiva
5. VoIP para ligações diretas
6. App mobile
7. Sincronização offline

---

Para mais informações, consulte o README.md principal.
