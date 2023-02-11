import {
  Button,
  Container,
  Heading,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import supabase from '../../supabase/supabase'
import { User } from '../../supabase/useUser'

function ConfessPage() {
  const router = useRouter()
  const toast = useToast()

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
        .select('full_name')
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

  if (!user) return null
  if (error) return null

  return (
    <Container>
      <Heading>Say something to {user.full_name}</Heading>
      <Textarea
        value={confessionText}
        onChange={(e) => setConfessionText(e.target.value)}
      />
      <Button onClick={handleConfessSubmitClick}>Submit</Button>
    </Container>
  )
}

export default ConfessPage
