'use strict';

import React from 'react';
import VendorPrefix from 'react-vendor-prefix';

class Pane extends React.PureComponent {
    constructor(props) {
      super(props);
  
      this.state = {};
    }

    render = () => {
        const split = this.props.split;
        const classes = ['Pane', split];

        let style = {
            flex: 1,
            position: 'relative',
            outline: 'none',
            overflow: 'auto'
        };
        if (this.state.size) {
            if (split === 'vertical') {
                style.width = this.state.size;
            } else {
                style.height = this.state.size;
                style.display = 'flex';
            }
            style.flex = 'none';
        }
        const prefixed = VendorPrefix.prefix({styles: style});

        return (<div className={classes.join(' ')} style={prefixed.styles}>{this.props.children}</div>);
    };
}

module.exports = Pane;


