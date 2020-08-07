import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Manager from "../Types/Manager";
import { formatNumber } from "../Utils";

import './ManagerPanel.sass'

type ManagerPanelProps = {
  manager: Manager;
  canHire?: boolean;
  onHire?: (businessName: string) => any;
}

export default class ManagerPanel extends React.Component<ManagerPanelProps, object> {
  render() {
    return (
      <tr className="managerPanel">
        <td>
          <FontAwesomeIcon className="managerIcon" icon="user"></FontAwesomeIcon>
        </td>
        <td>
          <div className="managerName">
            {this.props.manager.Name}
          </div>
          <div className="managerDesc">
            {this.props.manager.Desc}
          </div>
        </td>
        <td>
          {
            (() => {
              if (this.props.manager.Hired) {
                return <div>Hired</div>
              } else {
                return <div className={"managerHireButton"
                  + (this.props.canHire ? " canHire" : "")
                } onClick={() => {
                  if (this.props.onHire) {
                    this.props.onHire(this.props.manager.BusinessName);
                  }
                }}>
                  <FontAwesomeIcon icon="coins" color="gold" />
                  &nbsp; { formatNumber(this.props.manager.Cost) }
                </div>
              }
            })()
          }

        </td>
      </tr>
    );
  }
}
