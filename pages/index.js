import Head from 'next/head'
import { Box, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { LogoIcon } from '@/lib/icons'
import { useAuth } from '@/lib/auth'

export default function Home() {
  const auth = useAuth()

  return (
    <Flex as="main" direction="column" align="center" justify="center" minW="300" w="full" h="100vh">
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <LogoIcon boxSize={32} />

      {auth.user &&
        <Flex direction="column">
          <Button
            as="a"
            href="/dashboard"
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            mt={4}
            maxW="200px"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)'
            }}
          >
            View Dashboard
          </Button>
          <Button
            onClick={(e) => auth.signOut()}
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            mt={4}
            maxW="200px"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)'
            }}
          >
            Sign out
          </Button>
        </Flex>
      }
      {auth.user === false && <Button backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        mt={4}
        maxW="200px"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }} onClick={(e) => auth.signInWithGithub()}>Sign in</Button>}
      {auth.user === null && "Loading..."}
    </Flex>

  )
}
