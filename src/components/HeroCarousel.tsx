import { features } from '@/utils'
import { FeatureType } from '@/utils/types'
import Image from 'next/image'
import React, { useState } from 'react'

export default function HeroCarousel() {
  const [selected, setSelected] = useState<FeatureType>()

  const handleDialog = (item: FeatureType) => {
    setSelected(item)

    const dialog = document.getElementById(
      'preview-modal'
    ) as HTMLDialogElement | null

    if (dialog) {
      dialog.showModal()
    }
  }
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="preview-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{selected?.title}</h3>
          <p className="py-4">{selected?.subtitle}</p>
        </div>
        <form
          method="dialog"
          className="modal-backdrop bg-base-100 bg-opacity-50"
        >
          <button>close</button>
        </form>
      </dialog>

      <div className="mb-24">
        <div className="py-5 text-center">
          <h1 className="text-3xl">
            Unlock the next level of learning
            {/* Lorem ipsum dolor sit amet. */}
          </h1>
        </div>
        <div className="carousel carousel-center w-full p-0 space-x-4">
          {features.map((item) => (
            <div
              key={item.slug}
              className="carousel-item h-60 w-4/5 md:w-1/3 lg:w-1/5 rounded-box overflow-hidden"
              onClick={() => handleDialog(item)}
            >
              <div className="relative">
                <Image
                  src={item.src}
                  className="object-center object-cover h-full"
                  alt="hero"
                  width={500}
                  height={500}
                />
                <p className="text-xl bg-base-100 bg-opacity-80 text-center absolute w-full p-2 bottom-0 overflow-hidden whitespace-nowrap text-ellipsis">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
