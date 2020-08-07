import React from "react";

import './BusinessProgressBar.sass'

type ProgressBarProps = {
  value: number;
};

export default class BusinessProgressBar extends React.Component<ProgressBarProps, object> {
  render() {
    return (
      <div className="progressBar">
        <div className="progressBarProgress" style={{
          width: this.props.value + "%"
        }}>
          &nbsp;
        </div>
      </div>
    );
  }
}
