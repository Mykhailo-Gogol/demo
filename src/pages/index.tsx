import Hero from '@/components/Hero'
import LoginHero from '@/components/LoginHero'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.replace('/app')
    }
  }, [user, router])

  return (
    <section>
      <Hero />
      <LoginHero title="Login now!" />
    </section>
  )
}

// domain test
