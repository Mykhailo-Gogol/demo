import React from "react";

import first from "@/static/carousel/first.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Card() {
  return (
    <div className="card rounded-none">
      <figure>
        <Image
          src={first}
          className="object-cover"
          width={1000}
          height={1000}
          alt="alt"
        />
      </figure>
      <div className="card-body shadow-xl">
        <h2 className="card-title">Text Completion!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <Link href="/text-completion" className="btn btn-ghost">
            Let`s go
          </Link>
        </div>
      </div>
    </div>
  );
}