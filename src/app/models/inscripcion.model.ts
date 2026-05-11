export type CategoriaAlumno = 1 | 2 | 3;

export interface Inscripcion {
  id: number;
  dni: string;
  precio: number;
  categoriaAlumno: CategoriaAlumno;
  fechaInscripcion: string;
  email: string;
  curso: string;
  descuento: number;
  total: number;
}

export interface ResumenInscripciones {
  estudiante: number;
  egresado: number;
  particular: number;
  cantidadTotal: number;
  totalGeneral: number;
}
