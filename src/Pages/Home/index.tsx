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
      const userIds = mainUserInfo.follows.map(user => user.id);
      const findUsersPostsWhoIFollow = postList.filter(post => userIds.includes(post.authorID));

      setPostListFiltered(findUsersPostsWhoIFollow);
    } else {
      setPostListFiltered(deepClonePostList);
    }
  }

  useEffect(() => {
    handleToggleChange(localStorage.getItem("@NotePost:MainContentToggle") as Toggle)
  }, [postList])

  return (
    <>
      <Header />

      <main className={styles.wrapContent}>
        <Sidebar />

        <section>
          <ToggleBar onToggleChange={handleToggleChange} />

          <SubmitContent listOfPosts={postListFiltered} />
        </section>
      </main>
    </>
  )
}