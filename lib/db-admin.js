import { compareDesc, parseISO } from 'date-fns'
import adminDb from './firebase-admin'

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await adminDb.collection('feedback').where('siteId', '==', siteId).get()
    const feedback = []

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() })
    })

    feedback.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))

    return { feedback }
  } catch (error) {
    throw error
  }
}

export async function getAllSites() {
  try {
    const snapshot = await adminDb.collection('sites').get()
    const sites = []

    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() })
    })

    sites.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))

    return { sites }
  } catch (error) {
    throw error
  }
}
