import { features } from '@/utils'
import Image from 'next/image'
import React from 'react'

export default function HeroCarousel() {
  return (
    <div className="mb-24">
      <div className="py-5 text-center">
        <h1 className="text-2xl">
          {/* Unlock the Next Level of learning */}
          Lorem ipsum dolor sit amet.
        </h1>
      </div>
      <div className="carousel carousel-center w-full p-0 space-x-4 md:rounded-box">
        {features.map((item) => (
          <div
            key={item.slug}
            className="carousel-item h-60 w-4/5 md:w-1/3 lg:w-1/5"
          >
            <div className="relative overflow-hidden rounded-box">
              <Image
                src={item.src}
                className="object-center object-cover h-full"
                alt="hero"
                width={500}
                height={500}
              />
              <p className="text-xl text-center absolute w-full bg-neutral p-2 bottom-0 overflow-x-hidden whitespace-nowrap text-ellipsis">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
