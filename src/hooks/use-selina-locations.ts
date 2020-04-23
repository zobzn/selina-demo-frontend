import useSWR from 'swr';
import { useRouteMatch } from 'react-router';

const API_ENDPOINT_LOCATIONS_LIST =
  'https://locations.selinatech.com/locations';

// e.g.: https://events.selinatech.com/events/aggregated/0a498510-885c-45f1-a5c3-745cf1a7f431
// const API_ENDPOINT_LOCATION_EVENTS = 'https://events.selinatech.com/events/aggregated/';

const locationWebsiteRegexp = /^(?:(?:https:\/\/)?(?:www\.)?selina\.com)?\/([^/]+)\/([^/]+)\/?$/;

export interface SelinaLocation {
  id: string;
  slug: string;
  name: string;
  address: string;
  regionName: string;
  countrySlug: string;
  countryName: string;
  photos: string[];
  href: string;
  description: string;
  descriptionMarkdown: string;
}

interface SelinaLocationsGroupedByCountry {
  [countrySlug: string]: SelinaLocation[];
}

interface CurrentSelinaLocation {
  slug: string;
  location: SelinaLocation | null;
}

/**
 * Sort locations by country name and name
 */
const sortLocations = (locations: SelinaLocation[]) => {
  return locations.sort((l1: SelinaLocation, l2: SelinaLocation) => {
    const c1 = l1.countryName;
    const c2 = l2.countryName;
    const n1 = l1.name;
    const n2 = l2.name;

    if (c1 === c2) {
      return n1 < n2 ? -1 : n1 > n2 ? 1 : 0;
    } else {
      return c1 < c2 ? -1 : 1;
    }
  });
};

/**
 * Group locations by country for main menu
 *
 * SelinaLocation[] => {[countrySlug: string]: { slug: string, name: string, locations: SelinaLocation[] }}
 */
const groupLocationsByCountry = (
  locations: SelinaLocation[]
): SelinaLocationsGroupedByCountry =>
  locations.reduce((acc: any, location: SelinaLocation) => {
    if (!acc[location.countrySlug]) {
      acc[location.countrySlug] = {
        slug: location.countrySlug,
        name: location.countryName,
        locations: [],
      };
    }

    acc[location.countrySlug].locations.push(location);

    return acc;
  }, {});

/**
 * - fetch Selina Locations from api
 * - convert them to SelinaLocation interface
 * - sort them by countryName and name
 */
const locationsFetcher = (url: string): Promise<any[]> =>
  fetch(url)
    .then((res) => res.json())
    .then((locations) =>
      locations.map((loc: any) => {
        const slug = loc.contact.website.replace(locationWebsiteRegexp, '$2');
        const countrySlug = loc.contact.website.replace(
          locationWebsiteRegexp,
          '$1'
        );

        const location: SelinaLocation = {
          id: loc.id,
          slug,
          name: loc.name,
          address: loc.address,
          regionName: loc.location.uiRegion,
          countrySlug,
          countryName: loc.location.value,
          photos: loc.photos,
          href: `/${countrySlug}/${slug}`,
          description: loc.description,
          descriptionMarkdown: loc.description_web,
        };

        return location;
      })
    )
    .then((locations) => sortLocations(locations));

/**
 * returns array of all available locations
 */
export const useSelinaLocations = (): SelinaLocation[] => {
  const { data: locations } = useSWR(
    API_ENDPOINT_LOCATIONS_LIST,
    locationsFetcher
  );

  return locations || [];
};

export const useCurrentSelinaLocation = (): CurrentSelinaLocation => {
  const locations = useSelinaLocations();
  const match = useRouteMatch({
    path: `/:countrySlug/:locationSlug`,
  });

  const slug = match && match.params && (match.params as any).locationSlug;

  const location = locations.length
    ? locations.find((loc) => loc.slug === slug) || null
    : null;

  return { slug, location };
};

export const useRandomSelinaLocationsExceptCurrent = (
  count: number
): SelinaLocation[] => {
  const locations = useSelinaLocations();
  const { slug } = useCurrentSelinaLocation();

  const result = [];
  const copy = [...locations];

  while (result.length < count && copy.length > 0) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    const randomItem = copy[randomIndex];

    if (!slug || randomItem.slug !== slug) {
      result.push(randomItem);
    }

    copy.splice(randomIndex, 1);
  }

  return result;
};

export const useSelinaLocationsGroupedByCountry = () => {
  const locations = useSelinaLocations();

  return groupLocationsByCountry(locations);
};
