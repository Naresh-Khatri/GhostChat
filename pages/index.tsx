import { Button, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import Nav from '../components/Nav'

const Home = () => {
  return (
    <>
      <Nav />
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '4xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Start sending and receiving messages{' '}
            <Text
              as={'span'}
              // color={'blue.400'}
              fontSize={{ base: '5xl', md: '6xl' }}
              lineHeight={1.3}
              bgGradient='linear(to-l, #FCEABB 0%, #00FFE5 50%, #0099FF 51%, #FBDF93 100%)'
              bgClip={'text'}
            >
              anonymously
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            GhostChat is an instant messaging app that allows anonymous
            communication. Send and receive honest messages with ease, free from
            judgement. Connect with others in a safe and secure environment.
            Join the millions of users who have discovered the power of
            anonymous messaging with GhostChat.
          </Text>
          <Stack spacing={6} direction={'row'}>
            <Link href={'/login'}>
              <Button rounded={'full'} px={6}>
                Login
              </Button>
            </Link>
            <Link href={'/signup'}>
              <Button
                rounded={'full'}
                px={6}
                colorScheme={'blue'}
                _hover={{ bg: 'orange.500' }}
              >
                Sign up
              </Button>
            </Link>
          </Stack>
          <Flex w={'full'}>
            {/* <Illustration
              height={{ sm: '24rem', lg: '28rem' }}
              mt={{ base: 12, sm: 16 }}
            /> */}
          </Flex>
        </Stack>
      </Container>
    </>
  )
}

export default Home
