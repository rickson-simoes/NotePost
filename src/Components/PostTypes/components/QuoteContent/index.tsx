import { Link } from "react-router-dom";
import { Pencil } from "phosphor-react";

import styles from '../../PostsTypes.module.css';
import { Avatar } from "../../../Avatar";
import { IRepostAndQuoteContent } from "../../../../@Types";
import { FormatDate } from "../../../../utils/formatDate";

export function QuotePost(props: IRepostAndQuoteContent) {
  const postDateFormatted = FormatDate(props.date);
  const postSharedDateFormatted = FormatDate(props.sharedDate);

  return (
    <article className={styles.post}>
      <header className={styles.postAuthor}>
        <Avatar
          src={props.avatarSrc}
          avatarSideBar={2}
        />
        <div className={styles.postAuthorInfo}>
          <div className={styles.postAuthorNameAndTag}>
            <strong><Link to={`/user/${props.authorID}`}>{props.author}</Link></strong>
            <span className={styles.LabelTag}> Quote Post <Pencil size={16} /></span>
          </div>
          <time title={postDateFormatted} dateTime={postDateFormatted}>
            {postDateFormatted}
          </time>
        </div>
      </header>

      <section className={styles.postContent}>
        {props.content}
      </section>

      <section className={styles.repostContent}>
        <header className={styles.postAuthor}>
          <Avatar
            src={props.sharedAvatarSrc}
            avatarSideBar={3}
          />
          <div className={styles.postAuthorInfo}>
            <div className={styles.postAuthorNameAndTag}>
              <strong><Link to={`/user/${props.sharedAuthorID}`}>{props.sharedAuthor}</Link></strong>
              {props.isUserPrincipal && <span style={{ color: 'var(--gray-400)' }}>(You)</span>}
            </div>
            <time title={postSharedDateFormatted} dateTime={postSharedDateFormatted}>
              {postSharedDateFormatted}
            </time>
          </div>
        </header>

        <div className={styles.repostContentText}>
          {props.sharedContent}
        </div>
      </section>
    </article>
  )
}