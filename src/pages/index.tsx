import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Welcome from './welcome'

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.replace('/app')
    }
  }, [user, router])

  return <Welcome />
}
