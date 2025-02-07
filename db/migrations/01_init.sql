-- db/migrations/01_init.sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    lastName VARCHAR(150) NOT NULL,
    username VARCHAR(150) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'DOCTOR' NOT NULL
);

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id_user SERIAL PRIMARY KEY,
    nombres VARCHAR(100),
    apellidos VARCHAR(100),
    correo_electronico VARCHAR(50),
    contrasena VARCHAR(500)
);

-- Tabla de pacientes
CREATE TABLE IF NOT EXISTS patients (
    id_patient SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    lastName VARCHAR(150) NOT NULL,
    cui INT UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    income_at DATE NOT NULL
);

-- Tabla de registros (record)
CREATE TABLE IF NOT EXISTS record (
    id_record SERIAL PRIMARY KEY,
    id_patient INT NOT NULL,
    FOREIGN KEY (id_patient) REFERENCES patients(id_patient) ON DELETE CASCADE
);

-- Tabla de citas
CREATE TABLE IF NOT EXISTS citas (
    id_citas SERIAL PRIMARY KEY,
    id_record INT NOT NULL,
    date DATE NOT NULL,
    hour INT NOT NULL,
    FOREIGN KEY (id_record) REFERENCES record(id_record) ON DELETE CASCADE
);

-- Tabla de unidades de medida
CREATE TABLE IF NOT EXISTS unit_measurement (
    id_unit SERIAL PRIMARY KEY,
    unit VARCHAR(50) NOT NULL
);

-- Tabla de recetas
CREATE TABLE IF NOT EXISTS recipe (
    id_recipe SERIAL PRIMARY KEY,
    id_record INT NOT NULL,
    medicine VARCHAR(100) NOT NULL,
    dose INT NOT NULL,
    id_unit_dose INT NOT NULL,
    frequency INT NOT NULL,
    id_unit_frequency INT NOT NULL,
    indications TEXT,
    doctor_signature VARCHAR(255),
    FOREIGN KEY (id_record) REFERENCES record(id_record) ON DELETE CASCADE,
    FOREIGN KEY (id_unit_dose) REFERENCES unit_measurement(id_unit) ON DELETE CASCADE,
    FOREIGN KEY (id_unit_frequency) REFERENCES unit_measurement(id_unit) ON DELETE CASCADE
);
