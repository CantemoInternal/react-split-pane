'use strict';

import React from 'react';

class Resizer extends React.PureComponent {
    constructor(props) {
      super(props);
    }

    onMouseDown = event => {
        this.props.onMouseDown(event);
    };

    render = () => {
        const split = this.props.split;
        const classes = ['Resizer', split];
        return (<span className={classes.join(' ')} onMouseDown={this.onMouseDown} />);
    };
}

module.exports = Resizer;



