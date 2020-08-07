import React from "react";
import Manager from "../Types/Manager";
import ManagerPanel from "./ManagerPanel";

type ManagerPanelListProps = {
  money: number;
  managers: Manager[];
  onHire?: (businessName: string)=>any
};

export default class ManagerPanelList extends React.Component<ManagerPanelListProps, object> {
  render() {
    return (
      <div className="managerPanelList" >
        <table>
          <tbody>
        { this.props.managers.map((manager) => {
          return <ManagerPanel key={manager.BusinessName} manager={manager} canHire={this.props.money >= manager.Cost} onHire={(businessName: string) => {
            this.props.onHire && this.props.onHire(businessName)
          }}></ManagerPanel>
        })}
            </tbody>
          </table>
      </div>
    );
  }
}
