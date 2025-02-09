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
            const result = await client.query(`SELECT 
    p.cui,
    p.name,
    p.lastname,
    p.age,
    
    -- Información de citas
    JSONB_AGG(
        JSONB_BUILD_OBJECT(
            'id_citas', c.id_citas,
            'date', c.date,
            'hour', c.hour,
            'description', c.description
        ) ORDER BY c.date DESC, c.hour, c.description DESC
    ) FILTER (WHERE c.id_citas IS NOT NULL) as citas,
    
    -- Información de recetas
    (
        SELECT JSONB_AGG(
            recipe_data ORDER BY recipe_data->>'id_recipe' DESC
        )
        FROM (
            SELECT DISTINCT JSONB_BUILD_OBJECT(
                'id_recipe', r.id_recipe,
                'medicine', r.medicine,
                'dose', r.dose,
                'frequency', r.frequency,
                'indications', r.indications,
                'doctor_signature', r.doctor_signature
            ) as recipe_data
            FROM recipe r
            WHERE r.id_patient = p.id_patient
        ) subquery
    ) as recetas
FROM 
    patients p
LEFT JOIN citas c ON 
    c.id_patient = p.id_patient
WHERE 
    p.cui = $1
GROUP BY 
    p.cui, p.name, p.lastname, p.age, p.id_patient;`, [parameter]);
            
            if (result.rows.length === 0) {
                throw new Error('Expediente no encontrado');
            }
            
            return result.rows[0]; // Ya viene estructurado como lo necesitas
            
        } catch (error) {
            Logger.error('Failed to get expedients:', error);
            throw new Error('Failed to get expedients');
        } finally {
            client.release();
        }
    }
}