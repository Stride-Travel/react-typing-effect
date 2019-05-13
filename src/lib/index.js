import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import Cursor from "./Cursor";

export default class TypingEffect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      displayText: ""
    };
    this.getRawText = this.getRawText.bind(this);
    this.type = this.type.bind(this);
    this.startTyping = this.startTyping.bind(this);
  }

  componentDidMount() {
    this.startTyping();
  }

  componentWillUnmount() {
    this._timeout && clearTimeout(this._timeout);
  }

  startTyping() {
    this._timeout = setTimeout(() => {
      this.type();
    }, this.props.typingDelay);
  }

  getRawText() {
    const { text } = this.props;
    return typeof text === "string" ? [text] : [...text];
  }

  type() {
    let { index, displayText } = this.state;
    let text = this.getRawText()[index];
    if (text.length > displayText.length) {
      displayText = text.substr(0, displayText.length + 1);
      this.setState({ displayText }, () => {
        this._timeout = setTimeout(() => {
          this.type();
        }, this.props.speed);
      });
    } else {
      this._timeout = setTimeout(() => {
        this.props.callBack && this.props.callBack();
      }, this.props.delayTime);
    }
  }

  render() {
    const {
      speed,
      typingDelay,
      delayTime,
      staticText,
      text,
      className,
      cursor,
      cursorClassName,
      callBack,
      ...otherProps
    } = this.props;
    const { displayText } = this.state;
    const classes = cx(className, "lfm__typing_effect");
    return (
      <div {...otherProps} className={classes}>
        {staticText ? (
          <span className="lfm__typing_effect_static_text">
            {staticText}&nbsp;
          </span>
        ) : null}

        <span className="lfm__typing_effect_text">{displayText}</span>

        <Cursor cursor={cursor} cursorClassName={cursorClassName} />
      </div>
    );
  }
}

TypingEffect.defaultProps = {
  speed: 200,
  delayTime: 5000,
  typingDelay: 2500
};

TypingEffect.propTypes = {
  speed: PropTypes.number.isRequired,
  typingDelay: PropTypes.number.isRequired,
  delayTime: PropTypes.number.isRequired,
  staticText: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  className: PropTypes.string,
  cursor: PropTypes.string,
  cursorClassName: PropTypes.string,
  callBack: PropTypes.func
};
