import { ImgHTMLAttributes } from 'react';

import styles from './Avatar.module.css';

interface IAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  avatarSideBar?: boolean;
}

export function Avatar({ avatarSideBar = true, ...props }: IAvatarProps) {

  return (
    <img
      className={`${styles.avatar} ${avatarSideBar ? styles.avatarImage : styles.avatarImagePost}`}
      alt="User avatar photo"
      loading="lazy"
      {...props}
    />
  )
}