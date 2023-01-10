import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/empty-state'
import Head from 'next/head'

export default function Dashboard() {
  const auth = useAuth()

  return <>
    <Head>
      <title>Fast Feedback</title>
    </Head>
    {auth.user ? <EmptyState /> : 'Loading'}
  </>
}
