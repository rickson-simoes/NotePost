import { Actionbar } from "../Actionbar";
import { PostForm } from "../PostForm";
import { Avatar } from "../Avatar";

import { ShareNetwork, Pencil } from "phosphor-react";

import styles from './MainContent.module.css';

export function MainContent() {
  return (
    <div>
      <Actionbar />

      <PostForm />

      <div className={styles.postList}>
        <article className={styles.post}>
          <header className={styles.postAuthor}>
            <Avatar
              src="https://images.unsplash.com/photo-1536416992256-1c91ce9ccdfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              avatarSideBar={false}
            />
            <div className={styles.postAuthorInfo}>
              <strong>Annie Doe <span>(You)</span></strong>
              <time title="17/11/2022 16:00" dateTime="Tuesday, 17 november 2022">
                17/11/2022 - 16:40
              </time>
            </div>
          </header>

          <section className={styles.postContent}>
            content of the post
          </section>

          <footer className={styles.postReactionBox}>
            <button>
              <Pencil />
            </button>

            <button>
              <ShareNetwork />
            </button>
          </footer>
        </article>
      </div>

    </div>
  )
}