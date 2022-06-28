/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import {
  setDoc,
  doc,
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  addDoc,
  query,
  orderBy,
  updateDoc,
  enableIndexedDbPersistence,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
} from "firebase/firestore";
import { auth, db } from "./firebase-config";
import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";

export {
  getDocs,
  collection,
  doc,
  deleteDoc,
  addDoc,
  query,
  orderBy,
  getDoc,
  updateDoc,
  enableIndexedDbPersistence,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
} from "@firebase/firestore";

export {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "@firebase/auth";

// signin with gmail--------------------------------------------------//
export async function loginGoogle() {
  const googleProvider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error(error);
  }
}

// creating a collection with users data---------------------------------//
export async function registeredUser(uid, name, email, photo) {
  try {
    const userCollection = collection(db, "users");
    console.log(uid);
    console.log(name);
    console.log(email);
    console.log(photo);
    await setDoc(doc(userCollection, uid), {
      uid,
      name,
      email,
      photo,
    });
  } catch (error) {
    console.log("user dont saved", error);
  }
}

// obteining data from the collection of a user------------------------//
export async function userExist(uid) {
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);
  console.log(res);
  return res.exists();
}

// Register with mail and password---------------------------------------//
export function register(username, email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// signin with mail and password-----------------------------------------//
export const login = (setErrorEmail, setErrorPassword, email, password) => {
  setErrorEmail("");
  setErrorPassword("");
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      console.log(error.message);
      if (error.code === "auth/invalid-email") {
        console.log(error.code);
        setErrorEmail("Invalid email");
      } else if (error.code === "auth/wrong-password") {
        console.log(error.code);
        setErrorPassword("Invalid password");
      } else if (error.code === "auth/internal-error") {
        console.log(error.code);
        setErrorPassword("Enter a password");
      } else if (error.code === "auth/user-not-found") {
        console.log(error.code);
        setErrorEmail("User not found");
      }
    });
};

// logOut---------------------------------------------------------------//
export function logOut() {
  return signOut(auth);
}

// hook onauth----------------------------------------------------------//
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);
  return currentUser;
}
