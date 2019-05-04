import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import injectSheet from 'react-jss';

@injectSheet({
    root: {
        textAlign: 'center',
    },
    tallLine: {
        border: '10px solid black',
        width: 100,
        height: 2000,
        margin: '30px auto',
    },
})
export default class List extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    componentDidMount = () => console.log('componentDidMount', this.constructor.name);

    componentWillUnmount = () => console.log('componentWillUnmount', this.constructor.name);

    render = () => {
        const { classes } = this.props;

        console.log('render', this.constructor.name, this.state, this.props);

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <h1>List</h1>
                    <Link to={'/'}>Move to home</Link>
                    <div className={classes.tallLine} />
                </div>
            </React.Fragment>
        );
    };
}