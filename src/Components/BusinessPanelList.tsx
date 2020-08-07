import React from "react";
import Game from "../Core/Game";
import BusinessPanel from "./BusinessPanel";

import './BusinessPanelList.sass';

type BusinessList = {
  game: Game;
  onBusinessClicked?: (businessName: string) => any;
  onBusinessUpgrade?: (businessName: string) => any;
}

export default class BusinessPanelList extends React.Component<BusinessList, object> {

  render() {
    return <div className="businessPanelList">
      {
        this.props.game.State.Businesses.map(business => {
          return <BusinessPanel key={business.Desc.Name}
            game={this.props.game}
            Business={business}
            onClicked={
            (businessName: string) => { if (this.props.onBusinessClicked) this.props.onBusinessClicked(businessName) }
          }
            onUpgraded={
              (businessName: string) => { if (this.props.onBusinessUpgrade) this.props.onBusinessUpgrade(businessName) }
            }
          ></BusinessPanel>
        })
      }
    </div>
  }
}

