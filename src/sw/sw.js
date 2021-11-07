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

const hasVisibleClients = (clientList) => {
    return clientList.some(client => client.visibilityState === 'visible' &&
        !client.url.startsWith('chrome-extension://'));
};
const getClientList = () => {
    return self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
    });
};

const onPush = async (event) => {
    console.log('[sw.js] Received push message ', event.data);

    let payload;

    try {
        payload = event.data ? event.data.json() : null;
    } catch (err) {
        payload = null;
    }

    const clients = await getClientList();

    if (payload && !hasVisibleClients(clients)) {
        await self.registration.showNotification(payload.data?.title || '', {
            body: payload.data?.body,
            icon: payload.data?.icon,
            vibrate: payload.data && payload.data.vibrate ? JSON.parse(payload.data.vibrate) : undefined,
            priority: payload.data.priority,
        });
    }
};

self.addEventListener('push', (event) => {
    event.waitUntil(onPush(event));
});
