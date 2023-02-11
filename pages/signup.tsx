import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import supabase from '../supabase/supabase'

export default function SignUpPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')

  const toast = useToast()
  const router = useRouter()

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
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
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
        await supabase
          .from('profiles')
          .update({ full_name: fullName, email: email })
          .eq('id', data.user.id)
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
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Sign Up your account
        </Heading>
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
        <Stack spacing={6}>
          <Button
            onClick={handleSignUpClick}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}
