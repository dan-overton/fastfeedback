import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'

import { AuthProvider } from '@/lib/auth'
import theme from '@/styles/theme'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </>
  )
}
