
const firebaseConfig = {
  apiKey: "AIzaSyAvGthyArhVtSKnk0cx_D_jEhY_6kpECUM",
  authDomain: "urug-92fc3.firebaseapp.com",
  projectId: "urug-92fc3",
  storageBucket: "urug-92fc3.firebasestorage.app",
  messagingSenderId: "625273600486",
  appId: "1:625273600486:web:6faf181c1b3904ae01be27"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
