import React from "react";

import Image from "next/image";
import Link from "next/link";
import { ImageProps } from "next/image";

interface iProps {
  src: ImageProps["src"];
  slug: string;
  title: string;
  subtitle: string;
  callToActionText: string;
}

export default function Card({
  src,
  slug,
  title,
  subtitle,
  callToActionText,
}: iProps) {
  return (
    <div className="card rounded-none bg-accent">
      <figure>
        <Image
          src={src}
          className="object-cover h-32 w-full"
          width={500}
          alt="alt"
        />
      </figure>
      <div className="card-body shadow-xl">
        <h2 className="card-title">{title}</h2>
        <p>{subtitle}</p>
        <div className="card-actions justify-end pt-4">
          <Link href={"/" + slug} className="btn btn-accent">
            {callToActionText}
          </Link>
        </div>
      </div>
    </div>
  );
}
