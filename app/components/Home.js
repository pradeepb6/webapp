import React from 'react';
import PropTypes from 'prop-types';

import injectSheet from 'react-jss';

import gif from '../images/big.gif';
import jpg from '../images/big.jpg';
import png from '../images/big.png';
import svg from '../images/big.svg';

const HeartIcon = props => <svg viewBox="0 0 24 24" {...props}><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/></svg>;

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
        height: 50,
        border: [1, 'solid', '#000'],
    },
}))
export default class Home extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    componentDidMount = () => console.log('componentDidMount', this.constructor.name);

    componentWillUnmount = () => console.log('componentWillUnmount', this.constructor.name);

    render = () => {
        const { classes } = this.props;

        console.log('render', this.constructor.name, this.state, this.props);

        return (
            <div className={classes.root}>
                <h1>Home</h1>
                <HeartIcon className={classes.icon} />

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
        );
    };
}
