import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Heart, AlertCircle, X, ArrowRight, UserPlus, Linkedin } from 'lucide-react';
import { handleLogin } from '../utils/auth';
import Logo from '../components/Logo';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);

  useEffect(() => {
    if (location.state?.registrationSuccess) {
      setShowRegistrationSuccess(true);
      setTimeout(() => {
        setShowRegistrationSuccess(false);
      }, 5000);
    }
  }, [location.state]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const redirectPath = await handleLogin(email, password);
      setTimeout(() => {
        navigate(redirectPath);
      }, 1000);
    } catch (err) {
      setError('Email ou senha inválidos. Por favor, tente novamente.');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoverySuccess(true);
    setTimeout(() => {
      setShowForgotPassword(false);
      setRecoverySuccess(false);
      setRecoveryEmail('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-r from-sky-500 to-sky-400 rounded-b-[100%] opacity-10 transform -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-sky-500 to-sky-400 rounded-full opacity-5 transform translate-x-1/2 translate-y-1/2"></div>
      
      {/* LinkedIn Icon */}
      <a
        href="https://www.linkedin.com/in/maqqs/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 p-2 bg-[#0077B5] text-white rounded-full shadow-lg hover:bg-[#006396] transition-all transform hover:scale-110 z-50"
        title="Conecte-se no LinkedIn"
      >
        <Linkedin size={20} />
      </a>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 relative animate-slide-up">
            <button
              onClick={() => setShowForgotPassword(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Recuperar Senha</h3>
            <p className="text-gray-600 mb-6">Digite seu email para receber as instruções de recuperação de senha.</p>
            
            {recoverySuccess ? (
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <ArrowRight className="text-green-500" />
                </div>
                <p className="text-green-600 font-medium">Email de recuperação enviado!</p>
                <p className="text-sm text-gray-500 mt-2">Verifique sua caixa de entrada.</p>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword}>
                <div className="relative group mb-6">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 border border-transparent rounded-xl text-white bg-gradient-to-r from-sky-500 to-sky-400 hover:from-sky-600 hover:to-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all transform hover:scale-[1.02]"
                >
                  Enviar Instruções
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      
      <div className="w-full max-w-md relative">
        <div className="text-center mb-8 animate-fade-in">
          <Logo className="mx-auto mb-8 transform hover:scale-105 transition-transform duration-300" />
          <h1 className="text-4xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Bem-vindo ao SGHSS
          </h1>
          <p className="text-gray-600 text-lg">Sistema de Gestão Hospitalar e de Serviços de Saúde</p>
        </div>

        {showRegistrationSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center text-green-700 animate-fade-in">
            <AlertCircle size={18} className="mr-2 flex-shrink-0" />
            <span className="text-sm">Cadastro realizado com sucesso! Faça login para continuar.</span>
          </div>
        )}

        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-6 transform transition-all duration-500 animate-slide-up hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Entrar</h2>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center text-red-700 animate-fade-in">
              <AlertCircle size={18} className="mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white/50 hover:bg-white focus:bg-white"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-sky-600 hover:text-sky-800 transition-colors"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white/50 hover:bg-white focus:bg-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-white bg-gradient-to-r from-sky-500 to-sky-400 hover:from-sky-600 hover:to-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all transform hover:scale-[1.02] ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate('/cadastro-paciente')}
                className="w-full flex justify-center items-center py-3 px-4 border-2 border-sky-500 rounded-xl text-sky-600 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all"
              >
                <UserPlus size={18} className="mr-2" />
                Criar conta de paciente
              </button>
            </div>
          </form>
        </div>

        <div className="text-center text-gray-600 text-sm p-6 rounded-2xl bg-white/50 backdrop-blur-sm animate-fade-in border border-gray-100">
          <p className="mb-3 font-medium text-gray-700">Emails de teste:</p>
          <ul className="space-y-2">
            <li className="hover:text-sky-600 transition-colors"><span className="font-medium">Paciente:</span> paciente@vida.com</li>
            <li className="hover:text-sky-600 transition-colors"><span className="font-medium">Médico:</span> medico@vida.com</li>
            <li className="hover:text-sky-600 transition-colors"><span className="font-medium">Admin:</span> admin@vida.com</li>
          </ul>
          <p className="mt-3 text-xs text-gray-500">(Utilize qualquer senha para testar)</p>
        </div>
      </div>

      <footer className="mt-auto pt-8 pb-4 text-center text-gray-500 text-sm animate-fade-in">
        <div className="flex items-center justify-center mb-2">
          <Heart size={14} className="text-red-400 mr-1" />
          <span>VidaPlus © {new Date().getFullYear()}</span>
        </div>
        <p className="text-gray-500">Sistema de Gestão Hospitalar e de Serviços de Saúde</p>
        <p className="text-gray-400 mt-1 text-xs">Desenvolvido por Lucas Marques</p>
      </footer>
    </div>
  );
};

export default LoginPage;