import styles from './main-menu.module.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  useSelinaLocationsGroupedByCountry,
  useCurrentSelinaLocation,
} from '../../hooks/use-selina-locations';
import classnames from 'classnames';

interface Props {}

export const MainMenu = (props: Props) => {
  const groups = useSelinaLocationsGroupedByCountry();
  const currentLocation = useCurrentSelinaLocation();

  return (
    <div className={styles.OurLocations} tabIndex={0}>
      <span className={styles.OurLocationsButton} tabIndex={0}>
        Our Locations
      </span>
      <ul className={styles.CountriesList}>
        {Object.entries(groups).map(
          ([countrySlug, { name: countryName, locations }]: any) => (
            <li key={countrySlug} className={styles.CountryItem} tabIndex={0}>
              <span className={styles.CountryName}>{countryName}</span>
              <ul className={styles.LocationsList}>
                {locations.map((location: any) => (
                  <li key={location.slug} className={styles.LocationItem}>
                    <NavLink
                      to={`/${countrySlug}/${location.slug}`}
                      className={classnames({
                        [styles.LocationName]: true,
                        [styles.LocationNameCurrent]:
                          currentLocation &&
                          currentLocation.slug === location.slug,
                      })}
                    >
                      {location.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
