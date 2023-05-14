import React from "react";

import Image from "next/image";
import Link from "next/link";
import { FeatureType } from "@/utils/types";

export default function Card({
  src,
  slug,
  title,
  subtitle,
  callToActionText,
  tags,
}: FeatureType) {
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
      <div className="card-body shadow-xl p-4">
        <h2 className="card-title">{title}</h2>
        <p>{subtitle}</p>
        <div className="-ml-2 pt-2 flex items-center">
          {tags.map((item, i) => (
            <div
              key={[item, i].join("-")}
              className="badge badge-ghost opacity-50 mr-2"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="card-actions justify-end pt-2">
          <Link href={"/" + slug} className="btn btn-accent">
            {callToActionText}
          </Link>
        </div>
      </div>
    </div>
  );
}
