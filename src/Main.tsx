import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import allUsers from '../src/LocalStorageContents/PosterrAllUsers.json';
import mainUserInfo from '../src/LocalStorageContents/PosterrMainUserInformation.json';
import allPostsFromList from '../src/LocalStorageContents/PosterrPostList.json';

const mainUserInformation = localStorage.getItem("@Posterr:MainUserInformation");
const allUsersFromTheApplication = localStorage.getItem("@Posterr:AllUsers");
const allPostsFromPostList = localStorage.getItem("@Posterr:PostList");
const toggleButton = localStorage.getItem("@Posterr:MainContentToggle");

if (mainUserInformation == null &&
  allUsersFromTheApplication == null &&
  allPostsFromPostList == null &&
  toggleButton == null) {

  localStorage.setItem("@Posterr:MainContentToggle", "all");
  localStorage.setItem("@Posterr:MainUserInformation", JSON.stringify(mainUserInfo));
  localStorage.setItem("@Posterr:AllUsers", JSON.stringify(allUsers));
  localStorage.setItem("@Posterr:PostList", JSON.stringify(allPostsFromList));
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)