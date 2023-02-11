import ConfessionsList from '../components/ConfessionsList'
import Nav from '../components/Nav'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Icon,
  Text,
  useColorModeValue,
  Container,
  useToast,
  useClipboard,
} from '@chakra-ui/react'

import { FaCopy } from 'react-icons/fa'
import useUser from '../supabase/useUser'
import { useRouter } from 'next/router'
import useConfessions from '../supabase/useConfessions'

export default function Dashboard({}) {
  const { user, error: userHasError, loading: userIsLoading } = useUser()
  const {
    confessions,
    error: confessionsHasError,
    loading: confessionsIsLoading,
  } = useConfessions()

  const router = useRouter()
  const bgColor = useColorModeValue('gray.50', 'gray.700')

  const toast = useToast()
  const { onCopy, setValue } = useClipboard('')

  const handleCodeCopyClick = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/confess/${user.id}`
      if (window.navigator.share)
        window.navigator.share({
          title: 'Confess',
          text: 'Confess your sins',
          url,
        })
      else {
        setValue(url)
        onCopy()
        toast({
          title: 'Link copied.',
          description: 'Your link has been copied to your clipboard.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
    }
  }
  if (userIsLoading || confessionsIsLoading) return <div>Loading...</div>
  if (!userIsLoading && userHasError === 'user not found') router.push('/login')

  return (
    <>
      <Nav user={user} />
      <Container maxW={'6xl'}>
        <Heading fontWeight={'bold'} fontSize={{ base: '2xl', md: '3xl' }}>
          Welcome back {user.full_name}!
        </Heading>
        <Flex
          bg={bgColor}
          mx={{ base: 2, md: 0 }}
          p={10}
          borderRadius={12}
          align={'center'}
          direction='column'
          onClick={handleCodeCopyClick}
        >
          <Text>Copy your link!</Text>
          <Icon as={FaCopy} boxSize={10} />
        </Flex>
        <Heading
          my={4}
          fontWeight={'bold'}
          fontSize={{ base: '2xl', md: '3xl' }}
        >
          Confessions
        </Heading>
        <ConfessionsList confessions={confessions} />
      </Container>
    </>
  )
}
