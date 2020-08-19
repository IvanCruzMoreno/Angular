import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent {

  listaCurso: string[] = ['TypeScript','Java','JavaScript','C#','PHP'];
  activar: boolean = true;
  constructor(){

  }
  setActivar(): void{
    this.activar = (this.activar == true)? false : true;
  }


}
