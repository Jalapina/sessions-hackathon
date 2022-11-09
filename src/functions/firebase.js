import { initializeApp } from '@firebase/app';
import { getAuth, browserSessionPersistence } from '@firebase/auth';
import { connectFunctionsEmulator, getFunctions } from '@firebase/functions';
import { getMoralisAuth } from '@moralisweb3/client-firebase-auth-utils';

export const app = initializeApp({
  apiKey: "AIzaSyDmwhMPoJvTS99CCGtRw7x7LWovb9XxQs4",
  authDomain: "sessions-e4f78.firebaseapp.com",
  databaseURL: "https://sessions-e4f78-default-rtdb.firebaseio.com",
  projectId: "sessions-e4f78",
  storageBucket: "sessions-e4f78.appspot.com",
  messagingSenderId: "1078318421930",
  appId: "1:1078318421930:web:df1e929ed176d4c5a77dd3",
  measurementId: "G-LRS6NK8TER"
});

export const auth = getAuth(app);

export const functions = getFunctions(app);

export const moralisAuth = getMoralisAuth(app);

export async function initFirebase() {
  // eslint-disable-next-line no-undef
  if (window.location.hostname === 'localhost') {
    connectFunctionsEmulator(functions, 'localhost', 3000);
  }

  await auth.setPersistence(browserSessionPersistence);
}
