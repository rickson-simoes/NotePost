import { useState, useEffect } from "react";
import { format, isToday } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { Actionbar } from "../Actionbar";
import { PostForm } from "../PostForm";
import { Post, QuotePost, Repost } from "../PostTypes";

import { IUserInformation, IPostsListContent, IPostContent, IQuotePostContent } from "../../@Types";

import styles from './MainContent.module.css';
import { useLocation } from "react-router-dom";

export function MainContent() {
  const [postListContent, setPostListContent] = useState<IPostsListContent[]>([]);
  const [postListContentFilter, setPostListContentFilter] = useState<IPostsListContent[]>([]);
  const [principalUser, setPrincipalUser] = useState<IUserInformation>();
  const [isUserAllowedToPost, setIsUserAllowedToPost] = useState<boolean>(true);

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
    const getLocalStorageMainUser: IUserInformation = JSON.parse(localStorage.getItem("@NotePost:MainUserInformation") as string);
    const getLocalStoragePostList: IPostsListContent[] = JSON.parse(localStorage.getItem("@NotePost:PostList") as string);

    setPrincipalUser(getLocalStorageMainUser);

    setPostListContentFilter(getLocalStoragePostList);
    setPostListContent(getLocalStoragePostList);

    if (toggleLowerCase == "following") {
      const postListFiltered = filterPostList(getLocalStorageMainUser, getLocalStoragePostList);

      setPostListContentFilter(postListFiltered);
    }

  }, [query.get("toggle")]);


  function isFivePostsAlreadyReached() {
    const todayUserPosts = postListContent.filter(val => {
      const toDate = new Date(val.postDate);
      if (isToday(toDate) && principalUser?.id == val.postAuthorID) {
        return val;
      }
    });

    const countTodayUserPosts = todayUserPosts.length;

    if (countTodayUserPosts === 5) {
      setIsUserAllowedToPost(false);
      return true;
    }

    return false;
  }


  function handleToggle(props: string) {
    if (props == "following") {
      const postListFiltered = filterPostList(principalUser as IUserInformation, postListContent);

      setPostListContent(postListFiltered);
    } else {
      setPostListContent(postListContent);
    }
  }

  function submitContentToPostList(postTextContent: string, postType: "QuotePost" | "Post" | "Repost", postListQuoteContent?: IQuotePostContent) {
    const checkFivePosts = isFivePostsAlreadyReached();

    if (checkFivePosts) {
      return;
    }

    const newPostToInsert: IPostsListContent = {
      postId: uuidv4(),
      postAuthorID: principalUser?.id!,
      postAuthor: principalUser?.name!,
      postAvatarSrc: principalUser?.avatar!,
      postContent: postTextContent,
      postDate: format(new Date(Date.now()), "yyyy-LL-dd HH:mm:ss"),
      postShared: {
        postSharedAuthor: postListQuoteContent?.postSharedAuthor || "",
        postSharedAuthorID: postListQuoteContent?.postSharedAuthorID || "",
        postSharedAvatarSrc: postListQuoteContent?.postSharedAvatarSrc || "",
        postSharedContent: postListQuoteContent?.postSharedContent || "",
        postSharedDate: postListQuoteContent?.postSharedDate || ""
      },
      postType: postType,
    };

    const newPostListValue = [newPostToInsert, ...postListContent];

    setPostListContent((state) => {
      return state = newPostListValue;
    });

    const postListFiltered = filterPostList(principalUser as IUserInformation, newPostListValue);
    localStorage.setItem("@NotePost:PostList", JSON.stringify(newPostListValue));

    if (toggleLowerCase == "following") {
      setPostListContentFilter(postListFiltered);
    } else {
      setPostListContentFilter(newPostListValue);
    };
  }

  function handleSubmitNewPost(text: string) {
    submitContentToPostList(text, "Post");
  }

  function handleQuotePostSubmitContent(props: IQuotePostContent) {
    submitContentToPostList(props.postContent, "QuotePost", props);
  }
  function handleRepostSubmitContent(props: IQuotePostContent) {
    submitContentToPostList(props.postContent = "", "Repost", props);
  }

  return (
    <div>
      <Actionbar onToggleChange={handleToggle} />

      <PostForm onSubmitNewPost={handleSubmitNewPost} isUserAllowedToPost={isUserAllowedToPost} />

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
                onSubmitQuotePost={handleQuotePostSubmitContent}
                onSubmitRepost={handleRepostSubmitContent}
                key={value.postId}
              />
            }

            case "Repost": {
              return <Repost
                postAuthor={value.postAuthor}
                postAvatarSrc={value.postAvatarSrc}
                postDate={value.postDate}
                postAuthorID={value.postAuthorID}
                isUserPrincipal={value.postShared.postSharedAuthorID === principalUser?.id}
                postSharedAuthor={value.postShared.postSharedAuthor}
                postSharedAuthorID={value.postShared.postSharedAuthorID}
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
                postAuthorID={value.postAuthorID}
                isUserPrincipal={value.postShared.postSharedAuthorID === principalUser?.id}
                postSharedAuthor={value.postShared.postSharedAuthor}
                postSharedAuthorID={value.postShared.postSharedAuthorID}
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
