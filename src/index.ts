import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

Promise.resolve()
  .then(() => createRoot(document.getElementById('react')!))
  .then((root) => root.render(createElement(App)))
  .then(() => {
    console.info('Hello World');
  });
