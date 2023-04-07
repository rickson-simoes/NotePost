import { ReactNode, createContext, useEffect, useReducer } from 'react';
import { IPostsListContent, IUserInfoToFollowUnfollow, IUserInformation } from '../@Types';
import { MainUserInfoInitializer, MainUserInfoReducer } from './reducers/mainUserInfoReducer';
import { PostListInitializer, PostListReducer } from './reducers/postListReducer';
import { GetAllUsersInitializer, GetAllUsersReducer } from './reducers/getAllUsersReducer';

export interface IUserManagementContextTypes {
  mainUserInfo: IUserInformation;
  countPostMainUserInfo: () => void;
  addNewFollowerMainUser: (user: IUserInfoToFollowUnfollow) => void;
  removeFollowerMainUser: (user: IUserInfoToFollowUnfollow) => void;
  postList: IPostsListContent[],
  addPostList: (postContent: IPostsListContent) => void;
  getAllUsers: IUserInformation[],
  addFollowerGetAllUsers: (followed_id: string) => void;
  removeFollowerGetAllUsers: (followed_id: string) => void;
}

export interface IAppManagementContextProvider {
  children: ReactNode;
}

export const AppManagementContext = createContext({} as IUserManagementContextTypes);

export function AppManagementContextProvider({ children }: IAppManagementContextProvider) {
  const [mainUserInfo, mainUserInfoDispatch] = useReducer(
    MainUserInfoReducer,
    {} as IUserInformation,
    MainUserInfoInitializer);

  const [postList, postListDispatch] = useReducer(
    PostListReducer,
    {} as IPostsListContent[],
    PostListInitializer);

  const [getAllUsers, getAllUsersDispatch] = useReducer(
    GetAllUsersReducer,
    {} as IUserInformation[],
    GetAllUsersInitializer);

  function countPostMainUserInfo() {
    mainUserInfoDispatch({
      type: 'COUNT_POST',
      payload: mainUserInfo,
    });
  }

  function addNewFollowerMainUser(user: IUserInfoToFollowUnfollow) {
    mainUserInfoDispatch({
      type: 'NEW_FOLLOW',
      payload: {
        newUserFollowed: user
      }
    })
  }

  function removeFollowerMainUser(user: IUserInfoToFollowUnfollow) {
    mainUserInfoDispatch({
      type: 'REMOVE_FOLLOW',
      payload: {
        newUserUnfollowed: user
      }
    })
  }

  function addPostList(postContent: IPostsListContent) {
    postListDispatch({
      type: 'ADD',
      payload: postContent
    })
  }

  function addFollowerGetAllUsers(followed_id: string) {
    getAllUsersDispatch({
      type: 'ADD_FOLLOWER',
      payload: {
        follower: mainUserInfo,
        user_followed_id: followed_id
      }
    })
  }

  function removeFollowerGetAllUsers(followed_id: string) {
    getAllUsersDispatch({
      type: 'REMOVE_FOLLOWER',
      payload: {
        follower: mainUserInfo,
        user_unfollowed_id: followed_id
      }
    })
  }

  useEffect(() => {
    const mainUserStringify = JSON.stringify(mainUserInfo);

    localStorage.setItem("@NotePost:MainUserInformation", mainUserStringify);
  }, [mainUserInfo])

  useEffect(() => {
    const postsStringify = JSON.stringify(postList);

    localStorage.setItem("@NotePost:PostList", postsStringify);
  }, [postList])

  useEffect(() => {
    const getAllUsersStringify = JSON.stringify(getAllUsers);

    localStorage.setItem("@NotePost:AllUsers", getAllUsersStringify);
  }, [getAllUsers])

  return (
    <AppManagementContext.Provider value={{ mainUserInfo, countPostMainUserInfo, addNewFollowerMainUser, removeFollowerMainUser, postList, addPostList, getAllUsers, addFollowerGetAllUsers, removeFollowerGetAllUsers }}>
      {children}
    </AppManagementContext.Provider>
  )
}