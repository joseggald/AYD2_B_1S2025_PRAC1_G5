-- db/migrations/01_init.sql

-- Tabla de pacientes
CREATE TABLE IF NOT EXISTS patients (
    id_patient SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    lastName VARCHAR(150) NOT NULL,
    cui INT UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,  -- Cambié a VARCHAR para los teléfonos
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    income_at DATE NOT NULL
);

-- Tabla de registros (record)
CREATE TABLE IF NOT EXISTS record (
    id_record SERIAL PRIMARY KEY,  -- Cambié a SERIAL para autoincremento
    id_patient INT NOT NULL,  -- Reemplazado id_user por id_patient
    FOREIGN KEY (id_patient) REFERENCES patients(id_patient) ON DELETE CASCADE  -- Cambié la referencia a la tabla patients
);

-- Tabla de citas
CREATE TABLE IF NOT EXISTS citas (
    id_citas SERIAL PRIMARY KEY,  -- Cambié a SERIAL para autoincremento
    id_record INT NOT NULL,
    date DATE NOT NULL,
    hour INT NOT NULL,
    FOREIGN KEY (id_record) REFERENCES record(id_record) ON DELETE CASCADE
);

-- Tabla de unidades de medida
CREATE TABLE IF NOT EXISTS unit_measurement (
    id_unit SERIAL PRIMARY KEY,  -- Cambié a SERIAL para autoincremento
    unit VARCHAR(50) NOT NULL
);

-- Tabla de recetas
CREATE TABLE IF NOT EXISTS recipe (
    id_recipe SERIAL PRIMARY KEY,  -- Cambié a SERIAL para autoincremento
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
