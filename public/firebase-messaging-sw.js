// Import the Firebase scripts needed for messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.21.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging-compat.js"
);

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDRck24tnpkzA87GNRA98JJubNXHfUKiGQ",
  authDomain: "vission-ai-39fa4.firebaseapp.com",
  projectId: "vission-ai-39fa4",
  storageBucket: "vission-ai-39fa4.appspot.com",
  messagingSenderId: "561312239042",
  appId: "1:561312239042:web:bc74e87d6e92222be15a5b",
  measurementId: "G-34MGM4CBJQ",
};

// Initialize the Firebase app in the service worker
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message: ",
    payload
  );

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // You can change this to your own logo/icon
  };

  // Show the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});
