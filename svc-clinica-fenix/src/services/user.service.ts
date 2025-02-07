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
      
      const { name, lastName, username, email, password } = userData;
      
      // Verificar si el usuario ya existe
      const existingUser = await client.query(
        'SELECT user FROM users WHERE username = $1 OR email = $2',
        [username, email]
      );

      if (existingUser.rows.length > 0) {
        throw new Error('Usuario o correo electrónico ya existe');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const query = `
        INSERT INTO users (
          name, lastName, username, email, password
        ) VALUES ($1, $2, $3, $4, $5)
        RETURNING id,name, lastName, username, email, password
      `;
      
      const values = [name, lastName, username, email, hashedPassword];

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

  public async validateUser(username: string, password: string): Promise<any> {
    const pool = this.getConnection();
    const client = await pool.connect();
    
    try {
      const query = `
        SELECT * FROM users 
        WHERE username = $1
      `;
      
      const result = await client.query(query, [username]);
      const user = result.rows[0];

      if (!user) {
        return null;
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return null;
      }

      delete user.password;
      return user;
    } catch (error) {
      Logger.error('Error validating user:', error);
      throw error;
    } finally {
      client.release();
    }
  }
}