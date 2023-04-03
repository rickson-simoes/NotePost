import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { UserCirclePlus, UserMinus } from 'phosphor-react';

import { IUserInformation, IUserInfoToFollowUnfollow } from "../../@Types";
import { Home } from "../Home";
import { Avatar } from "../../Components/Avatar";
import { AppManagementContext } from "../../Context/AppManagementContext";
import { customStyles } from "../../utils/customOverlayStyle";

import styles from './User.module.css';
import { SubmitContent } from "../../Components/SubmitContent/SubmitContent";
import { FormatDateYear } from "../../utils/dateUtils";

export function User() {
  const { mainUserInfo, addNewFollowerMainUser, removeFollowerMainUser } = useContext(AppManagementContext);
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(true);
  const allUsers: IUserInformation[] = JSON.parse(localStorage.getItem("@NotePost:AllUsers") as string);
  const [userProfile, setUserProfile] = useState<IUserInformation>({} as IUserInformation);
  const [isAvailableToFollow, setIsAvailableToFollow] = useState<boolean>(true);


  const navigate = useNavigate();

  function handleModalQuotePostClose() {
    setIsOpen(false);
    navigate("/");
  }

  function currentUserBeingViewed(userId: string) {
    const userFound = allUsers?.find(user => user.id === userId);
    let updatedUser: IUserInformation;
    console.log(userFound);

    if (userFound == undefined) {
      updatedUser = {
        ...mainUserInfo
      }
    } else {
      updatedUser = {
        ...userFound
      }
    }

    setUserProfile(updatedUser);
  }

  function checkFollows() {
    if (mainUserInfo.id === id) {
      return setIsAvailableToFollow(state => {
        return state = false;
      });
    }

    const isUserInsideMyFollowersList = mainUserInfo.follows.some(user => user.id === id);
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



  function FollowButton() {
    const { id: idUserProfile, avatar, backgroundAvatar, bio, name } = userProfile as IUserInformation;

    const newFollowUser: IUserInfoToFollowUnfollow = {
      id: idUserProfile,
      avatar,
      backgroundAvatar,
      bio,
      name
    };

    addNewFollowerMainUser(newFollowUser)

    // @WORKAROUND - PUT NEW CONTEXT TO UPDATE THE NEW 
    // FOLLOWER INSIDE OTHER USER "FOLLOWERS/FOLLOWS" Options    
    // const newUserProfile = userProfile;
    // newUserProfile?.followers.push({
    //   id: mainUserInfo.id,
    //   avatar: mainUserInfo.avatar,
    //   backgroundAvatar: mainUserInfo.backgroundAvatar,
    //   bio: mainUserInfo.bio,
    //   name: mainUserInfo.name
    // });

    // const totalFollowers = newUserProfile?.followers.length;
    // const totalFollows = newUserProfile?.follows.length;
    // const totalPosts = postListContent.filter(post => {
    //   if (post.authorID === id) {
    //     return post;
    //   }
    // }).length;

    // Object.assign(newUserProfile!, { ...newUserProfile, totalFollowers, totalFollows, totalPosts });

    // setUserProfile(state => {
    //   return state = { ...newUserProfile! }
    // });

    // const indexOfUserInsideUserList = allUsers.findIndex(user => user.id === id);
    // const updateAllUsers = allUsers;
    // updateAllUsers.splice(indexOfUserInsideUserList, 1, userProfile!);

    // const indexOfMainUser = allUsers.findIndex(user => user.id === mainUserInfo.id);
    // updateAllUsers.splice(indexOfMainUser, 1, mainUserInfo);

    // @WORKAROUND 
    // use context will solve here, need to update the user with numbers of followers etc etc
    // setAllUsers(state => {
    //   return state = [...updateAllUsers];
    // });
    // localStorage.setItem("@NotePost:AllUsers", JSON.stringify(allUsers));
    checkFollows();
  }

  function UnfollowButton() {
    const { id: idUserProfile, avatar, backgroundAvatar, bio, name } = userProfile as IUserInformation;

    const user: IUserInfoToFollowUnfollow = {
      id: idUserProfile,
      avatar,
      backgroundAvatar,
      bio,
      name
    };

    removeFollowerMainUser(user);

    // @WORKAROUND 
    // use context will solve here, need to update the user with numbers of followers etc etc
    // setAllUsers(state => {
    //   return state = [...updateAllUsers];
    // });
    // localStorage.setItem("@NotePost:AllUsers", JSON.stringify(allUsers));

    checkFollows();
  }

  useEffect(() => {
    currentUserBeingViewed(id as string);

    //@WORKAROUND - PUT ALL USERS HERE TOO TO CHECK IF THEY WERE UPDATED
  }, [mainUserInfo])

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
              <span className={styles.geralInfos}>Joined: <strong>{FormatDateYear(userProfile?.joined!)}</strong></span>
              <span className={styles.geralInfos}>Followers: <strong>{userProfile?.totalFollowers}</strong></span>
              <span className={styles.geralInfos}>Following: <strong>{userProfile?.totalFollows}</strong></span>
              <span className={styles.geralInfos}>Posts: <strong>{userProfile?.totalPosts}</strong></span>
            </div>

            <div className={styles.userInformationsTwo}>
              {/* {isAvailableToFollow && */}
              <button
                onClick={FollowButton}
                className={`${mainUserInfo.id === id && styles.opacityButton} ${styles.buttonFollow}`}>
                Follow <UserCirclePlus size={25} />
              </button>

              {/* {(!isAvailableToFollow && mainUserInfo.id != id) && */}
              <button
                onClick={UnfollowButton}
                className={`${mainUserInfo.id === id && styles.opacityButton} ${styles.buttonUnfollow}`}>
                Unfollow <UserMinus size={25} />
              </button>
            </div>
          </section>

          <div className={styles.containerPostList}>
            <SubmitContent />
          </div>

        </div>
      </Modal>
    </>
  )
}
