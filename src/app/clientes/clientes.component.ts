import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] =[
    {id:1, nombre:'Ivan',apellido:'Moreno',email:'ivanmoreno@bad.com',fecha:'2020-08-08'},
    {id:2, nombre:'carlos',apellido:'enomo',email:'aaao@bad.com',fecha:'2020-02-02'},
    {id:3, nombre:'narvi',apellido:'morono',email:'ino@bad.com',fecha:'2020-11-17'},
    {id:4, nombre:'locars',apellido:'oiui',email:'chi@bad.com',fecha:'2020-06-06'},
    {id:5, nombre:'vani',apellido:'erds',email:'ca@bad.com',fecha:'2020-03-03'},
    {id:6, nombre:'navi',apellido:'redsno',email:'cho@bad.com',fecha:'2020-09-09'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
