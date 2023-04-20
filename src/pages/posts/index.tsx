import React from "react";
import { getPosts } from "@/api/content/controlers";
import { PostType } from "@/api/content/contentfulTypes";
import Post from "@/components/Post";

export async function getServerSideProps() {
  const posts = await getPosts();
  return {
    props: { posts },
  };
}

interface iProps {
  posts: PostType[];
}

export default function Posts({ posts }: iProps) {
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Post key={post.fields.slug} post={post} />
      ))}
    </ul>
  );
}
