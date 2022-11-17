import { Router } from '@angular/router';
import { CustomerService } from './customer.service';
import { Customer } from './customer';
import { Injectable } from '@angular/core';
import { PoNotificationService } from '@po-ui/ng-components';
import { Endereco } from '../Endereco/endereco';
import { Empresa } from '../Empresa/empresa';
import { ProtheusInfo } from 'src/app/backend/protheus.info';

@Injectable()

export class CustomerProvider {

    customers = new Array<Customer>();
    public customerValues: any = {};
    private customerToUpdate: Customer;

    constructor(
        private readonly customerSvc: CustomerService,
        private changeRouteTo: Router,
        private poNotification: PoNotificationService
    ) { }

    save(id: string, idParam: string, customer: Customer): Promise<any> {
        return new Promise((resolve) => {
            try {
                if (id != idParam) {
                    this.customerSvc.create(customer).subscribe(
                        async () => {
                            this.customers = await this.findCustomer();
                            this.poNotification.success('Cliente Inserido com Sucesso.');
                            resolve(customer);
                        },
                        (error) => {
                            this.poNotification.error(error);
                            resolve(customer);
                        }
                    );

                } else {
                    this.customerSvc.update(customer).subscribe(
                        async () => {
                            this.poNotification.success('Cliente alterado com Sucesso');
                            this.customerToUpdate = customer;
                            
                            this.customers = await this.findCustomer();
                            this.changeRouteTo.navigate(['customers']);

                            resolve(customer);
                        },
                        (error) => {
                            this.poNotification.error(error);
                            resolve(customer);
                        }
                    );
                }
            } catch (error) {
                this.poNotification.error(error);
                resolve(customer);
            }

        });
    }

    findCustomer(id?: string): Promise<any> {

        return new Promise((resolve) => {
            try {
                if (id) {
                    this.customerSvc.loadById(id).subscribe(

                        (customer: any) => {
                            let newCustomer = new Customer();
                            if (customer) {

                                newCustomer = this.parseJSONClienteToCliente(customer);
                                resolve(newCustomer);
                            }
                            resolve(newCustomer);

                        }, (error) => {
                            this.poNotification.error(error);
                            resolve(new Customer());
                        });

                } else {
                    this.customerSvc.list().subscribe((customersList: any[]) => {
                        const customersProtheusList = new Array<Customer>();
                        let customerProtheus = new Customer();

                        customersList.forEach(customer => {
                            customerProtheus = this.parseJSONClienteToCliente(customer);
                            customersProtheusList.push(customerProtheus);

                            if (customersProtheusList.length > this.customers.length) {
                                this.customers.push(customersProtheusList[customersProtheusList.length - 1]);
                                
                            }else if (this.customerToUpdate) {

                                let customerByFilter = this.customers.filter((customer: Customer) => {
                                    return customer.id == this.customerToUpdate.id;
                                });

                                if (customerByFilter) {
                                    let indexByCustomer = this.customers.indexOf(customerByFilter[0]);
                                    this.customers.splice(indexByCustomer, 1, this.customerToUpdate);
                                }
                            }
                        });

                        resolve(this.customers);

                    }, (error) => {
                        this.poNotification.error(error);
                        resolve([]);
                    });
                }
            } catch (error) {
                console.error(error);
            }
        });
    }

    delete(customer: Customer): Promise<any> {
        return new Promise((resolve) => {
            try {
                this.customerSvc.remove(customer).subscribe(
                    async () => {
                        this.poNotification.success('Cliente removido com sucesso');
                        this.customers = await this.findCustomer();
                        resolve(this.customers);
                    },
                    error => {
                        this.poNotification.error(error);
                        resolve(this.customers);
                    }
                );
            } catch (error) {
                this.poNotification.error(error);
                resolve(this.customers)
            }
        });
    }

    listenerId(customerValues: Customer, clientByFormValue: Customer): Promise<any> {
        return new Promise((resolve) => {
            const id: string = customerValues.id;

            try {
                this.customerSvc.loadById(id).subscribe((customer: Customer) => {
                    if (customer != null) {

                        this.setForm(clientByFormValue, clientByFormValue.endereco, clientByFormValue.empresa,
                            clientByFormValue.info);

                        this.changeRouteTo.navigate([`customers/edit/${customer.id}`]);
                        resolve(clientByFormValue);

                    }
                    resolve(clientByFormValue);
                },
                    (error) => {
                        console.log('Cadastrando Novo Cliente...');
                        resolve(error);
                    });
                resolve(clientByFormValue);

            } catch (error) {
                this.poNotification.error(error);
            }
        });
    }
    

    private parseProtheusClienteToCliente(customer_protheus: any): Customer {

        const customer = new Customer();
        customer.id = customer_protheus.id;
        customer.info.tipo = customer_protheus.tipo;
        customer.info.loja = customer_protheus.loja;

        customer.endereco.cep = customer_protheus.cep;
        customer.endereco.endereco = customer_protheus.endereco;
        customer.endereco.localidade = customer_protheus.localidade;
        customer.endereco.uf = customer_protheus.uf;

        customer.empresa.cnpj = customer_protheus.cnpj;
        customer.empresa.nome = customer_protheus.nome;
        customer.empresa.fantasia = customer_protheus.fantasia;

        return customer;
    }

    //json-server
    private parseJSONClienteToCliente(customer_JSON: any) {

        const customer = new Customer();

        customer.id = customer_JSON.id;
        customer.info.tipo = customer_JSON.info.tipo;
        customer.info.loja = customer_JSON.info.loja;

        customer.endereco.cep = customer_JSON.endereco.cep;
        customer.endereco.endereco = customer_JSON.endereco.endereco;
        customer.endereco.localidade = customer_JSON.endereco.localidade;
        customer.endereco.uf = customer_JSON.endereco.uf;

        customer.empresa.cnpj = customer_JSON.empresa.cnpj;
        customer.empresa.nome = customer_JSON.empresa.nome;
        customer.empresa.fantasia = customer_JSON.empresa.fantasia;


        return customer;
    }

    setForm(customer?: Customer, endereco?: Endereco, empresa?: Empresa, info?: ProtheusInfo) {

        this.customerValues = {
            id: customer.id,
            nome: empresa.nome,
            cnpj: empresa.cnpj,
            loja: info.loja,
            nome_fantasia: empresa.fantasia,
            cep: endereco.cep,
            endereco: endereco.logradouro,
            tipo: info.tipo,
            estado: endereco.uf,
            municipio: endereco.localidade
        }
    }
}