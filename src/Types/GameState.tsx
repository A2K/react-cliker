import Business from "./Business";
import Manager from "./Manager";
import Upgrade from "./Upgrade";

export default class GameState
{
  Money: number = 0;
  Businesses: Business[] = [];
  Managers: Manager[] = [];
  Upgrades: Upgrade[] = [];
}