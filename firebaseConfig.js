import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyCsGGT2P6rUpg6QX66TPlIdAgOgIz-sH_4',
  authDomain: 'ecoquest-project.firebaseapp.com',
  databaseURL: 'https://ecoquest-project-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'ecoquest-project',
  storageBucket: 'ecoquest-project.appspot.com',
  messagingSenderId: '93067044052',
  appId: '1:93067044052:android:8aa7e1d230bf78c4c24741',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)

export const FIREBASE_AUTH = getAuth(app);
