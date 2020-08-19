import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido';

  curso: string = 'Spring 5 con Angular 7';
  nombre:  string = 'Ivan Moreno';
}
