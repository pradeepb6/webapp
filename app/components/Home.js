import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'unistore/preact';
import * as actions from '../actions.js';

import injectSheet from 'react-jss';

import gif from '../images/big.gif';
import jpg from '../images/big.jpg';
import png from '../images/big.png';
import svg from '../images/big.svg';

const HeartIcon = props => <svg viewBox="0 0 24 24" {...props}><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/></svg>;

@connect(['computing', 'notification'], actions)
@injectSheet(theme => ({
    ...theme.breakpoints,
    root: {
        textAlign: 'center',
    },
    images: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
    },
    icon: {
        width: 100,
        height: 'auto',
    },
    responsive: {
        height: 400,
        border: [1, 'solid', '#000'],
    },
}))
export default class Home extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    componentDidMount = () => console.log('componentDidMount', this.constructor.name);

    componentWillUnmount = () => console.log('componentWillUnmount', this.constructor.name);

    compute = (name, isComputing) => () => this.props.compute(name, isComputing);

    notify = notification => () => this.props.notify(notification);

    render = () => {
        const { classes } = this.props;
        const { computing, notification } = this.props;
        const { compute, notify } = this;

        console.log('render', this.constructor.name, this.state, this.props);

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <h1>Home <HeartIcon className={classes.icon} /></h1>

                    <p>computing: {JSON.stringify(computing)}</p>
                    <button onClick={compute('whatever', true)}>compute</button>
                    <button onClick={compute('whatever', false)}>uncompute</button>

                    <p>notification: {JSON.stringify(notification)}</p>
                    <button onClick={notify({ name: 'hello', content: 'world'})}>notify</button>
                    <button onClick={notify(false)}>notified</button>

                    <div className={classes.responsive}>
                        <p className={classes.mobileOnly}>mobile</p>
                        <p className={classes.tabletOnly}>tablet</p>
                        <p className={classes.laptopOnly}>laptop</p>
                        <p className={classes.desktopOnly}>desktop</p>
                    </div>
                    <a href={'/list'}>Move to list</a>

                    <div className={classes.images}>
                        <img src={gif} />
                        <img src={jpg} />
                        <img src={png} />
                        <img src={svg} />
                    </div>
                </div>
            </React.Fragment>
        );
    };
}
