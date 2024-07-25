import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAVeiBDTeXc-AFD9Ovmu78if_UjfQftmRQ",
    authDomain: "rollcallapp-413c8.firebaseapp.com",
    projectId: "rollcallapp-413c8",
    storageBucket: "rollcallapp-413c8.appspot.com",
    messagingSenderId: "835301614681",
    appId: "1:835301614681:web:f34d132c763271acf23d48",
    measurementId: "G-1HSQ4YJSG6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// ログインする時にどのアカウントでログインするかを出すThis error happened while generating the page. Any console logs will be displayed in the terminal window.
const provider = new GoogleAuthProvider();
const db = getFirestore(app)

export {app, auth, provider, db};