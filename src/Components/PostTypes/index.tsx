import { ChangeEvent, useState } from "react";
import { Pencil, PencilLine, ShareNetwork } from "phosphor-react";
import { format } from 'date-fns';
// @ts-ignore
import { Modal } from 'react-modal-overlay';
import 'react-modal-overlay/dist/index.css'

import { Avatar } from "../Avatar";

import styles from './PostsTypes.module.css';
import { IPostContent, IQuotePostContent, IRepostAndQuoteContent } from "../../@Types";
import { Link } from "react-router-dom";

function FormatDate(dateString: string) {
  const dateInNewFormat = new Date(dateString);

  return format(dateInNewFormat, "d 'of' LLLL',' HH:mm");
};

export function Post(props: IPostContent) {
  const postDateFormatted = FormatDate(props.postDate);
  const [isOpen, setIsOpen] = useState(false);
  const [quoteRepostText, setQuoteRepostText] = useState("");
  const QuotePostSubmit: IQuotePostContent = {
    postContent: quoteRepostText,
    postSharedAuthorID: props.postAuthorID!,
    postSharedAuthor: props.postAuthor,
    postSharedAvatarSrc: props.postAvatarSrc,
    postSharedContent: props.postContent!,
    postSharedDate: props.postDate
  };

  function handleModalQuotePostOpen() {
    setIsOpen(true);
  }

  function handleModalQuotePostClose() {
    setQuoteRepostText("");
    setIsOpen(false);
  }

  function showAllUserData(event: ChangeEvent<HTMLInputElement>) {
    setQuoteRepostText(state => {
      return state = event.target.value;
    });
  }

  function handleSubmitQuotePost() {

    props.onSubmitQuotePost(QuotePostSubmit);
    handleModalQuotePostClose();
  }

  function handleRepostThisContent() {
    props.onSubmitRepost(QuotePostSubmit);
  }

  return (
    <article className={styles.post}>
      <Modal show={isOpen} closeModal={handleModalQuotePostClose}>
        <h4 className={styles.modalH4}><Pencil /> Quote Post about: {props.postAuthor}</h4>
        <div className={styles.modalForm}>
          <div className={styles.modalMaxCharacters}>
            {777 - quoteRepostText.length}
          </div>
          <input className={styles.modalInputText} type="text" value={quoteRepostText} onChange={showAllUserData} maxLength={777} />
          <button className={styles.modalButton} onClick={handleSubmitQuotePost}>Post</button>
        </div>

        <div className={styles.modalAuthorQuoteContent}>
          <Avatar
            src={props.postAvatarSrc}
            avatarSideBar={3}
          />
          <span><i>"{props.postContent}"</i></span>
        </div>
      </Modal>

      <header className={styles.postAuthor}>
        <Avatar
          src={props.postAvatarSrc}
          avatarSideBar={2}
        />
        <div className={styles.postAuthorInfo}>
          <div className={styles.postAuthorNameAndTag}>
            <strong><Link to={"/user?id=" + props.postAuthorID}>{props.postAuthor}</Link></strong>
            <span>{props.isUserPrincipal && "(You)"}</span>
          </div>
          <time title={postDateFormatted} dateTime={postDateFormatted}>
            {postDateFormatted}
          </time>
        </div>
      </header>

      <section className={styles.postContent}>
        {props.postContent}
      </section>

      <footer className={styles.postReactionBox}>
        {!props.isUserPrincipal &&
          <>
            <button onClick={handleModalQuotePostOpen}>
              <Pencil />
            </button>

            <button onClick={handleRepostThisContent}>
              <ShareNetwork />
            </button>
          </>}

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
            <strong><Link to={"/user?id=" + props.postAuthorID}>{props.postAuthor}</Link></strong>
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
              <strong><Link to={"/user?id=" + props.postSharedAuthorID}>{props.postSharedAuthor}</Link></strong>
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
            <strong><Link to={"/user?id=" + props.postAuthorID}>{props.postAuthor}</Link></strong>
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
              <strong><Link to={"/user?id=" + props.postSharedAuthorID}>{props.postSharedAuthor}</Link></strong>
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