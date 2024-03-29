import { PencilLine } from "phosphor-react";
import { ChangeEvent, FormEvent, useContext, useState } from "react";

import styles from './PostForm.module.css';
import { AppManagementContext } from "../../Context/AppManagementContext";

interface IPostForm {
  onSubmitNewPost: (text: string) => void;
  isUserAllowedToPost: boolean;
}

export function PostForm({ onSubmitNewPost, isUserAllowedToPost }: IPostForm) {
  const [textAreaPost, setTextAreaPost] = useState("");
  const [textAreaLength, setTextAreaLength] = useState<number>(0);

  function handlePostText(event: ChangeEvent<HTMLTextAreaElement>) {
    setTextAreaPost((state) => {
      return state = event.target.value;
    });

    setTextAreaLength(state => {
      return state = event.target.value.length
    });
  }

  function handleNewPost(event: FormEvent) {
    event.preventDefault();
    onSubmitNewPost(textAreaPost);

    setTextAreaPost("");
    setTextAreaLength(0);
  }

  return (
    <form onSubmit={handleNewPost} className={styles.postForm}>
      <textarea
        placeholder="Post something about your day =)"
        onChange={handlePostText}
        value={textAreaPost}
        required
      />

      <label className={styles.labelWarning}>{!isUserAllowedToPost && "Sorry you're not allowed to have more than five (5) posts a day."}</label>

      <footer>
        <button
          type="submit"
          disabled={textAreaLength > 777 || !isUserAllowedToPost}
        >
          Post
        </button>

        <div><PencilLine size={20} />{777 - textAreaLength}</div>
      </footer>
    </form>
  )
}