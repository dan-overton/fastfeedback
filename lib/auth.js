import React, { useState, useEffect, useContext, createContext } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, GithubAuthProvider } from "firebase/auth";
import { createUser } from './db';
import firebase from './firebase'

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const formatUser = user => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photoUrl: user.photoURL,
    provider: user.providerData[0].providerId
  }
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = async (rawUser) => {
    let result
    if (rawUser) {
      result = formatUser(rawUser)
      await createUser(result.uid, result)
    } else {
      result = false
    }

    setUser(result)
    return result
  }

  const signInWithGithub = () => {
    const auth = getAuth()

    return signInWithPopup(auth, new GithubAuthProvider())
      .then((response) => handleUser(response.user));
  };

  const signOut = () => {
    const auth = getAuth()

    return firebaseSignOut(auth)
      .then(() => handleUser(false))
  };

  useEffect(() => {
    const auth = getAuth()

    const unsubscribe = onAuthStateChanged(auth, handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithGithub,
    signOut,
  };
}
