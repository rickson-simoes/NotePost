import { ImgHTMLAttributes } from 'react';

import styles from './Avatar.module.css';

interface IAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  avatarSideBar?: 1 | 2 | 3;
}

export function Avatar({ avatarSideBar = 1, ...props }: IAvatarProps) {
  //styles.avatarImagePost

  let avatarSize;

  switch (avatarSideBar) {
    case 1: {
      avatarSize = styles.avatarLarge
      break;
    }

    case 2: {
      avatarSize = styles.avatarMedium
      break;
    }

    case 3: {
      avatarSize = styles.avatarSmall
      break;
    }
  }


  return (
    <img
      className={`${styles.avatar} ${avatarSize}`}
      alt="User avatar photo"
      loading="lazy"
      {...props}
    />
  )
}