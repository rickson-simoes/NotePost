import { NotePencil } from 'phosphor-react';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <NotePencil size={40} /> Poster<span>r</span>
    </header>
  )
}