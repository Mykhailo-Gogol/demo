import client from "./contentful";

import { PostType } from "./contentfulTypes";

export async function getPosts() {
  const posts = await client.getEntries<PostType>({
    content_type: "post",
  });

  return posts.items;
}
