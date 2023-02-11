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
import { useEffect, useState } from 'react'
import supabase from '../supabase/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')

  const toast = useToast()
  const router = useRouter()
  const handleLoginBtnClick = async () => {
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
      toast({
        title: 'Logged in .',
        description: "We've logged you in.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      router.push('/dashboard')
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
          Login to your account
        </Heading>
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
            onClick={handleLoginBtnClick}
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
