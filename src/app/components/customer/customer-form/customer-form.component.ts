import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PoDynamicFormField } from '@po-ui/ng-components';
import { Customer } from 'src/app/providers/customer/customer';
import { CustomerProvider } from 'src/app/providers/customer/customer.provider';
import { CompanyProvider } from 'src/app/providers/Empresa/company.provider';
import { AddressProvider } from 'src/app/providers/Endereco/address.provider';
import { FormProvider } from 'src/app/providers/form/form.provider';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  preserveWhitespaces: true

})

export class CustomerFormComponent implements OnInit {

  public customerValues: any = {}
  public fields: Array<PoDynamicFormField>;
  public customer: Customer = new Customer();
  public disabledIdToUpdate: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private customerPvrd: CustomerProvider,
    private companyPrvd: CompanyProvider,
    private addressPvrd: AddressProvider,
    public formPrvd: FormProvider

  ) { }

  ngOnInit() {
    this.customer = this.route.snapshot.data['customer'];

    if (!this.customer) {
      this.customer = new Customer();
    }

    this.fields = [
      { property: 'id', key: true, visible: false },
      { label: 'Nome', property: 'nome', divider: 'Dados Empresariais', gridColumns: 4, required: true },
      {
        label: 'CNPJ', property: 'cnpj', gridColumns: 2,
        validate: () => {
          this.setInfoByCNPJ();
        }, required: true
      },
      { label: 'Nome Fantasia', property: 'fantasia', gridColumns: 3, required: true},
      { label: 'Loja', property: 'loja', gridColumns: 1, required: true},
      { label: 'Tipo', gridColumns: 2, property: 'tipo', required: true },
      {
        label: 'CEP', property: 'cep', divider: 'Endereço', gridColumns: 2,
        validate: () => {
          this.setInfoByCEP();
        }, required: true
      },
      { label: 'Logradouro', property: 'endereco', required: true },
      { label: 'Cidade', property: 'localidade', required: true },
      { label: 'Estado', property: 'uf', gridColumns: 2, required: true }

    ];

    this.customerValues = this.formPrvd.setFormToCustomer(this.customer);

  }

  onSubmit(): void {
    this.route.params.subscribe((params: any) => {
      const idParams: string = params['id'];
      const customerByForm: Customer = this.formPrvd.getCustomerToForm(this.customer);
      this.customerPvrd.save(this.customerValues.id, idParams, customerByForm);
    });
  }

  public setInfoById(): void {
    this.customerPvrd.listenerId(this.customerValues, this.formPrvd.getCustomerToForm(this.customer));
  }

  public setInfoByCNPJ(): void {
    this.companyPrvd.listenerCNPJ(this.customerValues, this.formPrvd.getCustomerToForm(this.customer));
    setTimeout(() => {
      this.customerValues = this.formPrvd.setFormToCustomer(this.formPrvd.getCustomerToForm(this.customer));
    }, 1000);
  }

  public setInfoByCEP(): void {
    this.addressPvrd.listenerCEP(this.customerValues, this.formPrvd.getCustomerToForm(this.customer));
    setTimeout(() => {
      this.customerValues = this.formPrvd.setFormToCustomer(this.formPrvd.getCustomerToForm(this.customer));
    }, 1000);
  }
}
