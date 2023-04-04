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

export interface MainUserCOUNT_POST {
  type: 'COUNT_POST',
  payload: IUserInformation
}
export interface MainUserPOST_COUNT {
  type: 'POST_COUNT',
  payload: IUserInformation
}
export interface MainUserNEW_FOLLOW {
  type: 'NEW_FOLLOW',
  payload: {
    newUserFollowed: IUserInfoToFollowUnfollow
  }
}
export interface MainUserREMOVE_FOLLOW {
  type: 'REMOVE_FOLLOW',
  payload: {
    newUserUnfollowed: IUserInfoToFollowUnfollow
  }
}
export type MainUserAction =
  | MainUserCOUNT_POST
  | MainUserPOST_COUNT
  | MainUserNEW_FOLLOW
  | MainUserREMOVE_FOLLOW;


export interface PostListUPDATE {
  type: 'ADD',
  payload: IPostsListContent
}
export type PostListAction = | PostListUPDATE


export interface GetAllUsersADD_FOLLOWER {
  type: 'ADD_FOLLOWER',
  payload: {
    follower: IUserInformation,
    user_followed_id: string
  }
}
export interface GetAllUsersREMOVE_FOLLOWER {
  type: 'REMOVE_FOLLOWER',
  payload: {
    follower: IUserInformation,
    user_unfollowed_id: string
  }
}
export type GetAllUsersAction =
  | GetAllUsersADD_FOLLOWER
  | GetAllUsersREMOVE_FOLLOWER
