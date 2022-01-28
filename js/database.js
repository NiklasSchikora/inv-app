import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  query,
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
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getItemFromDb = async (itemID) => {
  let docRef = doc(db, "items", itemID);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Data: " + docSnap.data().name);
    return docSnap.data();
  }
};

export const getItemList = async () => {
  let colRef = collection(db, "items");
  let q = query(colRef);
  let res = await getDocs(q);
  res.forEach((doc) => {
    console.log(doc.id + " => " + JSON.stringify(doc.data()));
  });
  return res;
};
