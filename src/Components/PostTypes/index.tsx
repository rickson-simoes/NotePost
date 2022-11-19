import { Pencil, ShareNetwork } from "phosphor-react";
import { format } from 'date-fns';

import { Avatar } from "../Avatar";

import styles from './PostsTypes.module.css';

interface IPostContent {
  postAuthor: string;
  postAvatarSrc: string;
  postDate: string;
  postContent?: string;
  isUserPrincipal: boolean;
}

interface IRepostAndQuoteContent extends IPostContent {
  postSharedAuthor: string;
  postSharedAvatarSrc: string;
  postSharedDate: string;
  postSharedContent: string;
}

function FormatDate(dateString: string) {
  const dateInNewFormat = new Date(dateString);

  return format(dateInNewFormat, "d 'of' LLLL',' HH:mm");
};

export function Post({ postAuthor, postAvatarSrc, postDate, postContent, isUserPrincipal }: IPostContent) {
  const postDateFormatted = FormatDate(postDate);

  return (
    <article className={styles.post}>
      <header className={styles.postAuthor}>
        <Avatar
          src={postAvatarSrc}
          avatarSideBar={2}
        />
        <div className={styles.postAuthorInfo}>
          <div className={styles.postAuthorNameAndTag}>
            <strong>{postAuthor}</strong>
            <span>{isUserPrincipal && "(You)"}</span>
          </div>
          <time title={postDateFormatted} dateTime={postDateFormatted}>
            {postDateFormatted}
          </time>
        </div>
      </header>

      <section className={styles.postContent}>
        {postContent}
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
  )
}

export function Repost(props: IRepostAndQuoteContent) {
  const postDateFormatted = FormatDate(props.postDate);
  const postSharedDateFormatted = FormatDate(props.postSharedDate);

  return (
    <article className={styles.post}>
      <header className={styles.postAuthor}>
        <Avatar
          src={props.postAvatarSrc}
          avatarSideBar={2}
        />
        <div className={styles.postAuthorInfo}>
          <div className={styles.postAuthorNameAndTag}>
            <strong>{props.postAuthor}</strong>
            <span className={styles.RepostQuotePost}> Repost <ShareNetwork size={14} /></span>
          </div>
          <time title={postDateFormatted} dateTime={postDateFormatted}>
            {postDateFormatted}
          </time>
        </div>
      </header>

      <section className={styles.repostContent}>
        <header className={styles.postAuthor}>
          <Avatar
            src={props.postSharedAvatarSrc}
            avatarSideBar={3}
          />
          <div className={styles.postAuthorInfo}>
            <div className={styles.postAuthorNameAndTag}>
              <strong>{props.postSharedAuthor}</strong>
              <span>{props.isUserPrincipal && "(You)"}</span>
            </div>
            <time title={postSharedDateFormatted} dateTime={postSharedDateFormatted}>
              {postSharedDateFormatted}
            </time>
          </div>
        </header>

        <div className={styles.repostContentText}>
          {props.postSharedContent}
        </div>
      </section>
    </article>
  )
}

export function QuotePost(props: IRepostAndQuoteContent) {
  const postDateFormatted = FormatDate(props.postDate);
  const postSharedDateFormatted = FormatDate(props.postSharedDate);

  return (
    <article className={styles.post}>
      <header className={styles.postAuthor}>
        <Avatar
          src={props.postAvatarSrc}
          avatarSideBar={2}
        />
        <div className={styles.postAuthorInfo}>
          <div className={styles.postAuthorNameAndTag}>
            <strong>{props.postAuthor}</strong>
            <span className={styles.RepostQuotePost}> Quote Post <Pencil size={16} /></span>
          </div>
          <time title={postDateFormatted} dateTime={postDateFormatted}>
            {postDateFormatted}
          </time>
        </div>
      </header>

      <section className={styles.postContent}>
        {props.postContent}
      </section>

      <section className={styles.repostContent}>
        <header className={styles.postAuthor}>
          <Avatar
            src={props.postSharedAvatarSrc}
            avatarSideBar={3}
          />
          <div className={styles.postAuthorInfo}>
            <div className={styles.postAuthorNameAndTag}>
              <strong>{props.postSharedAuthor}</strong>
              <span>{props.isUserPrincipal && "(You)"}</span>
            </div>
            <time title={postSharedDateFormatted} dateTime={postSharedDateFormatted}>
              {postSharedDateFormatted}
            </time>
          </div>
        </header>

        <div className={styles.repostContentText}>
          {props.postSharedContent}
        </div>
      </section>
    </article>
  )
}