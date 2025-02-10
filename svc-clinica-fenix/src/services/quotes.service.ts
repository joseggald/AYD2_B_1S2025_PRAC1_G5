import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { dbManager } from '../config/database';
import { Logger } from '../utils/Logger';

export class QuotesService {
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

    public async getQuoteById(id: string): Promise<any> {
        const pool = this.getConnection();
        const client = await pool.connect();

        try {
            const quotes = await client.query('SELECT a.*, b.name, b.lastname, b.cui FROM citas AS a JOIN patients AS b ON b.id_patient = a.id_patient WHERE  a.id_patient = $1', [id]);
            return quotes.rows[0];
        } catch (error) {
            Logger.error('Failed to get quotes:', error);
            throw new Error('Failed to get quotes');
        } finally {
            client.release();
        }
    }

    public async getQuotes(): Promise<any> {
        const pool = this.getConnection();
        const client = await pool.connect();
        
        try {
            const quotes = await client.query('SELECT a.*, b.name, b.lastname, b.cui FROM citas AS a JOIN patients AS b ON b.id_patient = a.id_patient');
            return quotes.rows;
        } catch (error) {
            Logger.error('Failed to get quotes:', error);
            throw new Error('Failed to get quotes');
        } finally {
            client.release();
        }
    }

    public async createQuote(quote: any): Promise<any> {
        const pool = this.getConnection();
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            
            const { id_patient, date, hour, description } = quote;

            const query = `
                INSERT INTO citas (
                id_patient, date, hour, description
                ) VALUES ($1, $2, $3, $4)
                RETURNING *
            `;

            const values = [
                id_patient,date,hour, description
            ];

            const result = await client.query(query, values);
            await client.query('COMMIT');

            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            Logger.error('Failed to create quotes:', error);
            throw new Error('Failed to create quotes');
        } finally {
            client.release();
        }
    }   

    public async updateQuote(patient: any): Promise<any> {
        const pool = this.getConnection();
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            
            const { id_patient, date, hour,id_citas, description } = patient;

            const query = `
                UPDATE citas SET
                id_patient = $1, date = $2, hour = $3, description = $4
                WHERE id_citas = $5
                RETURNING *
            `;

            const values = [
                id_patient, date, hour, description, id_citas 
            ];

            const result = await client.query(query, values);
            await client.query('COMMIT');

            return result.rows[0];

        } catch (error) {
            await client.query('ROLLBACK');
            Logger.error('Failed to update quotes:', error);
            throw new Error('Failed to update quotes');
        } finally {
            client.release();
        }
    }

    public async deleteQuote(id: string): Promise<any> {
        const pool = this.getConnection();
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const query = 'DELETE FROM citas WHERE id_citas = $1';
            const result = await client.query(query, [id]);
            await client.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            Logger.error('Failed to delete quotes:', error);
            throw new Error('Failed to delete quotes');
        } finally {
            client.release();
        }
    }
}