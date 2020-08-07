import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import './MoneyPanel.sass'

type MoneyProps = {
  Money: number;
};

export default class MoneyPanel extends React.Component<MoneyProps, { lastRenderMoney: number }> {
  constructor(props: Readonly<MoneyProps>) {
    super(props);
    this.state = { lastRenderMoney: this.props.Money };
  }
  render() {
    let formatter = new Intl.NumberFormat('en-US', {});
    return (
      <div className="moneyPanel">
        <FontAwesomeIcon icon="coins" color="gold"></FontAwesomeIcon> { formatter.format(this.props.Money) }
      </div>
    );
  }
}
