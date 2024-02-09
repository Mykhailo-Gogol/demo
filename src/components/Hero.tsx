import Image from 'next/image'
import React from 'react'

import People from '@/static/welcome/people_unsplash.jpg'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="p-0 mb-20 hero-content flex-col items-start lg:items-center lg:flex-row-reverse lg:justify-between">
      <Image
        src={People}
        className="w-full md:w-3/4 lg:w-2/5 rounded-md shadow-2xl rounded-br-[50px] rounded-tl-[50px] lg:rounded-br-[100px] lg:rounded-tl-[100px]"
        alt="hero"
        width={500}
        height={500}
      />
      <div className="py-4 w-full lg:w-3/5">
        <h1 className="text-5xl font-bold">Box Office News!</h1>
        <p className="py-6 w-full md:w-2/3 text-xl">
          {/* <span className="text-2xl">✨ </span>Complex topics, accurate answers.
          Master AI concepts through AI-powered exercises that help on your
          learning path. */}
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi maxime
          ut quos sequi tempore mollitia.
        </p>
        <Link href={'/profile'} className="btn">
          Get Started
        </Link>
      </div>
    </div>
  )
}
