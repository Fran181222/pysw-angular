import { Component } from '@angular/core';

interface CardBase {
  icono: string;
  titulo: string;
  tono: string;
}

interface MemoryCard extends CardBase {
  id: number;
  descubierta: boolean;
  emparejada: boolean;
}

@Component({
  selector: 'app-punto3',
  templateUrl: './punto3.component.html',
  styleUrl: './punto3.component.css',
  standalone: false,
})
export class Punto3Component {
  protected readonly maxIntentos = 8;
  protected readonly cartaTapada = 'images/card-back.svg';

  protected tablero: MemoryCard[] = [];
  protected intentosRestantes = this.maxIntentos;
  protected juegoIniciado = false;
  protected cartasPorVoltear = 0;
  protected mensaje = 'Presioná INICIAR para preparar el tablero.';

  private readonly paresBase: CardBase[] = [
    { icono: '🎸', titulo: 'Música', tono: 'tone-a' },
    { icono: '📚', titulo: 'Lectura', tono: 'tone-b' },
    { icono: '🚀', titulo: 'Innovación', tono: 'tone-c' },
    { icono: '🎨', titulo: 'Arte', tono: 'tone-d' },
    { icono: '⚽', titulo: 'Deporte', tono: 'tone-e' },
    { icono: '🌿', titulo: 'Naturaleza', tono: 'tone-f' },
  ];

  private seleccionActual: MemoryCard[] = [];
  private resolviendoIntento = false;

  constructor() {
    this.resetGame();
  }

  protected startGame(): void {
    this.juegoIniciado = true;
    this.mensaje = 'El juego comenzó. Presioná INTENTAR para habilitar dos movimientos.';
  }

  protected resetGame(): void {
    this.tablero = this.mezclarCartas();
    this.intentosRestantes = this.maxIntentos;
    this.juegoIniciado = false;
    this.cartasPorVoltear = 0;
    this.seleccionActual = [];
    this.resolviendoIntento = false;
    this.mensaje = 'Tablero reiniciado. Presioná INICIAR para arrancar de nuevo.';
  }

  protected beginAttempt(): void {
    if (!this.juegoIniciado || this.resolviendoIntento || this.juegoTerminado || this.cartasPorVoltear > 0) {
      return;
    }

    this.seleccionActual = [];
    this.cartasPorVoltear = 2;
    this.mensaje = 'Intento habilitado. Elegí dos cartas.';
  }

  protected flipCard(card: MemoryCard): void {
    const cardSelected = this.seleccionActual.some((item) => item.id === card.id);

    if (
      !this.juegoIniciado ||
      this.juegoTerminado ||
      this.resolviendoIntento ||
      this.cartasPorVoltear === 0 ||
      card.descubierta ||
      card.emparejada ||
      cardSelected
    ) {
      return;
    }

    card.descubierta = true;
    this.seleccionActual = [...this.seleccionActual, card];
    this.cartasPorVoltear -= 1;

    if (this.seleccionActual.length === 2) {
      this.evaluateAttempt();
    }
  }

  protected get paresEncontrados(): number {
    return this.tablero.filter((card) => card.emparejada).length / 2;
  }

  protected get juegoTerminado(): boolean {
    return this.intentosRestantes === 0 || this.paresEncontrados === this.paresBase.length;
  }

  private evaluateAttempt(): void {
    const [firstCard, secondCard] = this.seleccionActual;

    if (!firstCard || !secondCard) {
      return;
    }

    this.resolviendoIntento = true;

    window.setTimeout(() => {
      if (firstCard.icono === secondCard.icono) {
        firstCard.emparejada = true;
        secondCard.emparejada = true;
        this.mensaje = 'Encontraste una pareja. Podés volver a presionar INTENTAR.';
      } else {
        firstCard.descubierta = false;
        secondCard.descubierta = false;
        this.intentosRestantes -= 1;
        this.mensaje = 'No coincidieron. Se descontó un intento.';
      }

      if (this.paresEncontrados === this.paresBase.length) {
        this.mensaje = 'Ganaste. Descubriste las 6 parejas del tablero.';
      } else if (this.intentosRestantes === 0) {
        this.mensaje = 'Se terminaron los intentos. Reiniciá la partida para volver a jugar.';
      }

      this.seleccionActual = [];
      this.cartasPorVoltear = 0;
      this.resolviendoIntento = false;
    }, 900);
  }

  private mezclarCartas(): MemoryCard[] {
    const cartasDuplicadas = this.paresBase.flatMap((pair, index) => {
      return [
        {
          ...pair,
          id: index * 2 + 1,
          descubierta: false,
          emparejada: false,
        },
        {
          ...pair,
          id: index * 2 + 2,
          descubierta: false,
          emparejada: false,
        },
      ];
    });

    for (let index = cartasDuplicadas.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      const temporal = cartasDuplicadas[index]!;
      cartasDuplicadas[index] = cartasDuplicadas[randomIndex]!;
      cartasDuplicadas[randomIndex] = temporal;
    }

    return cartasDuplicadas;
  }
}
