import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKXP7UW0XPQzcY9vt845Sa8-sPzM16apQ",
  authDomain: "intsem-inv.firebaseapp.com",
  projectId: "intsem-inv",
  storageBucket: "intsem-inv.appspot.com",
  messagingSenderId: "691856626987",
  appId: "1:691856626987:web:063a1e9781ec553f99616e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const addItemToDb = async (
  name,
  productNumber,
  serialNumber,
  category,
  department
) => {
  try {
    const docRef = await addDoc(collection(db, "items"), {
      name: name,
      productNumber: productNumber,
      serialNumber: serialNumber,
      category: category,
      department: department,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
