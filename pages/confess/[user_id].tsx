import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Container,
  Text,
  Textarea,
  useColorMode,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SimpleCard from '../../components/SimpleCard'
import supabase from '../../supabase/supabase'
import { User } from '../../supabase/useUser'

function ConfessPage() {
  const router = useRouter()
  const toast = useToast()

  //TODO: enable dark mode
  const { colorMode, toggleColorMode } = useColorMode()
  if (colorMode === 'light') toggleColorMode()

  const [user, setUser] = useState<User>(null)
  const [error, setError] = useState<any>(null)
  const [confessionText, setConfessionText] = useState<string>('')
  const handleConfessSubmitClick = async () => {
    const { status } = await supabase.from('confessions').insert({
      to_user: router.query.user_id,
      text: confessionText,
    })
    if (status !== 201) {
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    } else {
      toast({
        title: 'Confession sent.',
        description: "We've sent your confession.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setConfessionText('')
      router.push('/')
    }
  }
  useEffect(() => {
    const fetchUser = async (user_id: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name , avatar_url')
        .eq('id', user_id)
        .single()
      setUser(data as User)
      if (error) {
        toast({
          title: 'An error occurred.',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        setError(error)
        return
      }
    }

    if (router.isReady && !router.query.user_id) {
      toast({
        title: 'An error occurred.',
        description: 'No user id found.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      router.push('/')
    }
    if (router.isReady && router.query.user_id)
      fetchUser(router.query.user_id as string)
  }, [router, toast])

  if (!user || error) return null

  return (
    <Container>
      <SimpleCard mt='100px'>
        <Box position='absolute' top={-10} left={'40%'} margin={'auto'}>
          <Avatar size={'lg'} src={user.avatar_url} />
        </Box>
        <VStack mt={6}>
          <Text>Say something to {user.full_name}</Text>
          <Textarea
            value={confessionText}
            bg={'white'}
            height={'200px'}
            color={'black'}
            resize={'vertical'}
            onChange={(e) => setConfessionText(e.target.value)}
          />
          <Button
            rightIcon={<ChevronRightIcon />}
            colorScheme={'blue'}
            onClick={handleConfessSubmitClick}
            isDisabled={confessionText.trim().length === 0}
          >
            Submit
          </Button>
        </VStack>
      </SimpleCard>
    </Container>
  )
}

export default ConfessPage
