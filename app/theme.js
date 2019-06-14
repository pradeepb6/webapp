import font from '../node_modules/typeface-montserrat/files/montserrat-latin-400.woff2';
import reset from 'jss-reset';

export const globals = {
    ...reset,
    '@global html, body': {
        fontFamily: 'Montserrat',
    },
    '@font-face': [{
        fontFamily: 'Montserrat',
        fontWeight: 'normal',
        fontStyle: 'normal',
        src: `url(${font}) format('woff2')`,
    }],
};

const breakpoints = {
    mobile: { min: 0, max: 599 },
    tablet: { min: 600, max: 1365 },
    laptop: { min: 1366, max: 1919 },
    desktop: { min: 1920, max: 5120 },
};

const up = device => `@media (min-width: ${typeof device === 'string' ? breakpoints[device].min : device}px)`;
const down = device => console.log(device) || `@media (min-width: ${typeof device === 'string' ? breakpoints[device].max : device}px)`;
const only = device => `@media (min-width: ${breakpoints[device].min}px) and (max-width: ${breakpoints[device].max}px)`;
const between = (min, max) => `@media (min-width: ${min}px) and (max-width: ${max}px)`;

for (const device of ['mobile', 'tablet', 'laptop', 'desktop']) {
    breakpoints[`${device}Up`] = {
        [down(device)]: { display: 'none' },
        [up(device)]: { display: 'block' },
    };

    breakpoints[`${device}Down`] = {
        [down(device)]: { display: 'block' },
        [up(device)]: { display: 'none' },
    };

    breakpoints[`${device}Only`] = {
        display: 'none',
        [only(device)]: { display: 'block' },
    };
}

const theme = {
    globals,
    breakpoints,
    up, down, only, between,
    navEntryColor: '#a45',
};

export default theme;