import { Gear } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { Avatar } from '../Avatar';

import styles from './Sidebar.module.css';

import { IMainUserInformation } from "../../@Types";
import { Link } from 'react-router-dom';
import { User } from '../../Pages/User';

export function Sidebar() {
  const [userInformation, setUserInformation] = useState<IMainUserInformation>();

  useEffect(() => {
    const getFromlocalStorage = JSON.parse(localStorage.getItem("@Poster:MainUserInformation")!);

    setUserInformation(getFromlocalStorage);
  }, []);

  return (
    <aside className={styles.sidebar}>
      <img className={styles.backgroundUserImage} src={userInformation?.backgroundAvatar} alt="Cover image from user" />

      <div className={styles.sidebarUserData}>
        <Avatar src={userInformation?.avatar} />
        <strong>{userInformation?.name}</strong>
        <span>{userInformation?.bio}</span>
      </div>

      <footer>
        <Link to="/user">
          <Gear size={40} />
        </Link>
      </footer>
    </aside>
  )
}