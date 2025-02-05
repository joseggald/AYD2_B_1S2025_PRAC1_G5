 -- db/migrations/01_init.sql
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    nombres VARCHAR(150),
    apellidos VARCHAR(150),
    correo_electronico VARCHAR(100) UNIQUE,
    contrasena VARCHAR(255),
    rol VARCHAR(20) NOT NULL DEFAULT 'USUARIO',
    activo BOOLEAN DEFAULT true,
    ts_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ts_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
