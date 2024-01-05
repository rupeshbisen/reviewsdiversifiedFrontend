import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyA4ghaP0HVsXsCVyccA8RhHVvWSgfPJLRY",
    authDomain: "ssmpannel-5ef6b.firebaseapp.com",
    databaseURL: "https://ssmpannel-5ef6b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ssmpannel-5ef6b",
    storageBucket: "ssmpannel-5ef6b.appspot.com",
    messagingSenderId: "917412642063",
    appId: "1:917412642063:web:e5273d67b11a55fc95d27a"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };