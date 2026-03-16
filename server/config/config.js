import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyCPplKkqmZxBIsBOayCF3HBAxFaqGZSO3E',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'agendaccb-73569.firebaseapp.com',
    databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://agendaccb-73569-default-rtdb.firebaseio.com',
    projectId: process.env.FIREBASE_PROJECT_ID || 'agendaccb-73569',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'agendaccb-73569.firebasestorage.app',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '745107890249',
    appId: process.env.FIREBASE_APP_ID || '1:745107890249:web:41544c05e7275c987e5f98',
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || 'G-X3E3MFZYJM',
  },
  jwtSecret: process.env.JWT_SECRET || 'seu-secret-seguro-aqui',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};
