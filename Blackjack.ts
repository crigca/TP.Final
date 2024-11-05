export class Blackjack {
    private valorMinimoApuesta: number = 30;
    private cartasJugador: number[];
    private cartasCasa: number[];
    private sumaDeCartas: number;
    private sumaDeCartasCasa: number;
    private enJuego: boolean = true;

    contarUnos(array: number[]): number {
        return array.filter(carta => carta === 1).length;
    }

    recibirCarta(jugador: "persona" | "casa"): number {
        if (jugador === "persona") {
            if (this.sumaDeCartas < 21 && this.enJuego) {
                const carta = this.cartaAleatoria(this.cartasJugador)
                this.sumaDeCartas += carta;

                return carta
            }
        }
        if (jugador === "casa") {
            if (this.sumaDeCartasCasa < 21 && this.enJuego) {
                const carta = this.cartaAleatoria(this.cartasCasa)
                this.sumaDeCartasCasa += carta;

                return carta
            }
        }

        return 0
    }

    cartaAleatoria(persona: number[]): number {
        if (persona) {
            const carta = Math.floor(Math.random() * 12) + 1;
            persona.push(carta)
            return carta
        }
        return -1
    }

    jugarCasa(): void {
        let count = 0;
        let asesEnMano = 0;
    
        while (true) {
            if (count < 17) {
                const carta: number = this.recibirCarta("casa");
                this.cartasCasa.push(carta);
    
                // Contabiliza los ases
                if (carta === 1) {
                    asesEnMano++;
                }
    
                // Suma la carta a la cuenta total
                count += carta;
    
                // Si el dealer tiene ases, intenta sumarlos como 11 sin superar 21
                while (asesEnMano > 0 && count + 10 <= 21) {
                    count += 10;
                    asesEnMano--;
                }
    
                // Si el total es 21 o más, termina
                if (count >= 21) {
                    break;
                }
            }
        }
    
        this.sumaDeCartasCasa = count;
    }

    quedarseJuego(): void {
        if (this.enJuego) {
            this.enJuego = false

            let contadorJugador:number = 0
            let contadorCasa:number = 0
            let contadorAceJugador:number = this.contarUnos(this.cartasJugador)

            for (let i = 0; i < this.cartasJugador.length; i++) {
                contadorJugador += this.cartasJugador[i]
            }

            if (contadorAceJugador > 0) {
                for (let i = 0; i < contadorAceJugador; i++) {
                    if ((contadorJugador + 10 < 22)) {
                        contadorJugador += 10;
                    } else {
                        break;
                    }
                }
            }

            this.sumaDeCartas = contadorJugador; // Para el jugador
            this.sumaDeCartasCasa = contadorCasa; // Para la casa

        } else {
            console.log("Ya no estás en juego.")
        }
    }
}