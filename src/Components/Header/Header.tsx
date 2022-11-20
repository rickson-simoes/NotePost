import { NotePencil } from 'phosphor-react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <NotePencil size={40} /> Poster<span>r</span>
      </Link>
    </header>
  )
}