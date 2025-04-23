/**
 * Simple authentication utility for demo purposes
 * In a real application, this would connect to an actual authentication service
 */

// Map of user types based on email
const userTypeMap: Record<string, string> = {
  'paciente@vida.com': 'patient',
  'medico@vida.com': 'professional',
  'admin@vida.com': 'admin',
};

interface PatientRegistrationData {
  name: string;
  cpf: string;
  birthDate: string;
  phone: string;
  insurance: string;
  email: string;
  password: string;
}

/**
 * Mock login function that determines redirect path based on email
 */
export const handleLogin = async (email: string, password: string): Promise<string> => {
  // Simulating API call delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userType = userTypeMap[email.toLowerCase()];
      
      if (userType && password.length > 0) {
        // In a real app, we would verify the password here
        resolve(`/dashboard/${userType}`);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

/**
 * Mock patient registration function
 */
export const handlePatientRegistration = async (data: PatientRegistrationData): Promise<void> => {
  // Simulating API call delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // In a real app, we would send the data to the server here
      // For demo purposes, we'll just simulate a successful registration
      if (data.email && data.password) {
        resolve();
      } else {
        reject(new Error('Invalid registration data'));
      }
    }, 1500);
  });
};