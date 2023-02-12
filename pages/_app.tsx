import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { AppProps } from 'next/app'
function MyApp({ Component, pageProps }: AppProps) {
  const defaultTheme = extendTheme({
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
  })
  return (
    <ChakraProvider theme={defaultTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp
