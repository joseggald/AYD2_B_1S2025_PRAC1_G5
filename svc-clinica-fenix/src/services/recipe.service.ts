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
            const recipe = await client.query('SELECT  a.*, b.name, b.lastname, b.cui FROM recipe AS a JOIN patients AS b ON b.id_patient = a.id_patient WHERE a.id_recipe = $1', [id]);
            return recipe.rows[0];
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
            const recipe = await client.query('SELECT a.*, b.name, b.lastname, b.cui FROM recipe AS a JOIN patients AS b ON b.id_patient = a.id_patient');
            return recipe.rows;
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
            
            const { id_patient, medicine, dose, frequency,indications, doctor_signature} = recipe;

            const query = `
                INSERT INTO recipe (
                id_patient, medicine, dose, frequency, indications, doctor_signature
                ) VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
            `;

            const values = [
                id_patient, medicine, dose, frequency,indications, doctor_signature
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
            
            const { id_recipe,id_patient, medicine, dose, frequency,indications, doctor_signature} = recipe;

            const query = `
                UPDATE recipe SET
                id_patient = $2, medicine = $3, dose = $4, frequency = $5,
                indications = $6, doctor_signature = $7
                WHERE id_recipe = $1
                RETURNING *
            `;

            const values = [
                id_recipe,id_patient, medicine, dose, frequency,indications, doctor_signature
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
            const query = 'DELETE FROM recipe WHERE id_recipe = $1';
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