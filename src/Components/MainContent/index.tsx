import { useState, useEffect } from "react";
import { format, isToday } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { Actionbar } from "../Actionbar";
import { PostForm } from "../PostForm";
import { Post, QuotePost, Repost } from "../PostTypes";

import { IUserInformation, IPostsListContent, IQuotePostContent } from "../../@Types";

import styles from './MainContent.module.css';
import { useLocation } from "react-router-dom";

export function MainContent() {
  const [postListContent, setPostListContent] = useState<IPostsListContent[]>(JSON.parse(localStorage.getItem("@NotePost:PostList")!));
  const [principalUser, setPrincipalUser] = useState<IUserInformation>(JSON.parse(localStorage.getItem("@NotePost:MainUserInformation")!));
  const [isUserAllowedToPost, setIsUserAllowedToPost] = useState<boolean>(true);
  const Following = "following";

  function useQuery() {
    const { search } = useLocation();
    return new URLSearchParams(search);
  }

  function filterPostList(mainUser: IUserInformation, postList: IPostsListContent[]) {
    const ids: string[] = [];
    mainUser?.follows.map(user => ids.push(user.id));

    return postList.filter(post => {
      for (const id of ids) {
        if (post.postAuthorID == id) {
          return post;
        }
      }
    });
  }

  let query = useQuery();
  const queryToggle = query.get("toggle");

  useEffect(() => {
    if (queryToggle?.toLowerCase() == Following) {
      const postListFiltered = filterPostList(principalUser, postListContent);

      setPostListContent(postListFiltered);
    } else {
      setPostListContent(JSON.parse(localStorage.getItem("@NotePost:PostList")!));
    }

  }, [queryToggle]);


  function isFivePostsAlreadyReached() {
    const todayUserPosts = postListContent.filter(post => {
      const toDate = new Date(post.postDate);
      if (isToday(toDate) && principalUser?.id == post.postAuthorID) {
        return post;
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
    if (props == Following) {
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

    if (queryToggle?.toLowerCase() == Following) {
      setPostListContent(postListFiltered);
    } else {
      setPostListContent(newPostListValue);
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
        {postListContent.map(post => {
          switch (post.postType) {
            case "Post": {
              return <Post
                postAuthor={post.postAuthor}
                postAvatarSrc={post.postAvatarSrc}
                postContent={post.postContent}
                postDate={post.postDate}
                postAuthorID={post.postAuthorID}
                isUserPrincipal={post.postAuthorID === principalUser?.id}
                onSubmitQuotePost={handleQuotePostSubmitContent}
                onSubmitRepost={handleRepostSubmitContent}
                key={post.postId}
              />
            }

            case "Repost": {
              return <Repost
                postAuthor={post.postAuthor}
                postAvatarSrc={post.postAvatarSrc}
                postDate={post.postDate}
                postAuthorID={post.postAuthorID}
                isUserPrincipal={post.postShared.postSharedAuthorID === principalUser?.id}
                postSharedAuthor={post.postShared.postSharedAuthor}
                postSharedAuthorID={post.postShared.postSharedAuthorID}
                postSharedAvatarSrc={post.postShared.postSharedAvatarSrc}
                postSharedContent={post.postShared.postSharedContent}
                postSharedDate={post.postShared.postSharedDate}
                key={post.postId}
              />
            }

            case "QuotePost": {
              return <QuotePost
                postAuthor={post.postAuthor}
                postAvatarSrc={post.postAvatarSrc}
                postContent={post.postContent}
                postDate={post.postDate}
                postAuthorID={post.postAuthorID}
                isUserPrincipal={post.postShared.postSharedAuthorID === principalUser?.id}
                postSharedAuthor={post.postShared.postSharedAuthor}
                postSharedAuthorID={post.postShared.postSharedAuthorID}
                postSharedAvatarSrc={post.postShared.postSharedAvatarSrc}
                postSharedContent={post.postShared.postSharedContent}
                postSharedDate={post.postShared.postSharedDate}
                key={post.postId}
              />
            }
          }
        })}
      </div>

    </div>
  )
}
