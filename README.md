# AYD2_B_1S2025_PRAC1_G5

### Estandar de ramificacion:

#### Estructura de ramas:

- `main`: Producción
- `develop`: Desarrollo principal
- `feature/*`: Funcionalidades
  - feature/{username}//[modulo]-[funcionalidad]
- `hotfix/*`: Correcciones urgentes
  - hotfix/{username}/[issue]-[descripcion]

#### Como crear un feature o hotfix para una tarea:

```git
git pull origin develop
git checkout -b feature/jgaldamez/init-project

git pull origin develop
git checkout -b hotfix/jgaldamez/init-project
```

#### Convenciones de commits:

```
Tipo: descripción
- feat: nueva función
- fix: corrección
- docs: documentación
- style: formato
- refactor: restructuración
- test: pruebas
- chore: mantenimiento
```