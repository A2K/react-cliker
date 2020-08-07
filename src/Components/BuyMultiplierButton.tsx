import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import './BuyMultiplierButton.sass';

type ButtonProps = {
  multiplier: number | string;
  onClick?: () => void;
};

export default class BuyMultiplierButton extends React.Component<ButtonProps, object> {
  render() {
    return (
      <div className="multiplierButton" onClick={this.props.onClick}>
        <FontAwesomeIcon className="multiplierIcon" icon="times" />
        <span className="multiplierText">{ this.props.multiplier}</span>
      </div>
    );
  }
}
