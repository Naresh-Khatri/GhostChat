import {
  Button,
  FormControl,
  FormHelperText,
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
  const [username, setUsername] = useState<string>('')
  const [usernameError, setusernameError] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const toast = useToast()
  useEffect(() => {
    if (user) {
      setFullName(user.full_name)
      setEmail(user.email)
      setUsername(user.username)
    }
  }, [user])
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (username.trim().length <= 5) {
        setusernameError('Username must be at least 5 characters long')
        return
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .ilike('username', username)
      console.log(data, error)
      if (data.length >= 1) setusernameError('username already exist.')
      else setusernameError('')
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [username])

  if (!user) return null

  const infoChanged =
    fullName !== user.full_name ||
    email !== user.email ||
    username !== user.username

  const handleUserInfoUpdate = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        username,
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
            <FormControl id='name' isRequired>
              <FormLabel>username</FormLabel>
              <Input
                placeholder='your name'
                _placeholder={{ color: 'gray.500' }}
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {infoChanged && usernameError && (
                <FormHelperText color='red.500'>{usernameError}</FormHelperText>
              )}
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
            isDisabled={
              !infoChanged || !!usernameError || !username || !fullName
            }
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
