import { Games } from "../Models/Games";
import { Blackjack } from "../Games/Blackjack";
import { Sicbo } from "../Games/Sicbo";
import { SimpleSlotMachine } from "../Games/SimpleSlotMachine";
import { DeluxeSlotMachine } from "../Games/DeluxeSlotMachine";

export class GameManager {
    private games: Games[] = [];

    constructor() {
        // Register games in the constructor
        this.games.push(new Blackjack());
        this.games.push(new Sicbo()); 
        this.games.push(new SimpleSlotMachine());
        this.games.push(new DeluxeSlotMachine());
    }

    // Retrieve a game by name
    public getGame(gameName: string): Games | undefined {
        return this.games.find(game => game.getName().toLowerCase() === gameName.toLowerCase());
    }

    // List all available games
    public listGames(): string[] {
        return this.games.map(game => game.getName());
    }
}
