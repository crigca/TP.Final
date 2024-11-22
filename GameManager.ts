/**
 * Imports
*/
import { Games}                 from "./src/Models/Games";
import { Blackjack }            from "./src/Games/Blackjack";
import { Sicbo }                from "./src/Games/Sicbo";
import { SlotMachine }         from "./src/Games/SlotMachine";
import { SlotMachineSimple }    from "./src/Games/SlotMachineSimple";
import { SlotMachinesDeluxe }  from "./src/Games/SlotMachinesDeluxe";


export abstract class GamesManager {
  private games:Games[]=[];
  
  constructor(){
    this.games.push(new Blackjack());
    this.games.push(new Sicbo());
    this.games.push(new SlotMachine());
    this.games.push(new SlotMachineSimple());
    this.games.push(new SlotMachinesDeluxe());
  }
    
  public getGame(pname:string):Games|undefined{
    return this.games.find( game => !game.constructor.name.toLowerCase().localeCompare(pname.toLowerCase()) );
  }
  
}