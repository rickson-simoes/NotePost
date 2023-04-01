import { useContext, useState } from 'react';
import { format } from 'date-fns';

import styles from './Home.module.css';
import { AppManagementContext } from '../../Context/AppManagementContext';
import { IPostsListContent, IQuotePostContent } from '../../@Types';
import { Post } from "../../Components/PostTypes/components/PostContent";
import { QuotePost } from "../../Components/PostTypes/components/QuoteContent";
import { Repost } from "../../Components/PostTypes/components/RepostContent";
import { Header } from '../../Components/Header/Header';
import { Sidebar } from '../../Components/Sidebar';
import { PostForm } from '../../Components/PostForm';

export function Home() {
  const { mainUserInfo, postList, addPostList } = useContext(AppManagementContext);


  function submitContentToPostList(
    postTextContent: string,
    postType: "QuotePost" | "Post" | "Repost",
    postListQuoteContent?: IQuotePostContent) {

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
    <>
      <Header />

      <main className={styles.wrapContent}>
        <Sidebar />

        <div>
          {/* <Actionbar onToggleChange={handleToggle} /> */}

          <PostForm onSubmitNewPost={handleSubmitNewPost} isUserAllowedToPost={true} />

          <div className={styles.mainContent}>
            {postList.map(post => {
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
      </main>
    </>
  )
}