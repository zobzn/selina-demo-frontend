import React from 'react';
import styles from './header.module.scss';
import { Container } from '../container/container';
import { Link, useLocation } from 'react-router-dom';
import { FlexRow, FlexAlignVertical } from '../flex/flex-row';
import { FlexCell } from '../flex/flex-cell';
import SelinaLogo from './selina-logo.svg';
import { MainMenu } from '../main-menu/main-menu';

export default function Header() {
  const location = useLocation();

  const { pathname } = location;
  const isHomepage = pathname === '/';

  const logo = (
    <img className={styles.LogoImage} src={SelinaLogo} alt={`Selina`} />
  );

  return (
    <header className={styles.Header}>
      <Container>
        <FlexRow alignVertical={FlexAlignVertical.MIDDLE}>
          <FlexCell>
            {isHomepage ? (
              <div className={styles.LogoWrapper}>{logo}</div>
            ) : (
              <Link to={`/`} className={styles.LogoLink}>
                {logo}
              </Link>
            )}
          </FlexCell>
          <FlexCell>
            <MainMenu />
          </FlexCell>
        </FlexRow>
      </Container>
    </header>
  );
}
