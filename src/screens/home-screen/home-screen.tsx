import styles from './home-screen.module.scss';
import React from 'react';
import { Layout } from '../../components/layout/layout';
import sizes from '../../config/image-sizes';
import { Helmet } from 'react-helmet';

const homeImageSrcSet = sizes.map((width: number) => {
  const src = require(`../../images/homepage-image-${width}.jpg`);
  return {
    width,
    src,
    item: `${src} ${width}w`,
  };
});

export const HomeScreen = () => {
  return (
    <Layout>
      <Helmet>
        <title>Stay, Work and Surf with Selina</title>
      </Helmet>
      <img
        className={styles.HomeImage}
        src={homeImageSrcSet[0].src}
        srcSet={homeImageSrcSet.map(({ item }) => item).join(', ')}
        style={{
          background: `transparent url('${homeImageSrcSet[0].src}') 50% 50%/cover no-repeat`,
        }}
        alt=""
      />
    </Layout>
  );
};
