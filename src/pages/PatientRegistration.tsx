import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Lock, CreditCard, Calendar, FileText, ArrowLeft, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';
import { handlePatientRegistration } from '../utils/auth';

interface RegistrationForm {
  name: string;
  cpf: string;
  birthDate: string;
  phone: string;
  insurance: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const PatientRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<RegistrationForm>({
    name: '',
    cpf: '',
    birthDate: '',
    phone: '',
    insurance: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format CPF
    if (name === 'cpf') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    }

    // Format phone
    if (name === 'phone') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
    }

    setForm(prev => ({ ...prev, [name]: formattedValue }));
    
    // Clear error when email field is modified
    if (name === 'email') {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.email !== 'paciente@vida.com') {
      setError('Por favor, utilize o email paciente@vida.com para cadastro');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setIsLoading(true);
    try {
      await handlePatientRegistration(form);
      navigate('/login', { state: { registrationSuccess: true } });
    } catch (err) {
      setError('Ocorreu um erro ao realizar o cadastro. Por favor, tente novamente.');
      setIsLoading(false);
    }
  };

  // Get current date for max attribute
  const currentDate = new Date().toISOString().split('T')[0];
  // Set minimum date to 120 years ago
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 120);
  const minDateString = minDate.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar para login
          </button>
          <Logo />
        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 animate-slide-up">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Cadastro de Paciente</h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center text-red-700">
              <AlertCircle size={18} className="mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dados Pessoais */}
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Dados Pessoais</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome Completo *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                      </div>
                      <input
                        required
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white/50"
                        placeholder="João da Silva"
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                      CPF *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FileText size={18} className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                      </div>
                      <input
                        required
                        id="cpf"
                        name="cpf"
                        type="text"
                        value={form.cpf}
                        onChange={handleChange}
                        maxLength={14}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white/50"
                        placeholder="000.000.000-00"
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Data de Nascimento *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={18} className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                      </div>
                      <input
                        required
                        id="birthDate"
                        name="birthDate"
                        type="date"
                        value={form.birthDate}
                        onChange={handleChange}
                        min={minDateString}
                        max={currentDate}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white/50"
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone size={18} className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                      </div>
                      <input
                        required
                        id="phone"
                        name="phone"
                        type="text"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white/50"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dados do Convênio */}
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Dados do Convênio</h2>
                <div className="relative group">
                  <label htmlFor="insurance" className="block text-sm font-medium text-gray-700 mb-1">
                    Convênio
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard size={18} className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                    </div>
                    <input
                      id="insurance"
                      name="insurance"
                      type="text"
                      value={form.insurance}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white/50"
                      placeholder="Nome do convênio (opcional)"
                    />
                  </div>
                </div>
              </div>

              {/* Dados de Acesso */}
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Dados de Acesso</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={18} className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                      </div>
                      <input
                        required
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white/50"
                        placeholder="paciente@vida.com"
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Use paciente@vida.com para cadastro
                    </p>
                  </div>

                  <div className="relative group">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Senha *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                      </div>
                      <input
                        required
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white/50"
                        placeholder="••••••••"
                        minLength={6}
                      />
                    </div>
                  </div>

                  <div className="relative group md:col-span-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmar Senha *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                      </div>
                      <input
                        required
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white/50"
                        placeholder="••••••••"
                        minLength={6}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2.5 text-white bg-gradient-to-r from-sky-500 to-sky-400 rounded-xl hover:from-sky-600 hover:to-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all transform hover:scale-[1.02] ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cadastrando...
                  </>
                ) : (
                  'Cadastrar'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;