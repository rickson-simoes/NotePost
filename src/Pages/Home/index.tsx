import styles from './Home.module.css';
import { Header } from '../../Components/Header/Header';
import { Sidebar } from '../../Components/Sidebar';
import { SubmitContent } from '../../Components/SubmitContent/SubmitContent';

export function Home() {
  return (
    <>
      <Header />

      <main className={styles.wrapContent}>
        <Sidebar />

        <SubmitContent />
      </main>
    </>
  )
}