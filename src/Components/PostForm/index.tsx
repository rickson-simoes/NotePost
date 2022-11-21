import { PencilLine } from "phosphor-react";

import { ChangeEvent, FormEvent, useState } from "react";

import styles from './PostForm.module.css';

interface IPostForm {
  onSubmitNewPost: (text: string) => void;
}

export function PostForm({ onSubmitNewPost }: IPostForm) {
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

      <footer>
        <button
          type="submit"
          disabled={textAreaLength > 777}
        >
          Post
        </button>

        <div><PencilLine size={20} />{777 - textAreaLength}</div>
      </footer>
    </form>
  )
}