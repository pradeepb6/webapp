import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import injectSheet from 'react-jss';

import Nav from './Nav';

//disabling elastic scroll will prevent last npixels=autohide-browser-bar from ever showing when scrolling on mobile devices so you have to be sure webpage is in full screen mode

@withRouter
@injectSheet({
    '@global html, body': {
        width: '100vw',
        height: '100vh',
        // overflow: 'hidden', //disable elastic scroll
    },
    '@global #app': {
        // width: '100vw',
        // height: '100vh',
        // overflow: 'auto',
        // overflowScrolling: 'touch',
    },
})
export default class Layout extends React.PureComponent {
    static propTypes = {
        children: PropTypes.node,
        classes: PropTypes.object.isRequired,
    };

    componentDidMount = () => console.log('componentDidMount', this.constructor.name);

    componentWillUnmount = () => console.log('componentWillUnmount', this.constructor.name);

    render = () => {
        const { children } = this.props;

        console.log('render', this.constructor.name, this.state, this.props);

        return (
            <React.Fragment>
                <Nav />
                {children}
            </React.Fragment>
        );
    };
}