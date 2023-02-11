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
            <Text as={'span'} color={'green.400'}>
              anonymously
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            [sdljfskjdf] is an instant messaging app that allows anonymous
            communication. Send and receive honest messages with ease, free from
            judgement. Connect with others in a safe and secure environment.
            Join the millions of users who have discovered the power of
            anonymous messaging with [lskfjlsjdf].
          </Text>
          <Stack spacing={6} direction={'row'}>
            <Button rounded={'full'} px={6}>
              Learn more
            </Button>
            <Link href={'/signup'}>
              <Button
                rounded={'full'}
                px={6}
                colorScheme={'green'}
                _hover={{ bg: 'orange.500' }}
              >
                Create your link
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
