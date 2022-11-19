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
              src="https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              avatarSideBar={2}
            />
            <div className={styles.postAuthorInfo}>
              <strong>Thomas Garden <span> - Quote Post <Pencil size={12} /></span></strong>
              <time title="19/11/2022 18:30" dateTime="Tuesday, 19 november 2022">
                19/11/2022 - 18:30
              </time>
            </div>
          </header>

          <section className={styles.postContent}>
            This makes sense
          </section>

          <section className={styles.repostContent}>
            <header className={styles.postAuthor}>
              <Avatar
                src="https://images.unsplash.com/photo-1536416992256-1c91ce9ccdfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                avatarSideBar={3}
              />
              <div className={styles.postAuthorInfo}>
                <strong>Annie Doe <span>(You)</span></strong>
                <time title="17/11/2022 16:00" dateTime="Tuesday, 17 november 2022">
                  17/11/2022 - 16:40
                </time>
              </div>
            </header>

            <div className={styles.repostContentText}>
              content of the post
            </div>
          </section>
        </article>


        <article className={styles.post}>
          <header className={styles.postAuthor}>
            <Avatar
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              avatarSideBar={2}
            />
            <div className={styles.postAuthorInfo}>
              <strong>Lee Mel <span>- Repost <ShareNetwork size={12} /></span></strong>
              <time title="18/11/2022 17:40" dateTime="Tuesday, 18 november 2022">
                18/11/2022 - 17:40
              </time>
            </div>
          </header>

          <section className={styles.repostContent}>
            <header className={styles.postAuthor}>
              <Avatar
                src="https://images.unsplash.com/photo-1536416992256-1c91ce9ccdfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                avatarSideBar={3}
              />
              <div className={styles.postAuthorInfo}>
                <strong>Annie Doe <span>(You)</span></strong>
                <time title="17/11/2022 16:00" dateTime="Tuesday, 17 november 2022">
                  17/11/2022 - 16:40
                </time>
              </div>
            </header>

            <div className={styles.repostContentText}>
              content of the post
            </div>
          </section>
        </article>

        <article className={styles.post}>
          <header className={styles.postAuthor}>
            <Avatar
              src="https://images.unsplash.com/photo-1536416992256-1c91ce9ccdfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              avatarSideBar={2}
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