 -- db/migrations/01_init.sql
CREATE TABLE IF NOT EXISTS users (
    id_user INT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    lastName VARCHAR(150) NOT NULL,
    cui INT UNIQUE NOT NULL,
    phone INT NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    income_at DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS record (
    id_record INT PRIMARY KEY,
    id_user INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS citas (
    id_citas INT PRIMARY KEY,
    id_record INT NOT NULL,
    date DATE NOT NULL,
    hour INT NOT NULL,
    FOREIGN KEY (id_record) REFERENCES record(id_record) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS unit_measurement (
    id_unit INT PRIMARY KEY,
    unit VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS recipe (
    id_recipe INT PRIMARY KEY,
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
