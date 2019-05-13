import React from "react";
import PropTypes from "prop-types";
import ReactTypingEffect from "../lib";

import "./styles/index.scss";

const ReactTypingEffectDemo = () => {
  const test = () => {
    // eslint-disable-next-line no-console
    console.log("Test is here.");
  };

  return (
    <div className="container">
      <ReactTypingEffect
        text={["Hello World!!!"]}
        delayTime={500}
        callBack={test}
      />
    </div>
  );
};

ReactTypingEffectDemo.propTypes = {};

export default ReactTypingEffectDemo;
