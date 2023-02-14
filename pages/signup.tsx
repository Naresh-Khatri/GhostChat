import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import SimpleCard from '../components/SimpleCard'
import supabase from '../supabase/supabase'

import 'cropperjs/dist/cropper.css'
import { ChevronLeftIcon, CloseIcon } from '@chakra-ui/icons'
import dataURLtoFile from '../utils/dataURLtoFile'
import ImageUploader from '../components/ImageUploader'
import useUser from '../supabase/useUser'
export default function SignUpPage() {
  const [formStepCount, setFormStepCount] = useState<number>(0)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [profilePhotoCropper, setProfilePhotoCropper] = useState(null)

  const [submitLoading, setSubmitLoading] = useState<boolean>(false)

  const toast = useToast()
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    console.log(user)
    if (user) {
      router.push('/dashboard')
      toast({
        title: 'Already logged in.',
        description: "You're already logged in.",
        status: 'info',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [user, router, toast])

  const handleSignUpClick = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    console.log(data)
    console.log(error)
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
    if (data) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
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
      if (data) {
        const imageFile = dataURLtoFile(
          profilePhotoCropper.getCroppedCanvas().toDataURL(),
          `${username}_${new Date().getTime()}_avatar.png`
        )
        const { data: avatarData, error: avatarError } = await supabase.storage
          .from('avatars')
          .upload(`public/${imageFile.name}`, imageFile)

        await supabase
          .from('profiles')
          .update({
            full_name: fullName,
            email: email,
            username: username,
            avatar_url: `https://nmqxuusjichhgaiprapu.supabase.co/storage/v1/object/public/avatars/${avatarData.path}`,
          })
          .eq('id', data.user.id)
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        router.push('/dashboard')
      }
    }
  }
  return (
    <Flex
      minH={'100vh'}
      align={{ base: 'start', md: 'center' }}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <SimpleCard w='93%' mt='20px'>
        <Stack spacing={4} w={'full'} p={6} my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Sign Up your account
          </Heading>
          {formStepCount === 0 && (
            <Form1
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              setFormStepCount={setFormStepCount}
            />
          )}

          {formStepCount === 1 && (
            <Form2
              handleSignUpClick={handleSignUpClick}
              setFormStepCount={setFormStepCount}
              profilePhotoCropper={profilePhotoCropper}
              setProfilePhotoCropper={setProfilePhotoCropper}
              setSubmitLoading={setSubmitLoading}
              submitLoading={submitLoading}
              username={username}
              setUsername={setUsername}
            />
          )}

          <Stack justify={'center'} w={'100%'}>
            <Link href={'/login'}>
              <Button size={'sm'}>Already have an account?</Button>
            </Link>
          </Stack>
        </Stack>
      </SimpleCard>
    </Flex>
  )
}

const Form1 = ({
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  setFormStepCount,
}: {
  fullName: string
  setFullName: (value: string) => void
  email: string
  setEmail: (value: string) => void
  password: string
  setPassword: (value: string) => void
  setFormStepCount: (value: number) => void
}) => {
  return (
    <>
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
        <FormLabel>Email address</FormLabel>
        <Input
          placeholder='your-email@example.com'
          _placeholder={{ color: 'gray.500' }}
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <HStack spacing={6} justify='end'>
        <Button
          isDisabled={!fullName || !email || !password}
          onClick={() => setFormStepCount(1)}
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}
        >
          Next
        </Button>
      </HStack>
    </>
  )
}
const Form2 = ({
  handleSignUpClick,
  setFormStepCount,
  profilePhotoCropper,
  setProfilePhotoCropper,
  setSubmitLoading,
  submitLoading,
  username,
  setUsername,
}: {
  handleSignUpClick: () => void
  setFormStepCount: (value: number) => void
  profilePhotoCropper: any
  setProfilePhotoCropper: (value: any) => void
  setSubmitLoading: (value: boolean) => void
  submitLoading: boolean
  username: string
  setUsername: (value: string) => void
}) => {
  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(false)
  const [usernameTouched, setUsernameTouched] = useState<boolean>(false)
  const [usernameError, setUsernameError] = useState<string>('')
  const handleUsernameChange = async (username: string) => {
    setUsername(username)
    if (username.trim().length <= 4) {
      setUsernameError('Username must be at least 5 characters long')
      setUsernameAvailable(false)
      return
    }
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      console.log('runnig')
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .ilike('username', username)
      console.log(data, error)
      if (error) {
        setUsernameError('Something went wrong')
        setUsernameAvailable(false)
        return
      }
      if (data && data.length > 0) {
        setUsernameError('Username already taken')
        setUsernameAvailable(false)
        return
      }
      setUsernameError('')
      setUsernameAvailable(true)
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [username])
  return (
    <>
      <FormControl id='username' isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder='username'
          _placeholder={{ color: 'gray.500' }}
          type='text'
          value={username}
          onBlur={() => setUsernameTouched(true)}
          onChange={(e) => handleUsernameChange(e.target.value)}
        />
        {usernameTouched && usernameError && (
          <FormHelperText color='red.500'>{usernameError}</FormHelperText>
        )}
      </FormControl>
      <FormControl id='profile-photo' isRequired>
        <FormLabel>Profile Photo</FormLabel>
        <ImageUploader
          onChange={(value: any) => setProfilePhotoCropper(value)}
        />
      </FormControl>
      <HStack w={'100%'} justifyContent='space-between'>
        <Button
          leftIcon={<ChevronLeftIcon />}
          onClick={() => setFormStepCount(0)}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            handleSignUpClick()
            setSubmitLoading(true)
          }}
          isLoading={submitLoading}
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}
          isDisabled={!usernameAvailable || !profilePhotoCropper}
        >
          Submit
        </Button>
      </HStack>
    </>
  )
}
