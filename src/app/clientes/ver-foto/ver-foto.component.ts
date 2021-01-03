import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import {ModalService} from './modal.service';
import {AuthService} from '../../usuarios/auth.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import {FacturaService} from '../../facturas/services/factura.service';
import {Factura} from '../../facturas/models/factura';

@Component({
  selector: 'ver-foto',
  templateUrl: './ver-foto.component.html',
  styleUrls:['./ver-foto.component.css']
})
export class VerFotoComponent implements OnInit {

  @Input() public cliente: Cliente;
  public titulo: string = "Informacion del cliente";
  public imagenSeleccionada: File;
  public progreso: number = 0;

  constructor(private clienteService: ClienteService, public modalService: ModalService, public authService: AuthService,
              private facturaService: FacturaService) { }

  ngOnInit(): void {

  }
  seleccionarFoto(event) {
    this.imagenSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.imagenSeleccionada);
    if (this.imagenSeleccionada.type.indexOf('image') < 0) {
      swal('Error al seleccionar imagen!', 'El documento debe ser una imagen', 'error');
      this.imagenSeleccionada = null;
    }
  }
  subirFoto() {
    if (!this.imagenSeleccionada) {
      swal('Error Upload!', 'No se ha seleccionado ninguna foto', 'error');
    } else {
      this.clienteService.subirFoto(this.imagenSeleccionada, this.cliente.id)
        .subscribe(
          evento => {
            if (evento.type === HttpEventType.UploadProgress) {
              this.progreso = Math.round((evento.loaded / evento.total) * 100);
            } else if (evento.type === HttpEventType.Response) {
              let response: any = evento.body;
              this.cliente = response.cliente as Cliente; //this.cliente = cliente;
              this.modalService.notificarUpload.emit(this.cliente);
              swal('La foto se ha subido exitosamente!', response.mensaje, 'success');
            }
          }
        );
    }
  }
  cerrarModal(){
    this.modalService.cerrarModal();
    this.imagenSeleccionada = null;
    this.progreso = 0;
  }
  delete(factura: Factura): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la factura ${factura.descripcion}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.facturaService.delete(factura.id).subscribe(
          () => {
            this.cliente.facturas = this.cliente.facturas.filter(f => f !== factura)
            swal(
              'Factura Eliminada!',
              `Factura ${factura.descripcion} eliminada con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }

}
