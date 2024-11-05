import { Tragamonedas } from "./Tragamonedas";

export class TragamonedasSimple extends Tragamonedas{
    protected simbolos:string[];
    protected simboloMultiplicador:Map <string, number>;

    constructor() {
        super();
        this.valorMinimoApuesta=10;
        this.simbolos=["♦","♥","♣","♠","☀️","🌙","⭐"]
        this.simboloMultiplicador = new Map([
            ["♦", 3],
            ["♥", 2],
            ["♣", 1.5],
            ["♠", 1.4],
            ["☀️", 1.3],
            ["🌙", 1.2],
            ["⭐", 1.1],
        ]);
        this.ganancia=0;
    }
    

    public calcularResultado():{ganancia:number,apuesta:number,resultado:string}{
        if(this.apuesta<this.valorMinimoApuesta || this.apuesta == null){
            console.log(`Debes apostar ${this.valorMinimoApuesta} o más para poder jugar`)
            return {ganancia:this.ganancia, apuesta:0,resultado:""};
        }
        let slot1 = this.simbolos[Math.floor(Math.random() * this.simbolos.length)];
        let slot2 = this.simbolos[Math.floor(Math.random() * this.simbolos.length)];
        let slot3 = this.simbolos[Math.floor(Math.random() * this.simbolos.length)];

        this.ganancia=0;

        if (slot1 === slot2 && slot2 === slot3) {
            let multiplicador = this.simboloMultiplicador.get(slot1) || 1;
            this.ganancia = this.apuesta * 3 * multiplicador;

            return {ganancia:this.ganancia, apuesta:this.apuesta,resultado:`Resultado: ${slot1} | ${slot2} | ${slot3}. Usted ha sacado un x3x${multiplicador} y ha ganado $${this.ganancia}`};
        } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {

            let simboloGanador = slot1 === slot2 ? slot1 : slot3;
            let multiplicador = this.simboloMultiplicador.get(simboloGanador) || 1;

            this.ganancia = this.apuesta * 2 * multiplicador;

            return {ganancia:this.ganancia, apuesta:this.apuesta,resultado:`Resultado: ${slot1} | ${slot2} | ${slot3}.Usted ha sacado un x2x${multiplicador} y ha ganado $${this.ganancia}`};
        } else {
            return {ganancia:this.ganancia, apuesta:this.apuesta,resultado:`Resultado: ${slot1} | ${slot2} | ${slot3}Usted ha sacado un x0 y ha perdido $${this.apuesta}`};
        }
    }
}