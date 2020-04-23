import React from 'react';
import styles from './layout.module.scss';
import Header from '../header/header';
import Footer from '../footer/footer';
import { MainArea } from '../main-area/main-area';

type LayoutProps = {};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.Layout}>
      <Header />
      <MainArea>{children}</MainArea>
      <Footer />
    </div>
  );
};
