import db from './firebase'

import { doc, addDoc, setDoc, collection } from 'firebase/firestore'

export async function createUser(uid, data) {
  const docRef = doc(db, 'users', uid)

  await setDoc(docRef, data, { merge: true })
}

export async function createSite(data) {
  const collRef = collection(db, 'sites')

  const newSite = await addDoc(collRef, data)

  return newSite
}

export async function createFeedback(data) {
  const collRef = collection(db, 'feedback')

  const newFeedback = await addDoc(collRef, data)

  return newFeedback
}
