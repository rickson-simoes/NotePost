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
  joined: string;
  follows: IUserInformation[];
  followers: IUserInformation[];
  totalFollowers?: number;
  totalFollows?: number;
  totalPosts?: number;
}

export interface IPostContent {
  postAuthor: string;
  postAvatarSrc: string;
  postDate: string;
  postContent?: string;
  isUserPrincipal: boolean;
  postAuthorID?: string;
  onSubmitQuotePost?: (props: IQuotePostContent) => void;
  onSubmitRepost?: (props: IQuotePostContent) => void;
}

export interface IRepostAndQuoteContent {
  postAuthor: string;
  postAvatarSrc: string;
  postDate: string;
  postContent?: string;
  isUserPrincipal: boolean;
  postAuthorID?: string;
  postSharedAuthor: string;
  postSharedAvatarSrc: string;
  postSharedDate: string;
  postSharedContent: string;
  postSharedAuthorID: string;
}

export interface IQuotePostContent {
  postContent: string;
  postSharedAuthorID: string;
  postSharedAuthor: string;
  postSharedAvatarSrc: string;
  postSharedContent: string;
  postSharedDate: string;
}