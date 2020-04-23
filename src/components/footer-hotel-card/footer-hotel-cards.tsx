import React from 'react';
import styles from './footer-hotel-card.module.scss';
import { useRandomSelinaLocationsExceptCurrent } from '../../hooks/use-selina-locations';
import FooterHotelCard from './footer-hotel-card';

export default function FooterHotelCards() {
  const locations = useRandomSelinaLocationsExceptCurrent(3);

  if (!locations.length) {
    return <div className={styles.FooterCardsFallback} />;
  }

  return (
    <div className={styles.Cards}>
      {locations.map((location) => (
        <FooterHotelCard key={location.slug} location={location} />
      ))}
    </div>
  );
}
