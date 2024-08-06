import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// ログインする時にどのアカウントでログインするかを出すThis error happened while generating the page. Any console logs will be displayed in the terminal window.
const provider = new GoogleAuthProvider();
const db = getFirestore(app)

export {app, auth, provider, db};