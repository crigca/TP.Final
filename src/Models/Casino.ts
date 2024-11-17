import { GameManager } from "./GameManager";
import { Balance } from "./Balance";

export class Casino {
    private static instance: Casino;
    private gameManager: GameManager; // Composition relationship with GameManager
    private userBalance: Balance; // Composition relationship with Balance

    private constructor() {
        this.gameManager = new GameManager(); // Composition, Casino manages the instance
        this.userBalance = new Balance();
    }

    public static getInstance(): Casino {
        if (!Casino.instance) {
            Casino.instance = new Casino();
        }
        return Casino.instance;
    }

    public getBalance(): number {
        return this.userBalance.getUserBalance();
    }

    public setBalance(amount: number): void {
        this.userBalance.setUserBalance(amount);
    }

    
}
