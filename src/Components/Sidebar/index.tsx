import { Gear } from 'phosphor-react';
import { Avatar } from '../Avatar';

import styles from './Sidebar.module.css';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img className={styles.backgroundUserImage} src="https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="Cover image from user" />

      <div className={styles.sidebarUserData}>
        <Avatar src="https://images.unsplash.com/photo-1536416992256-1c91ce9ccdfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50" />
        <strong>Annie Doe</strong>
        <span>I like food and travel ✈</span>
      </div>

      <footer>
        <Gear size={40} />
      </footer>
    </aside>
  )
}