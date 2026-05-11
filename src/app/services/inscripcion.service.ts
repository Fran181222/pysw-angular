import { Injectable } from '@angular/core';
import {
  CategoriaAlumno,
  Inscripcion,
  ResumenInscripciones,
} from '../models/inscripcion.model';

type InscripcionPayload = Omit<Inscripcion, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  private inscripciones: Inscripcion[] = [];
  private nextId = 1;

  getAll(): Inscripcion[] {
    return [...this.inscripciones].sort((first, second) => {
      return second.id - first.id;
    });
  }

  create(inscripcion: InscripcionPayload): Inscripcion {
    const nuevaInscripcion: Inscripcion = {
      ...inscripcion,
      id: this.nextId++,
    };

    this.inscripciones = [...this.inscripciones, nuevaInscripcion];
    return nuevaInscripcion;
  }

  update(id: number, cambios: InscripcionPayload): void {
    this.inscripciones = this.inscripciones.map((item) => {
      if (item.id !== id) {
        return item;
      }

      return {
        ...item,
        ...cambios,
        id,
      };
    });
  }

  delete(id: number): void {
    this.inscripciones = this.inscripciones.filter((item) => item.id !== id);
  }

  getResumen(): ResumenInscripciones {
    return this.inscripciones.reduce<ResumenInscripciones>(
      (acumulado, item) => {
        acumulado.cantidadTotal += 1;
        acumulado.totalGeneral += item.total;

        if (item.categoriaAlumno === 1) {
          acumulado.estudiante += 1;
        }

        if (item.categoriaAlumno === 2) {
          acumulado.egresado += 1;
        }

        if (item.categoriaAlumno === 3) {
          acumulado.particular += 1;
        }

        return acumulado;
      },
      {
        estudiante: 0,
        egresado: 0,
        particular: 0,
        cantidadTotal: 0,
        totalGeneral: 0,
      }
    );
  }

  getCategoriaLabel(categoria: CategoriaAlumno): string {
    if (categoria === 1) {
      return 'Estudiante';
    }

    if (categoria === 2) {
      return 'Egresado';
    }

    return 'Particular';
  }
}
