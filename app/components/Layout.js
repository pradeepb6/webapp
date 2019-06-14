import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import Nav from './Nav';

@withRouter
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