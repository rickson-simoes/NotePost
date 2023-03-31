import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { format, isToday } from "date-fns";
import { UserCirclePlus, UserMinus } from 'phosphor-react';

import { IPostsListContent, IUserInformation, IUserInfoToFollowUnfollow, IQuotePostContent } from "../../@Types";
import { Home } from "../Home";
import { Avatar } from "../../Components/Avatar";
import { PostForm } from '../../Components/PostForm';
import { Post } from "../../Components/PostTypes/components/PostContent";
import { QuotePost } from "../../Components/PostTypes/components/QuoteContent";
import { Repost } from "../../Components/PostTypes/components/RepostContent";
import { AppManagementContext } from "../../Context/AppManagementContext";
import { customStyles } from "../../utils/customOverlayStyle";

import styles from './User.module.css';



export function User() {
  const { mainUserInfo } = useContext(AppManagementContext);

  let { id } = useParams();

  if (id == undefined) {
    id = mainUserInfo.id
  }

  const [isOpen, setIsOpen] = useState(true);
  const [mainUserInformation, setMainUserInformation] = useState<IUserInformation>();
  const allUsers: IUserInformation[] = JSON.parse(localStorage.getItem("@NotePost:AllUsers") as string);
  const [userProfile, setUserProfile] = useState<IUserInformation>();

  const [postListContent, setPostListContent] = useState<IPostsListContent[]>([]);
  const [postListContentFilter, setPostListContentFilter] = useState<IPostsListContent[]>([]);

  const [isUserAllowedToPost, setIsUserAllowedToPost] = useState<boolean>(true);

  const [isAvailableToFollow, setIsAvailableToFollow] = useState<boolean>(true);



  function useQuery() {
    const { search } = useLocation();
    return new URLSearchParams(search);
  }

  let query = useQuery();

  const navigate = useNavigate();

  function handleModalQuotePostClose() {
    setIsOpen(false);
    navigate("/");
  }

  function filterPostList(postList: IPostsListContent[]) {
    return postList.filter(val => {
      if (val.authorID == id) {
        return val;
      }
    });
  }

  function isFivePostsAlreadyReached() {
    const todayUserPosts = postListContent.filter(val => {
      const toDate = new Date(val.date);
      if (isToday(toDate) && mainUserInformation?.id == val.authorID) {
        return val;
      }
    });

    const countTodayUserPosts = todayUserPosts.length;

    if (countTodayUserPosts >= 5) {
      setIsUserAllowedToPost(false);
      return true;
    }

    return false;
  }

  function submitContentToPostList(postTextContent: string, postType: "QuotePost" | "Post" | "Repost", postListQuoteContent?: IQuotePostContent) {
    const checkFivePosts = isFivePostsAlreadyReached();

    if (checkFivePosts) {
      return;
    }

    const newPostToInsert: IPostsListContent = {
      id: crypto.randomUUID(),
      authorID: mainUserInformation?.id!,
      author: mainUserInformation?.name!,
      avatarSrc: mainUserInformation?.avatar!,
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

    const newPostListValue = [newPostToInsert, ...postListContentFilter];
    const updateFullPostList = [newPostToInsert, ...postListContent]

    setPostListContentFilter((state) => {
      return state = newPostListValue;
    });

    localStorage.setItem("@NotePost:PostList", JSON.stringify(updateFullPostList));
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

  function currentUserBeingViewed(userId: string) {
    const userFound = allUsers?.find(user => user.id === userId);

    const totalPostsFilter = postListContent.filter(post => {
      if (post.authorID === userId) {
        return post;
      }
    });
    const totalPosts = totalPostsFilter.length;

    const updatedUser: IUserInformation = {
      avatar: userFound?.avatar!,
      totalPosts: totalPosts,
      backgroundAvatar: userFound?.backgroundAvatar!,
      bio: userFound?.bio!,
      followers: userFound?.followers!,
      follows: userFound?.follows!,
      id: userFound?.id!,
      joined: userFound?.joined!,
      name: userFound?.name!,
      totalFollowers: userFound?.totalFollowers!,
      totalFollows: userFound?.totalFollows!
    };

    setUserProfile(state => {
      return state = { ...updatedUser };
    });
  }

  function checkFollows() {
    if (mainUserInformation?.id === id) {
      return setIsAvailableToFollow(state => {
        return state = false;
      });
    }

    const isUserInsideMyFollowersList = mainUserInformation?.follows.some(user => user.id === id);
    if (isUserInsideMyFollowersList) {
      return setIsAvailableToFollow(state => {
        return state = false;
      });
    } else {
      return setIsAvailableToFollow(state => {
        return state = true;
      });
    }
  }

  function FormatDate(dateString: string | null) {
    const fixForNullDate = dateString == null ? new Date().toString() : dateString;
    const dateInNewFormat = new Date(fixForNullDate);

    return format(dateInNewFormat, "d 'of' LLLL',' yyyy");
  };

  function FollowButton() {
    const { id: idUserProfile, avatar, backgroundAvatar, bio, name } = userProfile as IUserInformation;
    const userToFollow: IUserInfoToFollowUnfollow = {
      id: idUserProfile,
      avatar,
      backgroundAvatar,
      bio,
      name
    };
    const getAllUserInformation = mainUserInformation;
    getAllUserInformation?.follows.push(userToFollow);
    const updateTotalFollows = getAllUserInformation?.follows.length;
    Object.assign(getAllUserInformation!, { totalFollows: updateTotalFollows });
    setMainUserInformation(state => {
      return state = { ...getAllUserInformation! }
    });
    localStorage.setItem("@NotePost:MainUserInformation", JSON.stringify(mainUserInformation));

    const newUserProfile = userProfile;
    newUserProfile?.followers.push({
      id: mainUserInformation?.id!,
      avatar: mainUserInformation?.avatar!,
      backgroundAvatar: mainUserInformation?.backgroundAvatar!,
      bio: mainUserInformation?.bio!,
      name: mainUserInformation?.name!
    });
    const totalFollowers = newUserProfile?.followers.length;
    const totalFollows = newUserProfile?.follows.length;
    const totalPosts = postListContent.filter(post => {
      if (post.authorID === id) {
        return post;
      }
    }).length;

    Object.assign(newUserProfile!, { ...newUserProfile, totalFollowers, totalFollows, totalPosts });

    setUserProfile(state => {
      return state = { ...newUserProfile! }
    });

    const indexOfUserInsideUserList = allUsers.findIndex(user => user.id === id);
    const updateAllUsers = allUsers;
    updateAllUsers.splice(indexOfUserInsideUserList, 1, userProfile!);

    const indexOfMainUser = allUsers.findIndex(user => user.id === mainUserInformation?.id);
    updateAllUsers.splice(indexOfMainUser, 1, mainUserInformation!);

    // @WORKAROUND 
    // use context will solve here, need to update the user with numbers of followers etc etc
    // setAllUsers(state => {
    //   return state = [...updateAllUsers];
    // });
    localStorage.setItem("@NotePost:AllUsers", JSON.stringify(allUsers));
    checkFollows();
  }

  function UnfollowButton() {
    const indexOfMainUserInformation = userProfile?.followers.findIndex(user => user.id == mainUserInformation?.id);
    userProfile?.followers.splice(indexOfMainUserInformation as number, 1);
    const updateFollowersNumber = userProfile?.followers.length;
    const newUserProfile = userProfile;
    Object.assign(newUserProfile!, { ...userProfile, totalFollowers: updateFollowersNumber });

    setUserProfile(state => {
      return state = { ...newUserProfile! }
    });

    const indexOfUserInsideUserList = allUsers.findIndex(user => user.id === id);
    const updateAllUsers = allUsers;
    updateAllUsers.splice(indexOfUserInsideUserList, 1, userProfile!);

    const indexOfUserUnfollowed = mainUserInformation?.follows.findIndex(user => user.id == userProfile?.id);
    mainUserInformation?.follows.splice(indexOfUserUnfollowed as number, 1)
    const updateFollowsNumber = mainUserInformation?.follows.length;
    const newMainUserInformation = mainUserInformation;
    Object.assign(newMainUserInformation!, { ...mainUserInformation, totalFollows: updateFollowsNumber });

    setMainUserInformation(state => {
      return state = { ...mainUserInformation! }
    });
    const indexOfMainUser = allUsers.findIndex(user => user.id === mainUserInformation?.id);
    updateAllUsers.splice(indexOfMainUser, 1, mainUserInformation!);

    // @WORKAROUND 
    // use context will solve here, need to update the user with numbers of followers etc etc
    // setAllUsers(state => {
    //   return state = [...updateAllUsers];
    // });
    localStorage.setItem("@NotePost:AllUsers", JSON.stringify(allUsers));
    localStorage.setItem("@NotePost:MainUserInformation", JSON.stringify(mainUserInformation));

    checkFollows();
  }

  useEffect(() => {
    const getLocalStorageMainUser: IUserInformation = JSON.parse(localStorage.getItem("@NotePost:MainUserInformation") as string);
    const getLocalStoragePostList: IPostsListContent[] = JSON.parse(localStorage.getItem("@NotePost:PostList") as string);

    setMainUserInformation(getLocalStorageMainUser);
    setPostListContent(getLocalStoragePostList);

    const onlyPostsFromTheUser = filterPostList(getLocalStoragePostList);
    setPostListContentFilter(onlyPostsFromTheUser);

    currentUserBeingViewed(id as string);
    checkFollows();
  }, []);

  Modal.setAppElement('#root');
  return (
    <>
      <Home />
      <Modal isOpen={isOpen} onRequestClose={handleModalQuotePostClose} style={customStyles}>
        <div className={styles.container}>
          <header className={styles.header}>
            <img className={styles.headerImg} src={userProfile?.backgroundAvatar} alt="BackgroundAvatar" />
          </header>
          <section className={styles.sectionUser}>
            <Avatar src={userProfile?.avatar} />
            <div className={styles.userInformationsOne}>
              <strong className={styles.name}>{userProfile?.name}</strong>
              <span className={styles.bio}>{userProfile?.bio}</span>
              <span className={styles.geralInfos}>Joined: <strong>{FormatDate(userProfile?.joined!)}</strong></span>
              <span className={styles.geralInfos}>Followers: <strong>{userProfile?.totalFollowers}</strong></span>
              <span className={styles.geralInfos}>Following: <strong>{userProfile?.totalFollows}</strong></span>
              <span className={styles.geralInfos}>Posts: <strong>{userProfile?.totalPosts}</strong></span>
            </div>

            <div className={styles.userInformationsTwo}>
              {isAvailableToFollow &&
                <button
                  onClick={FollowButton}
                  className={`${mainUserInformation?.id === id && styles.opacityButton} ${styles.buttonFollow}`}>
                  Follow <UserCirclePlus size={25} />
                </button>}

              {(!isAvailableToFollow && mainUserInformation?.id != id) &&
                <button
                  onClick={UnfollowButton}
                  className={`${mainUserInformation?.id === id && styles.opacityButton} ${styles.buttonUnfollow}`}>
                  Unfollow <UserMinus size={25} />
                </button>}
            </div>
          </section>

          <div className={styles.containerPostList}>
            <PostForm isUserAllowedToPost={isUserAllowedToPost} onSubmitNewPost={handleSubmitNewPost} />

            {postListContentFilter.map(post => {
              switch (post.type) {
                case "Post": {
                  return <Post
                    {...post}
                    isUserPrincipal={post.authorID === mainUserInformation?.id}
                    onSubmitQuotePost={handleQuotePostSubmitContent}
                    onSubmitRepost={handleRepostSubmitContent}
                    key={post.id}
                  />
                }

                case "Repost": {
                  return <Repost
                    {...post}
                    isUserPrincipal={post.shared.sharedAuthorID === mainUserInformation?.id}
                    {...post.shared}
                    key={post.id}
                  />
                }

                case "QuotePost": {
                  return <QuotePost
                    {...post}
                    isUserPrincipal={post.shared.sharedAuthorID === mainUserInformation?.id}
                    {...post.shared}
                    key={post.id}
                  />
                }
              }
            })}
          </div>

        </div>
      </Modal>
    </>
  )
}
