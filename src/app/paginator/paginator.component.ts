import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'nav-paginator',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() navPaginador: any;
  public paginas: number[];
  fromPage: number;
  toPage: number;

  constructor() { }

  ngOnInit(): void {
    this.changePaginador();
  }
  ngOnChanges(changes: SimpleChanges): void {

    let pagiandorActualizado = changes['navPaginador'];
    if (pagiandorActualizado.previousValue) {
      this.changePaginador();
    }
  }

  changePaginador(): void {
    /*
      totalPages = 6
      numberPage = 2

    */
    //1 - [1]
    this.fromPage = Math.min(Math.max(1, this.navPaginador.number - 4), this.navPaginador.totalPages - 5);
    //5 - [6]
    this.toPage = Math.max(Math.min(this.navPaginador.totalPages, this.navPaginador.number + 4), 6);

    if (this.navPaginador.totalPages > 5) {
      this.paginas = new Array(this.toPage - this.fromPage + 1).fill(0).map((_valor, indice) => indice + this.fromPage);
    }
    this.paginas = new Array(this.navPaginador.totalPages).fill(0).map((_valor, indice) => indice + 1);
  }


}
