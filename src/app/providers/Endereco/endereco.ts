export class Endereco {

    public cep: string;
    public logradouro: string;
    public uf: string;
    public complemento: string;
    public bairro: string;
    public localidade: string;
    public endereco: string;

    constructor() {

        this.cep = '';
        this.uf = '';
        this.complemento = '';
        this.bairro = '';
        this.localidade = '';
        this.endereco = '';
        this.logradouro = this.getEnderecoFormatado();
    }

    public getEnderecoFormatado(): string {
        if (this.endereco && this.bairro && this.complemento) {
            return `${this.endereco}, ${this.bairro}, ${this.complemento}`;
        }
        return '';
    }
}