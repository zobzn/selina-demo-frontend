import { queryByAttribute, render, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import useSWR from 'swr';
import App from './app';

const locations = [
  {
    id: 'kjdghkjsdhgkhdglkjhdkrjg',
    slug: 'bariloche',
    name: 'Bariloche',
    address: 'some street',
    regionName: 'eu',
    countrySlug: 'argentina',
    countryName: 'Argentina',
    photos: [1, 2, 3].map((i) => `https://picsum.photos/id/${i}/300/200`),
    href: '/argentina/bariloche',
    description: 'bariloche description',
    descriptionMarkdown: 'bariloche description\n---\nmarkdown',
  },
];

jest.mock('swr', () => jest.fn());

const useSwrMock = useSWR as jest.Mock;

const getByName = queryByAttribute.bind(null, 'name');

const setup = (path: string) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
};

describe('Application', () => {
  it('all pages are lazy loading', async () => {
    useSwrMock.mockReturnValue({ data: [] });

    const { getByTitle, queryByAltText, queryByText } = setup('/');

    expect(getByTitle('Loading...')).toBeInTheDocument();
    expect(queryByAltText('Selina')).toBeNull();
    expect(queryByText('Our Locations')).toBeNull();
    expect(queryByText(/All rights reserved/i)).toBeNull();
    await waitFor(() => {});
  });

  it('all pages contain logo, menu and footer', async () => {
    useSwrMock.mockReturnValue({ data: locations });

    const { getByAltText, getByText, queryByTitle } = setup('/');

    expect(queryByTitle('Loading...')).toBeNull();
    expect(getByAltText('Selina')).toBeInTheDocument();
    expect(getByText('Our Locations')).toBeInTheDocument();
    expect(getByText(/All rights reserved/i)).toBeInTheDocument();
  });

  it('home page contains hero image', async () => {
    useSwrMock.mockReturnValue({ data: locations });

    const { getByAltText } = setup('/');

    expect(getByAltText('Hero Image')).toBeInTheDocument();
  });

  it('contains menu', async () => {
    useSwrMock.mockReturnValue({ data: locations });

    const { getByText } = setup('/');

    expect(
      getByText('Bariloche', { selector: 'header .LocationName' })
    ).toBeInTheDocument();
  });

  it('contains random locations on footer', async () => {
    useSwrMock.mockReturnValue({ data: locations });

    const { getByText } = setup('/');

    expect(
      getByText('Bariloche', { selector: 'footer div' })
    ).toBeInTheDocument();
  });

  it('can open location page directly', async () => {
    useSwrMock.mockReturnValue({ data: locations });

    const { getByText, getByTitle, queryByText } = setup(
      '/argentina/bariloche'
    );

    expect(getByTitle('Loading...')).toBeInTheDocument();
    await waitFor(() => {});
    expect(getByText(/bariloche description/i)).toBeInTheDocument();

    expect(queryByText('Bariloche', { selector: 'footer div' })).toBeNull();
  });

  it("location page doesn't contain links to itself in footer", async () => {
    useSwrMock.mockReturnValue({ data: locations });

    const { getByText, queryByText } = setup('/argentina/bariloche');

    expect(getByText(/bariloche description/i)).toBeInTheDocument();
    expect(queryByText('Bariloche', { selector: 'footer div' })).toBeNull();
  });

  it('redirects to home from nonexistent location', async () => {
    useSwrMock.mockReturnValue({ data: locations });

    const { getByAltText } = setup('/argentina/bla-bla');

    expect(getByAltText('Hero Image')).toBeInTheDocument();
  });

  it('redirects to home from nonexistent page', async () => {
    useSwrMock.mockReturnValue({ data: locations });

    const { getByAltText } = setup('/404');

    expect(getByAltText('Hero Image')).toBeInTheDocument();
  });
});
