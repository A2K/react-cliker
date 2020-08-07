import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Game from "../Core/Game";
import Business from "../Types/Business";
import { formatNumber } from "../Utils";
import "./BusinessBuyButton.sass";


type BuyButtonProps = {
  game: Game;
  business: Business;
  onClick?: () => void;
};

export default class BusinessBuyButton extends React.Component<BuyButtonProps, object> {

  canBuy() {
    return this.props.game.State.Money >= this.props.game.getUpgradeCostWithMultiplier(this.props.business).cost;
  }

  scaleCostText(cost: number) {
    let pow10 = Math.trunc(Math.log10(cost));
    if (pow10 > 5) {
      return pow10 - 5;
    }
    return 1;
  }
  render() {
    let cost = this.props.game.getUpgradeCostWithMultiplier(this.props.business).cost;
    let scale = this.scaleCostText(cost);
    let scaleCss = 'calc(' + Math.max(1, (10 - scale)) + 'px + ' + ((2 - scale / 20) + 'vmin') + ')'
    return (
      <div className={"businessBuyButton " + (this.canBuy() ? "canBuy" : "")} onClick={() => this.props.onClick && this.props.onClick()}>
        <div className="businessBuyLabel">
          Buy
           {(() => {
            let upgradeCost = this.props.game.getUpgradeCostWithMultiplier(this.props.business);
            if (upgradeCost.count !== 1) {
              return <div className="businessBuyMultiplier">
              x{ upgradeCost.count}
              </div>
           }  })()}
          </div>
        <div className={"businessBuyPrice"} style={
          {
            fontSize: scaleCss
          }
        }>
          <FontAwesomeIcon icon="coins" color="gold"></FontAwesomeIcon>
          {formatNumber(cost)}</div>
      </div>
    );
  }
}
