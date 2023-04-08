import { isToday } from "date-fns";
import { IPostsListContent, IUserInformation } from "../@Types";

export function numberOfPostsToday(postList: IPostsListContent[], mainUserInfo: IUserInformation): number {
  const NumberOfPostsUserHaveToday = postList.filter(post => {
    const toDate = new Date(post.date);

    if (isToday(toDate) && mainUserInfo.id == post.authorID) {
      return post;
    }
  });

  const totalNumberOfPostsToday = NumberOfPostsUserHaveToday.length;

  return totalNumberOfPostsToday;
}