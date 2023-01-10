import firebase from './firebase'

import { doc, addDoc, setDoc, getFirestore, collection } from 'firebase/firestore'

const firestore = getFirestore()

export async function createUser(uid, data) {
  const docRef = doc(firestore, 'users', uid)

  await setDoc(docRef, data, { merge: true })
}

export async function createSite(data) {
  const collRef = collection(firestore, 'sites')

  await addDoc(collRef, data)
}
