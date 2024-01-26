import React, { useEffect, useState } from 'react'
import Card from './Card'

import { appConfig, features } from '@/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWindowMaximize,
  faWindowMinimize,
} from '@fortawesome/free-regular-svg-icons'

export default function AppComponent() {
  // Get the value from local storage if it exists

  const collapsed =
    (typeof window !== 'undefined' &&
      localStorage.getItem('box-office-app:collapsed')) ||
    ''
  const [collapsedMode, setPreviewMode] = useState(collapsed === 'true')

  useEffect(() => {
    localStorage.setItem('box-office-app:collapsed', String(collapsedMode))
  }, [collapsedMode])

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      <button
        title={collapsedMode ? 'Expand' : 'Collapse'}
        className="min-h-[5rem] active:bg-primary transition-all ease-out duration-500"
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
          src={item.src}
          title={item.title}
          subtitle={item.subtitle}
          callToActionText={item.callToActionText}
          slug={item.slug}
          tags={item.tags}
          settings={item.settings}
          label={item.label}
        />
      ))}
    </div>
  )
}
