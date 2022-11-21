import { ToggleLeft, ToggleRight } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from './Actionbar.module.css';

interface IActionBar {
  onToggleChange: (value: string) => void;
}

export function Actionbar({ onToggleChange }: IActionBar) {
  const [toggle, setToggle] = useState<string>("all");

  function useQuery() {
    const { search } = useLocation();

    return new URLSearchParams(search);
  }
  let query = useQuery();

  const toggleLowerCase = query.get("toggle")?.toLowerCase();

  useEffect(() => {
    if (toggleLowerCase == "following") {
      localStorage.setItem("@Posterr:MainContentToggle", "following");
    } else {
      localStorage.setItem("@Posterr:MainContentToggle", "all");
    }

    const getLocalStorageToggle = localStorage.getItem("@Posterr:MainContentToggle") as string;

    setToggle(getLocalStorageToggle);
  }, [])

  function handleToggleAllPostsFollowing() {
    if (toggle == "all") {
      localStorage.setItem("@Posterr:MainContentToggle", "following");
      setToggle(state => {
        const newState = "following";
        onToggleChange(newState);
        return state = newState
      });
    } else {
      localStorage.setItem("@Posterr:MainContentToggle", "all");
      setToggle(state => {
        const newState = "all";
        onToggleChange(newState);
        return state = newState
      });
    }
  }

  return (
    <div className={styles.actionBar}>
      <div className={styles.toggle} onClick={handleToggleAllPostsFollowing}>
        {toggle == "all" ?
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