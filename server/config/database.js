import admin from 'firebase-admin';
import { config } from './config.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;
let auth;

export const initializeFirebase = async () => {
  try {
    // Tentar carregar arquivo de credenciais
    const keyPath = path.join(__dirname, '../../firebase-key.json');
    
    if (fs.existsSync(keyPath)) {
      // Usar arquivo de credenciais (recomendado para produção)
      const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: config.firebase.projectId,
        databaseURL: config.firebase.databaseURL,
      });
      console.log('✅ Firebase inicializado com arquivo de credenciais');
    } else {
      // Usar credenciais de variáveis de ambiente (desenvolvimento)
      // Para isso, você deve ter GOOGLE_APPLICATION_CREDENTIALS definido
      // Ou criar credenciais manualmente
      admin.initializeApp({
        projectId: config.firebase.projectId,
        databaseURL: config.firebase.databaseURL,
      });
      console.log('⚠️ Firebase inicializado com credenciais padrão (desenvolvimento)');
    }

    db = admin.firestore();
    auth = admin.auth();
    
    console.log(`✅ Firestore conectado ao projeto: ${config.firebase.projectId}`);
    return db;
  } catch (error) {
    console.error('❌ Erro ao inicializar Firebase:', error.message);
    console.error('Instruções: Veja FIREBASE_SETUP.md para configurar as credenciais');
    process.exit(1);
  }
};

export const getFirebaseDb = () => {
  if (!db) {
    throw new Error('Firebase não foi inicializado. Chame initializeFirebase() primeiro.');
  }
  return db;
};

export const getFirebaseAuth = () => {
  if (!auth) {
    throw new Error('Firebase Auth não foi inicializado.');
  }
  return auth;
};

export const getFirebaseRealtimeDb = () => {
  return admin.database();
};
