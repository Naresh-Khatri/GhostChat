import { Session, User } from '@supabase/supabase-js'
import React, { createContext, useState } from 'react'

export const authContext = createContext<{
  user: User | null
  session: Session | null
}>({
  user: null,
  session: null,
})

function AuthContextProvider() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const
  return <authContext.Provider value={{ session, user }}></authContext.Provider>
}

export default AuthContextProvider
