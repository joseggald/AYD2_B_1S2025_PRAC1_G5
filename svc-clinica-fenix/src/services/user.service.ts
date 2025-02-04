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
      
      const { usuario, contrasena, nombres, apellidos, correo_electronico, cod_empleado } = userData;
      
      // Verificar si el usuario ya existe
      const existingUser = await client.query(
        'SELECT usuario FROM usuarios WHERE usuario = $1 OR correo_electronico = $2',
        [usuario, correo_electronico]
      );

      if (existingUser.rows.length > 0) {
        throw new Error('Usuario o correo electrónico ya existe');
      }

      const hashedPassword = await bcrypt.hash(contrasena, 10);
      
      const query = `
        INSERT INTO usuarios (
          cod_empleado, usuario, nombres, apellidos, 
          correo_electronico, contrasena
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING cod_empleado, usuario, nombres, apellidos, 
                  correo_electronico, rol, activo, ts_creacion
      `;
      
      const values = [
        cod_empleado, usuario, nombres, apellidos, 
        correo_electronico, hashedPassword
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

  public async validateUser(usuario: string, contrasena: string): Promise<any> {
    const pool = this.getConnection();
    const client = await pool.connect();
    
    try {
      const query = `
        SELECT * FROM usuarios 
        WHERE usuario = $1 AND activo = true
      `;
      
      const result = await client.query(query, [usuario]);
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