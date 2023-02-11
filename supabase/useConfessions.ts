import { useEffect, useState } from 'react'
import supabase from './supabase'

export interface Confession {
  id: string
  text: string
  created_at: string
  to_user: string
}
function useConfessions() {
  const [confessions, setConfessions] = useState<Confession[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchConfessions = async () => {
      const { data, error } = await supabase
        .from('confessions')
        .select()
        .eq('to_user', (await supabase.auth.getUser()).data.user.id)
        .order('created_at', { ascending: false })
      if (error) {
        setError(error.message)
        console.log(error)
        setLoading(false)
      }
      setConfessions(data)
      setLoading(false)
    }
    fetchConfessions()
  }, [])
  return { confessions, error, loading }
}

export default useConfessions
