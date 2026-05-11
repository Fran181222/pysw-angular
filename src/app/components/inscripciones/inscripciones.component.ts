import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  CategoriaAlumno,
  Inscripcion,
  ResumenInscripciones,
} from '../../models/inscripcion.model';
import { InscripcionService } from '../../services/inscripcion.service';

interface CategoriaOption {
  value: CategoriaAlumno;
  label: string;
  discount: number;
}

interface InscripcionFormModel {
  dni: string;
  precio: number | null;
  categoriaAlumno: CategoriaAlumno | null;
  fechaInscripcion: string;
  email: string;
  curso: string;
}

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.css',
  standalone: false,
})
export class InscripcionesComponent {
  protected readonly categorias: CategoriaOption[] = [
    { value: 1, label: 'Estudiante', discount: 35 },
    { value: 2, label: 'Egresado', discount: 50 },
    { value: 3, label: 'Particular', discount: 0 },
  ];

  protected formulario: InscripcionFormModel = this.createEmptyForm();
  protected editandoId: number | null = null;
  protected descuentoActual = 0;
  protected totalCalculado: number | null = null;
  protected filtro = '';

  constructor(private readonly inscripcionService: InscripcionService) {}

  protected onPricingChange(): void {
    if (
      this.formulario.precio === null ||
      this.formulario.precio <= 0 ||
      this.formulario.categoriaAlumno === null
    ) {
      this.totalCalculado = null;
      this.descuentoActual = 0;
      return;
    }

    this.descuentoActual = this.getDiscountByCategory(this.formulario.categoriaAlumno);
    this.totalCalculado = this.formulario.precio * (1 - this.descuentoActual / 100);
  }

  protected registrar(form: NgForm): void {
    if (form.invalid || this.totalCalculado === null || this.formulario.categoriaAlumno === null) {
      form.control.markAllAsTouched();
      return;
    }

    const payload = {
      dni: this.formulario.dni.trim(),
      precio: this.formulario.precio ?? 0,
      categoriaAlumno: this.formulario.categoriaAlumno,
      fechaInscripcion: this.formulario.fechaInscripcion,
      email: this.formulario.email.trim(),
      curso: this.formulario.curso.trim(),
      descuento: this.descuentoActual,
      total: this.totalCalculado,
    };

    if (this.editandoId === null) {
      this.inscripcionService.create(payload);
    } else {
      this.inscripcionService.update(this.editandoId, payload);
    }

    this.cancelar(form);
  }

  protected editar(inscripcion: Inscripcion, form: NgForm): void {
    this.editandoId = inscripcion.id;
    this.formulario = {
      dni: inscripcion.dni,
      precio: inscripcion.precio,
      categoriaAlumno: inscripcion.categoriaAlumno,
      fechaInscripcion: inscripcion.fechaInscripcion,
      email: inscripcion.email,
      curso: inscripcion.curso,
    };
    form.control.markAsPristine();
    form.control.markAsUntouched();
    this.onPricingChange();
  }

  protected eliminar(id: number, form: NgForm): void {
    this.inscripcionService.delete(id);

    if (this.editandoId === id) {
      this.cancelar(form);
    }
  }

  protected cancelar(form: NgForm): void {
    this.editandoId = null;
    this.formulario = this.createEmptyForm();
    this.descuentoActual = 0;
    this.totalCalculado = null;
    form.resetForm(this.createEmptyForm());
  }

  protected get resumen(): ResumenInscripciones {
    return this.inscripcionService.getResumen();
  }

  protected get inscripciones(): Inscripcion[] {
    const term = this.filtro.trim().toLowerCase();

    if (!term) {
      return this.inscripcionService.getAll();
    }

    return this.inscripcionService.getAll().filter((item) => {
      const categoria = this.getCategoryLabel(item.categoriaAlumno).toLowerCase();

      return (
        item.dni.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term) ||
        item.curso.toLowerCase().includes(term) ||
        categoria.includes(term)
      );
    });
  }

  protected get puedeMostrarTotal(): boolean {
    return this.totalCalculado !== null;
  }

  protected getCategoryLabel(categoria: CategoriaAlumno): string {
    return this.inscripcionService.getCategoriaLabel(categoria);
  }

  private createEmptyForm(): InscripcionFormModel {
    return {
      dni: '',
      precio: null,
      categoriaAlumno: null,
      fechaInscripcion: new Date().toISOString().slice(0, 10),
      email: '',
      curso: '',
    };
  }

  private getDiscountByCategory(categoria: CategoriaAlumno): number {
    return this.categorias.find((item) => item.value === categoria)?.discount ?? 0;
  }
}
