import firebase from './firebase'

import { doc, setDoc, getFirestore } from 'firebase/firestore'

const firestore = getFirestore()

export async function createUser(uid, data) {
  const docRef = doc(firestore, 'users', uid)

  await setDoc(docRef, data, { merge: true })
}
