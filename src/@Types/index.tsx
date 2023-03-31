export interface IPostsListContentShared {
  sharedAuthorID: string;
  sharedAuthor: string;
  sharedAvatarSrc: string;
  sharedDate: string | "";
  sharedContent: string;
}

export interface IPostsListContent {
  id: string;
  authorID: string;
  author: string;
  avatarSrc: string;
  type: "Post" | "Repost" | "QuotePost";
  date: string;
  content: string;
  shared: IPostsListContentShared;
};

export interface IUserInformation {
  id: string;
  name: string;
  avatar: string;
  backgroundAvatar: string;
  bio: string;
  joined: string;
  follows: IUserInfoToFollowUnfollow[];
  followers: IUserInfoToFollowUnfollow[];
  totalFollowers: number;
  totalFollows: number;
  totalPosts: number;
}

export interface IPostContent {
  author: string;
  avatarSrc: string;
  date: string;
  content?: string;
  isUserPrincipal: boolean;
  authorID?: string;
  onSubmitQuotePost?: (props: IQuotePostContent) => void;
  onSubmitRepost?: (props: IQuotePostContent) => void;
}

export interface IRepostAndQuoteContent {
  author: string;
  avatarSrc: string;
  date: string;
  content?: string;
  isUserPrincipal: boolean;
  authorID?: string;
  sharedAuthor: string;
  sharedAvatarSrc: string;
  sharedDate: string;
  sharedContent: string;
  sharedAuthorID: string;
}

export interface IQuotePostContent {
  content: string;
  sharedAuthorID: string;
  sharedAuthor: string;
  sharedAvatarSrc: string;
  sharedContent: string;
  sharedDate: string;
}

export interface IUserInfoToFollowUnfollow {
  id: string;
  name: string;
  avatar: string;
  backgroundAvatar: string;
  bio: string;
}

export interface MainUserGET {
  type: 'GET',
  payload: IUserInformation
}

export interface MainUserUPDATE {
  type: 'UPDATE',
  payload: IUserInformation
}

export type MainUserAction =
  | MainUserGET
  | MainUserUPDATE
