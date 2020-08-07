
import BusinessDesc from './BusinessDesc'

export default class Business
{
  Level: number = 0;
  Progress: number = 0.0;
  Active: boolean = false;
  Desc: BusinessDesc = { Name: "None", BaseCost: 0, BaseProfit: 0, BaseTime: 0, Icon: { Name: 'exclamation-triangle', Color: 'red' } };

  constructor(desc: BusinessDesc)
  {
    this.Desc = desc;
    if (this.Desc.BaseLevel)
      this.Level = this.Desc.BaseLevel;
  }
}