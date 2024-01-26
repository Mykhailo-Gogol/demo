import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FeatureType } from '@/utils/types'

export default function Card({
  src,
  slug,
  title,
  subtitle,
  callToActionText,
  tags,
  collapsedMode,
}: FeatureType) {
  return (
    <div className="card rounded-xl border-l-2 border-t-2 border-l-primary border-t-secondary border-double">
      <figure>
        <Image
          src={src}
          className={`object-cover w-full transition-all ease-out duration-500 ${
            collapsedMode ? 'h-0' : 'h-32'
          }`}
          width={500}
          alt="alt"
        />
      </figure>
      <div
        className={`card-body shadow-xl p-4 ${
          collapsedMode
            ? 'flex flex-row flex-wrap justify-between items-center'
            : ''
        }`}
      >
        <div className="flex-1">
          <h2 className="card-title">{title}</h2>
          {!collapsedMode && (
            <>
              <p>{subtitle}</p>
              <div className="-ml-2 pt-2 flex items-center">
                {tags.map((item, i) => (
                  <div
                    key={[item, i].join('-')}
                    className="badge badge-ghost opacity-50 mr-2"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <Link href={'/' + slug} className="ml-auto btn">
          {callToActionText}
        </Link>
      </div>
    </div>
  )
}
