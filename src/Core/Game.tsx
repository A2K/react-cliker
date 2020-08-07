import Business from "../Types/Business";
import GameState from "../Types/GameState";

export default class Game
{
  State: GameState;
  BusinessesToActivate: string[];
  BuyMultiplier: string | number = 1;

  constructor(State?: GameState)
  {
    this.State = State ? State : new GameState();
    this.BusinessesToActivate = [];
  }

  tick(deltaTime: number): void
  {
    this.State.Businesses.forEach((business: Business, index: number) => {
      this.tickBusiness(deltaTime, business);
    });

    this.BusinessesToActivate.forEach((name: string) => {
      let business = this.State.Businesses.find((business: Business) => business.Desc.Name === name);
      if (business && !business.Active && business.Level > 0) {
        business.Active = true;
      }
    });
    this.BusinessesToActivate = [];
  }
  hasManager(business: Business) {
    let manager = this.State.Managers.find((manager) => manager.BusinessName === business.Desc.Name);
    if (!manager) return false;
    if (manager.Hired) return true;
    return false;
  }

  tickBusiness(deltaTime: number, business: Business) {
    if (business.Active) {
      let progressTime = business.Progress * business.Desc.BaseTime + deltaTime;
      if (progressTime > business.Desc.BaseTime) {
        this.State.Money += this.getBusinessProfit(business);
        if (this.hasManager(business)) {
          business.Progress = Math.max(0, (deltaTime - business.Desc.BaseTime) / business.Desc.BaseTime);
        } else {
          business.Progress = 0;
          business.Active = false;
        }
      } else {
        business.Progress = progressTime / business.Desc.BaseTime;
      }
    }
    if (business.Level > 0) {
      let isManaged = false;
      this.State.Managers.forEach((manager) => {
        if (manager.Hired && business.Desc.Name === manager.BusinessName)
          isManaged = true;
      });
      if (isManaged) {
        business.Active = true;
      }
    }
  }

  getCanBuyMax(business: Business, mulOverride?: number | string)
  {
    let count = 0;
    let total = 0;

    for (let i = 1; (this.BuyMultiplier === 'MAX') || (i <= this.BuyMultiplier); ++i) {
      let levelCost = business.Desc.BaseCost * (business.Level + i);
      if (total + levelCost > this.State.Money)
        break;
      else {
        count++;
        total += levelCost;
      }
    }
    return { count: count, price: total }
  }

  getUpgradeCostWithMultiplier(business: Business)
  {
    let canBuyMax = this.getCanBuyMax(business, this.BuyMultiplier);
    if (this.BuyMultiplier === 'MAX')
    {
      if (canBuyMax.count === 0) {
        return {
          count: 1,
          cost: this.getBusinessUpgradeCost(business)
        }
      }
      return {
        count: canBuyMax.count,
        cost: canBuyMax.price
      };
    }
    else
    {
      return {
        count: this.BuyMultiplier as number,
        cost: this.getBusinessUpgradeCost(business, this.BuyMultiplier as number)
      }
    }
  }

  getBusinessUpgradeCost(business: Business, multiplier: number = 1): number {
    let total = 0;
    for (let i = 1; i <= multiplier; ++i){
      total += business.Desc.BaseCost * (business.Level + i)
    }
    return total
  }

  getBusinessProfit(business: Business): number {
    let upgraded = this.State.Upgrades.find(
      (upgrade) => upgrade.Purchased && upgrade.BusinessName === business.Desc.Name) !== undefined;
    return business.Desc.BaseProfit * business.Level * (upgraded ? 3 : 1);
  }

  activateBusiness(name: string)
  {
    if (this.BusinessesToActivate.indexOf(name) >= 0)
      return;

    this.BusinessesToActivate.push(name);
  }

  upgradeBusiness(name: string)
  {
    let business = this.State.Businesses.find((business: Business) => business.Desc.Name === name);
    if (business) {
      let upgrade = this.getUpgradeCostWithMultiplier(business);

      if (business.Level === 0) {
        upgrade.cost = business.Desc.BaseCost;
        upgrade.count = 1;
      }
      if (this.State.Money >= upgrade.cost)
      {
        this.State.Money -= upgrade.cost;
        business.Level += upgrade.count;
      }
    }
  }

  purchaseUpgrade(businessName: string)
  {
    this.State.Upgrades.forEach((upgrade) => {
      if (upgrade.BusinessName === businessName) {
        if (!upgrade.Purchased) {
          if (this.State.Money >= upgrade.Cost) {
            this.State.Money -= upgrade.Cost;
            upgrade.Purchased = true;
          }
        }
      }
    })
  }

  BuyMultipliers = [1, 10, 100, 'MAX']

  toggleMultiplier() {
    let index = this.BuyMultipliers.indexOf(this.BuyMultiplier);
    if (index < 0) index = 0;
    this.BuyMultiplier = this.BuyMultipliers[(index + 1) % this.BuyMultipliers.length]
  }
}