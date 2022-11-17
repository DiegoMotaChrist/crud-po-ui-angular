import { Endereco } from '../Endereco/endereco';
import { Empresa } from '../Empresa/empresa';
import { ProtheusInfo } from '../../backend/protheus.info';

export class Customer {

    public id: string
    public info: ProtheusInfo;
    public endereco: Endereco;
    public empresa: Empresa;

    constructor() {
        this.id = '';
        this.info = new ProtheusInfo();
        this.endereco = new Endereco();
        this.empresa = new Empresa();
    }
}