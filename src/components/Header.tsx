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
    { link: user ? '/features' : '/', text: 'Home' },
    { link: '/profile', text: 'Profile', badge: user ? false : true },
  ]

  return (
    <header className="navbar pt-5 px-0 mb-10">
      <div className="flex-1">
        <Link href={user ? '/features' : '/'} className="btn">
          Made with
          <FontAwesomeIcon
            icon={faHeart}
            size={appConfig.iconSize}
            width={appConfig.iconWidth}
            height={appConfig.iconHeight}
          />
        </Link>
      </div>

      <div className="md:px-10 hidden md:block">
        <Link href="/how-it-works" className="mr-3 md:mr-5 hover:underline">
          How it works
        </Link>
        <Link href="/about" className="mr-3 md:mr-5 hover:underline">
          About
        </Link>
        <Link href="/settings" className="hover:underline">
          Settings
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-circle avatar overflow-hidden"
            onClick={() => setVisible(true)}
          >
            {/* <div className="w-10 rounded-full"> */}
            {user?.email ? (
              <span className="uppercase">{user?.email.slice(0, 2)}</span>
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                size={appConfig.iconSize}
                width={appConfig.iconWidth}
                height={appConfig.iconHeight}
              />
            )}
            {/* </div> */}
          </label>
          {visible && (
            <ul
              tabIndex={0}
              className="w-80 mt-3 p-4 shadow menu dropdown-content rounded-xl relative z-20 glass"
            >
              {authLinks.map(({ link, text, badge }) => (
                <li key={link} className="mb-1">
                  <Link
                    href={link}
                    className="py-4 text-sm active:bg-primary"
                    onClick={() => setVisible(false)}
                  >
                    {text}
                    {badge && <span className="badge badge-ghost">New</span>}
                  </Link>
                </li>
              ))}

              <div className="block md:hidden">
                <li className="mb-1">
                  <Link
                    href="/how-it-works"
                    className="py-4 text-sm active:bg-primary"
                    onClick={() => setVisible(false)}
                  >
                    How it works
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    href="/about"
                    className="py-4 text-sm active:bg-primary"
                    onClick={() => setVisible(false)}
                  >
                    About
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    href="/settings"
                    className="py-4 text-sm active:bg-primary"
                    onClick={() => setVisible(false)}
                  >
                    Settings
                  </Link>
                </li>
              </div>

              {user && (
                <li className=" text-sm" onClick={() => setVisible(false)}>
                  <button
                    className="py-4 bg-error text-error-content"
                    onClick={handleLogout}
                  >
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
