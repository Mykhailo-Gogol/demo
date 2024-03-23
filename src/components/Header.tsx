import React from 'react'
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
        <label
          htmlFor="drawer-menu"
          className="drawer-button btn btn-circle avatar overflow-hidden"
        >
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
        </label>

        {/* drawer */}
        <div className="drawer drawer-end z-10">
          <input id="drawer-menu" type="checkbox" className="drawer-toggle" />
          <div className="drawer-side">
            <label
              htmlFor="drawer-menu"
              aria-label="close sidebar"
              className="drawer-overlay"
            />
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {authLinks.map(({ link, text, badge }) => (
                <li key={link} className="mb-1">
                  <label
                    htmlFor="drawer-menu"
                    className="drawer-button py-4 text-sm active:bg-primary"
                    onClick={() => router.push(link)}
                  >
                    {text}
                    {badge && <span className="badge badge-ghost">New</span>}
                  </label>
                </li>
              ))}

              <div className="block md:hidden">
                <li className="mb-1">
                  <label
                    htmlFor="drawer-menu"
                    className="drawer-button py-4 text-sm active:bg-primary"
                    onClick={() => router.push('/how-it-works')}
                  >
                    How it works
                  </label>
                </li>
                <li className="mb-1">
                  <label
                    htmlFor="drawer-menu"
                    className="py-4 text-sm active:bg-primary"
                    onClick={() => router.push('/about')}
                  >
                    About
                  </label>
                </li>
                <li className="mb-1">
                  <label
                    htmlFor="drawer-menu"
                    className="py-4 text-sm active:bg-primary"
                    onClick={() => router.push('/settings')}
                  >
                    Settings
                  </label>
                </li>
              </div>

              {user && (
                <li className=" text-sm">
                  <button
                    className="py-4 bg-error text-error-content"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
