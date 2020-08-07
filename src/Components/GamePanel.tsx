import React, { RefObject } from "react";
import Game from "../Core/Game";
import Business from "../Types/Business";
import BusinessDesc from "../Types/BusinessDesc";
import GameState from "../Types/GameState";
import BusinessPanelList from "./BusinessPanelList";
import { default as Settings } from '../settings.json';
import MoneyPanel from "./MoneyPanel";
import Manager from "../Types/Manager";
import ManagerPanelList from "./ManagerPanelList";

import './GamePanel.sass'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Upgrade from "../Types/Upgrade";
import UpgradesWindow from "./UpgradesWindow";
import OverlayWindow from "./OverlayWindow";
import BuyMultiplierButton from "./BuyMultiplierButton";

type GamePanelState = {
  Game: GameState;
  ManagersWindow: boolean;
  UpgradesWindow: boolean;
};

export default class GamePanel extends React.Component<object, GamePanelState> {

  Game: Game;
  managersWindow: RefObject<HTMLDivElement> = React.createRef();

  constructor(props: object)
  {
    super(props);
    this.Game = new Game();
    if (!this.load()) {
      this.Game.State.Businesses = Settings.Businesses.map((desc: BusinessDesc) => {
        return new Business(desc);
      });
      this.Game.State.Managers = Settings.Managers as Manager[]
      this.Game.State.Upgrades = Settings.Upgrades as Upgrade[]
    }
    this.state = { Game: this.Game.State, ManagersWindow: false, UpgradesWindow: false };
  }

  intervalID: any;

  static TickRatePerSecond: number = 60;

  static getCurrentTime() {
    return new Date().getTime() / 1000.0;
  }

  LastTickTime: number = GamePanel.getCurrentTime();

  static SaveInterval: number = 10.0;
  LastSaveTime: number = GamePanel.getCurrentTime();

  tick(time: number) {
    let deltaTime = time - this.LastTickTime;
    this.LastTickTime = time;
    this.Game.tick(deltaTime);
    this.setState({ Game: this.Game.State, ManagersWindow: this.state.ManagersWindow });
    if (this.LastTickTime - this.LastSaveTime > GamePanel.SaveInterval)
    {
      this.save();
    }
  }

  save() {
    let saveData = {
      state: this.Game.State,
      timestamp: this.LastTickTime
    }
    localStorage.setItem('GameState', JSON.stringify(saveData));
  }

  load() {
    let saveDataStr = localStorage.getItem('GameState');
    if (!saveDataStr) return false;
    let saveData = JSON.parse(saveDataStr);
    try {
      let State = saveData.state as GameState;
      for (let i = 0; i < State.Businesses.length; ++i) {
        State.Businesses[i] = State.Businesses[i] as Business
      }
      this.Game.State = State;
      this.fastSimulate((new Date().getTime()) / 1000.0 - saveData.timestamp)
      return true;
    }
    catch { }
    return false;
  }


  fastSimulate(deltaTime: number) {
    let totalProfit = 0;
    this.Game.State.Businesses.forEach((business) => {
      let iterations = 0;
      if (deltaTime > business.Desc.BaseTime && this.Game.hasManager(business)) {
        iterations = Math.trunc(deltaTime / business.Desc.BaseTime);
        totalProfit += iterations * this.Game.getBusinessProfit(business)
        let leftoverTime = deltaTime - iterations * business.Desc.BaseTime;
        this.Game.tickBusiness(leftoverTime, business);
      }
      else {
          if (deltaTime >= (1.0 - business.Progress) * business.Desc.BaseTime) {
            business.Progress = 0;
            business.Active = false;
            totalProfit += this.Game.getBusinessProfit(business);
          }
          else {
            this.Game.tickBusiness(deltaTime, business);
          }

      }
    });
    this.Game.State.Money += totalProfit;
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(GamePanel.getCurrentTime()),
      1000.0 / GamePanel.TickRatePerSecond
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  setManagersWindowVisible(visible: boolean)
  {
    this.setState({ Game: this.state.Game, ManagersWindow: visible, UpgradesWindow: this.state.UpgradesWindow})
  }

  setUpgradesWindowVisible(visible: boolean)
  {
    this.setState({ Game: this.state.Game, ManagersWindow: this.state.ManagersWindow, UpgradesWindow: visible})
  }

  render()
  {
    return <div className="gamePanel">
      <div className="gamePanelHeader">
        <MoneyPanel Money={this.state ? this.state.Game.Money : 0}></MoneyPanel>
        <div className="buttons">
          <span className="upgradesButton" onClick={() => {
            this.setUpgradesWindowVisible(true);
          }}>
            <FontAwesomeIcon icon="arrow-alt-circle-up" color="white"></FontAwesomeIcon>
            &nbsp;Upgrades
          </span>
          <span className="managersButton" onClick={() => this.setManagersWindowVisible(true) }>
            <FontAwesomeIcon icon="users" color="white"></FontAwesomeIcon>
            &nbsp;Managers
          </span>
          <BuyMultiplierButton multiplier={this.Game.BuyMultiplier} onClick={() => {
            this.Game.toggleMultiplier();
            this.setState({ Game: this.Game.State, ManagersWindow: this.state.ManagersWindow, UpgradesWindow: this.state.UpgradesWindow });
          }}/>
        </div>
      </div>
      <BusinessPanelList
        game={this.Game}
        onBusinessClicked={ (businessName: string) =>
          this.Game.activateBusiness(businessName)
      }
        onBusinessUpgrade={(businessName: string) =>
          this.Game.upgradeBusiness(businessName)
        }
      ></BusinessPanelList>

      {(() => {
        if (this.state.UpgradesWindow) {
          return <UpgradesWindow upgrades={this.state.Game.Upgrades} onClose={
            () => this.setUpgradesWindowVisible(false)
          } onBuyUpgrade={(businessName) => {
            this.Game.purchaseUpgrade(businessName);
            this.setState({ Game: this.Game.State, UpgradesWindow: this.state.UpgradesWindow, ManagersWindow: this.state.ManagersWindow });
          }}></UpgradesWindow>
        }
      })()}

      {
        (() => {
          if (this.state.ManagersWindow) {
            return <OverlayWindow title="Managers" onClose={() => {
              this.setManagersWindowVisible(false);
             }}>

              <div className="managerList">
                <ManagerPanelList money={this.state.Game.Money} managers={this.state.Game.Managers} onHire={(businessName: string) => {
                  let manager = this.Game.State.Managers.find((manager) => manager.BusinessName === businessName);
                  if (manager) {
                    if (this.Game.State.Money >= manager.Cost) {
                      manager.Hired = true;
                      this.Game.State.Money -= manager.Cost;
                      this.setState({ Game: this.Game.State, ManagersWindow: this.state.ManagersWindow, UpgradesWindow:this.state.UpgradesWindow })
                    }
                  }
                }}></ManagerPanelList>
                </div>
            </OverlayWindow>
          }
        })()
      }
    </div>
  }
}