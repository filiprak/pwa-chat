const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(require('../../cert/firebase.json')),
});

const hour = new Date()
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '')
    .split(' ')
    .slice(1, 2)
    .join('');

admin
    .messaging()
    .sendMulticast({
        data: {
            title: hour + ' - TechCorp up 1.43% on the day',
            body: 'FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.',
            image: 'https://pwa-chat-83be2.web.app/img/logo.82b9c7a5.png',
            icon: 'https://pwa-chat-83be2.web.app/img/logo.82b9c7a5.png',
            vibrate: '[50]',
        },
        tokens: [
            'cwdwI05hwLeuG6S3rM26gd:APA91bEugI-B7SIuAhlIhhjevTicRma3Nrg6RdMmRv6CIgMH5UwJ0sPrf3EBdxrEi4F_0uNa_ZyWkpYmukuhU4lGaHZoEl-CC280aPCiyQrGR9K50ahvP1U7wsUEfoMzNFaH8rgqFlJX',
            'fOvqhj9N3RhEUfYqfVZiF7:APA91bFjYuq36FGAoJTlqqnpaU2v5Ktw0zywf6szufuiLgVvLuEHYXegPCvIkKntW7rZxp6hNcrmqjQU1JCzeBf_OEmvnJDLbMPBB5sF4PJm-2WrRpvP6vYog8crhdHbWob0CeA3A9tM',
            'cfH6JaqoVuxqHPfSXWEeeL:APA91bGVTCsWzwfMIKXLQAjvA34OzAznJP17ouxPc0Z8ghPPVTb8RAALc2DwlxB4fmQc5sdVOPY7gLfeptMqEF4uzXgxPPkvn4UnFNQH4KRjcV5kWxDFOxrSn4eJS4i_5acYgoH-NFPy',
        ],
    })
    .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message');
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });
