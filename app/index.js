import React from 'react';
import { render } from 'react-dom';

import { jss, ThemeProvider } from 'react-jss';
import theme from './theme.js';

import Router from './Router.js';

jss.createStyleSheet(theme.globals).attach();

Storage.prototype.set = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));
Storage.prototype.get = key => JSON.parse(window.localStorage.getItem(key));
Storage.prototype.remove = key => window.localStorage.removeItem(key);

const App = () => (
    <ThemeProvider theme={theme}>
        <Router />
    </ThemeProvider>
);

render(<App />, document.body);

if (process.env.NODE_ENV === 'development')
    module.hot.accept();