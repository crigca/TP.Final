export class Blackjack{
    private valorMinimoApuesta:number = 50;
    private cartasJugador:number[];
    private cartasCasa:number[];
    private sumaDeCartas:number;

    recibirCarta():void{
        for (const element of this.cartasJugador){
            this.sumaDeCartas += element
        }
    }

    cartaAleatoria(persona:number[]):number{
        if (persona){
            const carta = Math.floor(Math.random() * 12) + 1;
            persona.push(carta)
            return carta
        }
        return -1
    }
}