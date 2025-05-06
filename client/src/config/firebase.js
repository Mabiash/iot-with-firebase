// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCds6vCXU2vMLA0OzCVFCg4r-YWz8FeU6s",
  authDomain: "iotdoorlock-b8a4a.firebaseapp.com",
  databaseURL: "https://iotdoorlock-b8a4a-default-rtdb.firebaseio.com",
  projectId: "iotdoorlock-b8a4a",
  storageBucket: "iotdoorlock-b8a4a.firebasestorage.app",
  messagingSenderId: "788838982249",
  appId: "1:788838982249:web:34532021be435719eff8f8",
  measurementId: "G-CNRH155KWL"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
 