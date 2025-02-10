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


### Justificación Técnica del Stack y Patrones

#### **Frontend: React + Vite**  
**Elección del Framework**:  
```json  
"react": "^18.3.1",  
"vite": "^6.0.5"  
```  
- **Rendimiento**: Vite optimiza el bundling con ES Modules nativos, reduciendo tiempos de build (~5x más rápido que Webpack).  
- **Ecosistema Moderno**: Soporte nativo para TypeScript, JSX y CSS Modules.  
- **React 18**: Concurrent rendering para interfaces fluidas y Suspense para gestión de loading states.  

**Patrones y Bibliotecas Clave**:  
1. **Global State (Zustand)**:  
   ```json  
   "zustand": "^5.0.3"  
   ```  
   - **Justificación**:  
     - Reemplaza Redux con ~1/10 del boilerplate.  
     - Integración nativa con React (hooks) y middlewares opcionales.  
     - Usado para autenticación y datos compartidos (ej: `useAuthStore`).  

2. **Gestión de Datos (React Query)**:  
   ```json  
   "@tanstack/react-query": "^5.65.1"  
   ```  
   - **Justificación**:  
     - Cache automática, re-fetching en focus, y deduplicación de queries.  
     - Simplifica el manejo de estados asíncronos (ej: `useQuotes`).  

3. **UI Componentizada (Radix + Tailwind)**:  
   ```json  
   "@radix-ui/react-dialog": "^1.1.6",  
   "tailwindcss": "^4.0.0"  
   ```  
   - **Justificación**:  
     - Radix: Componentes accesibles y sin estilos impuestos.  
     - Tailwind: Diseño ágil con utility-first (ej: `<Button className="bg-primary">`).  

4. **Formularios (React Hook Form + Zod)**:  
   ```json  
   "react-hook-form": "^7.54.2",  
   "zod": "^3.24.1"  
   ```  
   - **Justificación**:  
     - Validación type-safe con Zod (esquemas reutilizables).  
     - Rendimiento optimizado (evita re-renders innecesarios).  

---

#### **Backend: TypeScript + Express**  
**Elección del Stack**:  
```json  
"express": "^4.21.1",  
"typescript": "^5.6.3"  
```  
- **TypeScript**:  
  - Tipado estático para prevenir errores en runtime (ej: `interface IUser`).  
  - Autocompletado inteligente en servicios y controladores.  
- **Express**:  
  - Minimalista y flexible para APIs RESTful.  
  - Middleware ecosystem (ej: `helmet`, `cors`).  

**Patrones y Bibliotecas Clave**:  
1. **Validación (Joi)**:  
   ```json  
   "joi": "^17.13.3"  
   ```  
   - **Justificación**:  
     - Schemas declarativos para validar request bodies (ej: `createPatientSchema`).  
     - Centraliza reglas de negocio (ej: formato de email, campos requeridos).  

2. **Logging (Winston)**:  
   ```json  
   "winston": "^3.16.0"  
   ```  
   - **Justificación**:  
     - Logs estructurados con niveles (info, error, debug).  
     - Integración con transports (archivos, consola, etc.).  

3. **Seguridad (Helmet + Bcrypt)**:  
   ```json  
   "helmet": "^8.0.0",  
   "bcrypt": "^5.1.1"  
   ```  
   - **Helmet**: Headers de seguridad (CSP, HSTS).  
   - **Bcrypt**: Hashing seguro para contraseñas (cost factor ajustable).  

4. **ORM (Mongoose + Postgres/MySQL)**:  
   ```json  
   "mongoose": "^8.8.0",  
   "pg": "^8.13.1"  
   ```  
   - **Justificación**:  
     - Mongoose para MongoDB (schemas, queries type-safe).  
     - `pg` y `mysql2` para bases relacionales (transacciones ACID).  


### Patrones

### Patrones de Diseño Implementados

#### **Backend**  
1. **MVC (Modelo-Vista-Controlador)**  
   - **Uso**:  
     - *Controladores* (`patient.controller.ts`): Gestionan peticiones HTTP y coordinan servicios.  
     - *Servicios* (`PatientService`): Contienen lógica de negocio (ej: operaciones CRUD).  
     - *Modelos* (definidos en interfaces como `IUser`): Representan estructuras de datos.  
   - **Ejemplo**:  
     ```typescript  
     // En PatientController.ts  
     public async create(req: Request, res: Response) {  
       const { value } = createPatientSchema.validate(req.body); // Validación  
       const patient = await this.patientService.createPatient(value); // Servicio  
       sendSuccess(res, "Paciente creado", { patient }); // Respuesta  
     }  
     ```  

2. **Validation Layer**  
   - **Uso**:  
     - Schemas Joi (`createPatientSchema`) centralizan reglas de validación.  
     - Separan la lógica de validación de los controladores.  
   - **Ejemplo**:  
     ```typescript  
     // En patient.validator.ts  
     export const createPatientSchema = Joi.object({  
       name: Joi.string().required(),  
       email: Joi.string().email().required()  
     });  
     ```  

3. **Singleton**  
   - **Uso**:  
     - Conexiones a BD (`dbManager`) y servidor Express (`Server`) como instancias únicas.  
   - **Ejemplo**:  
     ```typescript  
     // En server.ts  
     private static instance: Server;  
     public static getInstance(): Server {  
       if (!Server.instance) Server.instance = new Server();  
       return Server.instance;  
     }  
     ```  

4. **Chain of Responsibility (Middlewares)**  
   - **Uso**:  
     - Pipeline de middlewares (`initializeMiddlewares`) para procesar requests.  
     - `errorHandler` como último eslabón para manejo de errores.  
   - **Ejemplo**:  
     ```typescript  
     // En server.ts  
     this.app.use(errorHandler); // Middleware final  
     ```  

---

#### **Frontend**  
1. **HOC (High-Order Components)**  
   - **Uso**:  
     - Para reutilizar lógica de autenticación o carga. Ejemplo hipotético:  
     ```typescript  
     const withAuth = (Component) => (props) => {  
       const { isAuthenticated } = useAuthStore();  
       return isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />;  
     };  
     ```  

2. **Provider Pattern (Global State)**  
   - **Uso**:  
     - `useAuthStore` (Zustand) para estado de autenticación global.  
     - `QueryClientProvider` (React Query) para gestión de caché.  
   - **Ejemplo**:  
     ```typescript  
     // En main.tsx  
     <QueryClientProvider client={queryClient}>  
       <RouterProvider router={router} />  
     </QueryClientProvider>  
     ```  

3. **Container-Presentational**  
   - **Uso**:  
     - `QuoteList.tsx` como contenedor (lógica + fetching).  
     - Componentes UI (`Table`, `Button`) como presentacionales.  
   - **Ejemplo**:  
     ```typescript  
     // En QuoteList.tsx  
     const filteredQuotes = useMemo(() => /* ...lógica... */, []);  
     return <Table>{/* UI pura */}</Table>;  
     ```  

4. **Observer (Reactividad)**  
   - **Uso**:  
     - `useState`/`useEffect` para sincronizar UI con cambios.  
     - Stores de Zustand notifican cambios a componentes suscritos.  

---

### Patrones Adicionales  
1. **Factory (Parser de Configs)**  
   - **Uso**:  
     - `DatabaseConfigParser` crea configuraciones de BD según variables de entorno.  
   - **Ejemplo**:  
     ```typescript  
     // En parser.ts  
     static parse(env): DatabaseConfig[] {  
       if (key.startsWith('MONGO_URL')) return /* Config MongoDB */;  
       if (key.includes('PG_')) return /* Config Postgres */;  
     }  
     ```  

2. **Dependency Injection**  
   - **Uso**:  
     - Servicios inyectados en controladores (`PatientController -> PatientService`).  
   - **Ejemplo**:  
     ```typescript  
     export class PatientController {  
       constructor(private patientService = new PatientService()) {}  
     }  
     ```  

3. **Facade (API Client)**  
   - **Uso**:  
     - Axios o Fetch wrappers para simplificar llamadas API.  
   - **Ejemplo hipotético**:  
     ```typescript  
     apiClient.get('/patients', { params }); // Unifica manejo de errores/headers  
     ```  

---


## Diagrama ER
![DB](/img/ER.png)

