import { myFS } from './firebaseSetup'; 
import { collection, addDoc } from 'firebase/firestore';

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
  ]
};

const items = "items";

const loadJSONData = async (data, items) => {
  const collectionRef = collection(myFS, items);

  for (const item of data.posts) {
    try {
      const docRef = await addDoc(collectionRef, item);
      console.log(`Added document with ID: ${docRef.id}`);
    } catch (error) {
      console.error(`Error adding document: ${error}`);
    }
  }
};

const main = async () => {
    await loadJSONData(JSON_DATA, items)
      .then(() => {
        console.log('Data loading complete.');
      })
      .catch((error) => {
        console.error(`Error loading data: ${error}`);
      });
  };
  
  main();
