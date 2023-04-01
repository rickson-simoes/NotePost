import { IPostsListContent, PostListAction } from "../../@Types";

export function PostListReducer(state: IPostsListContent[], action: PostListAction) {
  switch (action.type) {
    case 'ADD': {
      return [action.payload, ...state]
    }

    default: {
      return { ...state }
    }
  }
}

export function PostListInitializer(state: IPostsListContent[]) {
  const storedPostList = localStorage.getItem("@NotePost:PostList");

  if (storedPostList) {
    return JSON.parse(storedPostList);
  }

  return state;
}