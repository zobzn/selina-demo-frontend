import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // our main menu opens with help of :active pseudo class in css
    // so in order to close menu we just remove focus from element
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // scroll page to top when navigate between pages
    if (process.env.NODE_ENV !== 'test') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return null;
}
