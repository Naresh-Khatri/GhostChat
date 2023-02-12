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
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SimpleCard from '../components/SimpleCard'
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
      w={'100%'}
    >
      <SimpleCard w='93%' mt='20px'>
        <Stack spacing={4} p={6} my={12}>
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
          <Stack direction={'row-reverse'}>
            <Link href={'/signup'}>
              <Button size={'sm'}>New User?</Button>
            </Link>
          </Stack>
        </Stack>
      </SimpleCard>
    </Flex>
  )
}
