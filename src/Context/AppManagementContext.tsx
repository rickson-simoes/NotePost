import { ReactNode, createContext, useEffect, useReducer } from 'react';
import { IPostsListContent, IUserInfoToFollowUnfollow, IUserInformation } from '../@Types';
import { MainUserInfoInitializer, MainUserInfoReducer } from './reducers/mainUserInfoReducer';
import { PostListInitializer, PostListReducer } from './reducers/postListReducer';
import { GetAllUsersInitializer, GetAllUsersReducer } from './reducers/getAllUsersReducer';

export interface IUserManagementContextTypes {
  mainUserInfo: IUserInformation;
  CountPostMainUserInfo: () => void;
  addNewFollowerMainUser: (user: IUserInfoToFollowUnfollow) => void;
  removeFollowerMainUser: (user: IUserInfoToFollowUnfollow) => void;
  postList: IPostsListContent[],
  addPostList: (postContent: IPostsListContent) => void;
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

  function CountPostMainUserInfo() {
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

  useEffect(() => {
    const mainUser = JSON.stringify(mainUserInfo);

    localStorage.setItem("@NotePost:MainUserInformation", mainUser);
  }, [mainUserInfo])

  useEffect(() => {
    const posts = JSON.stringify(postList);

    localStorage.setItem("@NotePost:PostList", posts);
  }, [postList])

  return (
    <AppManagementContext.Provider value={{ mainUserInfo, CountPostMainUserInfo, addNewFollowerMainUser, removeFollowerMainUser, postList, addPostList }}>
      {children}
    </AppManagementContext.Provider>
  )
}