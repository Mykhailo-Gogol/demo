import React from 'react'

import Link from 'next/link'

export default function Hero() {
  return (
    <div className="p-0 mb-20 hero-content flex-col items-start lg:items-center lg:flex-row-reverse lg:justify-between max-w-full">
      <div className="diff aspect-square md:aspect-video w-full md:w-3/4 lg:w-2/3 rounded-md shadow-2xl">
        <div className="diff-item-1">
          <div className="px-10 bg-base-100 text-3xl font-black grid place-content-center">
            Learn without AI!
          </div>
        </div>
        <div className="diff-item-2">
          <div className="flexpx-10 bg-primary text-3xl text-white font-black grid place-content-center">
            Learn with AI! ✨
          </div>
        </div>
        <div className="diff-resizer"></div>
      </div>
      <div className="py-4 w-full lg:w-2/3">
        <h1 className="text-5xl font-bold [&::selection]:text-base-content relative col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text [-webkit-text-fill-color:transparent] [&::selection]:bg-blue-700/20 [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]">
          Box Office News!
        </h1>
        <p className="py-6 w-full md:w-2/3 text-xl">
          Master AI concepts through AI-powered exercises that help on your
          learning path.
          {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi maxime
          ut quos sequi tempore mollitia. */}
        </p>
        <Link href={'/profile'} className="btn btn-neutral">
          Get Started
        </Link>
      </div>
    </div>
  )
}
