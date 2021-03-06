'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Pane from './Pane';
import Resizer from './Resizer';
import VendorPrefix from 'react-vendor-prefix';

class SplitPane extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        active: false,
        resized: false
      };
    }

    componentDidMount = () => {
        document.addEventListener('mouseup', this.onMouseUp);
        document.addEventListener('mousemove', this.onMouseMove);
        const ref = this.refs.pane1;
        if (ref && this.props.defaultSize && !this.state.resized) {
            ref.setState({
                size: this.props.defaultSize
            });
        }
    };


    componentWillUnmount = () => {
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('mousemove', this.onMouseMove);
    };


    onMouseDown = event => {
        let position = this.props.split === 'vertical' ? event.clientX : event.clientY;
        this.setState({
            active: true,
            position: position
        });
    };


    onMouseMove = event => {
        if (this.state.active) {
            const ref = this.refs.pane1;
            if (ref) {
                const node = ref.getDOMNode();
                if (window.getComputedStyle) {
                    const styles = window.getComputedStyle(node);
                    const width = styles.width.replace('px', '');
                    const height = styles.height.replace('px', '');
                    const current = this.props.split === 'vertical' ? event.clientX : event.clientY;
                    const size = this.props.split === 'vertical' ? width : height;
                    const position = this.state.position;

                    const newSize = size - (position - current);
                    this.setState({
                        position: current,
                        resized: true
                    });

                    if (newSize >= this.props.minSize) {
                        if (this.props.maxSize === null || newSize <= this.props.maxSize) {
                            if (this.props.onChange) {
                              this.props.onChange(newSize);
                            }
                            ref.setState({
                                size: newSize
                            });
                        }
                    }
                }
            }
        }
    };


    onMouseUp = () => {
        this.setState({
            active: false
        });
    };


    merge = (into, obj) => {
        for (let attr in obj) {
            into[attr] = obj[attr];
        }
    };


    render = () => {

        const split = this.props.split;

        let style = {
            display: 'flex',
            flex: 1,
            position: 'relative',
            outline: 'none',
            overflow: 'hidden',
            userSelect: 'none'
        };

        if (split === 'vertical') {
            this.merge(style, {
                flexDirection: 'row',
                height: '100%',
                position: 'absolute',
                left: 0,
                right: 0
            });
        } else {
            this.merge(style, {
                flexDirection: 'column',
                height: '100%',
                minHeight: '100%',
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '100%'
            });
        }

        const children = this.props.children;
        const classes = ['SplitPane', split];
        const prefixed = VendorPrefix.prefix({styles: style});

        return (
            <div className={classes.join(' ')} style={prefixed.styles} ref="splitPane">
                <Pane ref="pane1" key="pane1" split={split}>{children[0]}</Pane>
                <Resizer ref="resizer" key="resizer" onMouseDown={this.onMouseDown} split={split} />
                <Pane ref="pane2" key="pane2" split={split}>{children[1]}</Pane>
            </div>
        );
    };
}

SplitPane.defaultProps =  {
    split: 'vertical',
    minSize: 0,
    maxSize: null
};

module.exports = SplitPane;