# 📞 Sistema de Gestão de Ligações para Operadores de Vendas

Uma **aplicação web completa e moderna** para gerenciar contatos, registrar ligações comerciais, acompanhar performance e gerar relatórios em tempo real.

## 🎯 Visão Geral

Sistema desenvolvido para **operadores de vendas**, **gerentes de equipe** e **administradores** com interface intuitiva, futurista e totalmente responsiva.

**Banco de Dados:** Firebase Firestore ☁️  
**Backend:** Node.js + Express  
**Frontend:** React + Vite + TailwindCSS  
**Status:** ✅ Pronto para Uso / 🚀 Pronto para Produção

---

## ✨ Funcionalidades Principais

### 👥 Gestão de Contatos
- ✅ Importação de contatos via Excel (XLSX)
- ✅ Sistema avançado de busca e filtros
- ✅ Armazenamento de CPF/CNPJ, email, telefone
- ✅ Agendamento automático de próximos contatos
- ✅ Anotações por contato

### 📞 Registro de Ligações
- ✅ Registro rápido de resultado de ligação
- ✅ Histórico completo por contato
- ✅ Integração com WhatsApp (wa.me)
- ✅ Múltiplos resultados (Sucesso, Insucesso, Não Atendeu, etc.)
- ✅ Data/hora automática

### 📊 Dashboard e Analytics
- ✅ Métricas em tempo real
- ✅ Gráficos de performance
- ✅ Taxa de sucesso por operador
- ✅ Contatos por status
- ✅ Ligações por período

### 📈 Relatórios Detalhados
- ✅ Relatório de operador (performance individual)
- ✅ Relatório de contatos trabalhados
- ✅ Análise por período (7, 14, 30 dias)
- ✅ Ranking de operadores
- ✅ Exportação em PDF/Excel (em desenvolvimento)

### 🔐 Segurança e Autenticação
- ✅ Autenticação JWT segura
- ✅ Controle de acesso por função (Operador, Gerente, Admin)
- ✅ Senhas salvas com bcrypt
- ✅ Firebase Firestore com regras de segurança
- ✅ CORS configurado

### 🎨 Interface
- ✅ Design moderno e futurista
- ✅ Tema claro/escuro (em desenvolvimento)
- ✅ 100% responsivo (Desktop, Tablet, Mobile)
- ✅ Ícones Lucide React (300+ opções)
- ✅ Animações suaves

---

## 🚀 Quick Start (5 minutos)

### Pré-requisitos
- Node.js 16+
- npm/yarn
- Firebase credentials (veja abaixo)

### Passos

```bash
# 1. Clonar/Abrir projeto
cd "Sistema de Gestão de Ligações"

# 2. Baixar firebase-key.json do Firebase Console
# - Vá a https://firebase.google.com/console
# - Projeto: agendaccb-73569
# - Contas de Serviço → Gerar Chave
# - Salve em server/firebase-key.json

# 3. Instalar dependências
cd server && npm install
cd ../client && npm install

# 4. Terminal 1 - Backend
cd server && npm run dev
# Espere por: ✅ Firestore conectado ao projeto

# 5. Terminal 2 - Frontend
cd client && npm run dev
# Abra: http://localhost:5173

# 6. Pronto! Registre e comece a usar
```

👉 **Guia Completo:** Veja [QUICK_START.md](./QUICK_START.md)

---

## 📁 Estrutura do Projeto

```
Sistema de Gestão de Ligações/
│
├── server/                          # 🔧 Backend Node.js/Express
│   ├── src/
│   │   ├── controllers/             # Lógica de negócio
│   │   │   ├── authController.js
│   │   │   ├── contatoController.js
│   │   │   └── dashboardController.js
│   │   ├── models/                  # Camada de dados (Firebase)
│   │   │   ├── UsuarioFirebase.js
│   │   │   ├── ContatoFirebase.js
│   │   │   └── HistoricoLigacaoFirebase.js
│   │   ├── routes/                  # Endpoints API
│   │   ├── middleware/              # JWT, CORS, validação
│   │   ├── utils/                   # Funções auxiliares
│   │   └── index.js                 # Entrada principal
│   ├── config/
│   │   ├── config.js                # Configurações globais
│   │   ├── database.js              # Firebase initialization
│   │   └── middlewares.js
│   ├── firebase-key.json            # 🔒 Credentials (não commit!)
│   ├── .env                         # Variáveis de ambiente
│   ├── .env.example                 # Template do .env
│   ├── package.json
│   └── README.md
│
├── client/                          # ⚛️ Frontend React/Vite
│   ├── src/
│   │   ├── components/              # Componentes reutilizáveis
│   │   ├── pages/                   # Páginas principais
│   │   ├── context/                 # Context API (Auth)
│   │   ├── services/                # Chamadas à API
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
│
├── QUICK_START.md                   # 📌 Comece aqui!
├── FIREBASE_SETUP.md                # 🔥 Como configurar Firebase
├── DEPLOYMENT_CHECKLIST.md          # ✅ Checklist antes de usar
├── FIRST_STEPS.md                   # 🎯 Próximos passos
├── README.md                        # Este arquivo
└── .gitignore
```

---

## 🔧 Configuração Detalhada

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Firebase
FIREBASE_PROJECT_ID=agendaccb-73569
FIREBASE_DATABASE_URL=https://agendaccb-73569-default-rtdb.firebaseio.com
FIREBASE_API_KEY=AIzaSyDx...
FIREBASE_AUTH_DOMAIN=agendaccb-73569.firebaseapp.com
FIREBASE_STORAGE_BUCKET=agendaccb-73569.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=1:...
FIREBASE_MEASUREMENT_ID=G...

# JWT
JWT_SECRET=seu-secret-super-seguro-mude-isto
JWT_EXPIRE=7d
```

### Coleções Firestore
```javascript
usuarios/
├── usuarioId
│   ├── email: string
│   ├── nome: string
│   ├── funcao: "operador" | "gerente" | "admin"
│   ├── ativo: boolean
│   └── dataCriacao: timestamp

contatos/
├── contatoId
│   ├── nome: string
│   ├── cpfCnpj: string
│   ├── telefone: string
│   ├── email: string
│   ├── status: "nao_ligado" | "success" | "insucesso" | etc
│   └── dataImportacao: timestamp

historico_ligacoes/
├── registroId
│   ├── contatoId: string
│   ├── operadorId: string
│   ├── dataLigacao: timestamp
│   ├── resultado: string
│   └── anotacoes: string
```

---

## 📱 Uso da Aplicação

### 1️⃣ Login
```
URL: http://localhost:5173
- Email: seu@email.com
- Senha: sua-senha
```

### 2️⃣ Importar Contatos
```
Menu → Contatos → Importar
- Arquivo: contatos.xlsx
- Colunas esperadas: Nome, CPF/CNPJ, Telefone, Email
```

### 3️⃣ Registrar Ligação
```
Menu → Contatos → Selecione contato
- Clique "Registrar Ligação"
- Preencha: Resultado, Anotações
- Salve
```

### 4️⃣ Ver Dashboard
```
Menu → Dashboard
- Visualize métricas em tempo real
- Gráficos de performance
- Taxa de sucesso
```

### 5️⃣ Gerar Relatório
```
Menu → Relatórios
- Selecione período
- Escolha operador
- Visualize análise detalhada
```

---

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| "Port 5000 in use" | `PORT=5001 npm run dev` |
| "firebase-key.json not found" | Coloque arquivo em `server/` |
| "Cannot find module 'firebase-admin'" | `npm install firebase-admin uuid` |
| Contatos não importam | Verifique colunas do Excel |
| Dashboard branco | Importe contatos primeiro |
| Sem permissão | Atualize Firestore security rules |

👉 **Mais detalhes:** Veja [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) → Troubleshooting

---

## 🔒 Segurança

- ✅ Senhas salvas com bcrypt
- ✅ JWT para autenticação
- ✅ Firebase security rules configuradas
- ✅ CORS restrito a localhost:5173
- ✅ firebase-key.json no .gitignore
- ✅ .env não committed

---

## 🚀 Deployment

### Preparação
```bash
# 1. Leia o checklist
cat DEPLOYMENT_CHECKLIST.md

# 2. Teste tudo localmente
npm run test  # (quando implementado)

# 3. Build frontend
cd client && npm run build

# 4. Atualize .env para produção
# - Mude JWT_SECRET
# - Atualize CLIENT_URL
# - Configure novo Firebase project (opcional)
```

### Deploy Pattern
- **Frontend:** Vercel, Netlify, ou GitHub Pages
- **Backend:** Heroku, Railway, ou Google Cloud Run
- **Database:** Firebase (grátis com limites)

---

## 📚 Documentação Adicional

| Arquivo | Conteúdo |
|---------|----------|
| [QUICK_START.md](./QUICK_START.md) | Começar em 5 minutos |
| [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) | Configuração detalhada do Firebase |
| [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) | Checklist antes de usar |
| [FIRST_STEPS.md](./FIRST_STEPS.md) | Próximos passos (semana a semana) |
| [server/README.md](./server/README.md) | Documentação do backend |
| [client/README.md](./client/README.md) | Documentação do frontend |

---

## 💻 Stack Técnico

### Backend
- **Runtime:** Node.js 16+
- **Framework:** Express 4.x
- **Database:** Firebase Firestore
- **Auth:** JWT + bcrypt
- **File Processing:** exceljs, xlsx
- **Validation:** Validator.js

### Frontend
- **Library:** React 18
- **Build Tool:** Vite
- **Styling:** TailwindCSS + neon theme
- **Charts:** Recharts
- **Icons:** Lucide React (300+)
- **State:** Context API
- **HTTP:** Axios

### DevOps
- **VCS:** Git
- **CI/CD:** GitHub Actions (recomendado)
- **Cloud:** Firebase (backend, db, auth)
- **Monitoring:** Cloud Logging

---

## 🤝 Contribuindo

Para melhorar o projeto:

1. Create a branch para sua feature
2. Commit suas mudanças
3. Push para a branch
4. Abra um Pull Request

---

## 📞 Suporte

- 📧 Email: seu@email.com
- 🐛 Issues: Abra uma issue no GitHub
- 📚 Docs: Veja os arquivos .md inclusos

---

## 📄 Licença

Este projeto é privado. Propriedade exclusiva.

---

## ✅ Checklist Inicial

- [ ] Clonou o repositório
- [ ] Baixou firebase-key.json
- [ ] Instalou dependências (`npm install`)
- [ ] Iniciou backend (`npm run dev`)
- [ ] Iniciou frontend (`npm run dev`)
- [ ] Acessou http://localhost:5173
- [ ] Criou conta de teste
- [ ] Importou contatos piloto
- [ ] Registrou primeira ligação
- [ ] Viu dashboard atualizar

✅ **Parabéns!** Sua aplicação está pronta! 🎉

---

**Começe com:** [QUICK_START.md](./QUICK_START.md)  
**Depois leia:** [FIRST_STEPS.md](./FIRST_STEPS.md)

última atualização: 2024
.
├── server/                    # Backend Node.js + Express
│   ├── src/
│   │   ├── controllers/      # Lógica de negócio
│   │   ├── models/           # Schemas MongoDB
│   │   ├── routes/           # Rotas da API
│   │   ├── middleware/       # Autenticação e validação
│   │   ├── utils/            # Utilitários
│   │   └── index.js          # Arquivo principal
│   ├── config/               # Configurações
│   └── package.json
│
└── client/                    # Frontend React + Vite
    ├── src/
    │   ├── components/       # Componentes reutilizáveis
    │   ├── pages/            # Páginas da aplicação
    │   ├── context/          # Context API
    │   ├── services/         # Chamadas de API
    │   ├── styles/           # Estilos globais
    │   ├── App.jsx           # Componente raiz
    │   └── main.jsx          # Entrada
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🔐 Autenticação

A aplicação usa JWT (JSON Web Tokens) para autenticação. Os tokens são armazenados no localStorage do navegador.

### Roles de Usuário:
- **operador**: Pode registrar ligações e gerenciar seus contatos
- **gerente**: Pode acessar relatórios e gerenciar operadores
- **admin**: Acesso total ao sistema

## 📊 API Endpoints

### Autenticação
- `POST /api/auth/registrar` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/perfil` - Obter dados do usuário

### Contatos
- `GET /api/contatos` - Listar contatos com paginação
- `GET /api/contatos/:id` - Obter detalhes de um contato
- `POST /api/contatos/importar` - Importar contatos via arquivo
- `POST /api/contatos/:contatoId/ligacao` - Registrar ligação
- `PATCH /api/contatos/:id/status` - Atualizar status
- `DELETE /api/contatos/:id` - Deletar contato

### Dashboard
- `GET /api/dashboard` - Obter métricas e gráficos
- `GET /api/dashboard/alertas` - Obter alertas inteligentes
- `GET /api/dashboard/relatorio/operador` - Relatório por operador
- `GET /api/dashboard/relatorio/contatos-trabalhados` - Contatos já ligados

## 🎨 Design System

A aplicação usa:
- **TailwindCSS** para estilização
- **Lucide React** para ícones
- **Recharts** para gráficos
- **Tema neon** com cores: Azul, Roxo, Rosa e Branco

## 📱 Responsividade

A aplicação é totalmente responsiva com breakpoints para:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## 🚀 Build para Produção

### Backend
```bash
npm install --production
npm start
```

### Frontend
```bash
npm run build
npm run preview
```

## 🔧 Variáveis de Ambiente

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crm-contatos
JWT_SECRET=seu-secret-seguro
JWT_EXPIRE=7d
NODE_ENV=production
CLIENT_URL=https://seu-dominio.com
```

### Frontend (.env)
```
VITE_API_URL=https://api.seu-dominio.com
```

## 📝 Exemplos de Uso

### Importar Contatos
1. Prepare arquivo XLSX com colunas: Nome, CPF/CNPJ, Telefone 1, Telefone 2, Email, Endereço
2. Na página de Contatos, clique em "Importar XLSX"
3. Selecione o arquivo

### Registrar Ligação
1. Liste os contatos
2. Clique no ícone de "Ver" para abrir o formulário
3. Preencha o resultado e observações
4. Opcionalmente agendar retorno

### Gerar Relatório
1. Acesse a página de Relatórios
2. Selecione o intervalo de datas
3. Clique em "Filtrar"
4. Exporte em PDF ou Excel

## 🐛 Troubleshooting

### Erro de conexão com MongoDB
- Verifique se o MongoDB está rodando
- Confira a string de conexão em .env

### Erro de CORS
- Certifique de que o `CLIENT_URL` em .env do backend está correto

### Componentes não carregam
- Limpe o cache: `npm cache clean --force`
- Delete `node_modules` e reinstale: `npm install`

## 📄 Licença

MIT

## 👥 Suporte

Para reportar bugs ou sugerir melhorias, abra uma issue no repositório.

## 🎯 Roadmap

- [ ] Exportação de relatórios em PDF e Excel
- [ ] Notificações por email
- [ ] Sistema de metas de vendas
- [ ] Dashboard com análise preditiva
- [ ] Integração com telefone (VoIP)
- [ ] App mobile nativa
- [ ] Sincronização offline

---

Desenvolvido com ❤️ para operadores de vendas
