import { ReactNode, createContext, useReducer, useState } from 'react';
import { IPostsListContent, IUserInformation, MainUserAction } from '../@Types';
import { MainUserInfoInitializer, MainUserInfoReducer } from './reducers/mainUserInfoReducer';
import { PostListInitializer, PostListReducer } from './reducers/postListReducer';

export interface IUserManagementContextTypes {
  mainUserInfo: IUserInformation;
  updateMainUserInfo: (user: IUserInformation) => void;
  postList: IPostsListContent[],
  addPostList: (postContent: IPostsListContent) => void;
}

export interface IAppManagementContextProvider {
  children: ReactNode;
}

export const AppManagementContext = createContext({} as IUserManagementContextTypes);

export function AppManagementContextProvider({ children }: IAppManagementContextProvider) {
  //@WORKAROUND - CHANGE STATES TO REDUCERS
  const [mainUserInfo, mainUserInfoDispatch] = useReducer(
    MainUserInfoReducer,
    {} as IUserInformation,
    MainUserInfoInitializer);

  const [postList, postListDispatch] = useReducer(
    PostListReducer,
    {} as IPostsListContent[],
    PostListInitializer);

  function updateMainUserInfo(userData: IUserInformation) {
    mainUserInfoDispatch({
      type: 'UPDATE',
      payload: userData
    });

    localStorage.setItem("@NotePost:MainUserInformation", JSON.stringify(userData));
  }

  function addPostList(postContent: IPostsListContent) {
    postListDispatch({
      type: 'ADD',
      payload: postContent
    })

    const getAllPostListFromLocalStorage = JSON.parse(localStorage.getItem("@NotePost:PostList")!);

    localStorage.setItem("@NotePost:PostList", JSON.stringify([postContent, ...getAllPostListFromLocalStorage]));
  }

  // const [allUsers, setAllUsers] = useState<IUserInformation[]>(JSON.parse(localStorage.getItem("@NotePost:MainUserInformation")!));
  // function getAllUsers() { }

  return (
    <AppManagementContext.Provider value={{ mainUserInfo, updateMainUserInfo, postList, addPostList }}>
      {children}
    </AppManagementContext.Provider>
  )
}