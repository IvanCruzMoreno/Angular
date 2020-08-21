import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  private clienteService: ClienteService;

  constructor(clienteService: ClienteService) {
    this.clienteService = clienteService;
  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(clientes => this.clientes = clientes);
  }
  delete(cliente: Cliente): void{
    swal({
      title: '¿Estas seguro?',
      text: `Esta accion va a eliminar a ${cliente.nombre} ${cliente.apellido}!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then( result => {
        if (result.value) {
          this.clienteService.deleteCliente(cliente.id).subscribe( _response => {
                this.clientes = this.clientes.filter(clie => clie !== cliente);
                swal('Borrado!',`${cliente.nombre} ${cliente.apellido} ha sido eliminado`,'success');
           });
        }else{
          swal('Cancelado',`${cliente.nombre} ${cliente.apellido} permanece intacto`,'error')
        }
      }
    );
  }

}
