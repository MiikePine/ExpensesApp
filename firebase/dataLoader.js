import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator, collection, addDoc } from 'firebase/firestore';

const JSON_DATA = {
  "posts": [
    {
      "id": 1,
      "price": 124,
      "item": "Aldi",
      "payBy": "Twint",
      "dateValue": "2023-06-04",
      "category": "Food"
    },
    {
      "id": 2,
      "price": 89,
      "item": "Exams",
      "payBy": "Credit Card",
      "dateValue": "2023-08-10",
      "category": "Health"
    },
    ,
    {
      "id": 3,
      "price": 35,
      "item": "Diesel",
      "payBy": "Credit Card",
      "dateValue": "2023-09-05",
      "category": "Transport"
    },
    {
      "id": 4,
      "price": 12,
      "item": "Shoes",
      "payBy": "Cash",
      "dateValue": "2023-11-15",
      "category": "Sports"
    },
    {
      "id": 5,
      "price": 190,
      "item": "assurance",
      "payBy": "Credit Card",
      "dateValue": "2023-10-02",
      "category": "Car"
    },
  ]
};

const initializeFB = async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyB3LE-Rotx6aFYOCh5PMgBGI9ZOJhcHYVU",
    authDomain: "expese-70c96.firebaseapp.com",
    projectId: "expese-70c96",
    storageBucket: "expese-70c96.appspot.com",
    messagingSenderId: "611401275080",
    appId: "1:611401275080:web:93a4dde982c11138fb37fd",
    measurementId: "G-R1MPXYSBFS"
  };

  let fbApp = initializeApp(firebaseConfig);
  const FIRESTORE = getFirestore(fbApp);


  let USING_FIREBASE_EMULATOR = true;
  if (USING_FIREBASE_EMULATOR) {
    connectFirestoreEmulator(FIRESTORE, '127.0.0.1', 8080);
  }

  const collectionRef = collection(FIRESTORE, "items");

  for (const post of JSON_DATA.posts) {
    try {
      const docRef = await addDoc(collectionRef, post);
      console.log(`Added document with ID: ${docRef.id}`);
    } catch (error) {
      console.error(`Error adding document: ${error}`);
    }
  }
};

export { initializeFB };

