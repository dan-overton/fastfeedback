import Head from 'next/head'
import { Button, Heading, Text } from '@chakra-ui/react'

import { useAuth } from '@/lib/auth'

export default function Home() {
  const auth = useAuth()

  return (
    <>
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <main>
        <Heading>Fast Feedback</Heading>

        <Text>
          Current user: <code>{auth.user?.email}</code>
        </Text>

        {!auth.user && <Button onClick={(e) => auth.signInWithGithub()}>Sign in</Button>}
        {auth.user && <Button onClick={(e) => auth.signOut()}>Sign out</Button>}
      </main>
    </>
  )
}
