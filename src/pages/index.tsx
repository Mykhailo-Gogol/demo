import { useEffect } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import Welcome from './welcome'

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.replace('/features')
    }
  }, [user, router])

  return <Welcome />
}
