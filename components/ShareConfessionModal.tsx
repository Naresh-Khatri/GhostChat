import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import * as htmlToImage from 'html-to-image'
import { useEffect, useRef, useState } from 'react'
import dataURLtoFile from '../utils/dataURLtoFile'
import supabase from '../supabase/supabase'
import { Confession } from '../supabase/useConfessions'
import Logo from './Logo'
import sleep from '../utils/sleep'
import useUser from '../supabase/useUser'

interface ShareConfessionModalProps {
  isOpen: boolean
  onClose: () => void
  confession: Confession
}

function ShareConfessionModal({
  isOpen,
  onClose,
  confession,
}: ShareConfessionModalProps) {
  // console.log(confession)
  const { user } = useUser()
  const containerRef = useRef<HTMLDivElement>(null)
  const [captureModeOn, setCaptureModeOn] = useState<boolean>(false)
  const toast = useToast()

  const makeShareImage = async () => {
    setCaptureModeOn(true)
    await sleep(200)
    const dataUrl = await htmlToImage.toPng(containerRef.current)
    setCaptureModeOn(false)
    return dataURLtoFile(dataUrl, 'confession.png')
  }
  const handleOnShareClick = async () => {
    const file = await makeShareImage()
    const shareObj = {
      text: 'Some anonymous person sent me this',
      title: 'Some anonymous person sent me this',
      files: [file],
      url: 'https://konfess.vercel.app/confess/' + user.id,
    }
    if (navigator.share) {
      navigator.share(shareObj)
    } else {
      toast({
        title: 'Share not supported',
        description: 'Share is not supported on your device',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      console.log('Share not supported')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
      <ModalOverlay />
      <ModalContent mx={1}>
        <ModalHeader bg={'rgba(50,100,203,1)'}>Share Confession</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          <ShareContainer
            containerRef={containerRef}
            text={confession.text}
            captureModeOn={captureModeOn}
          />
        </ModalBody>

        <ModalFooter bg={'rgba(50,100,203,1)'}>
          <HStack spacing={2}>
            {/* <Button onClick={() => setCaptureModeOn((p) => !p)}>
              Toggle capture
            </Button> */}
            <Button>Cancel</Button>
            <Button
              leftIcon={<FaWhatsapp fontSize={'25'} />}
              colorScheme='green'
              onClick={handleOnShareClick}
            >
              Share
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const ShareContainer = ({
  containerRef,
  captureModeOn,
  text,
}: {
  containerRef: any
  captureModeOn: boolean
  text: string
}) => {
  const { user } = useUser()
  console.log(user)
  return (
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
      {user && (
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
            <Text
              color={'gray.700'}
              fontSize={captureModeOn ? '3xl' : 'xl'}
              fontWeight={'bold'}
              align='center'
            >
              {text}
            </Text>
          </Flex>

          <HStack w={'100%'} justify={'space-between'}>
            <Image
              aria-label='User avatar'
              alt='User avatar'
              src={user.avatar_url}
              width={captureModeOn ? 85 : 50}
              height={captureModeOn ? 85 : 50}
              style={{ borderRadius: '50%' }}
            />
            <Text color={'gray.500'}>- sent by anonymous user</Text>
          </HStack>
          {/* <Text color={'gray.500'}>@naresh</Text> */}
        </Flex>
      )}
    </Flex>
  )
}

export default ShareConfessionModal
