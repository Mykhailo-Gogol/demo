import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import Welcome from './welcome'

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

  useEffect(() => {
    if (user) {
      router.replace('/features')
    }
  }, [user, router])

  return <Welcome />
}
