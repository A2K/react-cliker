import React from "react";
import Business from "../Types/Business";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from "@fortawesome/fontawesome-common-types";
import BusinessProgressBar from "./BusinessProgressBar";

import './BusinessPanel.sass'
import BusinessLevelBar from "./BusinessLevelBar";
import BusinessBuyButton from "./BusinessBuyButton";
import Game from "../Core/Game";
import { formatNumber } from "../Utils";

type BusinessPanelProps = {
  game: Game;
  Business: Business;
  onClicked?: (businessName: string) => any;
  onUpgraded?: (businessName: string) => any;
}

export default class BusinessPanel extends React.Component<BusinessPanelProps, Business> {

  render() {
    if (this.props.Business.Level > 0)
      return this.render_Business();
    else
      return this.render_Buy();
  }

  canBuy(price?: number) {
    if (!price) price = this.props.game.getBusinessUpgradeCost(this.props.Business)
    return this.props.game.State.Money >= price;
  }

  render_Buy() {
    return (
      <div className={"businessBuyPanel " + (this.canBuy() ? "canBuy" : "")} onClick={
        () => { if (this.props.onUpgraded) this.props.onUpgraded(this.props.Business.Desc.Name) }
      }>
        <div>{this.props.Business.Desc.Name}</div>
        <div><FontAwesomeIcon icon="coins" color="gold"/> {formatNumber( this.props.Business.Desc.BaseCost)}</div>
      </div>
    )
  }

  render_Business() {
    return (
      <div className="businessPanel">

        <div className={this.props.Business.Active ? "bussinessPanelIconBlock active" : "bussinessPanelIconBlock"} onClick={
          () => { if (this.props.onClicked) this.props.onClicked(this.props.Business.Desc.Name) }
        }>
          <div className="businessIconWrapper">
            <FontAwesomeIcon className="businessIcon"
              icon={this.props.Business.Desc.Icon.Name as IconName}
              color={this.props.Business.Desc.Icon.Color}
            />
            <FontAwesomeIcon className="businessStartIcon" icon="play"color="#00ff00"/>
          </div>
          <div className="businessLevel">
            <BusinessLevelBar level={this.props.Business.Level}/>
          </div>
        </div>

        <div className="businessPanelControlBlock">
          <div className={"businessPanelProgress" + (this.props.Business.Active ? " active" : "")}
            onClick={() => { if (this.props.onClicked) this.props.onClicked(this.props.Business.Desc.Name) }}
          >
            <BusinessProgressBar value={this.props.Business.Progress * 100} />
            <div className="businessPanelProfit">
              <FontAwesomeIcon icon="coins"></FontAwesomeIcon>
              {formatNumber(this.props.game.getBusinessProfit(this.props.Business))}</div>
          </div>
          <BusinessBuyButton
            game={this.props.game}
            business={this.props.Business}
            onClick={() => { if (this.props.onUpgraded) this.props.onUpgraded(this.props.Business.Desc.Name) }}/>
        </div>

      </div>
    );
  }
}
