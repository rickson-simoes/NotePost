import { ChangeEvent, useState } from "react";
import { Pencil, ShareNetwork } from "phosphor-react";
import { format } from 'date-fns';
// @ts-ignore
import { Modal } from 'react-modal-overlay';
import 'react-modal-overlay/dist/index.css'

import { Avatar } from "../Avatar";

import styles from './PostsTypes.module.css';
import { IPostContent, IRepostAndQuoteContent } from "../../@Types";

function FormatDate(dateString: string) {
  const dateInNewFormat = new Date(dateString);

  return format(dateInNewFormat, "d 'of' LLLL',' HH:mm");
};

export function Post(props: IPostContent) {
  const postDateFormatted = FormatDate(props.postDate);
  const [isOpen, setIsOpen] = useState(false);
  const [quoteRepostText, setQuoteRepostText] = useState("");

  function handleModalQuotePostOpen() {
    setIsOpen(true);
  }

  function handleModalQuotePostClose() {
    setIsOpen(false);
  }

  function showAllUserData(event: ChangeEvent<HTMLInputElement>) {
    // const QuotePostSubmit = {
    //   postId: "255a6b33-9ed1-4f48-af3c-ac416b3b95fc",
    //   postAuthorID: "58e4aa7f-fd4c-4d0b-9333-a6287fce6736",
    //   postAuthor: "Thomas Garden",
    //   postAvatarSrc: "https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    //   postType: "QuotePost",
    //   postDate: "2022-11-24 11:10:20",
    //   postContent: "This Makes sense",
    //   postShared: {
    //     postSharedAuthorID: props.postAuthorID,
    //     postSharedAuthor: props.postAuthor,
    //     postSharedAvatarSrc: props.postAvatarSrc,
    //     postSharedContent: props.postContent,
    //     postSharedDate: props.postDate
    //   }
    // }

    const { onQuotePost } = props;
    setQuoteRepostText(state => {
      onQuotePost(props, event.target.value);

      return state = event.target.value;
    })

    // console.log(QuotePostSubmit);
  }

  return (
    <article className={styles.post}>
      <Modal show={isOpen} closeModal={handleModalQuotePostClose}>
        <h4 className={styles.modalH4}><Pencil /> Quote Post about: {props.postAuthor}</h4>
        <div className={styles.modalForm}>
          <input className={styles.modalInputText} type="text" value={quoteRepostText} onChange={showAllUserData} />
          <button className={styles.modalButton}>Post</button>
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
            <strong>{props.postAuthor}</strong>
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

            <button>
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