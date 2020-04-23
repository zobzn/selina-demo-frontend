# Simple Selina Frontend Demo

Based on `create-react-app`

### Preview

- https://selina-demo-frontend.netlify.app/

### Source Code

- https://github.com/zobzn/selina-demo-frontend

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

## Некоторые нюансы

Для простоты некоторые моменты были намеренно опущены и остаются в виде todo списка

- нет полифиллов для старых браузеров, включая ie11 (например, react-app-polyfill, core-js, fetch, ...)
- ссылки на api прописаны в коде, а не берутся из переменных окружения
- поведение выпадающего меню сделано только средствами css (с помощью :hover и :focus псевдоклассов), хотя некоторые моменты лучше сделать с использованием js
- неоптимальный код (частая сортировка locations без кэширования результата, синхронная обработка markdown вместо асинхронной, ...)
- реализация своей карусели для изображений это занятие довольно объемное и трудоемкое, поэтому использовался готовый вариант (swiper)
- сторонние пакеты использовались с базовыми простейшими настройками (swr, swiper, ...)
- нет всех необходимых проверок на возможные ошибки (например, при обращении к api)
- нет ленивой загрузки картинок
- нет полноценных unit и e2e тестов
- нет страницы для 404 ошибки
- ...

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
