import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";
  private clienteService: ClienteService;
  private router: Router;
  private currentRoute: ActivatedRoute;
  public errores: string[];

  constructor(clienteService: ClienteService, router: Router, currentRoute: ActivatedRoute) {
    this.clienteService = clienteService;
    this.router = router;
    this.currentRoute = currentRoute;
  }
  ngOnInit(): void {
    this.loadCliente();
  }
  public create():void{
    //console.log("Cliked!");
    //console.log(this.cliente);
    this.clienteService.createCliente(this.cliente)
                       .subscribe( cliente => {
                            this.router.navigate(['/clientes'])
                            swal('Nuevo Cliente', `Cliente ${cliente.nombre} creado con exito`, 'success')
                          },
                        err => {
                          this.errores = err.error.errors as string[];
                          console.error('Error lanzado del servidor: ' + err.status);
                          console.error(err.error.errors);
                        });
  }
  public loadCliente(): void{
    this.currentRoute.params
                     .subscribe(params => {
                       let id = params['id']
                       if(id){
                         this.clienteService.getCliente(id).subscribe( cliente => this.cliente = cliente)
                       }
                     });
  }
  public update(): void{
    this.clienteService.updateCliente(this.cliente)
                       .subscribe( cliente => {
                         this.router.navigate(['/clientes'])
                         swal('Cliente Actualizado',`Cliente ${cliente.nombre} actualizado con exito`,'success')
                       },
                     err => {
                       this.errores = err.error.errors as string[];
                       console.error('Erro lanzado del servidor: ' + err.status);
                       console.error(err.error.errors);
                     });
  }
}
