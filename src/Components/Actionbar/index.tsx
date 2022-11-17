import { NotePencil, ToggleLeft, ToggleRight } from "phosphor-react";

import styles from './Actionbar.module.css';

export function Actionbar() {
  return (
    <div className={styles.actionBar}>
      <button type="submit"><NotePencil size={25} /> Post something</button>

      <div className={styles.toggle}>
        <strong> All Posts</strong>&nbsp; / Following &nbsp;
        <ToggleLeft size={34} /><ToggleRight size={34} />
      </div>
    </div>
  )
}