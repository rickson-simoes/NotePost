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
  const { id } = useParams();
  const { mainUserInfo,
    postList,
    getAllUsers,
    addNewFollowerMainUser,
    removeFollowerMainUser,
    addFollowerGetAllUsers,
    removeFollowerGetAllUsers } = useContext(AppManagementContext);

  const [isOpen, setIsOpen] = useState(true);
  const [userProfile, setUserProfile] = useState<IUserInformation>({} as IUserInformation);
  const [isAvailableToFollow, setIsAvailableToFollow] = useState<boolean | null>(null);

  const navigate = useNavigate();

  function handleModalQuotePostClose() {
    setIsOpen(false);
    navigate("/");
  }

  function currentUserBeingViewed(userId: string) {
    const userFound = getAllUsers.find(user => user.id === userId) ?? mainUserInfo;

    setUserProfile(userFound);
    checkFollows();
  }

  function checkFollows() {
    if (mainUserInfo.id === id) {
      setIsAvailableToFollow(false);
    }

    const isUserInsideMyFollowersList = mainUserInfo.follows.some(user => user.id === id);
    if (isUserInsideMyFollowersList) {
      setIsAvailableToFollow(false);
    } else {
      setIsAvailableToFollow(true);
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

    addNewFollowerMainUser(newFollowUser);
    addFollowerGetAllUsers(idUserProfile);

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
    removeFollowerGetAllUsers(idUserProfile);

    checkFollows();
  }

  useEffect(() => {
    currentUserBeingViewed(id as string);

  }, [mainUserInfo, getAllUsers, id])

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
              {isAvailableToFollow ?
                <button
                  onClick={FollowButton}
                  className={`${mainUserInfo.id === id && styles.opacityButton} ${styles.buttonFollow}`} disabled={mainUserInfo.id === id}>
                  Follow <UserCirclePlus size={25} />
                </button>
                :
                <button
                  onClick={UnfollowButton}
                  className={`${mainUserInfo.id === id && styles.opacityButton} ${styles.buttonUnfollow}`} disabled={mainUserInfo.id === id}>
                  Unfollow <UserMinus size={25} />
                </button>
              }
            </div>
          </section>

          <div className={styles.containerPostList}>
            <SubmitContent listOfPosts={postList} />
          </div>

        </div>
      </Modal>
    </>
  )
}
