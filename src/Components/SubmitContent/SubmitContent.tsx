import { useContext, useState } from "react";
import { format } from "date-fns";

import styles from './SubmitContent.module.css';
import { IPostsListContent, IQuotePostContent } from "../../@Types";
import { AppManagementContext } from "../../Context/AppManagementContext";
import { PostForm } from "../PostForm";
import { Post } from "../PostTypes/components/PostContent";
import { Repost } from "../PostTypes/components/RepostContent";
import { QuotePost } from "../PostTypes/components/QuoteContent";
import { numberOfPostsToday } from "../../utils/numberOfPostsToday";

interface ISubmitContent {
  listOfPosts: IPostsListContent[]
}

export function SubmitContent({ listOfPosts }: ISubmitContent) {
  const { mainUserInfo, countPostMainUserInfo, addPostList, postList: mainPostList } = useContext(AppManagementContext);
  const [isUserAllowedToPost, setIsUserAllowedToPost] = useState<boolean>(true);

  function submitContentToPostList(
    postTextContent: string,
    postType: "QuotePost" | "Post" | "Repost",
    postListQuoteContent?: IQuotePostContent) {

    const totalNumberOfPostsToday = numberOfPostsToday(mainPostList, mainUserInfo);

    if (totalNumberOfPostsToday === 5) {
      setIsUserAllowedToPost(false);
      return;
    }

    const newPostToInsert: IPostsListContent = {
      id: crypto.randomUUID(),
      authorID: mainUserInfo.id,
      author: mainUserInfo.name,
      avatarSrc: mainUserInfo.avatar!,
      content: postTextContent,
      date: format(new Date(Date.now()), "yyyy-LL-dd HH:mm:ss"),
      shared: {
        sharedAuthor: postListQuoteContent?.sharedAuthor || "",
        sharedAuthorID: postListQuoteContent?.sharedAuthorID || "",
        sharedAvatarSrc: postListQuoteContent?.sharedAvatarSrc || "",
        sharedContent: postListQuoteContent?.sharedContent || "",
        sharedDate: postListQuoteContent?.sharedDate || ""
      },
      type: postType,
    };

    addPostList(newPostToInsert);
    countPostMainUserInfo()
  }

  function handleSubmitNewPost(text: string) {
    submitContentToPostList(text, "Post");
  }

  function handleQuotePostSubmitContent(props: IQuotePostContent) {
    submitContentToPostList(props.content, "QuotePost", props);
  }

  function handleRepostSubmitContent(props: IQuotePostContent) {
    submitContentToPostList(props.content = "", "Repost", props);
  }

  return (
    <div>
      <PostForm onSubmitNewPost={handleSubmitNewPost} isUserAllowedToPost={isUserAllowedToPost} />

      <div className={styles.mainContent}>
        {listOfPosts.map(post => {
          switch (post.type) {
            case "Post": {
              return <Post
                {...post}
                isUserPrincipal={post.authorID === mainUserInfo.id}
                onSubmitQuotePost={handleQuotePostSubmitContent}
                onSubmitRepost={handleRepostSubmitContent}
                key={post.id}
              />
            }

            case "Repost": {
              return <Repost
                {...post}
                {...post.shared}
                isUserPrincipal={post.shared.sharedAuthorID === mainUserInfo.id}
                key={post.id}
              />
            }

            case "QuotePost": {
              return <QuotePost
                {...post}
                {...post.shared}
                isUserPrincipal={post.shared.sharedAuthorID === mainUserInfo.id}
                key={post.id}
              />
            }
          }
        })}
      </div>
    </div>
  )
}
