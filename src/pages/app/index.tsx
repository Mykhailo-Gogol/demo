import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'

import { appConfig, features } from '@/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWindowMaximize,
  faWindowMinimize,
} from '@fortawesome/free-regular-svg-icons'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

export default function App() {
  // Get the value from local storage if it exists

  const collapsed =
    (typeof window !== 'undefined' &&
      localStorage.getItem('box-office-app:collapsed')) ||
    ''
  const [collapsedMode, setPreviewMode] = useState(collapsed === 'true')

  useEffect(() => {
    localStorage.setItem('box-office-app:collapsed', String(collapsedMode))
  }, [collapsedMode])

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace('/')
    }
  }, [user, router])

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      <button
        title={collapsedMode ? 'Expand' : 'Collapse'}
        className=" min-h-[80px] btn h-full"
        onClick={(e) => {
          e.preventDefault()
          setPreviewMode(!collapsedMode)
        }}
      >
        <FontAwesomeIcon
          icon={collapsedMode ? faWindowMaximize : faWindowMinimize}
          size={appConfig.iconSize}
        />
      </button>

      {features.map((item, i) => (
        <Card
          collapsedMode={collapsedMode}
          key={[i, item.slug].join('-')}
          {...item}
        />
      ))}
    </div>
  )
}
