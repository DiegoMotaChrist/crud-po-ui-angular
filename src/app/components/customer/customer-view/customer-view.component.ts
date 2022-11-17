import { Component, OnInit } from '@angular/core';
import { PoPageDynamicDetailActions, PoPageDynamicDetailField } from '@po-ui/ng-templates';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/providers/customer/customer';
import { CustomerProvider } from 'src/app/providers/customer/customer.provider';
@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
})
export class CustomerViewComponent implements OnInit {

  title = 'Dados';

  readonly actions: PoPageDynamicDetailActions = {
    back: '/',
    edit: 'customers/edit/:id',
    remove: '/'
  };

  fields: Array<PoPageDynamicDetailField>;

  private customerList: Array<Customer> = new Array();
  public customerTableColumn: Array<any>;

  constructor(private activatedRoute: ActivatedRoute,
    private customerProvider: CustomerProvider) { }

 async ngOnInit() {


    this.customerList = await this.customerProvider.findCustomer();

    this.customerList.forEach((customer: Customer) => {

      this.customerTableColumn = [{
        id: customer.id,
        cnpj: customer.empresa.cnpj,
        nome: customer.empresa.nome,
        fantasia: customer.empresa.fantasia,
        loja: customer.info.loja,
        tipo: customer.info.tipo,
        cep: customer.endereco.cep,
        endereco: customer.endereco.endereco,
        uf: customer.endereco.uf,
        localidade: customer.endereco.localidade
      }];

    });

   this.fields = [

     { property: 'id', gridColumns: 2, key: true, divider: 'Dados pessoais' },
     { property: 'nome', label: 'Nome', gridXlColumns: 4, gridLgColumns: 4 },
     { property: 'loja', label: 'Loja', gridXlColumns: 2, gridLgColumns: 2 },
     { property: 'fantasia', tag: true, label: 'Nome Fantasia', gridColumns: 2, gridSmColumns: 6 },
     { property: 'cep', label: 'CEP' },
     { property: 'endereco', divider: 'Endereço', label: 'Endereco' },
     { property: 'tipo', label: 'Tipo' },
     { property: 'uf', label: 'UF' },
     { property: 'localidade', label: 'Cidade' },
   ];

    this.activatedRoute.params.subscribe(params => {
      this.title = params.id ? `Dados do Cliente ${params.id}` : 'Dados';
    });
  }

}
