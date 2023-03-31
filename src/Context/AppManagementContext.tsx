import { ReactNode, createContext, useState } from 'react';
import { IPostsListContent, IUserInformation } from '../@Types';

export interface IUserManagementContextTypes {
  getMainUserInfo: () => void;
  getPostList: () => void;
  getAllUsers: () => void;
}

export interface IAppManagementContextProvider {
  children: ReactNode;
}

const AppManagementContext = createContext({} as IUserManagementContextTypes);


export function AppManagementContextProvider({ children }: IAppManagementContextProvider) {
  //@WORKAROUND - CHANGE STATES TO REDUCERS
  const [mainUserInformation, setMainUserInformation] = useState<IUserInformation>(JSON.parse(localStorage.getItem("@NotePost:MainUserInformation")!));
  const [postsList, setPostsList] = useState<IPostsListContent[]>(JSON.parse(localStorage.getItem("@NotePost:PostList")!));
  const [allUsers, setAllUsers] = useState<IUserInformation[]>(JSON.parse(localStorage.getItem("@NotePost:MainUserInformation")!));

  function getMainUserInfo() { }
  function getAllUsers() { }
  function getPostList() { }

  return (
    <AppManagementContext.Provider value={{ getMainUserInfo, getAllUsers, getPostList }}>
      {children}
    </AppManagementContext.Provider>
  )
}