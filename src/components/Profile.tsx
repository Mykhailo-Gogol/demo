import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import React from 'react'

interface iProps {
  user: User
}

export default function Profile({ user }: iProps) {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const res = confirm('Logout ?')
      if (res) {
        await supabaseClient.auth.signOut()
        router.replace('/welcome')
      }
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div className="flex flex-col items-center">
      <div className="avatar online placeholder mb-5">
        <div className="w-20 rounded-full bg-neutral-focus text-neutral-content">
          <span className="text-xl">
            {user.email?.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </div>

      <span className="block mb-5">{user.email}</span>
      <button onClick={handleLogout} className="btn">
        Logout
      </button>
    </div>
  )
}
