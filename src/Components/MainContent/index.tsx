import { Actionbar } from "../Actionbar";

import styles from './MainContent.module.css';
import { PostForm } from "../PostForm";

export function MainContent() {
  return (
    <main>
      <Actionbar />

      <PostForm />
    </main>
  )
}