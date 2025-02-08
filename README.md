### UNIVERSIDAD SAN CARLOS DE GUATEMALA
### FACULTAD DE INGENIERIA
### ESCUELA DE CIENCIAS Y SISTEMAS
### CURSO: ANÁLISIS Y DISEÑO DE SISTEMAS 2
### SECCIÓN: B

<p align="center">
  <img width="460" height="300" src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Usac_logo.png">
</p>

<center><h1>Práctica 1</h1></center>

## MANUAL TÉCNICO
<center><h3>Integrantes</h3></center>

| NOMBRE | CARNET |
|:------:|:------:|
|Aldo Saúl Vásquez Moreira|202109754|
|Douglas Josue Martinez Huit|201708975|
|María José Tebalan Sanchez|202100265|
|José Eduardo Galdámez González|202109732|
|Mynor Francisco Morán García|201603232|


---
---
## Core del Negocio
### 1. Propósito Principal del desarrollo

Proveer atención médica eficiente y de calidad mediante la implementación de un sistema digital que facilita la gestión de pacientes, citas y expedientes médicos, logrando rapidez, seguridad y accesibilidad de la información.

### 2. Servicios Claves
- Registro y gestión de información de pacientes: Permite la creación, actualización y eliminación de expedientes médicos.  
  
- Expediente médico digital: Acceso inmediato y seguro al historial clínico de los pacientes.

- Gestión de citas: Agendamiento, modificación y cancelación de citas, con validaciones de horarios y disponibilidad.

- Gestión de recetas médicas: Creación de prescripciones digitales, asegurando su almacenamiento en el expediente del paciente.  


### 3. Modelo de Operaciones
- Módulo doctor: Proporciona herramientas para la gestión de pacientes y expedientes médicos en tiempo real.  

- Digitalización y automatización: Optimiza la administración y reduce el uso de documentos físicos, evitando pérdidas de información.  

-Seguridad: Implementación de medidas de seguridad para proteger la información de los usuarios.

### 4. Valor diferencial  
- Optimización de procesos administrativos: Reduce los tiempos de espera y mejora en la experiencia del usuario.

- Accesibilidad y eficiencia: Permite a los usuarios con rol administrativos consultar y gestionar la información de manera rápida y segura.

- Cumplimiento normativo: Garantiza el almacenamiento y acceso seguro a la información de acuerdo con las regulaciones de privacidad de datos.

### 5. Beneficios
1. Reduce los errores administrativos en la gestion de expedientes.
2. Optimiza la organización y seguimiento de los tratamientos médicos.
3. Mejor toma de decisiones clínicas al disponer de información precisa y accesible.
4. Reduce tiempos de espera y mejora la atención.


## Requerimientos funcionales
### 1. Modulo de gestión de pacientes
- 1.1 Agregar paciente: En este modulo se permite el registro de nuevos pacientes, valida su CUI y ciertos datos obligatorios.

- 1.2 Modificar datos del paciente: Permite la actualización de datos del pacientes, valida nuevos datos antes de guardar, se mantiene un historial de modificaciones y no permite edición del campo del CUI.

- 1.3 Eliminar Paciente: Elimina los datos asociados al usuario eliminado y confirma la acción mediante un mensaje de advertencia antes de proceder.

### 2. Módulo de expedientes médicos
- Ver expedientes: Permite la búsqueda de un paciente por CUI y acceso exclusivo para doctores y personal autorizado.

### 3. Módulo de gestión de citas
- 3.1 Agregar cita: Permite la creación de citas, captura ciertos datos obligatorios y valida las horas habiles.

- 3.2 Modificar cita: Permite editar fechas y hora de la cita.

- 3.3 Eliminar cita: Elimina la cita del sistema y se confirma la acción mediante un mensaje de advertencia.

### 4. Módulo de recetas médicas
- Generar recetas médicas: permite a los doctores emitir recetas médicas y almacena dichas recetas en el expediente del paciente.

### 5. Seguridad y control de acceso
Acceso restringido mediante roles de usuario, control de autenticación segura y enciptación de datos sensibles.


## Requerimientos no funcionales
### 1. Rendimiento y Eficiencia
- Tiempo de respuesta: El sistema debe responder en menos de 2 segundos en operaciones de consulta y gestión de expedientes.

- Optimización de consultas: Uso de índices en la base de datos para mejorar tiempos de búsqueda de pacientes y citas.

- Carga eficiente: El sistema debe soportar hasta 100 usuarios concurrentes sin degradar el rendimiento.

- Procesamiento asincrónico: Uso de colas de mensajes para tareas que no requieran respuesta inmediata.

### 2. Seguridad y Privacidad
- Autenticación y autorización: Uso de JWT (JSON Web Token) o OAuth 2.0 para la gestión de accesos.

- Roles y permisos.

### 3. Escalabilidad y Disponibilidad
- Arquitectura escalable: Implementación basada en microservicios o modularización para facilitar escalabilidad.

- Balanceo de carga: Uso de Load Balancer para distribuir la carga en múltiples instancias del backend.

- Base de datos escalable.

### 4. Usabilidad y Experiencia de Usuario (UX/UI)
- Interfaz intuitiva: Diseño limpio y fácil de usar, con navegación clara para los doctores y personal administrativo.

- Accesibilidad


### 5.Mantenibilidad y Extensibilidad
- Código modular: Uso de arquitectura limpia para facilitar la modificación y adición de nuevas funcionalidades.

- Pruebas automatizadas.


## Justificación del framework y patrón




## Diagrama ER
![DB](/img/ER.png)

