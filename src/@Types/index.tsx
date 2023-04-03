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

export interface MainUserUPDATE {
  type: 'ADDPOST',
  payload: IUserInformation
}
export interface MainUserNEWFOLLOW {
  type: 'NEWFOLLOW',
  payload: {
    newUserFollowed: IUserInfoToFollowUnfollow
  }
}
export interface MainUserREMOVEFOLLOW {
  type: 'REMOVEFOLLOW',
  payload: {
    newUserUnfollowed: IUserInfoToFollowUnfollow
  }
}
export type MainUserAction =
  | MainUserUPDATE
  | MainUserNEWFOLLOW
  | MainUserREMOVEFOLLOW;


export interface PostListUPDATE {
  type: 'ADD',
  payload: IPostsListContent
}
export type PostListAction = | PostListUPDATE


export interface GetAllUsersUPDATEUSER {
  type: 'UPDATE_USER',
  payload: IUserInformation
}
export type GetAllUsersAction = | GetAllUsersUPDATEUSER
