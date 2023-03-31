import { Link } from "react-router-dom";
import { ShareNetwork } from "phosphor-react";

import styles from '../../PostsTypes.module.css';
import { Avatar } from "../../../Avatar";
import { IRepostAndQuoteContent } from "../../../../@Types";
import { FormatDate } from "../../../../utils/formatDate";

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
            <strong><Link to={`/user/${props.postAuthorID}`}>{props.postAuthor}</Link></strong>
            <span className={styles.LabelTag}> Repost <ShareNetwork size={14} /></span>
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
              <strong><Link to={`/user/${props.postSharedAuthorID}`}>{props.postSharedAuthor}</Link></strong>
              {props.isUserPrincipal && <span style={{ color: 'var(--gray-400)' }}>(You)</span>}
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