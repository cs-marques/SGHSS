import { describe, it, expect, vi } from 'vitest';
import { handleLogin, handlePatientRegistration } from '../auth';

describe('Authentication Utilities', () => {
  describe('handleLogin', () => {
    it('successfully logs in a patient', async () => {
      const result = await handleLogin('paciente@vida.com', 'password123');
      expect(result).toBe('/dashboard/patient');
    });

    it('successfully logs in a professional', async () => {
      const result = await handleLogin('medico@vida.com', 'password123');
      expect(result).toBe('/dashboard/professional');
    });

    it('successfully logs in an admin', async () => {
      const result = await handleLogin('admin@vida.com', 'password123');
      expect(result).toBe('/dashboard/admin');
    });

    it('rejects invalid credentials', async () => {
      await expect(handleLogin('invalid@email.com', 'password123')).rejects.toThrow('Invalid credentials');
    });

    it('rejects empty password', async () => {
      await expect(handleLogin('paciente@vida.com', '')).rejects.toThrow('Invalid credentials');
    });
  });

  describe('handlePatientRegistration', () => {
    it('successfully registers a new patient', async () => {
      const patientData = {
        name: 'John Doe',
        cpf: '123.456.789-00',
        birthDate: '1990-01-01',
        phone: '(11) 99999-9999',
        insurance: 'Plano Saúde XYZ',
        email: 'john@example.com',
        password: 'password123'
      };

      await expect(handlePatientRegistration(patientData)).resolves.not.toThrow();
    });

    it('rejects registration with missing email', async () => {
      const invalidData = {
        name: 'Daniel Silva',
        cpf: '123.456.789-00',
        birthDate: '1990-01-01',
        phone: '(11) 99999-9999',
        insurance: 'Plano Saúde XYZ',
        email: '',
        password: 'password123'
      };

      await expect(handlePatientRegistration(invalidData)).rejects.toThrow('Invalid registration data');
    });

    it('rejects registration with missing password', async () => {
      const invalidData = {
        name: 'Matheus Jao',
        cpf: '123.456.789-00',
        birthDate: '1990-01-01',
        phone: '(11) 99999-9999',
        insurance: 'Plano Saúde XYZ',
        email: 'sss@seila.com',
        password: ''
      };

      await expect(handlePatientRegistration(invalidData)).rejects.toThrow('Invalid registration data');
    });
  });
}); 