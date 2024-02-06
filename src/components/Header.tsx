import React, { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import { appConfig } from '@/utils'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

export default function Header() {
  const user = useUser()
  const supabaseClient = useSupabaseClient()

  const router = useRouter()

  const [visible, setVisible] = useState(false)

  const handleLogout = async () => {
    try {
      const res = confirm('Logout?')
      if (res) {
        await supabaseClient.auth.signOut()
        router.replace('/welcome')
      }
    } catch (e) {
      console.error(e)
    }
  }

  const authLinks = [
    { link: '/', text: user ? 'App' : 'Welcome', badge: user ? true : false },
    {
      link: '/profile',
      text: user ? 'Profile' : 'Login',
      badge: user ? false : true,
    },
  ]

  return (
    <header className="navbar pt-5 px-0">
      <div className="flex-1">
        <Link href={'/'} className="btn p-2 w-12 lg:w-20">
          <FontAwesomeIcon
            icon={faHeart}
            size={appConfig.iconSize}
            width={appConfig.iconWidth}
            height={appConfig.iconHeight}
          />
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control w-40 md:w-64">
          <input
            type="text"
            placeholder="search"
            className="input input-bordered"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn p-2 w-12 lg:w-20"
            onClick={() => setVisible(true)}
          >
            <div>
              <FontAwesomeIcon
                icon={faUser}
                size={appConfig.iconSize}
                width={appConfig.iconWidth}
                height={appConfig.iconHeight}
              />
            </div>
          </label>
          {visible && (
            <ul
              tabIndex={0}
              className="bg-neutral w-80 mt-3 p-4 shadow menu dropdown-content rounded-xl"
            >
              {authLinks.map(({ link, text, badge }) => (
                <li key={link} className="mb-1">
                  <Link
                    href={link}
                    className="py-4 font-light text-sm active:bg-secondary active:text-inherit"
                    onClick={() => setVisible(false)}
                  >
                    {text}
                    {badge && <span className="badge badge-ghost">New</span>}
                  </Link>
                </li>
              ))}

              {user && (
                <li
                  className="font-light text-sm"
                  onClick={() => setVisible(false)}
                >
                  <button className="py-4" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </header>
  )
}
