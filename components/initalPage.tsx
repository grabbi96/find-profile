import * as React from 'react';
import Footer from '../components/common/footer';
import Hint from '../components/common/hint';
import styles from '../styles/Home.module.css';
import SearchInput from './search/search.input';
const InitialPage = () => {




  return (
    <>

      <div className={styles.container}>

        <main className={styles.main}>
          <div className={styles.seachContainer}>
            <SearchInput />
          </div>

          <Hint />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InitialPage;
