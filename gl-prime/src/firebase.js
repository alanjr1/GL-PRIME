import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configurações do seu projeto GL PRIME
const firebaseConfig = {
  apiKey: "AIzaSyCGkm1Nlfts4Qn02xdApIoThseO-_PE77w",
  authDomain: "gl-prime-bdb7a.firebaseapp.com",
  projectId: "gl-prime-bdb7a",
  storageBucket: "gl-prime-bdb7a.firebasestorage.app",
  messagingSenderId: "266081805965",
  appId: "1:266081805965:web:33106892e8b1857a2b64c4",
  measurementId: "G-1KEJ74NDBT"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore (Banco de Dados)
export const db = getFirestore(app);