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

-- Tabla de citas
CREATE TABLE IF NOT EXISTS citas (
    id_citas SERIAL PRIMARY KEY,
    id_patient INT NOT NULL,
    date DATE NOT NULL,
    hour INT NOT NULL,
    FOREIGN KEY (id_patient) REFERENCES patients(id_patient)
);

-- Tabla de recetas
CREATE TABLE IF NOT EXISTS recipe (
    id_recipe SERIAL PRIMARY KEY,
    id_patient INT NOT NULL,
    medicine VARCHAR(100) NOT NULL,
    dose VARCHAR(30) NOT NULL,
    frequency VARCHAR(30) NOT NULL,
    indications TEXT,
    doctor_signature VARCHAR(255),
    FOREIGN KEY (id_patient) REFERENCES patients(id_patient)
);