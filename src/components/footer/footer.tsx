import React from 'react';
import styles from './footer.module.scss';
import { Container } from '../container/container';
import FooterHotelCards from '../footer-hotel-card/footer-hotel-cards';

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <Container>
        <FooterHotelCards />
      </Container>
      <Container>
        <div style={{ textAlign: 'center', opacity: 0.5 }}>
          <span>All rights reserved to Selina LTD</span>
          <span style={{ margin: '0 5px' }}>|</span>
          <a href={`https://www.selina.com/legal/`}>Legal</a>
        </div>
      </Container>
    </footer>
  );
}
