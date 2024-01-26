import Image from 'next/image'
import React from 'react'

import People from '@/static/welcome/people_unsplash.jpg'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="p-0 mb-10 hero-content flex-col items-start lg:items-center lg:flex-row-reverse">
      <Image
        src={People}
        className="max-w-full rounded-md shadow-2xl lg:rounded-br-[100px]"
        alt="hero"
        width={500}
        height={300}
      />
      <div>
        <h1 className="text-5xl font-bold">Box Office News!</h1>
        <p className="py-6 lg:w-1/2">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
        <Link href={'/profile'} className="btn">
          Get Started
        </Link>
      </div>
    </div>
  )
}
