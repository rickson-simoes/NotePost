import { isToday } from "date-fns";
import { IPostsListContent, IUserInformation } from "../@Types";

export function numberOfPostsToday(postList: IPostsListContent[], mainUserInfo: IUserInformation): number {
  const { id } = mainUserInfo;

  const totalNumberOfPostsToday = postList.reduce((count, post) => {
    const postDate = new Date(post.date);
    const countTodayPostWithAuthorID = isToday(postDate) && post.authorID === id ? count + 1 : count;

    return countTodayPostWithAuthorID;
  }, 0);

  return totalNumberOfPostsToday;
}