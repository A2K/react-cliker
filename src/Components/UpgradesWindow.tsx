import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Upgrade from "../Types/Upgrade";
import { formatNumber } from "../Utils";
import OverlayWindow from "./OverlayWindow";

import './UpgradesWindow.sass';

type UpgradesWindowProps = {
  upgrades: Upgrade[];
  onClose?: () => any;
  onBuyUpgrade?: (businessName: string) => void;
};

export default class UpgradesWindow extends React.Component<UpgradesWindowProps, object> {
  render() {
    return (
      <OverlayWindow title="Upgrades" onClose={() => { this.props.onClose && this.props.onClose() }}>
        { this.props.upgrades.map((upgrade) => {
          return <div className="upgradePanel" key={upgrade.BusinessName}>
            <div className="upgradeDescription">
              { upgrade.BusinessName + " profit x3" }
            </div>
            {
              (() => {
                if (!upgrade.Purchased) {
                  return  <div className="upgradeBuyButton" onClick={() => this.props.onBuyUpgrade && this.props.onBuyUpgrade(upgrade.BusinessName)}>
                    <FontAwesomeIcon icon="coins" color="gold" />&nbsp; { formatNumber(upgrade.Cost) }
                  </div>;
                }
                else
                {
                  return <div className="upgradeBuyButton purchased">Purchased!</div>
                }
              })()
            }
          </div>
        })}
      </OverlayWindow>
    );
  }
}
