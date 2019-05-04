import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

import cx from 'classnames';
import injectSheet from 'react-jss';

@withRouter
@injectSheet(theme => ({
    root: {
        textAlign: 'center',
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
    selectedLink: {
        '& > *': {
            textDecoration: 'underline',
            color: theme.navEntryColor,
        },
    },
    li: {
        display: 'inline-block',
        padding: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
    },
}))
export default class Nav extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    componentDidMount = () => console.log('componentDidMount', this.constructor.name);

    componentWillUnmount = () => console.log('componentWillUnmount', this.constructor.name);

    render = () => {
        const { classes } = this.props;

        console.log('render', this.constructor.name, this.state, this.props);

        return (
            <ul className={cx(classes.root)}>
                <NavLink to={'/'} exact={true} activeClassName={classes.selectedLink} className={classes.link}>
                    <li className={cx(classes.li)}>Home</li>
                </NavLink>
                <NavLink to={'/list'} exact={true} activeClassName={classes.selectedLink} className={classes.link}>
                    <li className={cx(classes.li)}>List</li>
                </NavLink>
                <NavLink to={'/chart-async'} exact={true} activeClassName={classes.selectedLink} className={classes.link}>
                    <li className={cx(classes.li)}>Chart</li>
                </NavLink>
            </ul>
        );
    };
}