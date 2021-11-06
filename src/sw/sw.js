import {initializeApp} from "firebase/app";
import {getMessaging, onBackgroundMessage} from "firebase/messaging/sw";

console.log('[sw.js] Loaded version: ', process.env.VUE_APP_VERSION);

const firebaseConfig = {
    apiKey: "AIzaSyDWDz_678IZFVAxho3Nx1dYkXnkfIWCnEU",
    authDomain: "pwa-chat-83be2.firebaseapp.com",
    projectId: "pwa-chat-83be2",
    storageBucket: "pwa-chat-83be2.appspot.com",
    messagingSenderId: "630124022407",
    appId: "1:630124022407:web:a5f6c82a43b087881f0622",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
    console.log('[sw.js] Received background message ', payload);

    self.registration.showNotification(payload.data?.title || '', {
        body: payload.data?.body,
        icon: payload.data?.icon,
        vibrate: payload.data && payload.data.vibrate ? JSON.parse(payload.data.vibrate) : undefined,
        priority: payload.data.priority,
    });
});
