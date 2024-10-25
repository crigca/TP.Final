import { MenuBuilder } from "./MenuBuilder";

export class Menu {
    private entrada?: string;
    private platoPrincipal?: string;
    private postre?: string;
    private bebida?: string;

    
    constructor(builder: MenuBuilder) {
        this.entrada = builder.entrada;
        this.platoPrincipal = builder.platoPrincipal;
        this.postre = builder.postre;
        this.bebida = builder.bebida;
    }

    // Metodo para mostrar los detalles del menu.
    public mostrarDetalles(): string {
        return `
            Menu:
            Entrada: ${this.entrada || "No especificado"}
            Plato Principal: ${this.platoPrincipal || "No especificado"}
            Postre: ${this.postre || "No especificado"}
            Bebida: ${this.bebida || "No especificado"}
        `;
    }
}
