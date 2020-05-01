import React from 'react';
import 'swiper/css/swiper.css';
import styles from './location-screen.module.scss';
import Swiper from 'react-id-swiper';
import { Layout } from '../../components/layout/layout';
import { useCurrentSelinaLocation } from '../../hooks/use-selina-locations';
import { Container } from '../../components/container/container';
import { markdownToHtml } from '../../lib/markdown-to-html';
import Spinner from '../../components/spinner/spinner';
import { generateSelinaSrcSet } from '../../lib/selina-images-srcset';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router';

const transparentGif = `data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`;

const swiperParams = {
  loop: true,
  lazy: {
    loadOnTransitionStart: true,
    loadPrevNextAmount: 1,
    loadPrevNext: true,
  },
  preloadImages: false,
  slidesPerView: 1,
  spaceBetween: 30,
  grabCursor: true,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
};

export const LocationScreen = () => {
  const { slug, location } = useCurrentSelinaLocation();

  if (slug && !location) {
    return <Redirect to={'/'} />;
  }

  if (!location) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  const html = markdownToHtml(location.descriptionMarkdown);

  const photos = location.photos.map((photo) => {
    const srcset = generateSelinaSrcSet(photo);

    return {
      photo,
      srcset,
    };
  });

  return (
    <Layout>
      <Helmet>
        <title>
          {location.name + ', ' + location.countryName + ' | Selina'}
        </title>
      </Helmet>
      <Container>
        <h1 style={{ margin: '80px 0 60px 0', textAlign: 'center' }}>
          <div>{location.name}</div>
          <div style={{ opacity: 0.5, fontSize: '0.7em' }}>
            {location.countryName}
          </div>
        </h1>
      </Container>
      <Swiper key={location.slug} {...swiperParams}>
        {photos.map(({ photo, srcset }) => (
          <div
            key={photo}
            style={{
              position: 'relative',
              padding: '30% 0 0 0',
              minHeight: 400,
            }}
          >
            <img
              alt={``}
              src={transparentGif}
              className={'swiper-lazy'}
              data-src={srcset[0].split(' ')[0]}
              data-srcset={srcset.join(', ')}
              style={{
                position: 'absolute',
                objectFit: 'cover',
                display: 'block',
                outline: 'none',
                border: 'none',
                height: '100%',
                width: '100%',
                left: 0,
                top: 0,
              }}
            />
            <div className="swiper-lazy-preloader" />
          </div>
        ))}
      </Swiper>
      <Container>
        <div style={{ margin: '60px 0 80px 0' }}>
          <div className={styles.Location}></div>
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      </Container>
    </Layout>
  );
};
