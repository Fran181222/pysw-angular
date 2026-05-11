# Práctica Angular - Trabajo Práctico - Prorgamación Y Servicios Web

## PARTE 1 – Componentes
*Se utiliza Bootstrap para maquetar.*

### 1) Punto 1 - Slide Personalizado
Componente `punto1`.
- Slide personalizado realizado con Angular que contiene **Eventos disponibles**, cada evento acompañado por una fotografía descriptiva (ej. Taller de Yoga, etc.).
- **Fuente de datos:** Array de objetos definido en el Controlador (`{ nombre: string, descripcion: string, img: string }`).
- **Controles:** Botones para adelantar y retrasar eventos.

### 2) Punto 2 - Catálogo de Productos y Carrito
Componente `punto2`.
- Lista (cards) de **Productos Destacados**.
- **Fuente de datos:** Array predefinido de objetos en el Controlador (`{ nombre: string, descripcion: string, img: string, precio: number }`).
- **Funcionalidad del Carrito:** 
  - Botón "agregar al carrito" que añade el producto (sólo una unidad) a un arreglo separado (ej. `Arraycarrito`).
  - Botón con icono de carrito para mostrar un **modal de Bootstrap** con los productos elegidos y el **TOTAL** a abonar ("Check Out").

### 3) Punto 3 - Juego de la Memoria
Componente `punto3`.
- Implementación del clásico Juego de la Memoria.
- Maquetado utilizando Bootstrap y reglas de CSS personalizado.

---

## PARTE 2 – Servicios de Angular

### Sistema de Inscripción a Cursos
Aplicación para gestionar el proceso de inscripción a cursos de una plataforma educativa mediante un **FORMULARIO**. La información se almacena en el objeto: 
`Inscripcion {dni, precio, categoriaAlumno, fechaInscripcion, email, curso}`

**Categorías de Alumno:** 
`1 = Estudiante`, `2 = Egresado`, `3 = Particular`

**Comportamiento y Reglas de Negocio:**
- **Sistema de Descuentos:** Estudiante (35% de descuento), Egresado (50% de descuento), Particular (sin descuento).
- **Cálculo Dinámico:** Se utiliza una Lista Desplegable para seleccionar el tipo de alumno. Se programa el evento `(change)` para calcular el total cada vez que cambie la lista desplegable o el precio del curso.
- **Directiva `*ngIf`:** Muestra en un `<label>` dentro del formulario el precio total de la transacción **SOLO** en caso de que el precio y el tipo de alumno hayan sido ingresados (sin utilizar modal).
- **CRUD con Service:** Mediante el botón **REGISTRAR** se inscribe al alumno en un Array. Dicho arreglo es gestionado exclusivamente mediante un **[SERVICIO DE ANGULAR]** para todas las operaciones del CRUD.

**Visualización y Tablas:**
- **Listado principal:** En una sección inferior se muestra mediante una tabla (`angular-datatable`) todas las inscripciones realizadas.
- **Resumen:** Una sección dedicada muestra el total de inscripciones agrupadas por categoría de alumno y el total general recaudado.
- **Pipes de Angular:** Implementados para formatear la información mostrada, como las fechas (ej. `dd/MM/yyyy`) y los precios.

---
### Integrantes

-Ruan Lindon Villanueva
-Luciano Gabriel Giron
-Francisco Javier Quispe
-Gabriel Ignacio Roel

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.10.

### Development server

To start a local development server, run:

```bash
ng serve

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.10.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
