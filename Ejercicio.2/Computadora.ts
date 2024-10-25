import { ComputadoraBuilder } from "./ComputadoraBuilder";

export class Computadora {
    private procesador?: string;
    private ram?: string;
    private almacenamiento?: string;
    private tarjetGrafica?: string;
    private sistemaOperativo?: string;

    constructor(builder: ComputadoraBuilder) {
        this.procesador = builder.procesador;
        this.ram = builder.ram;
        this.almacenamiento = builder.almacenamiento;
        this.tarjetGrafica = builder.tarjetGrafica;
        this.sistemaOperativo = builder.sistemaOperativo;
    }

    //Detalles de la computadora
    obtenerDetalles(): string {
        return `
            Detalles de la computadora:
            Procesador: ${this.procesador || "No especificado"}
            RAM: ${this.ram || "No especificado"}
            Almacenamiento: ${this.almacenamiento || "No especificado"}
            Tarjeta Grafica: ${this.tarjetGrafica || "No especificado"}
            Sistema Operativo: ${this.sistemaOperativo || "No especificado"}
            `;
    }
}