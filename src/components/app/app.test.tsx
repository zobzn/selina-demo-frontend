import React from 'react';
import { render } from '@testing-library/react';
import App from './app';

test('renders spinner', () => {
  const { getByTitle } = render(<App />);
  const spinnerElement = getByTitle(/Loading.../i);
  expect(spinnerElement).toBeInTheDocument();
});
