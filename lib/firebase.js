import * as firebase from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

let app

if (!firebase.getApps().length) {
  app = firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  })
} else {
  app = firebase.getApps()[0]
}

export default getFirestore(app)
