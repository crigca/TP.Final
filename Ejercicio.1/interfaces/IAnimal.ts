//Interfaz IAnimal que define los metodos que debe implementar todas las clases de animales.

export interface IAnimal {
    hacerSonido(): string;
    mover(): string;
}