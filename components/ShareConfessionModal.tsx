import {
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
} from '@chakra-ui/react'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import * as htmlToImage from 'html-to-image'
import { useRef } from 'react'
import dataURLtoFile from '../utils/dataURLtoFile'
import supabase from '../supabase/supabase'

function ShareConfessionModal({ isOpen, onClose }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLDivElement>(null)
  const toast = useToast()

  const makeShareImage = async () => {
    containerRef.current.style.width = '700px'
    containerRef.current.style.height = '500px'
    childRef.current.style.width = '600px'
    childRef.current.style.height = '400px'
    const dataUrl = await htmlToImage.toPng(containerRef.current)
    containerRef.current.style.width = '100%'
    containerRef.current.style.height = '100%'
    childRef.current.style.width = '100%'
    childRef.current.style.height = '100%'
    return dataURLtoFile(dataUrl, 'confession.png')
  }
  const handleOnShareClick = async () => {
    const file = await makeShareImage()
    const user = await supabase.auth.getUser()
    const shareObj = {
      title: 'Konfess your secrets anonymously',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      files: [file],
      url: 'https://konfess.vercel.app/confess/' + user.data.user.id,
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
        <ModalHeader>Share Confession</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          <ShareContainer containerRef={containerRef} childRef={childRef} />
        </ModalBody>

        <ModalFooter>
          <HStack spacing={2}>
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
  childRef,
}: {
  containerRef: any
  childRef: any
}) => {
  return (
    <Flex
      ref={containerRef}
      justify={'center'}
      align={'center'}
      // h={600}
      // w={700}
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
        ref={childRef}
        // h={500}
        // w={600}
        boxShadow={'2xl'}
        p={10}
        direction='column'
        justifyContent={'center'}
        borderRadius={50}
      >
        <Text color={'rgba(71,169,255,1)'} fontSize='9xl' lineHeight={0.7}>
          &ldquo;
        </Text>
        <Text
          color={'gray.700'}
          fontSize='xl'
          fontWeight={'bold'}
          align='center'
        >
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          tincidunt, nisl eget aliquam tincidunt, nisl nisl aliquam lorem, nec
          aliquam nisl nisl eget nisl. Donec tincidunt, nisl eget aliquam
        </Text>

        <HStack mt={10} w={'100%'} justify={'start'}>
          <Image
            aria-label='User avatar'
            alt='User avatar'
            src={
              'https://nmqxuusjichhgaiprapu.supabase.co/storage/v1/object/public/avatars/public/nareshjdjdjdjdjdjdjdjdjdjdjdj_1676271771209_avatar.png'
            }
            width={85}
            height={85}
            style={{ borderRadius: '50%' }}
          />
          <Text color={'gray.500'}>sent by anonymous user</Text>
          {/* <Text color={'gray.500'}>@naresh</Text> */}
        </HStack>
      </Flex>
    </Flex>
  )
}

export default ShareConfessionModal
