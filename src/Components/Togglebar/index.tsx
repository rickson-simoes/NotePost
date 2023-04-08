import { ToggleLeft, ToggleRight } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Toggle } from "../../@Types";
import styles from './ToggleBar.module.css';

interface IToggleBar {
  onToggleChange: (value: Toggle) => void;
}

export function ToggleBar({ onToggleChange }: IToggleBar) {
  const [toggle, setToggle] = useState<Toggle>(Toggle.all);

  function useQuery() {
    const { search } = useLocation();

    return new URLSearchParams(search);
  }

  const queryParams = useQuery();
  const getQueryParams = queryParams.get("toggle")?.toLowerCase();

  function switchQueryOptions(queryParams?: string) {
    switch (queryParams) {
      case Toggle.all:
        localStorage.setItem("@NotePost:MainContentToggle", Toggle.all);
        setToggle(Toggle.all);
        break;

      case Toggle.following:
        localStorage.setItem("@NotePost:MainContentToggle", Toggle.following);
        setToggle(Toggle.following);
        break;

      default:
        localStorage.setItem("@NotePost:MainContentToggle", Toggle.all);
        setToggle(Toggle.all);
        break;
    }
  }

  useEffect(() => {
    switchQueryOptions(getQueryParams);
  }, [])

  function handleToggleAllPostsFollowing() {
    if (toggle == Toggle.all) {
      switchQueryOptions(Toggle.following)
      onToggleChange(Toggle.following);
    } else {
      switchQueryOptions(Toggle.all)
      onToggleChange(Toggle.all);
    }
  }

  return (
    <div className={styles.ToggleBar}>
      <div className={styles.toggle} onClick={handleToggleAllPostsFollowing}>
        {toggle == Toggle.all ?
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