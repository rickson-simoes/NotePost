import { Gear } from 'phosphor-react';
import { useContext } from 'react';
import { Avatar } from '../Avatar';

import styles from './Sidebar.module.css';

import { Link } from 'react-router-dom';
import { AppManagementContext } from '../../Context/AppManagementContext';

export function Sidebar() {
  const { mainUserInfo } = useContext(AppManagementContext);

  return (
    <aside className={styles.sidebar}>
      <img className={styles.backgroundUserImage} src={mainUserInfo.backgroundAvatar} alt="Cover image from user" />

      <div className={styles.sidebarUserData}>
        <Avatar src={mainUserInfo.avatar} />
        <strong>{mainUserInfo.name}</strong>
        <span>{mainUserInfo.bio}</span>
      </div>

      <footer>
        <Link to={`/user/${mainUserInfo.id}`}>
          <Gear size={40} />
        </Link>
      </footer>
    </aside>
  )
}