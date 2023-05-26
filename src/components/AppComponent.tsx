import React, { useState } from 'react'
import Card from './Card'

import { appConfig, features } from '@/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWindowMaximize,
  faWindowMinimize,
} from '@fortawesome/free-regular-svg-icons'

export default function AppComponent() {
  const [previewMode, setPreviewMode] = useState(false)
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      <button
        className="hover:bg-secondary transition-all ease-out duration-500"
        onClick={() => setPreviewMode(!previewMode)}
      >
        <FontAwesomeIcon
          icon={previewMode ? faWindowMaximize : faWindowMinimize}
          size={appConfig.iconSize}
        />
      </button>

      {features.map((item, i) => (
        <Card
          previewMode={previewMode}
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
