# Simple Selina Frontend Demo

Based on `create-react-app`

### Preview

- https://selina-demo-frontend.netlify.app/

### Source Code

- https://github.com/zobzn/selina-demo-frontend

## Todo with comments

- [x] no css framework (scss only)
- [x] responsive UI (desktop / tab / bobile)
- [x] hooks (useSWR, useEffect and a couple of own)
- [x] image preprocessing/srcset (`sharp` for image on home page, `cloudinary` api for photos from selina)
- [x] navigation with `react-router` (maybe next.js could be a better solution for this app)
- [x] layout
  - [x] simple metatags (react-helmet, `title` only for now)
  - [x] header
    - [x] logo
    - [x] dropdown menu with locations (desktop - on hover, mobile - on click)
  - [x] footer with 3 random locations (except current location)
- [x] home page with image
- [ ] bonus 1: location page
  - [x] image carousel (with images from location) (swiper)
  - [x] content about location
    - [x] location name
    - [x] description (markdown)
    - [ ] other content from the response
  - [ ] event section
    - [ ] this section uses the 2nd API to get events per location.
    - [ ] a date picker should allow a user to select a date range with up to a month ahead.
    - [ ] the selected dates filter the results that are provided in the API.
    - [ ] for each event - display its content
- [ ] bonus 2:  
       have no time for this ((
  - [ ] create the carousel of images with an animation and a slider
  - [ ] add some buttons with CSS animations to the project
  - [ ] also - feel free to surprise us with anything you find cool!

## Some caveats

For simplicity, some points were intentionally omitted and remain in the form of a todo list.

- no polyfills for older browsers, including ie11 (e.g. `react-app-polyfill`, `core-js`, `fetch`, ...)
- links to api are hardcoded, and are not taken from environment variables
- the behavior of the drop-down menu is done only by css (using :hover and :focus pseudo-classes), although some points are better to be done using js
- non-optimal code (frequent sorting of locations without caching the result, synchronous processing of markdown instead of asynchronous, ...)
- the implementation of the carousel for images is a rather voluminous and time-consuming task, so was used a ready solution (`swiper`)
- third-party packages were used with very basic settings (`swr`, `swiper`, ...)
- there are not all necessary checks for possible errors (for example when accessing the api)
- no lazy load of pictures
- no normal unit and e2e tests
- no page for 404 errors
- ...

## Getting Started

Development

```bash
git clone https://github.com/zobzn/selina-demo-frontend
cd selina-demo-frontend
npm install
npm run start
```

Production build

```bash
npm install
npm run build
npx serve -s dist
```

## Used Vendor Packages

- `classnames` for dynamic classes
- `react-helmet` for metatags (e.g. page title)
- `react-id-swiper`, `swiper` for image carousel
- `react-router-dom` for navigation between pages
- `unified`, `rehype-stringify`, `remark-parse`, `remark-rehype` for markdown transforms
- `sass` for styles
- `swr` for requests to api
- `sharp` for image resizing
- `react-snap` for prerender
