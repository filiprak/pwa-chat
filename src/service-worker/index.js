import {initializeApp} from "firebase/app";
import {getMessaging} from "firebase/messaging/sw";


const firebaseConfig = {
    apiKey: "AIzaSyDWDz_678IZFVAxho3Nx1dYkXnkfIWCnEU",
    authDomain: "pwa-chat-83be2.firebaseapp.com",
    projectId: "pwa-chat-83be2",
    storageBucket: "pwa-chat-83be2.appspot.com",
    messagingSenderId: "630124022407",
    appId: "1:630124022407:web:a5f6c82a43b087881f0622"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

console.log(self)