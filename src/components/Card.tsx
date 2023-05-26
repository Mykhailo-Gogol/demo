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
  previewMode,
}: FeatureType) {
  return (
    <div className="card rounded-none bg-accent">
      <figure>
        <Image
          src={src}
          className={`object-cover w-full transition-all ease-out duration-500 ${
            previewMode ? 'h-0' : 'h-32'
          }`}
          width={500}
          alt="alt"
        />
      </figure>
      <div
        className={`card-body shadow-xl p-4 transition-all ease-out duration-500 ${
          previewMode ? 'flex flex-row justify-between items-center' : ''
        }`}
      >
        <div>
          <h2 className="card-title">{title}</h2>
          <p
            className={`transition-all ease-out duration-500 ${
              previewMode ? 'h-0 opacity-0' : ''
            }`}
          >
            {subtitle}
          </p>
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
        </div>

        <Link
          href={'/' + slug}
          className={`ml-auto btn btn-accent ${previewMode ? '' : ''}`}
        >
          {callToActionText}
        </Link>
      </div>
    </div>
  )
}
