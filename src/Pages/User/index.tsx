import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

import { IPostsListContent, IUserInformation } from "../../@Types";

import { Home } from "../Home";
import { Avatar } from "../../Components/Avatar";

import styles from './User.module.css';
import { UserCirclePlus, UserMinus } from 'phosphor-react';
import { PostForm } from '../../Components/PostForm';
import { Post, QuotePost, Repost } from "../../Components/PostTypes";
import { format, isToday } from "date-fns";

export function User() {
  const [isOpen, setIsOpen] = useState(true);
  const [id, setId] = useState("");
  const [mainUserInformation, setMainUserInformation] = useState<IUserInformation>();
  const [allUsers, setAllUsers] = useState<IUserInformation[]>([]);
  const [userProfile, setUserProfile] = useState<IUserInformation>();

  const [postListContent, setPostListContent] = useState<IPostsListContent[]>([]);
  const [postListContentFilter, setPostListContentFilter] = useState<IPostsListContent[]>([]);

  const [isUserAllowedToPost, setIsUserAllowedToPost] = useState<boolean>(true);


  function useQuery() {
    const { search } = useLocation();
    return new URLSearchParams(search);
  }

  let query = useQuery();

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "#0e0e0e",
      border: "0"
    },
    overlay: {
      backgroundColor: "rgb(0 0 0 / 68%)"
    }
  };

  const navigate = useNavigate();

  function handleModalQuotePostClose() {
    setIsOpen(false);
    navigate("/");
  }

  function filterPostList(postList: IPostsListContent[]) {
    return postList.filter(val => {
      if (val.postAuthorID == id) {
        return val;
      }
    });
  }

  function isFivePostsAlreadyReached() {
    const todayUserPosts = postListContent.filter(val => {
      const toDate = new Date(val.postDate);
      if (isToday(toDate) && userProfile?.id == val.postAuthorID) {
        return val;
      }
    });

    const countTodayUserPosts = todayUserPosts.length;

    if (countTodayUserPosts === 5) {
      setIsUserAllowedToPost(false);
      return true;
    }

    return false;
  }

  function handleSubmitNewPost(text: string) {
    const checkFivePosts = isFivePostsAlreadyReached();

    if (checkFivePosts) {
      return;
    }

    console.log(text);
  }

  function currentUserBeingViewed(props: IUserInformation[]) {
    const userFound = props?.find(user => user.id === id);

    const totalFollowers = userFound?.followers.length;
    const totalFollows = userFound?.follows.length;
    const totalPostsFilter = postListContent.filter(post => {
      if (post.postAuthorID === id) {
        return post;
      }
    });

    const totalPosts = totalPostsFilter.length;

    setUserProfile(state => {
      const joined = FormatDate(userFound?.joined!);

      return state = {
        ...userFound,
        totalFollowers,
        totalFollows,
        totalPosts,
        joined
      } as IUserInformation
    });
  }

  function FormatDate(dateString: string | null) {
    const fixForNullDate = dateString == null ? new Date().toString() : dateString;
    const dateInNewFormat = new Date(fixForNullDate);

    return format(dateInNewFormat, "d 'of' LLLL',' yyyy");
  };

  useEffect(() => {
    const getLocalStorageMainUser: IUserInformation = JSON.parse(localStorage.getItem("@Posterr:MainUserInformation") as string);
    const getLocalStoragePostList: IPostsListContent[] = JSON.parse(localStorage.getItem("@Posterr:PostList") as string);
    const getLocalStorageAllAppUsers: IUserInformation[] = JSON.parse(localStorage.getItem("@Posterr:AllUsers") as string);

    const queryId = query.get("id") || mainUserInformation?.id as string;

    setId(queryId);

    setAllUsers(getLocalStorageAllAppUsers);
    setMainUserInformation(getLocalStorageMainUser);
    setPostListContent(getLocalStoragePostList);

    const userFound = getLocalStorageAllAppUsers?.find(user => user.id === id);

    setUserProfile(userFound);

    const onlyPostsFromTheUser = filterPostList(getLocalStoragePostList);
    setPostListContentFilter(onlyPostsFromTheUser);

    currentUserBeingViewed(getLocalStorageAllAppUsers);
  }, [id]);

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
              <span className={styles.geralInfos}>Joined: <strong>{userProfile?.joined}</strong></span>
              <span className={styles.geralInfos}>Followers: <strong>{userProfile?.totalFollowers}</strong></span>
              <span className={styles.geralInfos}>Following: <strong>{userProfile?.totalFollows}</strong></span>
              <span className={styles.geralInfos}>Posts: <strong>{userProfile?.totalPosts}</strong></span>
            </div>

            <div className={styles.userInformationsTwo}>
              <button className={styles.buttonFollow}>Follow <UserCirclePlus size={25} /></button>
              <button className={styles.buttonUnfollow}>Unfollow <UserMinus size={25} /></button>
            </div>
          </section>

          <div className={styles.containerPostList}>
            <PostForm isUserAllowedToPost={isUserAllowedToPost} onSubmitNewPost={handleSubmitNewPost} />

            {postListContentFilter.map(value => {
              switch (value.postType) {
                case "Post": {
                  return <Post
                    postAuthor={value.postAuthor}
                    postAvatarSrc={value.postAvatarSrc}
                    postContent={value.postContent}
                    postDate={value.postDate}
                    postAuthorID={value.postAuthorID}
                    isUserPrincipal={value.postAuthorID === mainUserInformation?.id}
                    key={value.postId}
                  />
                }

                case "Repost": {
                  return <Repost
                    postAuthor={value.postAuthor}
                    postAvatarSrc={value.postAvatarSrc}
                    postDate={value.postDate}
                    postAuthorID={value.postAuthorID}
                    isUserPrincipal={value.postShared.postSharedAuthorID === mainUserInformation?.id}
                    postSharedAuthor={value.postShared.postSharedAuthor}
                    postSharedAuthorID={value.postShared.postSharedAuthorID}
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
                    postAuthorID={value.postAuthorID}
                    isUserPrincipal={value.postShared.postSharedAuthorID === mainUserInformation?.id}
                    postSharedAuthor={value.postShared.postSharedAuthor}
                    postSharedAuthorID={value.postShared.postSharedAuthorID}
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
      </Modal>
    </>
  )
}