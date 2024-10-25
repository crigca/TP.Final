import { IAnimal } from "../interfaces/IAnimal";

//Clase Perro que implementa la interfaz IAnimal
export class Perro implements IAnimal {
    private raza: string;
    private edad: number;
    private color: string;

    constructor( raza: string, edad: number, color: string) {
        this.raza = raza;
        this.edad = edad;
        this.color = color;
    }

    hacerSonido(): string {
        return "Guauuuu";
    }

    mover(): string {
        return "El perro esta corriendo"
    }

    toString(): string {
        return `El perro de raza ${this.raza} tiene una edad de: ${this.edad} años y es de color: ${this.color}`;
    }
}