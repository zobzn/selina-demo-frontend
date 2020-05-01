import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import Spinner from '../spinner/spinner';

const HomeScreen = React.lazy(() =>
  import('../../screens/home-screen/home-screen').then(({ HomeScreen }) => ({
    default: HomeScreen,
  }))
);

const LocationScreen = React.lazy(() =>
  import('../../screens/location-screen/location-screen').then(
    ({ LocationScreen }) => ({
      default: LocationScreen,
    })
  )
);

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route
            exact
            path={`/:countrySlug/:locationSlug`}
            component={LocationScreen}
          />
          <Route exact path={`/`} component={HomeScreen} />
          <Route path="*" render={() => <Redirect to={`/`} />} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
