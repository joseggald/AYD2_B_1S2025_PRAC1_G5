import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { dbManager } from '../config/database';
import { Logger } from '../utils/Logger';

export class UserService {
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

  public async createUser(userData: any): Promise<any> {
    const pool = this.getConnection();
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      const { nombres, apellidos, correo_electronico, contrasena } = userData;
      
      const hashedPassword = await bcrypt.hash(contrasena, 10);
      
      const query = `
        INSERT INTO users (
          nombres, apellidos, correo_electronico, contrasena
        ) VALUES ($1, $2, $3, $4)
        RETURNING nombres, apellidos, correo_electronico, contrasena 
      `;
      
      const values = [
        nombres, apellidos, correo_electronico, hashedPassword
      ];

      const result = await client.query(query, values);
      await client.query('COMMIT');
      
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      Logger.error('Error creating user:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  public async validateUser(correo_electronico: string, contrasena: string): Promise<any> {
    const pool = this.getConnection();
    const client = await pool.connect();
    
    try {
      const query = `
        SELECT * FROM users 
        WHERE correo_electronico = $1
      `;
      
      const result = await client.query(query, [correo_electronico]);
      const user = result.rows[0];

      if (!user) {
        return null;
      }

      const isValid = await bcrypt.compare(contrasena, user.contrasena);
      if (!isValid) {
        return null;
      }

      delete user.contrasena;
      return user;
    } catch (error) {
      Logger.error('Error validating user:', error);
      throw error;
    } finally {
      client.release();
    }
  }
}