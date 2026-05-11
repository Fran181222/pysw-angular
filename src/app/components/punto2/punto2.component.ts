import { Component } from '@angular/core';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  img: string;
  precio: number;
  categoria: string;
}

interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-punto2',
  templateUrl: './punto2.component.html',
  styleUrl: './punto2.component.css',
  standalone: false,
})
export class Punto2Component {
  protected readonly productos: Producto[] = [
    {
      id: 1,
      nombre: 'Notebook ASUS 13L',
      descripcion: 'Equipo liviano con SSD de 480 GB y pantalla Full HD de 15 pulgadas.',
      img: 'images/producto-notebook.svg',
      precio: 1450,
      categoria: 'Tecnología',
    },
    {
      id: 2,
      nombre: 'Monitor LG 24"',
      descripcion: 'Panel IPS ideal para estudiar, diseñar y trabajar con multitarea.',
      img: 'images/producto-monitor.svg',
      precio: 920,
      categoria: 'Periféricos',
    },
    {
      id: 3,
      nombre: 'Auriculares Studio Pro',
      descripcion: 'Cancelación de ruido, sonido envolvente y batería extendida.',
      img: 'images/producto-auriculares.svg',
      precio: 310,
      categoria: 'Audio',
    },
    {
      id: 4,
      nombre: 'Tablet Nova Air',
      descripcion: 'Pantalla de alta definición, ideal para tomar apuntes y leer.',
      img: 'images/producto-tablet.svg',
      precio: 680,
      categoria: 'Movilidad',
    },
  ];

  protected carrito: ItemCarrito[] = [];

  protected addToCart(producto: Producto): void {
    const existente = this.carrito.find((item) => item.producto.id === producto.id);

    if (existente) {
      existente.cantidad += 1;
      return;
    }

    this.carrito = [...this.carrito, { producto, cantidad: 1 }];
  }

  protected removeFromCart(productId: number): void {
    this.carrito = this.carrito.filter((item) => item.producto.id !== productId);
  }

  protected clearCart(): void {
    this.carrito = [];
  }

  protected get cartCount(): number {
    return this.carrito.reduce((total, item) => total + item.cantidad, 0);
  }

  protected get cartTotal(): number {
    return this.carrito.reduce((total, item) => {
      return total + item.producto.precio * item.cantidad;
    }, 0);
  }
}
