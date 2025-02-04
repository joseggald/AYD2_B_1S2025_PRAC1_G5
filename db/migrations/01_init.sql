 -- db/migrations/01_init.sql
CREATE TABLE IF NOT EXISTS usuarios (
    cod_empleado VARCHAR(10) PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    nombres VARCHAR(150),
    apellidos VARCHAR(150),
    correo_electronico VARCHAR(100) UNIQUE,
    contrasena VARCHAR(255),
    rol VARCHAR(20) NOT NULL DEFAULT 'USUARIO',
    activo BOOLEAN DEFAULT true,
    razon_inactivo VARCHAR(255), -- Razón por la que el usuario fue desactivado/eliminado
    ts_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ts_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
