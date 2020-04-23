import React from 'react';

import styles from './main-area.module.scss';

interface Props {}

export const MainArea: React.FC<Props> = ({ children }) => {
  return <div className={styles.MainArea}>{children}</div>;
};
