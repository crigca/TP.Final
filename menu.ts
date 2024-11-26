import * as readlineSync  from "readline-sync"; // Dependency to read user input
import {Games}            from "./src/Models/Games.ts";

import  b               from "./View/balanceMenu.ts";
import  s               from "./View/sicboMenu.ts";
import  bj              from "./View/blackjackMenu.ts";
import  dsm             from "./View/deluxeSlotMachineMenu.ts";
import  ssm             from "./View/simpleSlotMachineMenu.ts";

// Function to display the menu and handle user interaction
export function showMenu(pgames: Games): void {
    let exit = false;
    let option;

    while(!exit){

      console.log("\nWelcome to the Casino");
      console.log("1. Add coins");
      console.log("2. Play Sicbo");
      console.log("3. Play Black Jack");
      console.log("4. Play Delux Slotmachine");
      console.log("5. Play Slotmachine");
      console.log("6. Exit Casino");
      console.log("Your balance is: "+pgames.getInstace().getBalance());
      option = readlineSync.questionInt("Select an option: ")
      switch(option) {
        case "1":          
          b.Menu(pgames.getInstace());
        break;
        case "2":
          /* check balance, min bet*/
          if (pgames.getInstace().getBalance()>1){
            let g=pgames.getInstace().getGameManager().getGame("Sicbo");
            s.Menu(g);
          } else {
            b.Menu(pgames.getInstace());            
          }

        break;
        case "3":
           /* check balance, min bet*/
           let g=pgames.getInstace().getGameManager().getGame("BlackJack");
           if (pgames.getInstace().getBalance()>=g.getminimumBetValue()){
            bj.Menu(g);
           } else {
             b.Menu(pgames.getInstace());            
           }
        break;
        case "4":
          /* check balance, min bet*/
          if (pgames.getInstace().getBalance()>1){
            let g=pgames.getInstace().getGameManager().getGame("deluxeSlotMachine");
            dsm.Menu(g);
           } else {
             b.Menu(pgames.getInstace());            
           }
        break;
        case "5":
          /* check balance, min bet*/
          if (pgames.getInstace().getBalance()>1){
            let g=pgames.getInstace().getGameManager().getGame("simpleSlotMachine");
            ssm.Menu(g);
          } else {
            b.Menu(pgames.getInstace());            
          }
              
        break;
        case "6":
          exit=true;
        break;
        default:          
      }

    }
   
}