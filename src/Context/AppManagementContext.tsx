import { ReactNode, createContext, useReducer, useState } from 'react';
import { IPostsListContent, IUserInformation, MainUserAction } from '../@Types';
import { MainUserInfoInitializer, MainUserInfoReducer } from './reducers/mainUserInfoReducer';

export interface IUserManagementContextTypes {
  mainUserInfo: IUserInformation;
  updateMainUserInfo: (user: IUserInformation) => void;
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


  // const [postsList, setPostsList] = useState<IPostsListContent[]>(JSON.parse(localStorage.getItem("@NotePost:PostList")!));
  // const [allUsers, setAllUsers] = useState<IUserInformation[]>(JSON.parse(localStorage.getItem("@NotePost:MainUserInformation")!));

  function updateMainUserInfo(userData: IUserInformation) {
    mainUserInfoDispatch({
      type: 'UPDATE',
      payload: userData
    });

    localStorage.setItem("@NotePost:MainUserInformation", JSON.stringify(userData));
  }

  // function getAllUsers() { }
  // function getPostList() { }

  return (
    <AppManagementContext.Provider value={{ mainUserInfo, updateMainUserInfo }}>
      {children}
    </AppManagementContext.Provider>
  )
}