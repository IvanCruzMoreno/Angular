import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";
  private clienteService: ClienteService;
  private router: Router;

  constructor(clienteService: ClienteService, router: Router) {
    this.clienteService = clienteService;
    this.router = router;
  }
  ngOnInit(): void {
  }
  public create():void{
    //console.log("Cliked!");
    //console.log(this.cliente);
    this.clienteService.createCliente(this.cliente).subscribe( _response => this.router.navigate(['/clientes']));

  }
}
