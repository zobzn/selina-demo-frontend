import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer-hotel-card.module.scss';
import { SelinaLocation } from '../../hooks/use-selina-locations';
import { generateSelinaSrcSet } from '../../lib/selina-images-srcset';

interface Props {
  location: SelinaLocation;
}

export default function FooterHotelCard({ location }: Props) {
  const srcset = generateSelinaSrcSet(location.photos[0]);

  return (
    <div className={styles.Card}>
      <Link className={styles.CardLink} to={location.href}>
        <div className={styles.CardHead}>
          <img
            className={styles.CardImage}
            src={srcset[0].split(' ')[0]}
            srcSet={srcset.join(', ')}
            sizes={`(min-width: 1200px) 33vw, (min-width: 1600px) 20vw, 100vw`}
            style={{
              background: `transparent url('${
                srcset[0].split(' ')[0]
              }') 50% 50%/cover no-repeat`,
            }}
            alt=""
          />
        </div>
        <div className={styles.CardTitle}>
          <div>{location.name}</div>
          <div style={{ opacity: 0.7 }}>{location.countryName}</div>
        </div>
      </Link>
    </div>
  );
}
