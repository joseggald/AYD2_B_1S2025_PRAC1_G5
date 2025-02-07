import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { dbManager } from '../config/database';
import { Logger } from '../utils/Logger';

export class RecipesService {
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

    public async getRecipeById(id: string): Promise<any> {
        const pool = this.getConnection();
        const client = await pool.connect();

        try {
            const quotes = await client.query('SELECT * FROM recipe WHERE id_recipe = $1', [id]);
            return quotes.rows[0];
        } catch (error) {
            Logger.error('Failed to get recipes:', error);
            throw new Error('Failed to get recipes');
        } finally {
            client.release();
        }
    }

    public async getRecipes(): Promise<any> {
        const pool = this.getConnection();
        const client = await pool.connect();
        
        try {
            const quotes = await client.query('SELECT * FROM recipes');
            return quotes.rows;
        } catch (error) {
            Logger.error('Failed to get recipes:', error);
            throw new Error('Failed to get recipes');
        } finally {
            client.release();
        }
    }

    public async createRecipe(recipe: any): Promise<any> {
        const pool = this.getConnection();
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            
            const { id_record, medicine, dose, id_unit_dose, 
                frequency,id_unit_frequency,indications, doctor_signature} = recipe;

            const query = `
                INSERT INTO recipes (
                id_record, medicine, dose, id_unit_dose, frequency,id_unit_frequency,
                indications, doctor_signature
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *
            `;

            const values = [
                id_record, medicine, dose, id_unit_dose, 
                frequency,id_unit_frequency,indications, doctor_signature
            ];

            const result = await client.query(query, values);
            await client.query('COMMIT');

            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            Logger.error('Failed to create recipes:', error);
            throw new Error('Failed to create recipes');
        } finally {
            client.release();
        }
    }   

    public async updateRecipe(recipe: any): Promise<any> {
        const pool = this.getConnection();
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            
            const { id_recipe,id_record, medicine, dose, id_unit_dose, 
                frequency,id_unit_frequency,indications, doctor_signature} = recipe;

            const query = `
                UPDATE citas SET
                id_record = $2, medicine = $3, dose = $4, id_unit_dose = $5, frequency = $6,
                id_unit_frequency = $7, indications = $8, doctor_signature = $9
                WHERE id_citas = $1
                RETURNING *
            `;

            const values = [
                id_recipe, id_record, medicine, dose, id_unit_dose, 
                frequency,id_unit_frequency,indications, doctor_signature
            ];

            const result = await client.query(query, values);
            await client.query('COMMIT');

            return result.rows[0];

        } catch (error) {
            await client.query('ROLLBACK');
            Logger.error('Failed to update recipes:', error);
            throw new Error('Failed to update recipes');
        } finally {
            client.release();
        }
    }

    public async deleteRecipe(id: string): Promise<any> {
        const pool = this.getConnection();
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const query = 'DELETE FROM recipes WHERE id_recipes = $1';
            const result = await client.query(query, [id]);
            await client.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            Logger.error('Failed to delete recipes:', error);
            throw new Error('Failed to delete recipes');
        } finally {
            client.release();
        }
    }
}