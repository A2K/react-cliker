import React from "react";

import './BusinessLevelBar.sass'

type LevelBarProps = {
  level: number;
};

export default class BusinessLevelBar extends React.Component<LevelBarProps, object> {
  render() {
    return (
      <div className="buttonLevelBar">
        <div className="buttonLevelProgress" style={{
          // TODO: width: this.props.level * 10 + '%'
          width: 0
        }}>&nbsp;</div>

        <div className="businessLevelLabel">
          {this.props.level}
        </div>
      </div>
    );
  }
}
