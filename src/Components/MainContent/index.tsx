import { Actionbar } from "../Actionbar";
import { PostForm } from "../PostForm";
import { Post, QuotePost, Repost } from "../PostTypes";

import { v4 as uuidv4 } from 'uuid';

export function MainContent() {
  interface IPostsListContentShared {
    postSharedAuthor: string;
    postSharedAvatarSrc: string;
    postSharedDate: Date | "";
    postSharedContent: string;
  }

  interface IPostsListContent {
    postId: string;
    postAuthorID: string;
    postAuthor: string;
    postAvatarSrc: string;
    postType?: "Post" | "Repost" | "QuotePost";
    postDate: Date;
    postContent: string;
    postShared: IPostsListContentShared;
  };


  const postsListContent: IPostsListContent[] = [
    {
      postId: uuidv4(),
      postAuthorID: "58e4aa7f-fd4c-4d0b-9333-a6287fce6736",
      postAuthor: "Thomas Garden",
      postAvatarSrc: "https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      postType: "QuotePost",
      postDate: new Date('2022-11-24 08:10:20'),
      postContent: "This Makes sense",
      postShared: {
        postSharedAuthor: "Annie Doe",
        postSharedAvatarSrc: "https://images.unsplash.com/photo-1536416992256-1c91ce9ccdfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        postSharedContent: "content of the post with the whole text",
        postSharedDate: new Date('2022-11-10 16:20:50'),
      }
    },
    {
      postId: uuidv4(),
      postAuthorID: "58e4aa7f-fd4c-4c0b-9333-a6287fce6736",
      postAuthor: "Lee Mel",
      postAvatarSrc: "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      postType: "Repost",
      postDate: new Date('2022-11-20 23:20:50'),
      postContent: "",
      postShared: {
        postSharedAuthor: "Annie Doe",
        postSharedAvatarSrc: "https://images.unsplash.com/photo-1536416992256-1c91ce9ccdfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        postSharedContent: "content of the post with the whole text",
        postSharedDate: new Date('2022-11-10 16:20:50'),
      }
    },
    {
      postId: uuidv4(),
      postAuthorID: "58e4aa7f-fd4c-4b0b-9333-a6287fce6736",
      postAuthor: "Lee Mel",
      postAvatarSrc: "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      postType: "Post",
      postDate: new Date('2022-11-14 12:40:50'),
      postContent: "more content lorem ipsum",
      postShared: {
        postSharedAuthor: "",
        postSharedAvatarSrc: "",
        postSharedContent: "",
        postSharedDate: ""
      }
    },
    {
      postId: uuidv4(),
      postAuthorID: "58e4aa7f-fd4c-4a0b-9333-a6287fce6736",
      postAuthor: "Annie Doe",
      postAvatarSrc: "https://images.unsplash.com/photo-1536416992256-1c91ce9ccdfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      postType: "Post",
      postDate: new Date('2022-11-10 16:20:50'),
      postContent: "content of the post with the whole text",
      postShared: {
        postSharedAuthor: "",
        postSharedAvatarSrc: "",
        postSharedContent: "",
        postSharedDate: ""
      }
    }
  ];

  const userUUID = "58e4aa7f-fd4c-4a0b-9333-a6287fce6736";


  return (
    <div>
      <Actionbar />

      <PostForm />

      <div>
        {postsListContent.map(value => {
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
                isUserPrincipal={value.postAuthorID === userUUID}
                postSharedAuthor={value.postShared.postSharedAuthor}
                postSharedAvatarSrc={value.postShared.postSharedAvatarSrc}
                postSharedContent={value.postShared.postSharedContent}
                postSharedDate={value.postShared.postSharedDate as Date}
                key={value.postId}
              />
            }

            case "QuotePost": {
              return <Repost
                postAuthor={value.postAuthor}
                postAvatarSrc={value.postAvatarSrc}
                postContent={value.postContent}
                postDate={value.postDate}
                isUserPrincipal={value.postAuthorID === userUUID}
                postSharedAuthor={value.postShared.postSharedAuthor}
                postSharedAvatarSrc={value.postShared.postSharedAvatarSrc}
                postSharedContent={value.postShared.postSharedContent}
                postSharedDate={value.postShared.postSharedDate as Date}
                key={value.postId}
              />
            }
          }
        })}
      </div>

    </div>
  )
}
