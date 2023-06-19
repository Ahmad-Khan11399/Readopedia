import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKIFzE6bbj9luEenqynA2IGBGeDEf_ud0",
  authDomain: "book-store-cb228.firebaseapp.com",
  projectId: "book-store-cb228",
  storageBucket: "book-store-cb228.appspot.com",
  messagingSenderId: "428843466505",
  appId: "1:428843466505:web:ac03a167c79f3da5ee1dd8",
  measurementId: "G-VNVTVG6NKZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
