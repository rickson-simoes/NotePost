import { Actionbar } from "../Actionbar";

import styles from './MainContent.module.css';
import { PostForm } from "../PostForm";

export function MainContent() {
  return (
    <div>
      <Actionbar />

      <PostForm />

      <div>
        <article>
          <header>
            <div className={styles.postAuthor}>
              <img src="" alt="" />
              <div className={styles.postAuthorInfo}>
                <strong>Annie Doe <span>(you)</span></strong>
                <time title="17/11/2022 16:00" dateTime="Tuesday, 17 november 2022">17/11/2022 - 16:40</time>
              </div>
            </div>
          </header>
        </article>
      </div>
    </div>
  )
}