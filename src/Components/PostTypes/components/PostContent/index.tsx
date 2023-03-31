import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, ShareNetwork } from "phosphor-react";
import { format } from 'date-fns';
import Modal from 'react-modal';

import styles from '../../PostsTypes.module.css';
import { Avatar } from "../../../Avatar";
import { IPostContent, IQuotePostContent } from "../../../../@Types";
import { customStyles } from "../../../../Pages/User";
import { FormatDate } from "../../../../utils/formatDate";

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

    props.onSubmitQuotePost?.(QuotePostSubmit);
    handleModalQuotePostClose();
  }

  function handleRepostThisContent() {
    props.onSubmitRepost?.(QuotePostSubmit);
  }

  return (
    <article className={styles.post}>
      {/* @WORKAROUND - MOVE THIS MODAL TO A SEPARATED COMPONENT */}
      <Modal isOpen={isOpen} onRequestClose={handleModalQuotePostClose} style={customStyles}>
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
            <strong><Link to={`/user/${props.postAuthorID}`}>{props.postAuthor}</Link></strong>
            {props.isUserPrincipal && <span style={{ color: 'var(--gray-400)' }}>(You)</span>}
            <span className={styles.LabelTag}>
              Post <Pencil size={16} weight="fill" />
            </span>
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