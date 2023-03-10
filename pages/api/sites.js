// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllSites } from '@/lib/db-admin'

export default async function handler(req, res) {
  const { sites, error } = await getAllSites()

  if (error) {
    res.status(500).json({ error })
  } else {
    res.status(200).json({
      sites
    })
  }
}
