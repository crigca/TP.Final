import { IAnimal } from "../interfaces/IAnimal";

//Clase Gato que implementa la interfaz IAnimal
export class Gato implements IAnimal {
    private raza: string;
    private edad: number;

    constructor(raza: string, edad: number) {
        this.raza = raza;
        this.edad = edad;
    }

    hacerSonido(): string {
        return "Miauuuu";
    }

    mover(): string {
        return "El gato esta saltando"
    }

    toString(): string {
        return `El gato de raza ${this.raza} tiene una edad de: ${this.edad} años`;
    }
}