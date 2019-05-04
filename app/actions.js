import axios from 'axios';
import { history } from './Router.js';
import { getFingerprint } from './helpers';

const fingerprint = getFingerprint();
axios.defaults.baseURL = process.env.API_URL;

axios.interceptors.request.use(request => {
    request.params = request.params || {};
    request.params.token = window.localStorage.getItem('token');
    request.params.fingerprint = fingerprint;
    return request;
});


export const compute = (state, name, isComputing) => {
    const { computing: previousComputing } = state;

    const computing = [...previousComputing];
    if (isComputing && !computing.includes(name))
        computing.push(name);
    else if (!isComputing)
        computing.splice(computing.indexOf(name), 1);

    state.computing = computing;
    return state;
};

export const notify = (state, notification) => {
    state.notification = notification;
    return state;
};

export const stateToSearch = state => {
    const { pathname } = window.location;

    if (pathname !== '/funnel')
        return state;

    // serialize
    const params = {};

    const search = new URLSearchParams();
    for (const key in params)
        search.set(key, params[key]);

    const url = pathname + ([...search].length > 0 ? '?' + search.toString() : '');
    history.push(url);
};

export const searchToState = () => {
    const { search } = window.location;
    const params = Object.fromEntries(new URLSearchParams(search));

    // unserialize
    const state = {};

    //remove undefineds to let default values defined in store.js to prevail
    for (const key in state)
        if (state[key] === undefined)
            delete state[key];

    return state;
};

export const applyConsistencyChecks = state => {
    return state;
};

export const applyAsyncConsistencyChecks = async store => {
    let state = store.getState();
    store.setState(state);
};