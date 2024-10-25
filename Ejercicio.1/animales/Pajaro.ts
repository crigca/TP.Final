import { IAnimal } from "../interfaces/IAnimal";

// Clase Pajaro que implementa la interfaz IAnimal
export class Pajaro implements IAnimal {
    private raza: string;
    private edad: number;

    constructor(raza: string, edad: number) {
        this.raza = raza;
        this.edad = edad;
    }

    hacerSonido(): string {
        return "Pio Pio";
    }

    mover(): string {
        return "El pajaro esta volando";
    }

    toString(): string {
        return `El pajaro de raza ${this.raza} tiene una edad de: ${this.edad} años`
    }
}