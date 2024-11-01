export interface IApostar {
    apostar(apuesta:number):string;
    calcularResultado():void;
    obtenerGanancia():void;
}