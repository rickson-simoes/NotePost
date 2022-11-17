import { Actionbar } from "../Actionbar";

import styles from './MainContent.module.css';
import { PostForm } from "../PostForm";

export function MainContent() {
  return (
    <div>
      <Actionbar />

      <PostForm />
    </div>
  )
}