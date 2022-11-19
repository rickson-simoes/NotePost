import { useState, useEffect } from "react";

import { Actionbar } from "../Actionbar";
import { PostForm } from "../PostForm";
import { Post, QuotePost, Repost } from "../PostTypes";

interface IPostsListContentShared {
  postSharedAuthorID: string;
  postSharedAuthor: string;
  postSharedAvatarSrc: string;
  postSharedDate: string | "";
  postSharedContent: string;
}

interface IPostsListContent {
  postId: string;
  postAuthorID: string;
  postAuthor: string;
  postAvatarSrc: string;
  postType: "Post" | "Repost" | "QuotePost";
  postDate: string;
  postContent: string;
  postShared: IPostsListContentShared;
};

export function MainContent() {
  const [postListContent, setPostListContent] = useState<IPostsListContent[]>([]);

  useEffect(() => {
    const getLocalStoragePostList = JSON.parse(localStorage.getItem("@PostsListContent") as string);

    setPostListContent(getLocalStoragePostList)
  }, []);


  const userUUID = "58e4aa7f-fd4c-4a0b-9333-a6287fce6736";

  return (
    <div>
      <Actionbar />

      <PostForm />

      <div>
        {postListContent.map(value => {
          switch (value.postType) {
            case "Post": {
              return <Post
                postAuthor={value.postAuthor}
                postAvatarSrc={value.postAvatarSrc}
                postContent={value.postContent}
                postDate={value.postDate}
                isUserPrincipal={value.postAuthorID === userUUID}
                key={value.postId}
              />
            }

            case "Repost": {
              return <Repost
                postAuthor={value.postAuthor}
                postAvatarSrc={value.postAvatarSrc}
                postDate={value.postDate}
                isUserPrincipal={value.postShared.postSharedAuthorID === userUUID}
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
                isUserPrincipal={value.postShared.postSharedAuthorID === userUUID}
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
