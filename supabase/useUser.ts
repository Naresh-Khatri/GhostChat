import React, { useEffect, useState } from 'react'
import supabase from './supabase'

export interface User {
  id: string
  email: string
  full_name: string
  username?: string
  updated_at?: string
  avatar_url?: string
}

function useUser() {
  const [user, setUser] = useState<User>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  const fetchUserData = async () => {
    const { data: session } = await supabase.auth.getSession()
    if (!session) setError('session not found')
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', session.session.user.id)
        .single()
      if (error) setError('user not fount')
      setUser(data)
      setLoading(false)
    } catch (err) {
      setError('user not found')
      setLoading(false)
      console.log(err)
    }
  }

  // supabase.auth.onAuthStateChange((e, session) => {
  //   console.log(e, session)
  // })
  useEffect(() => {
    fetchUserData()
  }, [])
  return { user, error, loading, refreshUser: fetchUserData }
}

export default useUser
