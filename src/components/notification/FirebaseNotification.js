import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {
  APPID,
  AUTH_DOMAIN,
  FIREBASE_APIKEY,
  MEASUREMENTID,
  MESSAGINGSENDERID,
  PROJECTID,
  STORAGEBUKET,
  VAPIDKEY,
} from "../../utils/ENVImport";

const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = async () => {

  // Notification.requestPermission().then((permission) => {
  //   if (permission === "granted") {
  //     console.log("Notification permission granted.");

      return getToken(messaging, {
        vapidKey: VAPIDKEY,
      })
        .then((currentToken) => {
          if (currentToken) {
            localStorage.setItem("ct", currentToken);
            console.log("ct", currentToken);
          } else {
            localStorage.clear();
            console.log("failed fc");
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
      // Get the FCM token
      //   const token = await getToken(messaging, {
      //     vapidKey:
      //       "BPKh1VIk_Xwhfdda2l476jesJwMY2PnDQ7nqUPUf-6J6Anv_KmAJGbjaZxEw-XspGkZ1ePhDgmq37fdSmNK9fso", // Add your VAPID key here
      //   });
      //   if (token) {
      //     console.log("FCM Token:", token);
      //     setFcmToken(token);
      //   } else {
      //     console.log("No registration token available.");
      //   }
    // } else {
    //   console.log("Notification permission denied.");
    // }
  // });
};

requestPermission();

export const onMessageListner = (callback) => {
  onMessage(messaging, (payload) => {
    callback(payload);
  });
};
