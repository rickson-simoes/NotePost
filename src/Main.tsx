import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import allUsers from '../src/LocalStorageContents/NotePostAllUsers.json';
import mainUserInfo from '../src/LocalStorageContents/NotePostMainUserInformation.json';
import allPostsFromList from '../src/LocalStorageContents/NotePostPostList.json';

const mainUserInformation = localStorage.getItem("@NotePost:MainUserInformation");
const allUsersFromTheApplication = localStorage.getItem("@NotePost:AllUsers");
const allPostsFromPostList = localStorage.getItem("@NotePost:PostList");
const toggleButton = localStorage.getItem("@NotePost:MainContentToggle");

if (mainUserInformation == null &&
  allUsersFromTheApplication == null &&
  allPostsFromPostList == null &&
  toggleButton == null) {

  localStorage.setItem("@NotePost:MainContentToggle", "all");
  localStorage.setItem("@NotePost:MainUserInformation", JSON.stringify(mainUserInfo));
  localStorage.setItem("@NotePost:AllUsers", JSON.stringify(allUsers));
  localStorage.setItem("@NotePost:PostList", JSON.stringify(allPostsFromList));
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)