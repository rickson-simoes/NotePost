import { useState, useEffect } from "react";
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { Actionbar } from "../Actionbar";
import { PostForm } from "../PostForm";
import { Post, QuotePost, Repost } from "../PostTypes";

import { IUserInformation, IPostsListContent } from "../../@Types";

import styles from './MainContent.module.css';

interface IMainContentConfiguration {
  isPostSomethingButtonEnabled: boolean;
  isToggleAllPostsEnabled: boolean;
}

export function MainContent() {
  const [postListContent, setPostListContent] = useState<IPostsListContent[]>([]);
  const [principalUser, setPrincipalUser] = useState<IUserInformation>();
  const [isPostSomethingButtonEnabled, setIsPostSomethingButtonEnabled] = useState<boolean>(true);
  const [isToggleEnabled, setisToggleEnabled] = useState<boolean>(true);

  useEffect(() => {
    const getLocalStoragePostList = JSON.parse(localStorage.getItem("@Posterr:PostList") as string);
    const getLocalStorageMainUser = JSON.parse(localStorage.getItem("@Posterr:MainUserInformation") as string);
    const getLocalStoragePostSomethingButton = JSON.parse(localStorage.getItem("@Posterr:MainContentPostSomethingButton") as string);
    const getLocalStorageToggle = JSON.parse(localStorage.getItem("@Posterr:MainContentToggle") as string);

    setPostListContent(getLocalStoragePostList);
    setPrincipalUser(getLocalStorageMainUser);
    setIsPostSomethingButtonEnabled(getLocalStoragePostSomethingButton);
    setisToggleEnabled(getLocalStorageToggle);
  }, []);

  function handleSubmitNewPost(text: string) {
    const newPostToInsert: IPostsListContent = {
      postId: uuidv4(),
      postAuthorID: principalUser?.id!,
      postAuthor: principalUser?.name!,
      postAvatarSrc: principalUser?.avatar!,
      postContent: text,
      postDate: format(new Date(Date.now()), "yyyy-LL-dd HH:mm:ss"),
      postShared: {
        postSharedAuthor: "",
        postSharedAuthorID: "",
        postSharedAvatarSrc: "",
        postSharedContent: "",
        postSharedDate: ""
      },
      postType: "Post",
    };

    setPostListContent(() => {
      const newPostListValue = [newPostToInsert, ...postListContent];
      localStorage.setItem("@Posterr:PostList", JSON.stringify(newPostListValue));

      return [newPostToInsert, ...postListContent];
    });
  }

  function handlePostSomethingButton(props: boolean) {
    setIsPostSomethingButtonEnabled(state => {
      localStorage.setItem("@Posterr:MainContentPostSomethingButton", JSON.stringify(props))
      return state = props;
    })
  }

  function handleToggleAllPostsFollowingEnabled(props: boolean) {
    setisToggleEnabled(state => {
      localStorage.setItem("@Posterr:MainContentToggle", JSON.stringify(props))
      return state = props;
    })
  }

  return (
    <div>
      <Actionbar isButtonPostSomethingEnabled={handlePostSomethingButton} isToggleAllPostsFollowingPressed={handleToggleAllPostsFollowingEnabled} />

      {isPostSomethingButtonEnabled && <PostForm onSubmitNewPost={handleSubmitNewPost} />}

      <div className={styles.mainContent}>
        {postListContent.map(value => {
          switch (value.postType) {
            case "Post": {
              return <Post
                postAuthor={value.postAuthor}
                postAvatarSrc={value.postAvatarSrc}
                postContent={value.postContent}
                postDate={value.postDate}
                isUserPrincipal={value.postAuthorID === principalUser?.id}
                key={value.postId}
              />
            }

            case "Repost": {
              return <Repost
                postAuthor={value.postAuthor}
                postAvatarSrc={value.postAvatarSrc}
                postDate={value.postDate}
                isUserPrincipal={value.postShared.postSharedAuthorID === principalUser?.id}
                postSharedAuthor={value.postShared.postSharedAuthor}
                postSharedAvatarSrc={value.postShared.postSharedAvatarSrc}
                postSharedContent={value.postShared.postSharedContent}
                postSharedDate={value.postShared.postSharedDate}
                key={value.postId}
              />
            }

            case "QuotePost": {
              return <QuotePost
                postAuthor={value.postAuthor}
                postAvatarSrc={value.postAvatarSrc}
                postContent={value.postContent}
                postDate={value.postDate}
                isUserPrincipal={value.postShared.postSharedAuthorID === principalUser?.id}
                postSharedAuthor={value.postShared.postSharedAuthor}
                postSharedAvatarSrc={value.postShared.postSharedAvatarSrc}
                postSharedContent={value.postShared.postSharedContent}
                postSharedDate={value.postShared.postSharedDate}
                key={value.postId}
              />
            }
          }
        })}
      </div>

    </div>
  )
}
