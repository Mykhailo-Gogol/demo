import { PostType } from "@/api/content/contentfulTypes";
import { Asset } from "contentful";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface iProps {
  post: PostType;
}

export default function Post({ post }: iProps) {
  const picture = post.fields.picture.fields.file;

  console.log(picture);

  return (
    <Link
      href={"home" + "/" + post.fields.slug}
      className="card bg-base-100 shadow-xl hover:shadow-2xl overflow-hidden"
    >
      <div>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
        <figure>
          <Image
            className="object-cover h-60"
            src={"https:" + picture?.url}
            alt="Shoes"
            width={picture?.details.image?.width}
            height={picture?.details.image?.height}
          />
        </figure>
      </div>
    </Link>
  );
}
