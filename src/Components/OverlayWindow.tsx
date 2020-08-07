import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import './OverlayWindow.sass';

type WindowProps = {
  title: string;
  onClose: () => any;
};

export default class OverlayWindow extends React.Component<WindowProps, object> {
  render() {
    return (
      <div className="overlayWindow">
        <div className="overlayWindowHeader">
          <div className="overlayWindowTitle">{this.props.title}</div>
          <div className="overlayWindowClose" onClick={() => {
            this.props.onClose && this.props.onClose();
          }}><FontAwesomeIcon icon="window-close"/></div>
        </div>
        <div className="overlayWindowContent">
          { this.props.children }
        </div>
      </div>
    );
  }
}
