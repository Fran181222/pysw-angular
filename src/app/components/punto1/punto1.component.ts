import { Component } from '@angular/core';

interface Evento {
  nombre: string;
  descripcion: string;
  img: string;
  horario: string;
  cupos: string;
}

@Component({
  selector: 'app-punto1',
  templateUrl: './punto1.component.html',
  styleUrl: './punto1.component.css',
  standalone: false,
})
export class Punto1Component {
  protected readonly eventos: Evento[] = [
    {
      nombre: 'Taller de Yoga',
      descripcion: 'Clase guiada para mejorar la postura, respiración y bienestar general.',
      img: 'images/evento-yoga.svg',
      horario: 'Lunes 18:00 hs',
      cupos: '18 lugares',
    },
    {
      nombre: 'Laboratorio Creativo',
      descripcion: 'Espacio práctico para prototipar ideas digitales con mentoría docente.',
      img: 'images/evento-lab.svg',
      horario: 'Miércoles 16:30 hs',
      cupos: '24 lugares',
    },
    {
      nombre: 'Feria de Emprendedores',
      descripcion: 'Encuentro para exhibir proyectos estudiantiles y conectar con la comunidad.',
      img: 'images/evento-feria.svg',
      horario: 'Viernes 19:00 hs',
      cupos: 'Evento abierto',
    },
    {
      nombre: 'Muestra de Música',
      descripcion: 'Presentación acústica con artistas invitados y actividades culturales.',
      img: 'images/evento-musica.svg',
      horario: 'Sábado 20:30 hs',
      cupos: '40 lugares',
    },
  ];

  protected currentIndex = 0;

  protected get currentEvent(): Evento {
    return this.eventos[this.currentIndex]!;
  }

  protected previousEvent(): void {
    this.currentIndex = (this.currentIndex - 1 + this.eventos.length) % this.eventos.length;
  }

  protected nextEvent(): void {
    this.currentIndex = (this.currentIndex + 1) % this.eventos.length;
  }

  protected selectEvent(index: number): void {
    this.currentIndex = index;
  }
}
