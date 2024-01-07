import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDK2obFhgXllncImWfn6mCtXWFlqCA9YjU",
  authDomain: "whome1-d91eb.firebaseapp.com",
  databaseURL: "https://whome1-d91eb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "whome1-d91eb",
  storageBucket: "whome1-d91eb.appspot.com",
  messagingSenderId: "983906595743",
  appId: "1:983906595743:web:f2db13b24cb6bcb25683aa",
  measurementId: "G-2LBESC2VN9"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
