import { Customer } from '../customer/customer';
import { Endereco } from '../Endereco/endereco';
import { Empresa } from '../Empresa/empresa';
import { ProtheusInfo } from 'src/app/backend/protheus.info';

export class FormProvider {

    customer: any = {};
    setFormToCustomer(customer: Customer, endereco?: Endereco, empresa?: Empresa, info?: ProtheusInfo) {
        this.customer = {
            id: customer.id,
            cnpj: empresa != undefined ? empresa.cnpj : customer.empresa.cnpj,
            nome: empresa != undefined ? empresa.nome : customer.empresa.nome,
            fantasia: empresa != undefined ? empresa.fantasia : customer.empresa.fantasia,
            tipo: info != undefined ? info.tipo : customer.info.tipo,
            loja: info != undefined ? info.loja : customer.info.loja,
            cep: endereco != undefined ? endereco.cep : customer.endereco.cep,
            endereco: endereco != undefined ? `${endereco.logradouro + ' ' + endereco.localidade}` : customer.endereco.endereco,
            uf: endereco != undefined ? endereco.uf : customer.endereco.uf,
            localidade: endereco != undefined ? endereco.localidade : customer.endereco.localidade
        }

        return this.customer;
    };

    getCustomerToForm(customer?: Customer): Customer {
        if (customer) {
            customer.id = this.customer.id,
                customer.empresa.cnpj = this.customer.cnpj,
                customer.empresa.nome = this.customer.nome,
                customer.empresa.fantasia = this.customer.fantasia,
                customer.info.loja = this.customer.loja,
                customer.info.tipo = this.customer.tipo,
                customer.endereco.cep = this.customer.cep,
                customer.endereco.endereco = this.customer.endereco,
                customer.endereco.localidade = this.customer.localidade,
                customer.endereco.uf = this.customer.uf
            return customer;

        } else {
            setTimeout(() => {
                let newCustomer: any = {
                    id: this.customer.id,
                    cnpj: this.customer.cnpj,
                    nome: this.customer.nome,
                    fantasia: this.customer.fantasia,
                    tipo: this.customer.tipo,
                    loja: this.customer.loja,
                    cep: this.customer.cep,
                    endereco: this.customer.cep,
                    uf: this.customer.cep,
                    localidade: this.customer.localidade
                }
                return newCustomer;
            }, 2000);
        }
    }
}