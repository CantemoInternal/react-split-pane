'use strict';

import React from 'react';


const Resizer = React.createClass({

    onMouseDown(event) {
        this.props.onMouseDown(event);
    },

    render() {
        const split = this.props.split;
        const classes = ['Resizer', split];
        return (<span className={classes.join(' ')} onMouseDown={this.onMouseDown} />);
    }
});

module.exports = Resizer;



