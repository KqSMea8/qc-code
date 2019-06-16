import React from 'react';
import PropTypes from 'prop-types';
import QRCode from './qrcode';

import './index.scss';

class LscQcCode extends React.Component {
  static contextTypes = {
    prefix: PropTypes.string
  }

  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.any),
    useSVG: PropTypes.bool
  };

  static defaultProps = {
    prefix: 'hippo-',
    className: '',
    style: {},
    useSVG: true
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount () {
    const { className, style, defaultValue, value, onChange, useSVG, ...qrcodeProps } = this.props;
    let initValue = defaultValue;
    if (value) {
      initValue = value;
    }
    if (initValue) {
      this.code = new QRCode(this.dom, {
        text: initValue,
        useSVG,
        ...qrcodeProps
      });
      onChange && onChange(initValue);
    }
  }

  componentWillReceiveProps (nextProps) {
    const { className, style, defaultValue, value, onChange, useSVG, ...qrcodeProps } = nextProps;
    if (this.code) {
      this.code.clear();
    }
    if (value) {
      this.code = new QRCode(this.dom, {
        text: value,
        useSVG,
        ...qrcodeProps
      });
      onChange && onChange(value);
    }
  }


  render() {
    const { className, style } = this.props;
    return (
      <div
        ref={(c) => { this.dom = c; }}
        className={`hippo-qrcode__container ${className}`}
        style={style}
      />
    );
  }
}

export default LscQcCode;