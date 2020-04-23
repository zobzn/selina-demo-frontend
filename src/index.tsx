import './index.scss';
import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './components/app/app';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');

if (rootElement) {
  // const rootJsx = (
  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>
  // );

  const rootJsx = <App />;

  if (rootElement.querySelector('img[alt="Loading..."]')) {
    render(rootJsx, rootElement);
  } else if (rootElement.hasChildNodes()) {
    hydrate(rootJsx, rootElement);
  } else {
    render(rootJsx, rootElement);
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
