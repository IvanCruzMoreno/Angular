import { Component, OnInit } from '@angular/core';
import {Cliente} from '../cliente';
import {ClienteService} from '../cliente.service';
import {ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'ver-foto',
  templateUrl: './ver-foto.component.html'
})
export class VerFotoComponent implements OnInit {

  public cliente: Cliente;
  public titulo: string = "Foto del cliente";
  private imagenSeleccionada: File;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if(id){
        this.clienteService.getCliente(id).subscribe( cliente => this.cliente = cliente);
      }
    });
  }
  seleccionarFoto(event){
    this.imagenSeleccionada = event.target.files[0];
    console.log(this.imagenSeleccionada);
  }
  subirFoto(){
    this.clienteService.subirFoto(this.imagenSeleccionada, this.cliente.id)
                       .subscribe(
                            cliente => {
                              this.cliente = cliente;
                              swal('La foto se ha subido exitosamente!', `La foto ${this.cliente.foto} se ha subido`, 'success');
                            }
    );
  }
}
