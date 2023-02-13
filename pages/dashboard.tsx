import ConfessionsList from '../components/ConfessionsList'
import Nav from '../components/Nav'
import {
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue,
  Container,
  useToast,
  useClipboard,
  HStack,
  Box,
} from '@chakra-ui/react'

import { FaInstagram, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import useUser from '../supabase/useUser'
import { useRouter } from 'next/router'
import useConfessions from '../supabase/useConfessions'
import SnapchatLogo from '../components/SnapchatLogo'
import { CopyIcon } from '@chakra-ui/icons'
import SimpleCard from '../components/SimpleCard'

export default function Dashboard({}) {
  const { user, error: userHasError, loading: userIsLoading } = useUser()
  const {
    confessions,
    error: confessionsHasError,
    loading: confessionsIsLoading,
  } = useConfessions()

  const router = useRouter()
  const bgColor = useColorModeValue('gray.200', 'gray.700')

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
  if (!userIsLoading && userHasError === 'user not found') {
    router.push('/login')
    toast({
      title: 'An error occurred.',
      description: 'You are not logged in.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    })

    return null
  }

  return (
    <>
      <Box pos={'fixed'} zIndex={1000} w={'100%'} h={16} top={0}>
        <Nav user={user} />
      </Box>
      <Container maxW={'6xl'} pt={16}>
        <Heading
          mt={4}
          fontWeight={'bold'}
          fontSize={{ base: '1xl', md: '2xl' }}
        >
          Welcome back,
          <Text
            bgGradient='linear(to-l, #FCEABB 0%, #00FFE5 50%, #0099FF 51%, #FBDF93 100%)'
            bgClip='text'
            fontSize='5xl'
            fontWeight='extrabold'
          >
            {user.full_name}!
          </Text>
        </Heading>
        <SimpleCard maxW='100%'>
          <Flex
            mx={{ base: 2, md: 0 }}
            align={'center'}
            direction='column'
            justify={'center'}
            h={120}
            cursor='pointer'
            _active={{ outline: 'none', transform: 'scale(0.9)' }}
            onClick={handleCodeCopyClick}
            // border='2px dashed #00FFE5'
          >
            <HStack>
              <Icon as={CopyIcon} fontSize={'2xl'} />
              <Text fontWeight={'extrabold'} fontSize='xl'>
                Copy your link!
              </Text>
            </HStack>
            <HStack mt={5}>
              <Icon
                as={FaWhatsapp}
                bg={'#25D366'}
                color={'white'}
                p={1}
                borderRadius={12}
                boxSize={10}
              />
              <Icon
                as={FaTelegram}
                bg={'#0088cc'}
                color={'white'}
                p={1}
                borderRadius={12}
                boxSize={10}
              />
              <Icon
                as={FaInstagram}
                color={'white'}
                bg={'#E1306C'}
                p={1}
                borderRadius={12}
                boxSize={10}
              />
              <Icon
                as={FaTwitter}
                color={'white'}
                bg={'#1DA1F2'}
                p={1}
                borderRadius={12}
                boxSize={10}
              />
              <SnapchatLogo size={40} />
            </HStack>
          </Flex>
        </SimpleCard>
        <Heading
          my={4}
          fontWeight={'bold'}
          fontSize={{ base: '2xl', md: '3xl' }}
        >
          Confessions ({confessions.length})
        </Heading>
        <ConfessionsList confessions={confessions} />
      </Container>
    </>
  )
}
