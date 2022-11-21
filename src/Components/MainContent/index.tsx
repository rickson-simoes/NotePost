import { useState, useEffect } from "react";
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { Actionbar } from "../Actionbar";
import { PostForm } from "../PostForm";
import { Post, QuotePost, Repost } from "../PostTypes";

import { IUserInformation, IPostsListContent, IPostContent } from "../../@Types";

import styles from './MainContent.module.css';
import { useLocation } from "react-router-dom";

export function MainContent() {
  const [postListContent, setPostListContent] = useState<IPostsListContent[]>([]);
  const [postListContentFilter, setPostListContentFilter] = useState<IPostsListContent[]>([]);
  const [principalUser, setPrincipalUser] = useState<IUserInformation>();

  function useQuery() {
    const { search } = useLocation();

    return new URLSearchParams(search);
  }

  function filterPostList(mainUser: IUserInformation, postList: IPostsListContent[]) {
    const ids: string[] = [];
    mainUser?.follows.map(val => ids.push(val.id));

    return postList.filter(val => {
      for (const id of ids) {
        if (val.postAuthorID == id) {
          return val;
        }
      }
    });
  }

  let query = useQuery();
  const toggleLowerCase = query.get("toggle")?.toLowerCase();

  useEffect(() => {
    const getLocalStorageMainUser: IUserInformation = JSON.parse(localStorage.getItem("@Posterr:MainUserInformation") as string);
    const getLocalStoragePostListFilter: IPostsListContent[] = JSON.parse(localStorage.getItem("@Posterr:PostList") as string);
    const getLocalStoragePostList: IPostsListContent[] = JSON.parse(localStorage.getItem("@Posterr:PostList") as string);

    setPrincipalUser(getLocalStorageMainUser);
    setPostListContentFilter(getLocalStoragePostListFilter);
    setPostListContent(getLocalStoragePostList);

    if (toggleLowerCase == "following") {
      const postListFiltered = filterPostList(getLocalStorageMainUser, getLocalStoragePostList);

      setPostListContentFilter(postListFiltered);
    }
  }, [query.get("toggle")]);

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

    setPostListContentFilter(() => {
      const newPostListValue = [newPostToInsert, ...postListContentFilter];
      const postListFiltered = filterPostList(principalUser as IUserInformation, newPostListValue);

      if (toggleLowerCase == "following") {
        localStorage.setItem("@Posterr:PostListFilter", JSON.stringify(postListFiltered));
        return postListFiltered;
      }

      localStorage.setItem("@Posterr:PostListFilter", JSON.stringify(newPostListValue));

      return [newPostToInsert, ...postListContentFilter];
    });
  }

  function handleToggle(props: string) {
    if (props == "following") {
      const postListFiltered = filterPostList(principalUser as IUserInformation, postListContent);

      setPostListContentFilter(postListFiltered);
    } else {
      setPostListContentFilter(postListContent);
    }
  }

  function handleQuotePost(props: IPostContent, textContent: string) {
    console.log("teste de props quote post");
    console.log(props);
    console.log(textContent);
    console.log("teste de props quote post");
  }

  return (
    <div>
      <Actionbar onToggleChange={handleToggle} />

      <PostForm onSubmitNewPost={handleSubmitNewPost} />

      <div className={styles.mainContent}>
        {postListContentFilter.map(value => {
          switch (value.postType) {
            case "Post": {
              return <Post
                postAuthor={value.postAuthor}
                postAvatarSrc={value.postAvatarSrc}
                postContent={value.postContent}
                postDate={value.postDate}
                postAuthorID={value.postAuthorID}
                isUserPrincipal={value.postAuthorID === principalUser?.id}
                onQuotePost={handleQuotePost}
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
