import { Customer } from '../customer/customer';
import { Empresa } from './empresa';
import { EmpresaService } from './empresa.service';
import { Injectable } from '@angular/core';
import { FormProvider } from '../form/form.provider';

@Injectable()
export class CompanyProvider{

constructor(private empresaSvc:EmpresaService,
    private formPrvd: FormProvider) {}

    listenerCNPJ(customerValuesToChange: Customer, customerInstanceByForm:Customer): Promise<any> {
        return new Promise((resolve) => {
            const cnpj: string = customerInstanceByForm.empresa.cnpj;

            this.empresaSvc.loadByCNPJ(cnpj).subscribe((empresa: Empresa) => {
                try {
                    if (empresa) {
                        this.formPrvd.setFormToCustomer(customerValuesToChange, customerInstanceByForm.endereco,
                        empresa, customerInstanceByForm.info);
                        resolve(empresa);
                    }
                } catch (error) {
                    console.error(error);
                    resolve(empresa);
                }
            });
        });
    }
}