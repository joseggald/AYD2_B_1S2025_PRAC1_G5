import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { dbManager } from '../config/database';
import { Logger } from '../utils/Logger';

export class PatientService {
    private getConnection(): Pool {
        try {
          const pool = dbManager.getConnection('postgres');
          if (!pool) {
            throw new Error('Database connection not initialized');
          }
          return pool;
        } catch (error) {
          Logger.error('Failed to get database connection:', error);
          throw new Error('Database connection error');
        }
      }

    public async getPatientById(id: string): Promise<any> {
        const pool = this.getConnection();
        const client = await pool.connect();

        try {
            const patient = await client.query('SELECT * FROM patients WHERE id_patient = $1', [id]);
            return patient.rows[0];
        } catch (error) {
            Logger.error('Failed to get patient:', error);
            throw new Error('Failed to get patient');
        } finally {
            client.release();
        }
    }

    public async getPatients(): Promise<any> {
        const pool = this.getConnection();
        const client = await pool.connect();
        
        try {
            const patients = await client.query('SELECT * FROM patients');
            return patients.rows;
        } catch (error) {
            Logger.error('Failed to get patients:', error);
            throw new Error('Failed to get patients');
        } finally {
            client.release();
        }
    }

    public async createPatient(patient: any): Promise<any> {
        const pool = this.getConnection();
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            
            const { name, lastname, cui, phone, email, age, gender, income_at } = patient;

            const query = `
                INSERT INTO patients (
                name, lastName, cui, phone, email, age, gender, income_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *
            `;

            const values = [
                name, lastname, cui, phone, email, age, gender, income_at 
            ];

            const result = await client.query(query, values);
            await client.query('COMMIT');

            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            Logger.error('Failed to create patient:', error);
            throw new Error('Failed to create patient');
        } finally {
            client.release();
        }
    }   

    public async updatePatient(patient: any): Promise<any> {
        const pool = this.getConnection();
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            
            const { id_patient, name, lastname, cui, phone, email, age, gender, income_at } = patient;

            const query = `
                UPDATE patients SET
                name = $1, lastName = $2, cui = $3, phone = $4, email = $5, age = $6, gender = $7, income_at = $8
                WHERE id_patient = $9
                RETURNING *
            `;

            const values = [
                name, lastname, cui, phone, email, age, gender, income_at, id_patient
            ];

            const result = await client.query(query, values);
            await client.query('COMMIT');

            return result.rows[0];

        } catch (error) {
            await client.query('ROLLBACK');
            Logger.error('Failed to update patient:', error);
            throw new Error('Failed to update patient');
        } finally {
            client.release();
        }
    }

    public async deletePatient(id: string): Promise<any> {
        const pool = this.getConnection();
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const query = 'DELETE FROM patients WHERE id_patient = $1';
            const result = await client.query(query, [id]);
            await client.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            Logger.error('Failed to delete patient:', error);
            throw new Error('Failed to delete patient');
        } finally {
            client.release();
        }
    }

    public async getExpedients(parameter: string): Promise<any> {
        const pool = this.getConnection();
        const client = await pool.connect();

        try {
            // buscamos por cui
            const expedientsCUI = await client.query(`
              SELECT
                p.cui,
                p.name,
                p.lastname,
                p.age,
                c.id_citas,
                c.date,
                c.hour,
                re.id_recipe,
                re.medicine,
                re.dose,
                um.unit as unit_dose,
                re.frequency,
                umf.unit as unit_frequency,
                re.indications,
                re.doctor_signature
            FROM patients p
            JOIN record r on r.id_patient = p.id_patient
            JOIN citas c on c.id_record = r.id_record
            JOIN recipe re on re.id_record = r.id_record
            JOIN unit_measurement um on um.id_unit = re.id_unit_dose
            JOIN unit_measurement umf on umf.id_unit = re.id_unit_frequency
            WHERE p.cui = $1
            `, [parameter]);

            const expedienteObtenido = expedientsCUI.rows

            const today = new Date().toISOString().split('T')[0];

            const consultas_anteriores = expedienteObtenido
                .filter(cita => cita.date.toISOString().split('T')[0] < today)
                .map(cita => ({
                    id_citas: cita.id_citas,
                    date: cita.date,
                    hour: cita.hour
                }));

            const consultas_futuras = expedienteObtenido
                .filter(cita => cita.date.toISOString().split('T')[0] >= today)
                .map(cita => ({
                    id_citas: cita.id_citas,
                    date: cita.date,
                    hour: cita.hour
                }));

            const recetas_medicas: { 
                id_recipe: number, 
                medicine: string,
                dose: string,
                unit_dose: number,
                frequency: number,
                unit_frequency: number,
                indications: string,
                doctor_signature: string
            }[] = [];

            const recetasSet = new Set();

            expedienteObtenido.forEach(receta => {
                if (!recetasSet.has(receta.id_recipe)) {
                    recetasSet.add(receta.id_recipe);
                    recetas_medicas.push({
                        id_recipe: receta.id_recipe,
                        medicine: receta.medicine,
                        dose: receta.dose,
                        unit_dose: receta.unit_dose,
                        frequency: receta.frequency,
                        unit_frequency: receta.unit_frequency,
                        indications: receta.indications,
                        doctor_signature: receta.doctor_signature
                    });
                }
            });
            
            const expedienteResponse = {
                cui: expedienteObtenido[0].cui,
                name: expedienteObtenido[0].name,
                lastname: expedienteObtenido[0].lastname,
                age: expedienteObtenido[0].age,
                consultas_anteriores,
                consultas_futuras,
                recetas_medicas
            };

            return expedienteResponse;
        } catch (error) {
            Logger.error('Failed to get expedients:', error);
            throw new Error('Failed to get expedients');
        } finally {
            client.release();
        }
    }
}