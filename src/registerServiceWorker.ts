/* eslint-disable no-console */

import {register} from 'register-service-worker';
import {initializeApp} from "firebase/app";
import {getMessaging, onMessage, getToken} from "firebase/messaging";
import {getFirestore, doc, setDoc} from "firebase/firestore";

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
const db = getFirestore(firebaseApp);

const hash = (string: string): string => {
    string = string || '';

    let hash = 0, i, chr;
    if (string.length === 0) return hash.toString();
    for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash).toString();
};

if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}sw.js`, {
        ready() {
            console.log(
                'App is being served from cache by a service worker.\n' +
                'For more details, visit https://goo.gl/AFskqB'
            )
        },
        registered(registration) {
            console.log('Service worker has been registered.')

            getToken(messaging, {
                vapidKey: 'BB6WcYwyrZlYpSiVOXPEGMlkPytiUu9nOEG2FzErcR7LMCTkJjVqurTPNtYIve9YqqaNGDIaiGKfcxOTNStdFDg',
                serviceWorkerRegistration: registration

            }).then((currentToken) => {
                if (currentToken) {
                    // Send the token to your server and update the UI if necessary
                    console.log('FCM Token', currentToken);

                    setDoc(doc(db, 'fcm', hash(currentToken)), {
                        token: currentToken,
                        agent: navigator.userAgent,
                    });
                } else {
                    // Show permission request UI
                    console.log('No registration token available. Request permission to generate one.');
                    // ...
                }
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
                // ...
            });

            onMessage(messaging, (payload) => {
                console.log('Received front message: ', payload)
            });
        },
        cached() {
            console.log('Content has been cached for offline use.')
        },
        updatefound() {
            console.log('New content is downloading.')
        },
        updated() {
            console.log('New content is available; please refresh.')
        },
        offline() {
            console.log('No internet connection found. App is running in offline mode.')
        },
        error(error) {
            console.error('Error during service worker registration:', error)
        }
    });
}
