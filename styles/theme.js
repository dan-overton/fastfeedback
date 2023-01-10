import React from 'react';
import { extendTheme } from '@chakra-ui/react'

import { Inter } from '@next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const theme = extendTheme({
  styles: {
    global: {
      html: {
        minWidth: '360px',
        scrollBehavior: 'smooth'
      },
      '#__next': {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }
    },
  },
  fonts: {
    body: `${inter.style.fontFamily.replaceAll(`'`, '"')},-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  },
});

export default theme;
