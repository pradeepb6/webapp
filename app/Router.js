import React from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { Router as BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'unistore/preact';
import * as actions from './actions.js';

import Layout from './components/Layout.js';
import Home from './components/Home.js';
import List from './components/List.js';
// import Chart from './components/ChartAsync.js';

const Auth = () => <h1>Auth</h1>;
const NotFound = () => <h1>Not Found</h1>
const isAuthenticated = () => window.localStorage.getItem('token');

export const history = createBrowserHistory();

@connect([], actions)
export default class Router extends React.Component {
    componentDidMount = () => {
        history.listen(location => {
            console.log(location);
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
        });
    };

    render = () => {
        return (
            <BrowserRouter history={history}>
                <Layout>
                    <Switch>
                        <Route path={'/'} exact={true} component={Home} />
                        <Route path={'/list'} exact={true} component={List} />
                        <Route path={'/list2'} exact={true} component={List} />
                        {/* <Route path={'/chart-async'} cexact={true} component={Chart} /> */}
                        <Route path={'/auth'} exact={true} render={props => !isAuthenticated() ? <Auth {...props} /> : <Redirect to={'/'} />} />

                        <Route path={'/*'} exact={true} component={NotFound} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    };
}

export class PrivateRoute extends React.Component {
    static propTypes = {
        component: PropTypes.any,
    };

    render = () => {
        const { component: Component, ...otherProps } = this.props;

        const token = isAuthenticated();

        let customer;

        try {
            (customer = jwtDecode(token));
        }
        catch (error) {
            console.error(error);
        }

        return (
            <Route {...otherProps} render={props => !isAuthenticated() ? <Redirect to={'/auth'} /> : <Component {...props} customer={customer} />} />
        );
    };
}