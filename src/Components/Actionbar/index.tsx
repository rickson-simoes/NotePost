import { ToggleLeft, ToggleRight } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from './Actionbar.module.css';

interface IActionBar {
  onToggleChange: (value: string) => void;
}

export function Actionbar({ onToggleChange }: IActionBar) {
  const [toggle, setToggle] = useState<string>("All");

  function useQuery() {
    const { search } = useLocation();

    return new URLSearchParams(search);
  }
  let query = useQuery();

  useEffect(() => {
    if (query.get("toggle") == "Following") {
      localStorage.setItem("@Posterr:MainContentToggle", "Following");
    } else {
      localStorage.setItem("@Posterr:MainContentToggle", "All");
    }

    const getLocalStorageToggle = localStorage.getItem("@Posterr:MainContentToggle") as string;

    setToggle(getLocalStorageToggle);
  }, [])

  function handleToggleAllPostsFollowing() {
    if (toggle == "All") {
      localStorage.setItem("@Posterr:MainContentToggle", "Following");
      setToggle(state => {
        const newState = "Following";
        onToggleChange(newState);
        return state = newState
      });
    } else {
      localStorage.setItem("@Posterr:MainContentToggle", "All");
      setToggle(state => {
        const newState = "All";
        onToggleChange(newState);
        return state = newState
      });
    }
  }

  return (
    <div className={styles.actionBar}>
      <div className={styles.toggle} onClick={handleToggleAllPostsFollowing}>
        {toggle == "All" ?
          <>
            <Link to="/?toggle=Following"><strong> All Posts</strong>&nbsp; / Following &nbsp; <ToggleLeft size={34} /></Link>
          </> :
          <>
            <Link to="?toggle=All">All Posts /<strong>&nbsp;Following</strong>&nbsp;<ToggleRight size={34} /></Link>
          </>}
      </div>
    </div>
  )
}