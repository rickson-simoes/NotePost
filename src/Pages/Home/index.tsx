import { useContext, useEffect, useState } from 'react';

import styles from './Home.module.css';

import { IPostsListContent, Toggle } from "../../@Types";
import { Header } from '../../Components/Header/Header';
import { Sidebar } from '../../Components/Sidebar';
import { SubmitContent } from '../../Components/SubmitContent/SubmitContent';
import { ToggleBar } from '../../Components/Togglebar';
import { AppManagementContext } from '../../Context/AppManagementContext';

export function Home() {
  const { postList, mainUserInfo } = useContext(AppManagementContext);
  const deepClonePostList = JSON.parse(JSON.stringify(postList));
  const [postListFiltered, setPostListFiltered] = useState<IPostsListContent[]>(deepClonePostList)

  function handleToggleChange(value?: Toggle) {
    if (value == Toggle.following) {
      setPostListFiltered([]);
      const userIds: string[] = [];
      mainUserInfo.follows.filter(user => userIds.push(user.id));

      for (const userID of userIds) {
        const findUsersPostsWhoIFollow = postList.filter(post => post.authorID == userID);
        setPostListFiltered((state) => {
          return [...findUsersPostsWhoIFollow, ...state]
        });
      }
    } else {
      setPostListFiltered(deepClonePostList);
    }
  }

  useEffect(() => {
    handleToggleChange(localStorage.getItem("@NotePost:MainContentToggle") as Toggle)
  }, [])

  return (
    <>
      <Header />

      <main className={styles.wrapContent}>
        <Sidebar />

        <section>
          <ToggleBar onToggleChange={handleToggleChange} />

          <SubmitContent postList={postListFiltered} />
        </section>
      </main>
    </>
  )
}