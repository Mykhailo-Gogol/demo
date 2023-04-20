import { EntrySkeletonType, Asset, AssetFields } from "contentful";

export interface Post {
  readonly cta?: string;
  readonly image: ReadonlyArray<Asset>;
  readonly picture: EntrySkeletonType<AssetFields>;
  readonly richText?: { content: any; data: any; nodeType: string };
  readonly slug?: string;
  readonly title: string;
}
export type PostType = EntrySkeletonType<Post>;
