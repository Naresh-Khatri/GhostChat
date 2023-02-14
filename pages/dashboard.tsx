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
  VStack,
} from '@chakra-ui/react'

import { FaInstagram, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import useUser from '../supabase/useUser'
import { useRouter } from 'next/router'
import useConfessions from '../supabase/useConfessions'
import SnapchatLogo from '../components/SnapchatLogo'
import { CopyIcon } from '@chakra-ui/icons'
import SimpleCard from '../components/SimpleCard'
import Logo from '../components/Logo'
import Image from 'next/image'
import { useRef, useState } from 'react'
import dataURLtoFile from '../utils/dataURLtoFile'
import * as htmlToImage from 'html-to-image'
import sleep from '../utils/sleep'

export default function Dashboard({}) {
  const { user, error: userHasError, loading: userIsLoading } = useUser()
  const {
    confessions,
    error: confessionsHasError,
    loading: confessionsIsLoading,
  } = useConfessions()
  const { onCopy, setValue } = useClipboard('')

  const textColor = useColorModeValue('gray.800', 'white')
  const router = useRouter()
  const toast = useToast()

  const containerRef = useRef(null)
  const [captureModeOn, setCaptureModeOn] = useState(false)

  const makeShareImage = async () => {
    setCaptureModeOn(true)
    await sleep(200)
    const dataUrl = await htmlToImage.toPng(containerRef.current)
    setCaptureModeOn(false)
    return dataURLtoFile(dataUrl, 'confession.png')
  }
  const handleCodeCopyClick = async () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/confess/${user.id}`
      if (window.navigator.share) {
        const file = await makeShareImage()
        window.navigator.share({
          title: 'Now heres your chance to confess your secrets anonymously',
          text: 'Now heres your chance to confess your secrets anonymously',
          files: [file],
          url: url,
        })
      } else {
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
            color={textColor}
            h={120}
            cursor='pointer'
            _active={{ outline: 'none', transform: 'scale(0.9)' }}
            onClick={handleCodeCopyClick}
            // border='2px dashed #00FFE5'
          >
            <HStack>
              <Icon as={CopyIcon} fontSize={'2xl'} />
              <Text fontWeight={'extrabold'} fontSize='xl'>
                Share your link!
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
      <ShareContainer
        containerRef={containerRef}
        photoUrl={user.avatar_url}
        captureModeOn={captureModeOn}
      />
    </>
  )
}

const ShareContainer = ({
  containerRef,
  photoUrl,
  captureModeOn,
}: {
  containerRef: any
  photoUrl: string
  captureModeOn: boolean
}) => {
  return (
    <>
      {captureModeOn && (
        <Flex
          justify={'center'}
          align={'center'}
          ref={containerRef}
          h={captureModeOn ? '700px' : '100%'}
          w={captureModeOn ? '700px' : '100%'}
          // bg='linear(to-l, #FCEABB 0%, #00FFE5 50%, #0099FF 51%, #FBDF93 100%)'
          // bg={'rgba(71,169,255,1)'}
          // bgGradient='linear(to-l, rgba(71,169,255,1) 0%, rgba(50,100,243,1) 50%, rgba(71,169,255,1) 100%)'
          bgGradient='radial-gradient(circle, rgba(71,169,255,1) 0%, rgba(50,100,203,1) 60%, rgba(41,128,205,1) 100%);'
          p={'1em 2em'}
        >
          <Flex
            justify={'center'}
            align={'center'}
            bg={'white'}
            minH={300}
            h={captureModeOn ? '600px' : '100%'}
            w={captureModeOn ? '600px' : '100%'}
            boxShadow={'2xl'}
            p={10}
            direction='column'
            justifyContent={'space-between'}
            borderRadius={50}
          >
            {!captureModeOn && <Box></Box>}
            <VStack spacing={0} display={captureModeOn ? 'flex' : 'none'}>
              <Logo size={45} color={'dark'} />
              <Text color={'gray.800'} fontWeight={'extrabold'} fontSize={'lg'}>
                GhostChat
              </Text>
            </VStack>
            <Flex pos={'relative'}>
              <Text
                pos={'absolute'}
                justifySelf={'end'}
                color={'rgba(71,169,255,1)'}
                fontSize='9xl'
                left={-100}
                top={-100}
              >
                {/* &ldquo; */}
              </Text>
              <Flex>
                <Text
                  color={'gray.700'}
                  fontSize={captureModeOn ? '3xl' : 'xl'}
                  fontWeight={'bold'}
                  align='center'
                >
                  Is there something you would like to share with me{' '}
                  <Text
                    color={'gray.700'}
                    as={'span'}
                    fontSize={captureModeOn ? '3xl' : 'xl'}
                    fontWeight={'bold'}
                    align='center'
                    bgGradient={'linear(to-l, #669DEE 0%, #121FCF 100%)'}
                    bgClip='text'
                  >
                    anonymously
                  </Text>
                  ?
                </Text>
              </Flex>
            </Flex>

            <VStack w={'100%'} align={'end'} justify='center'>
              <Flex direction={'column'} align='center'>
                <Image
                  aria-label='User avatar'
                  alt='User avatar'
                  src={photoUrl}
                  width={captureModeOn ? 85 : 50}
                  height={captureModeOn ? 85 : 50}
                  style={{ borderRadius: '50%' }}
                />
                <Text color={'gray.500'}>@naresh</Text>
              </Flex>
            </VStack>
          </Flex>
        </Flex>
      )}
      {/* <Button onClick={downloadImage}> Download</Button> */}
    </>
  )
}
