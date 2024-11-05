import { Tragamonedas } from "./Tragamonedas";

export class TragamonedasDeluxe extends Tragamonedas {
    protected simbolos: string[];
    protected simboloMultiplicador: Map<string, number>;
    private estatusRequerido: boolean;

    constructor() {
        super();
        this.valorMinimoApuesta = 10000;
        this.simbolos = ["💎", "👑", "🏆", "👜", "🍾", "🚗", "🕶️"];
        this.simboloMultiplicador = new Map([
            ["💎", 3],
            ["👑", 2.5],
            ["🏆", 2],
            ["👜", 1.8],
            ["🍾", 1.6],
            ["🚗", 1.4],
            ["🕶️", 1.2],
        ]);
        this.estatusRequerido = false;
        this.ganancia=0;
    }

    public setEstatusRequerido(estatus: boolean): void {
        this.estatusRequerido = estatus;
    }

    public calcularResultado(): { ganancia: number, apuesta: number,resultado:string } {
        if (!this.estatusRequerido) {
            console.log("No puedes jugar porque el estatus requerido no está habilitado.");
            return { ganancia: 0, apuesta:0,resultado:"" };
        }

        if (this.apuesta < this.valorMinimoApuesta || this.apuesta == null) {
            console.log(`Debes apostar ${this.valorMinimoApuesta} o más para poder jugar`);
            return { ganancia: 0, apuesta: 0,resultado:"" };
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
            return {ganancia:this.ganancia, apuesta:this.apuesta,resultado:`Resultado: ${slot1} | ${slot2} | ${slot3}. Usted ha sacado un x2x${multiplicador} y ha ganado $${this.ganancia}`};
        } else {
            return {ganancia:this.ganancia, apuesta:this.apuesta,resultado:`Resultado: ${slot1} | ${slot2} | ${slot3}. Usted ha sacado un x0 y ha perdido $${this.apuesta}`};
        }

        // Reiniciar ganancia a 0 después de haberla retornado
        const retornoGanancia = this.ganancia; // Guarda la ganancia para retornar
        this.ganancia = 0; // Reiniciar la ganancia
        return { ganancia: retornoGanancia, apuesta: this.apuesta,resultado:"" };
    }
}
