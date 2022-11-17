import { PencilLine } from "phosphor-react";

import styles from './PostForm.module.css';

export function PostForm() {
  return (
    <form className={styles.postForm}>
      <textarea placeholder="Post something about your day =)"></textarea>

      <footer>
        <button type="submit">Post </button>

        <div><PencilLine size={20} />00/777</div>
      </footer>
    </form>
  )
}