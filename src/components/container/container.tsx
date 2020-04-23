import React from 'react';

import styles from './container.module.scss';

interface Props {}

export const Container: React.FC<Props> = ({ children }) => {
  return <div className={styles.Container}>{children}</div>;
};
