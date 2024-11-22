import * as readlineSync from "readline-sync";

export class Blackjack {
    private minimumBetValue: number = 30;
    private bet: number = 0;
    private playerCards: number[];
    private houseCards: number[];
    private playerTotal: number;
    private houseTotal: number;
    private inGame: boolean = false;

    placeBet(): void {
        while (this.bet < this.minimumBetValue) {
            const enteredBet = readlineSync.questionInt(
                `Ingresa tu apuesta (mínimo ${this.minimumBetValue}): `
            );
    
            if (enteredBet >= this.minimumBetValue) {
                this.bet = enteredBet;
                console.log(`Apuesta registrada: ${this.bet}`);
            } else {
                console.log("La apuesta no cumple con el mínimo. Intenta de nuevo.");
            }
        }
    
        this.inGame = true;
        this.playerCards = [];
        this.houseCards = [];
        this.playerTotal = 0;
        this.houseTotal = 0;
    
        console.log(`Apuesta registrada: ${this.bet}`);
        console.log("\n=== Inicio del juego ===");
    
        while (this.inGame) {
            console.log("\n=== Opciones ===");
            console.log("1. Alzar carta");
            console.log("2. Quedarse");
            console.log("3. Salir");
    
            const option = readlineSync.question("Elige una opción: ");
    
            switch (option) {
                case "1": {
                    const card = this.drawCard("player");
                    this.playerCards.push(card);
                    this.playerTotal += card;  // Actualiza la suma del jugador
                    console.log(`Recibiste una carta: ${card}`);
                    console.log(`Tu total actual: ${this.playerTotal}`);
    
                    // Mostrar las cartas del jugador
                    console.log("Tus cartas: " + this.playerCards.join(", "));
    
                    if (this.playerTotal > 21) {
                        console.log("Te pasaste. Pierdes la partida.");
                        this.inGame = false;
                    }
                    break;
                }
                case "2": {
                    console.log("Te quedaste. Turno de la casa.");
                    this.playHouse();
    
                    console.log(`Total de la casa: ${this.houseTotal}`);
                    console.log(`Tu total: ${this.playerTotal}`);
    
                    if (
                        this.houseTotal > 21 ||
                        (this.playerTotal <= 21 && this.playerTotal > this.houseTotal)
                    ) {
                        console.log("¡Ganaste!");
                    } else if (this.playerTotal === this.houseTotal) {
                        console.log("Empate.");
                    } else {
                        console.log("La casa gana.");
                    }
    
                    this.inGame = false;
                    break;
                }
                case "3": {
                    console.log("Has salido del juego.");
                    this.inGame = false;
                    break;
                }
                default:
                    console.log("Opción inválida. Intenta de nuevo.");
            }
        }
    }
    
    constructor() {
        this.resetGame();
    }

    private resetGame(): void {
        this.bet = 0;
        this.playerCards = [];
        this.houseCards = [];
        this.playerTotal = 0;
        this.houseTotal = 0;
        this.inGame = false;
    }

    countAces(array: number[]): number {
        return array.filter(card => card === 1).length;
    }

    drawCard(player: "player" | "house"): number {
        if (player === "player") {
            if (this.playerTotal < 21 && this.inGame) {
                const card = this.randomCard(this.playerCards);
                return card;
            }
        }
        if (player === "house") {
            if (this.houseTotal < 21 && this.inGame) {
                const card = this.randomCard(this.houseCards);
                return card;
            }
        }

        return 0;
    }

    randomCard(person: number[]): number {
        const card = Math.floor(Math.random() * 10) + 1; // Genera un número entre 1 y 10
        return card;
    }

    playHouse(): void {
        let count = 0;
        let acesInHand = 0;
    
        // Mientras la suma de cartas de la casa sea menor que 17, el dealer sigue tomando cartas
        while (count < 17) {
            const card: number = this.drawCard("house");
            this.houseCards.push(card);
    
            // Contabiliza los ases
            if (card === 1) {
                acesInHand++;
            }
    
            // Suma la carta a la cuenta total
            count += card;
    
            // Si el dealer tiene ases, intenta sumarlos como 11 sin superar 21
            while (acesInHand > 0 && count + 10 <= 21) {
                count += 10;
                acesInHand--;
            }
        }
    
        this.houseTotal = count;
    }

    stayGame(): void {
        if (this.inGame) {
            this.inGame = false;
    
            let playerCounter: number = 0;
            let houseCounter: number = 0;
    
            // Suma de las cartas del jugador
            for (let i = 0; i < this.playerCards.length; i++) {
                playerCounter += this.playerCards[i];
            }
    
            // Contabilizar ases como 1 inicialmente
            let playerAceCount: number = this.countAces(this.playerCards);
    
            // Ajuste de los ases para que se sumen como 11 cuando sea posible
            for (let i = 0; i < playerAceCount; i++) {
                if (playerCounter + 10 <= 21) {
                    playerCounter += 10;  // Añadir 10 por cada as que pueda ser un 11
                } else {
                    break;
                }
            }
    
            // Verificar si el jugador tiene un total correcto
            this.playerTotal = playerCounter; // Actualizar la suma del jugador
    
            // Suma de las cartas de la casa
            for (let i = 0; i < this.houseCards.length; i++) {
                houseCounter += this.houseCards[i];
            }
    
            // Contabilizar ases como 1 inicialmente
            let houseAceCount: number = this.countAces(this.houseCards);
    
            // Ajuste de los ases para que se sumen como 11 cuando sea posible
            for (let i = 0; i < houseAceCount; i++) {
                if (houseCounter + 10 <= 21) {
                    houseCounter += 10;
                } else {
                    break;
                }
            }
    
            // Verificar si la casa tiene un total correcto
            this.houseTotal = houseCounter; // Actualizar la suma de la casa
    
        } else {
            console.log("Ya no estás en juego.");
        }
    }
}

let blackjack = new Blackjack();

blackjack.placeBet();