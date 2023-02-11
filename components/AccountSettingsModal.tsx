import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import supabase from '../supabase/supabase'
import useUser from '../supabase/useUser'

function AccountSettingsModal({ isOpen, onClose }) {
  const { user, refreshUser } = useUser()
  const [fullName, setFullName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const toast = useToast()
  useEffect(() => {
    if (user) {
      console.log(user)
      setFullName(user.full_name)
      setEmail(user.email)
    }
  }, [user])

  if (!user) return null

  const infoChanged = fullName !== user.full_name || email !== user.email
  const handleUserInfoUpdate = async () => {
    console.log('update user info')
    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        email,
      })
      .eq('id', user.id)
    if (error) {
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    toast({
      title: 'Account updated.',
      description: "We've updated your account for you.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    refreshUser()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Account Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <FormControl id='name' isRequired>
              <FormLabel>Your Name</FormLabel>
              <Input
                placeholder='your name'
                _placeholder={{ color: 'gray.500' }}
                type='text'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormControl>
            <FormControl id='email' isRequired>
              <FormLabel>Email</FormLabel>
              <Input disabled type='email' value={email} readOnly />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme={'blue'}
            isDisabled={!infoChanged}
            // opacity={infoChanged ? 1 : 0.5}
            mr={3}
            onClick={handleUserInfoUpdate}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AccountSettingsModal
