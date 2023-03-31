import { useContext, useState } from 'react';
import { format } from 'date-fns';
import styles from './Home.module.css';
import { AppManagementContext } from '../../Context/AppManagementContext';
import { IPostsListContent, IQuotePostContent } from '../../@Types';
import { Post, QuotePost, Repost } from '../../Components/PostTypes';
import { Header } from '../../Components/Header/Header';
import { Sidebar } from '../../Components/Sidebar';
import { PostForm } from '../../Components/PostForm';

export function Home() {
  const [postListContent, setPostListContent] = useState<IPostsListContent[]>(JSON.parse(localStorage.getItem("@NotePost:PostList")!));
  const { mainUserInfo } = useContext(AppManagementContext);

  function submitContentToPostList(postTextContent: string, postType: "QuotePost" | "Post" | "Repost", postListQuoteContent?: IQuotePostContent) {

    const newPostToInsert: IPostsListContent = {
      postId: crypto.randomUUID(),
      postAuthorID: mainUserInfo.id,
      postAuthor: mainUserInfo.name,
      postAvatarSrc: mainUserInfo.avatar!,
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

    setPostListContent(newPostListValue);

    localStorage.setItem("@NotePost:PostList", JSON.stringify(newPostListValue));
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
    <>
      <Header />

      <main className={styles.wrapContent}>
        <Sidebar />

        <div>
          {/* <Actionbar onToggleChange={handleToggle} /> */}

          <PostForm onSubmitNewPost={handleSubmitNewPost} isUserAllowedToPost={true} />

          <div className={styles.mainContent}>
            {postListContent.map(post => {
              switch (post.postType) {
                case "Post": {
                  return <Post
                    {...post}
                    isUserPrincipal={post.postAuthorID === mainUserInfo.id}
                    onSubmitQuotePost={handleQuotePostSubmitContent}
                    onSubmitRepost={handleRepostSubmitContent}
                    key={post.postId}
                  />
                }

                case "Repost": {
                  return <Repost
                    {...post}
                    {...post.postShared}
                    isUserPrincipal={post.postShared.postSharedAuthorID === mainUserInfo.id}
                    key={post.postId}
                  />
                }

                case "QuotePost": {
                  return <QuotePost
                    {...post}
                    {...post.postShared}
                    isUserPrincipal={post.postShared.postSharedAuthorID === mainUserInfo.id}
                    key={post.postId}
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