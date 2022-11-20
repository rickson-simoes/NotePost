import { NotePencil, ToggleLeft, ToggleRight } from "phosphor-react";
import { useState } from "react";

import styles from './Actionbar.module.css';

interface IActionBar {
  isButtonPostSomethingEnabled: (props: boolean) => void;
  isToggleAllPostsFollowingPressed: (props: boolean) => void;
}

export function Actionbar({ isButtonPostSomethingEnabled, isToggleAllPostsFollowingPressed }: IActionBar) {
  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);
  const [isTogglePressed, setIsTogglePressed] = useState<boolean>(true);

  function handlePostSomethingButton() {
    setIsButtonPressed(state => !state);
    isButtonPostSomethingEnabled(isButtonPressed);
  }

  function handleToggleAllPostsFollowing() {
    setIsTogglePressed(state => !state);
    isToggleAllPostsFollowingPressed(isTogglePressed)
  }


  return (
    <div className={styles.actionBar}>
      <button onClick={handlePostSomethingButton}><NotePencil size={25} /> Post something</button>

      <div className={styles.toggle} onClick={handleToggleAllPostsFollowing}>
        {isTogglePressed ?
          <><strong> All Posts</strong>&nbsp; / Following &nbsp; <ToggleLeft size={34} /></> :
          <>All Posts /<strong>&nbsp;Following</strong>&nbsp;<ToggleRight size={34} /></>}
      </div>
    </div>
  )
}