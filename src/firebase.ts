import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDp3RzUAGUWsXnNIbPgQLDtFrVVjx4K4nY",
  authDomain: "nwitter-reloaded-hyeonmeenoi.firebaseapp.com",
  projectId: "nwitter-reloaded-hyeonmeenoi",
  storageBucket: "nwitter-reloaded-hyeonmeenoi.appspot.com",
  messagingSenderId: "948410550083",
  appId: "1:948410550083:web:6f0e5168eb9ad326a651f6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
