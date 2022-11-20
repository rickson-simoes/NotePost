export interface IPostsListContentShared {
  postSharedAuthorID: string;
  postSharedAuthor: string;
  postSharedAvatarSrc: string;
  postSharedDate: string | "";
  postSharedContent: string;
}

export interface IPostsListContent {
  postId: string;
  postAuthorID: string;
  postAuthor: string;
  postAvatarSrc: string;
  postType: "Post" | "Repost" | "QuotePost";
  postDate: string;
  postContent: string;
  postShared: IPostsListContentShared;
};

export interface IUserInformation {
  id: string;
  name: string;
  avatar: string;
  backgroundAvatar: string;
  bio: string;
  follows: IUserInformation[];
  followers: IUserInformation[];
}