import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

interface iProps {
  image: StaticImageData;
}

export default function Card({ image }: iProps) {
  return (
    <Link
      href={"#"}
      className="card bg-base-100 h-80 shadow-xl hover:shadow-2xl h"
    >
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
      </div>
      <figure>
        <Image src={image} alt="Shoes" width={1000} />
      </figure>
    </Link>
  );
}
