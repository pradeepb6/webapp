import createStore from 'unistore';
import devtools from 'unistore/devtools.js';
import { applyConsistencyChecks, applyAsyncConsistencyChecks } from './actions.js';

export const initialState = applyConsistencyChecks({
    computing: [],
    notification: {},
});

const store = process.env.NODE_ENV === 'production' ? createStore(initialState) : devtools(createStore(initialState));

applyAsyncConsistencyChecks(store);

export default store;