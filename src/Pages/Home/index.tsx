import styles from './Home.module.css';
import { Header } from '../../Components/Header/Header';
import { Sidebar } from '../../Components/Sidebar';
import { MainContent } from '../../Components/MainContent';

export function Home() {
  return (
    <>
      <Header />

      <div className={styles.wrapContent}>
        <Sidebar />

        <MainContent />
      </div>
    </>
  )
}