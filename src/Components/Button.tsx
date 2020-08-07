import React from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
};

export default class Button extends React.Component<ButtonProps, object> {
  render() {
    return (
      <div className="button" onClick={() => this.props.onClick && this.props.onClick() }>
        { this.props.text }
      </div>
    );
  }
}
