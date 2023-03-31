import { Gear } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { Avatar } from '../Avatar';

import styles from './Sidebar.module.css';

import { IUserInformation } from "../../@Types";
import { Link } from 'react-router-dom';

export function Sidebar() {
  const [userInformation, setUserInformation] = useState<IUserInformation>();

  useEffect(() => {
    const getFromlocalStorage = JSON.parse(localStorage.getItem("@NotePost:MainUserInformation")!);

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
        {/* @WORKAROUND - GET MAIN USER ID */}
        <Link to="/user/58e4aa7f-fd4c-4a0b-9333-a6287fce6736">
          <Gear size={40} />
        </Link>
      </footer>
    </aside>
  )
}