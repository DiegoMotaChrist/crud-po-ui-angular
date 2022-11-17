import { Customer } from '../customer/customer';
import { EnderecoService } from 'src/app/providers/Endereco/endereco.service';
import { Endereco } from './endereco';
import { Injectable } from '@angular/core';
import { FormProvider } from '../form/form.provider';

@Injectable()
export class AddressProvider {

    public customerValues: any = {};

    constructor(
        private enderecoSvc: EnderecoService,
        private formPrvd: FormProvider) { }

    listenerCEP(customerValuesToChange: any, customerInstanceByForm: Customer): Promise<any> {
        return new Promise((resolve) => {
            const cep: string = customerValuesToChange.cep;
            this.enderecoSvc.loadByCEP(cep).subscribe((endereco: Endereco) => {
                try {
                    if (endereco) {
                        this.formPrvd.setFormToCustomer(customerValuesToChange, endereco, 
                            customerInstanceByForm.empresa, 
                            customerInstanceByForm.info);                        
                            resolve(endereco);
                    }
                } catch (error) {
                    console.error(error);
                    resolve(endereco);
                }
            });
        });
    }
}