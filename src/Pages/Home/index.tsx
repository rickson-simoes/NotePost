import styles from './Home.module.css';
import { Header } from '../../Components/Header/Header';

export function Home() {
  return (
    <>
      <Header />

      <div className={styles.wrapContent}>

        <aside>
          aloo
        </aside>

        <main>
          testeee
        </main>

      </div>
    </>
  )
}