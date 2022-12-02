import { ToggleLeft, ToggleRight } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from './Actionbar.module.css';

interface IActionBar {
  onToggleChange: (value: string) => void;
}

export function Actionbar({ onToggleChange }: IActionBar) {
  const [toggle, setToggle] = useState<string>(localStorage.getItem("@NotePost:MainContentToggle")!);
  const Following = "following";
  const All = "all";

  function useQuery() {
    const { search } = useLocation();

    return new URLSearchParams(search);
  }
  let query = useQuery();

  const toggleLowerCase = query.get("toggle")?.toLowerCase();

  useEffect(() => {
    if (toggleLowerCase == Following) {
      localStorage.setItem("@NotePost:MainContentToggle", Following);
    } else {
      localStorage.setItem("@NotePost:MainContentToggle", All);
    }

    const getLocalStorageToggle = localStorage.getItem("@NotePost:MainContentToggle") as string;

    setToggle(getLocalStorageToggle);
  }, [])

  function handleToggleAllPostsFollowing() {
    if (toggle == All) {
      localStorage.setItem("@NotePost:MainContentToggle", Following);
      setToggle(Following);
      onToggleChange(Following);
    } else {
      localStorage.setItem("@NotePost:MainContentToggle", All);
      setToggle(All);
      onToggleChange(All);
    }
  }

  return (
    <div className={styles.actionBar}>
      <div className={styles.toggle} onClick={handleToggleAllPostsFollowing}>
        {toggle == All ?
          <>
            <Link to="/?toggle=following"><strong> All Posts</strong>&nbsp; / Following &nbsp; <ToggleLeft size={34} /></Link>
          </> :
          <>
            <Link to="?toggle=all">All Posts /<strong>&nbsp;Following</strong>&nbsp;<ToggleRight size={34} /></Link>
          </>}
      </div>
    </div>
  )
}