# 🎯 Project Structure & Navigation

```
Sistema de Gestão de Ligações/
│
├── 📖 DOCUMENTAÇÃO (Leia nesta ordem!)
│   ├── 1. README.md ........................ Visão geral completa
│   ├── 2. QUICK_START.md .................. 5 minutos para rodar
│   ├── 3. DEPLOYMENT_CHECKLIST.md ........ Verificar tudo antes de usar
│   ├── 4. FIREBASE_SETUP.md .............. Guia completo Firebase
│   ├── 5. FIRST_STEPS.md ................. Próximos passos (semana a semana)
│   ├── 6. SETUP_SUMMARY.md ............... Resumo executivo
│   ├── 7. DOCS_GUIDE.md .................. Guia de navegação de docs
│   └── 8. PROJECT_STRUCTURE.md ........... Este arquivo
│
├── 🔧 BACKEND (Node.js + Express + Firebase)
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js ......... Login, registro, perfil
│   │   │   ├── contatoController.js ..... CRUD contatos, ligações
│   │   │   └── dashboardController.js ... Métricas, relatórios
│   │   ├── models/
│   │   │   ├── UsuarioFirebase.js ....... User management (Firestore)
│   │   │   ├── ContatoFirebase.js ....... Contact management (Firestore)
│   │   │   └── HistoricoLigacaoFirebase.js - Call history (Firestore)
│   │   ├── routes/
│   │   │   ├── authRoutes.js ............ /api/auth endpoints
│   │   │   ├── contatoRoutes.js ........ /api/contatos endpoints
│   │   │   └── dashboardRoutes.js ...... /api/dashboard endpoints
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js ........ JWT verification
│   │   │   └── corsMiddleware.js ........ CORS configuration
│   │   ├── utils/
│   │   │   ├── fileImport.js ............ XLSX parse + import
│   │   │   ├── validators.js ............ CPF/CNPJ validation
│   │   │   └── formatters.js ............ Data formatting
│   │   └── index.js ..................... Server entry point
│   │
│   ├── config/
│   │   ├── config.js .................... Configuration loader
│   │   ├── database.js .................. Firebase initialization
│   │   └── middlewares.js ............... Express middleware setup
│   │
│   ├── .env ............................ Environment vars (populated ✅)
│   ├── .env.example .................... Template for .env
│   ├── firebase-key.json ............... Firebase credentials (⚠️ not committed)
│   ├── package.json .................... Dependencies
│   ├── package-lock.json ............... Lock file
│   └── README.md ....................... Backend-specific docs
│
├── ⚛️ FRONTEND (React + Vite + TailwindCSS)
│   ├── src/
│   │   ├── components/
│   │   │   ├── shared/
│   │   │   │   ├── Header.jsx ........... App header with nav
│   │   │   │   ├── Sidebar.jsx ......... Navigation menu
│   │   │   │   ├── Alert.jsx .......... Alert messages
│   │   │   │   ├── Button.jsx ......... Reusable button
│   │   │   │   ├── Input.jsx ......... Reusable input
│   │   │   │   └── Modal.jsx ......... Reusable modal
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.jsx ....... Login component
│   │   │   │   ├── RegisterForm.jsx ... Register component
│   │   │   │   └── ProfileCard.jsx .... User profile
│   │   │   │
│   │   │   ├── contatos/
│   │   │   │   ├── ContatosList.jsx ... List view
│   │   │   │   ├── ContatoDetail.jsx . Detail view
│   │   │   │   ├── ImportForm.jsx .... XLSX upload
│   │   │   │   └── CallModal.jsx ..... Register call
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── MetricsCard.jsx ... Metric card
│   │   │   │   ├── ChartCard.jsx .... Chart container
│   │   │   │   ├── AlertCard.jsx .... Alert display
│   │   │   │   └── OperatorRank.jsx . Ranking table
│   │   │   │
│   │   │   └── relatorios/
│   │   │       ├── OperadorReport.jsx  Operator stats
│   │   │       ├── ContatosReport.jsx  Contact stats
│   │   │       └── DateFilter.jsx     Date range selector
│   │   │
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx ............ Login page
│   │   │   ├── DashboardPage.jsx ....... Dashboard
│   │   │   ├── ContatosPage.jsx ........ Contacts list
│   │   │   ├── RelatoriosPage.jsx ..... Reports
│   │   │   ├── ConfigPage.jsx ......... Settings (admin)
│   │   │   └── 404Page.jsx ........... Not found
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx ......... Auth state management
│   │   │   └── ThemeContext.jsx ....... Theme state (future)
│   │   │
│   │   ├── services/
│   │   │   ├── api.js ................. Axios instance
│   │   │   ├── authService.js ........ Auth API calls
│   │   │   ├── contatoService.js ..... Contact API calls
│   │   │   ├── dashboardService.js .. Dashboard API calls
│   │   │   └── relatorioService.js .. Reports API calls
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js ........... Auth hook
│   │   │   └── useApi.js .......... API call hook
│   │   │
│   │   ├── App.jsx ................. Main app component
│   │   ├── main.jsx ............... Entry point
│   │   └── index.css .............. Global styles
│   │
│   ├── public/
│   │   ├── favicon.ico
│   │   └── index.html ............ HTML template
│   │
│   ├── .env (optional for frontned)
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js ........... Vite configuration
│   ├── tailwind.config.js ....... TailwindCSS config
│   ├── postcss.config.js ........ PostCSS config
│   └── README.md ............... Frontend-specific docs
│
├── 🔥 FIREBASE
│   ├── Project ID: agendaccb-73569
│   ├── Collections:
│   │   ├── usuarios/
│   │   │   └── {userId}
│   │   │       ├── email
│   │   │       ├── senha (hashed)
│   │   │       ├── nome
│   │   │       ├── funcao
│   │   │       └── dataCriacao
│   │   ├── contatos/
│   │   │   └── {contatoId}
│   │   │       ├── nome
│   │   │       ├── cpfCnpj
│   │   │       ├── telefone
│   │   │       ├── status
│   │   │       └── dataImportacao
│   │   └── historico_ligacoes/
│   │       └── {registroId}
│   │           ├── contatoId
│   │           ├── operadorId
│   │           ├── dataLigacao
│   │           ├── resultado
│   │           └── anotacoes
│   │
│   ├── Security Rules: Configuráveis (dev vs prod)
│   ├── Indexes: Recomendados para produção
│   └── Backups: Configure no Firebase Console
│
└── 📝 CONFIGURATION FILES
    ├── .gitignore ................. Git ignore patterns
    ├── .env ..................... Environment variables (⚠️ secret!)
    ├── .env.example ............ Environment template
    └── package.json (root) ...... Scripts/metadata
```

---

## 📊 Stack Técnico

### Backend
```
Node.js (16+)
  └─ Express 4.x
      ├─ firebase-admin (Firestore SDK)
      ├─ bcrypt (Password hashing)
      ├─ jsonwebtoken (JWT auth)
      ├─ cors (Cross-origin)
      ├─ exceljs / xlsx (File parsing)
      └─ dotenv (Environment vars)
```

### Frontend
```
React 18
  └─ Vite (Build tool)
      ├─ axios (HTTP client)
      ├─ react-router-dom (Routing)
      ├─ TailwindCSS (Styling)
      ├─ recharts (Charts/graphs)
      ├─ lucide-react (Icons)
      └─ zustand (State - optional)
```

### Database
```
Firebase ☁️
  ├─ Firestore (NoSQL database)
  ├─ Authentication (User management)
  ├─ Storage (File storage - optional)
  └─ Hosting (Deploy frontend - optional)
```

---

## 🔀 Data Flow

```
User → Browser (React) → API (Express) → Firebase (Firestore)
                ↓
            [Render UI]
                ↑
          [Get Data]
                ↓
```

### Example: Login Flow
```
1. User enters email/password in LoginForm
2. LoginForm calls authService.login()
3. authService sends POST to /api/auth/login
4. authController.login() queries Firestore
5. Firebase returns user doc + validation
6. authController generates JWT token
7. Frontend stores token in localStorage
8. Frontend redirects to Dashboard
9. Dashboard calls API with token in header
10. authMiddleware verifies JWT
11. Dashboard loads data from Firestore
12. Data renders on screen
```

---

## 🎯 File Organization Rationale

- **controllers/**: Business logic (auth, crud, calculations)
- **models/**: Data access layer (Firestore queries)
- **routes/**: URL patterns → controllers
- **middleware/**: Common logic (auth, cors, validation)
- **utils/**: Helper functions (parsing, formatting)
- **config/**: Global setup (Firebase, env)

**Frontend:**
- **components/**: Reusable UI pieces
- **pages/**: Full-screen views
- **context/**: Global state
- **services/**: API communication
- **hooks/**: Custom React hooks

---

## 📦 Key Dependencies

### Backend
- `firebase-admin` - Firestore + Authentication
- `express` - Web framework
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT tokens
- `exceljs` - Read/write Excel files
- `dotenv` - Environment variables

### Frontend
- `react` - UI library
- `vite` - Build tool
- `axios` - HTTP client
- `react-router-dom` - Routing
- `tailwindcss` - CSS framework
- `recharts` - Charts library
- `lucide-react` - Icon library
- `zustand` - State management (optional)

---

## 🔐 Security Architecture

```
Frontend (localhost:5173)
  ↓ [JWT Token in Headers]
API (localhost:5000)
  ├─ CORS Check ✓
  ├─ JWT Verification ✓
  └─ Permission Check ✓
  ↓
Firebase Firestore
  ├─ Security Rules Check ✓
  ├─ Authentication Check ✓
  └─ Data Access Control ✓
```

---

## 📈 Scalability

```
Current (Development):
┌─────────────────────────────────────┐
│ Frontend (React) | Backend (Express)│
│   localhost:5173 |  localhost:5000  │
│                                     │
└──────────────────┬──────────────────┘
                   │
            ┌──────▼──────┐
            │   Firebase  │
            │  (Firestore)│
            └─────────────┘

Future (Production):
┌────────────────────────────────┐
│ CDN (Vercel/Netlify)           │
│  (Frontend Static Files)       │
└────────────────┬───────────────┘
                 │
    ┌────────────┴───────────┐
    │                        │
┌───▼──────────┐  ┌──────────▼────┐
│ Cloud Run    │  │  API Gateway  │
│(Backend)     │  │  (Optional)   │
└───┬──────────┘  └──────────┬────┘
    │                        │
    └────────────┬───────────┘
                 │
            ┌────▼──────────┐
            │   Firebase    │
            │ (AutoScaling) │
            └───────────────┘
```

---

## 📋 Directory Size Reference

```
server/
  ├── src/: ~5KB (20-30 smaller files)
  ├── config/: ~3KB (3-4 files)
  ├── node_modules/: ~300MB (dependencies)
  ├── package.json: ~2KB
  └── Total: ~300MB

client/
  ├── src/: ~10KB (50-60 smaller files)
  ├── public/: <1MB
  ├── node_modules/: ~500MB (dependencies)
  ├── package.json: ~2KB
  └── Total: ~500MB

Project Total: ~800MB (normal for Node/React projects)
```

---

## ✅ Verification Checklist

- [ ] All files listed above exist
- [ ] Backend starts without errors
- [ ] Frontend loads at localhost:5173
- [ ] Login page appears
- [ ] Can register new account
- [ ] Can import Excel file
- [ ] Dashboard shows data
- [ ] Firestore data syncs correctly

---

## 📞 Common Paths

| Task | Path |
|------|------|
| Add API route | `server/src/routes/` |
| Add controller logic | `server/src/controllers/` |
| Add Firestore query | `server/src/models/` |
| Add React component | `client/src/components/` |
| Add new page | `client/src/pages/` |
| Add API service call | `client/src/services/` |
| Update styles | `client/tailwind.config.js` |
| Change theme colors | `client/src/index.css` |

---

**Last Updated:** 2024  
**Project Status:** ✅ Complete & Ready  
**Next Step:** Follow [QUICK_START.md](./QUICK_START.md)
