import { Component, OnInit, ViewChild } from '@angular/core';
import { PoTableColumn, PoTableAction, PoModalAction, PoModalComponent } from '@po-ui/ng-components';
import { CustomerProvider } from 'src/app/providers/customer/customer.provider';
import { Customer } from 'src/app/providers/customer/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  preserveWhitespaces: true
})

export class CustomerListComponent implements OnInit {

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  private customerSelect: Customer;
  public title = '';

  actions: Array<PoTableAction> = [
    { action: this.onEdit.bind(this), icon: 'po-icon-edit', label: 'Editar'},
    { action: this.onDelete.bind(this), icon: 'po-icon-delete', label: 'Excluir'},
  ];

  actionsModalPrimary: PoModalAction =
    { action: async ()=>{
      this.customerPrvd.delete(this.customerSelect);
      this.poModal.close();
    }, label: 'Confirmar' }

  actionsModalSecondary: PoModalAction = 
    { action: ()=>{
      this.poModal.close();
      this.router.navigate(['customers']);
    }, label: 'Cancelar'}

  constructor(
    private customerPrvd: CustomerProvider,
    private router: Router
  ) { }

  public fields: Array<PoTableColumn>;
  private customerList: Array<Customer> = new Array();
  public customerTableColumn = new Array<any>();

  async ngOnInit() {

    this.customerList = await this.customerPrvd.findCustomer();

    this.customerList.forEach((customer: Customer) => {

      let newCustomer = {
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
      };

      this.customerTableColumn.push(newCustomer)

    });

    this.fields = [
      { property: 'id', label: 'ID' },
      { property: 'cnpj', label: 'CNPJ' },
      { property: 'nome', label: 'Nome' },
      { property: 'fantasia', label: 'Nome Fantasia' },
      { property: 'loja', label: 'Loja' },
      { property: 'tipo', label: 'Tipo' },
      { property: 'cep', label: 'CEP' },
      { property: 'endereco', label: 'Endereco' },
      { property: 'uf', label: 'UF' },
      { property: 'localidade', label: 'Cidade' }
    ];
  }

  onView(customer: Customer): void {
    this.router.navigate(['customers/view/', customer.id]);
  }

  onEdit(customer: Customer): void {
    this.router.navigate(['customers/edit/', customer.id]);
  }

  onDelete(customer: Customer): void {
    this.title = 'Deseja Excluir este Cliente?'
    this.customerSelect = customer
    this.poModal.open();
  }
}