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
}