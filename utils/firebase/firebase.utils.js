import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoQJZTULVz7FNqR4cRpUDKT0z_ZZ2BYms",
  authDomain: "crown-clothing-db-1e658.firebaseapp.com",
  projectId: "crown-clothing-db-1e658",
  storageBucket: "crown-clothing-db-1e658.appspot.com",
  messagingSenderId: "94835801087",
  appId: "1:94835801087:web:63b4163098b3af3454c5ca",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

// specific to google
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

// function that receives the data from the authentication service in the form of userAuth (whatever you want)
// and store that authentication inside of a firestore
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // takes 3 arguments
  // the database --> db
  // a collection (a table) --> users
  // a unique identifier of the users
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  // will get us the user details using the getDoc
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  // will check for us if the user exists in the database or not
  console.log(userSnapshot.exists());

  // run if the user does not exist
  if (userSnapshot.exists()) {
    console.log("User already exists in database system.");
  } else {
    console.log("Creating new user in database system.");
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // will create a new record in the database
      // will take paramaeters
      // 1st param: userDocRef --> the database connection to firebase
      // ...additionalInformation --> means spreading the object at the end
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log("Error creating user", err.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  //if email or password are empty skip
  if (!email || !password) {
    return;
  } else {
    return await createUserWithEmailAndPassword(auth, email, password);
  }
};

export const logInWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);

    switch (error.code) {
      case "auth/wrong-password":
        const errIncorrectCredentials = "User typed an incorrect user/password";
        console.log(errIncorrectCredentials);
        alert(errIncorrectCredentials);
        break;
      case "auth/user-not-found":
        const errUserNotFound = "No user associated with this email";
        console.log(errUserNotFound);
        alert(errUserNotFound);
        break;
      default:
        console.log(error);
    }
  }
};

export const signOutUser = async() => await signOut(auth);
