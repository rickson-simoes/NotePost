import { useState, useEffect } from "react";
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { Actionbar } from "../Actionbar";
import { PostForm } from "../PostForm";
import { Post, QuotePost, Repost } from "../PostTypes";

import { IMainUserInformation, IPostsListContent } from "../../@Types";


export function MainContent() {
  const [postListContent, setPostListContent] = useState<IPostsListContent[]>([]);
  const [principalUser, setPrincipalUser] = useState<IMainUserInformation>();

  useEffect(() => {
    const getLocalStoragePostList = JSON.parse(localStorage.getItem("@Posterr:PostList") as string);
    const getLocalStorageMainUser = JSON.parse(localStorage.getItem("@Poster:MainUserInformation") as string);

    setPostListContent(getLocalStoragePostList);
    setPrincipalUser(getLocalStorageMainUser);
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

  return (
    <div>
      <Actionbar />

      <PostForm onSubmitNewPost={handleSubmitNewPost} />

      <div>
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
