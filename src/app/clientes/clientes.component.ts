import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ModalService } from './ver-foto/modal.service';
import {AuthService} from '../usuarios/auth.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  private clienteService: ClienteService;
  private currentRoute: ActivatedRoute;
  public paginador: any;
  public clienteSeleccionado: Cliente;

  constructor(clienteService: ClienteService, currentRoute: ActivatedRoute, public modalService: ModalService, public authService: AuthService) {
    this.clienteService = clienteService;
    this.currentRoute = currentRoute;
  }

  ngOnInit(): void {
    this.currentRoute.paramMap.subscribe(params => {
      let numPage: number = +params.get('numPage');
      if (!numPage) {
        numPage = 0;
      }
      this.clienteService.getClientes(numPage).subscribe(
        response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        });
    });

    this.modalService.notificarUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteEnArray => {
        if(clienteEnArray.id == cliente.id){
          clienteEnArray.foto = cliente.foto;
        }
        return clienteEnArray;
      })
    });

  }
  delete(cliente: Cliente): void {
    swal({
      title: '¿Estas seguro?',
      text: `Esta accion va a eliminar a ${cliente.nombre} ${cliente.apellido}!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.clienteService.deleteCliente(cliente.id).subscribe(_response => {
          this.clientes = this.clientes.filter(clie => clie !== cliente);
          swal('Borrado!', `${cliente.nombre} ${cliente.apellido} ha sido eliminado`, 'success');
        });
      } else {
        swal('Cancelado', `${cliente.nombre} ${cliente.apellido} permanece intacto`, 'error')
      }
    }
    );
  }
  abrirModal(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }

}
