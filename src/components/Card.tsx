import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FeatureType } from '@/utils/types'

export default function Card({
  link,
  src,
  slug,
  title,
  subtitle,
  callToActionText,
  tags,
  collapsedMode,
}: FeatureType) {
  return (
    <div className="card shadow-xl rounded-xl overflow-hidden">
      <figure>
        <Image
          src={src}
          className={`object-center object-cover w-full transition-all ease-out duration-500 h-40`}
          width={500}
          height={500}
          alt={title}
        />
      </figure>
      <div
        className={`card-body p-4 ${
          collapsedMode
            ? 'flex flex-row flex-wrap justify-between items-center'
            : ''
        }`}
      >
        <div className="flex-1">
          <h2 className="card-title font-light text-lg">{title}</h2>
          {!collapsedMode && (
            <>
              <p>{subtitle}</p>
              <div className="-ml-1 pt-2 flex items-center">
                {tags.map((item, i) => (
                  <div
                    key={[item, i].join('-')}
                    className="badge badge-neutral opacity-90 mr-2"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <Link
          href={link ? link : '/' + slug}
          className="ml-auto btn btn-neutral font-light"
        >
          {callToActionText}
        </Link>
      </div>
    </div>
  )
}
