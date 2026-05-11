import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: false,
})
export class HomeComponent {
  protected readonly secciones = [
    {
      titulo: 'Punto 1',
      descripcion: 'Slide personalizado con eventos y navegación manual.',
      ruta: '/punto1',
    },
    {
      titulo: 'Punto 2',
      descripcion: 'Cards de productos con carrito, modal y total a pagar.',
      ruta: '/punto2',
    },
    {
      titulo: 'Punto 3',
      descripcion: 'Juego de memoria de 12 cartas con intentos controlados.',
      ruta: '/punto3',
    },
    {
      titulo: 'Parte 2',
      descripcion: 'Formulario de inscripciones con descuentos, CRUD y resumen.',
      ruta: '/inscripciones',
    },
  ];
}
