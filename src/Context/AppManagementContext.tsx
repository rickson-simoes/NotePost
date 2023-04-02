import { ReactNode, createContext, useEffect, useReducer } from 'react';
import { IPostsListContent, IUserInfoToFollowUnfollow, IUserInformation } from '../@Types';
import { MainUserInfoInitializer, MainUserInfoReducer } from './reducers/mainUserInfoReducer';
import { PostListInitializer, PostListReducer } from './reducers/postListReducer';

export interface IUserManagementContextTypes {
  mainUserInfo: IUserInformation;
  AddPostMainUserInfo: (user: IUserInformation) => void;
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
  //@WORKAROUND - CHANGE STATES TO REDUCERS
  const [mainUserInfo, mainUserInfoDispatch] = useReducer(
    MainUserInfoReducer,
    {} as IUserInformation,
    MainUserInfoInitializer);

  const [postList, postListDispatch] = useReducer(
    PostListReducer,
    {} as IPostsListContent[],
    PostListInitializer);

  function AddPostMainUserInfo(userData: IUserInformation) {
    mainUserInfoDispatch({
      type: 'ADDPOST',
      payload: userData
    });
  }

  function addNewFollowerMainUser(user: IUserInfoToFollowUnfollow) {
    mainUserInfoDispatch({
      type: 'NEWFOLLOW',
      payload: {
        newUserFollowed: user
      }
    })
  }

  function removeFollowerMainUser(user: IUserInfoToFollowUnfollow) {
    mainUserInfoDispatch({
      type: 'REMOVEFOLLOW',
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

  // const [allUsers, setAllUsers] = useState<IUserInformation[]>(JSON.parse(localStorage.getItem("@NotePost:MainUserInformation")!));
  // function getAllUsers() { }

  useEffect(() => {
    const mainUser = JSON.stringify(mainUserInfo);

    localStorage.setItem("@NotePost:MainUserInformation", mainUser);
  }, [mainUserInfo])

  useEffect(() => {
    const posts = JSON.stringify(postList);

    localStorage.setItem("@NotePost:PostList", posts);
  }, [postList])

  return (
    <AppManagementContext.Provider value={{ mainUserInfo, AddPostMainUserInfo, addNewFollowerMainUser, removeFollowerMainUser, postList, addPostList }}>
      {children}
    </AppManagementContext.Provider>
  )
}