import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar,
  Clock,
  Video,
  ClipboardList,
  Bell,
  User,
  MapPin,
  ArrowRight,
  X,
  LogOut,
  ChevronDown,
  Plus,
  FileText,
  Activity,
  AlertCircle
} from 'lucide-react';
import Logo from '../components/Logo';
import Sidebar from '../components/Sidebar';

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showProfileError, setShowProfileError] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const quickActionsRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Consulta Confirmada',
      message: 'Sua consulta com Dra. Maria Silva foi confirmada para amanhã às 14:30.',
      time: '2 minutos atrás',
      read: false
    },
    {
      id: 2,
      title: 'Resultado de Exame',
      message: 'Seus resultados de exame estão disponíveis para visualização.',
      time: '1 hora atrás',
      read: false
    },
    {
      id: 3,
      title: 'Lembrete de Medicação',
      message: 'Não se esqueça de tomar seu medicamento hoje às 20:00.',
      time: '3 horas atrás',
      read: false
    }
  ]);

  const quickActionItems = [
    {
      icon: Plus,
      label: 'Nova Consulta',
      action: () => navigate('/dashboard/patient/agendamento')
    },
    {
      icon: Video,
      label: 'Teleconsulta',
      action: () => navigate('/dashboard/patient/teleconsulta')
    },
    {
      icon: FileText,
      label: 'Exames',
      action: () => navigate('/dashboard/patient/historico')
    }
  ];

  const profileMenuItems = [
    {
      icon: User,
      label: 'Meu Perfil',
      action: () => {
        setShowProfileError(true);
        setShowProfileMenu(false);
      }
    },
    {
      icon: LogOut,
      label: 'Sair',
      action: () => navigate('/login')
    }
  ];
  
  const nextAppointment = {
    doctor: "Dra. Maria Silva",
    specialty: "Cardiologia",
    date: "15 de Abril, 2024",
    time: "14:30",
    location: "Clínica Central"
  };

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Carlos Santos",
      specialty: "Dermatologia",
      date: "20 de Abril, 2024",
      time: "15:30",
      location: "Unidade Sul"
    },
    {
      id: 2,
      doctor: "Dra. Ana Oliveira",
      specialty: "Oftalmologia",
      date: "25 de Abril, 2024",
      time: "10:00",
      location: "Centro Médico Norte"
    },
    {
      id: 3,
      doctor: "Dr. João Lima",
      specialty: "Ortopedia",
      date: "30 de Abril, 2024",
      time: "16:15",
      location: "Clínica Central"
    }
  ];

  const healthStats = [
    {
      label: 'Consultas',
      value: '12',
      change: '+2',
      trend: 'up',
      period: 'último mês'
    },
    {
      label: 'Exames',
      value: '8',
      change: '+3',
      trend: 'up',
      period: 'último mês'
    },
    {
      label: 'Teleconsultas',
      value: '5',
      change: '+1',
      trend: 'up',
      period: 'último mês'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (quickActionsRef.current && !quickActionsRef.current.contains(event.target as Node)) {
        setShowQuickActions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markNotificationAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1">
        <header className="bg-white shadow-sm py-4 px-4 sm:px-6 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Logo />
            <div className="flex items-center justify-between sm:justify-end gap-4">
              {/* Quick Actions */}
              <div className="relative hidden sm:block" ref={quickActionsRef}>
                <button
                  onClick={() => setShowQuickActions(!showQuickActions)}
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <Plus size={20} className="mr-2" />
                  <span>Ações Rápidas</span>
                  <ChevronDown size={16} className="ml-2" />
                </button>

                {showQuickActions && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 animate-fade-in">
                    <div className="py-2">
                      {quickActionItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={item.action}
                          className="w-full px-4 py-2 text-left flex items-center hover:bg-gray-50 transition-colors"
                        >
                          <item.icon size={18} className="mr-3 text-gray-500" />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Quick Actions */}
              <div className="sm:hidden flex items-center gap-2">
                {quickActionItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <item.icon size={20} />
                  </button>
                ))}
              </div>

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="fixed inset-x-0 top-16 mx-4 lg:inset-auto lg:right-0 lg:top-auto lg:mt-2 lg:w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 animate-fade-in">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Notificações</h3>
                        <button 
                          onClick={() => setShowNotifications(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div 
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                              !notification.read ? 'bg-sky-50' : ''
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{notification.title}</p>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                {!notification.read && (
                                  <button
                                    onClick={() => markNotificationAsRead(notification.id)}
                                    className="text-sky-500 hover:text-sky-600"
                                    title="Marcar como lida"
                                  >
                                    <Clock size={14} />
                                  </button>
                                )}
                                <button
                                  onClick={() => removeNotification(notification.id)}
                                  className="text-gray-400 hover:text-red-500"
                                  title="Remover"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          Nenhuma notificação
                        </div>
                      )}
                    </div>
                    <div className="p-4 border-t border-gray-100">
                      <button
                        onClick={() => navigate('/dashboard/patient/notificacoes')}
                        className="text-sm text-sky-600 hover:text-sky-700 font-medium"
                      >
                        Ver todas as notificações
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center">
                    <User size={20} className="text-sky-600" />
                  </div>
                  <span className="hidden sm:inline font-medium text-gray-700">João Silva</span>
                  <ChevronDown size={16} className="hidden sm:block text-gray-500" />
                </button>

                {showProfileMenu && (
                  <div className="fixed inset-x-0 top-16 mx-4 lg:inset-auto lg:right-0 lg:top-auto lg:mt-2 lg:w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 animate-fade-in">
                    <div className="py-2">
                      {profileMenuItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={item.action}
                          className="w-full px-4 py-2 text-left flex items-center hover:bg-gray-50 transition-colors"
                        >
                          <item.icon size={18} className="mr-3 text-gray-500" />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Olá, João!</h1>
            <p className="text-gray-600">Bem-vindo ao seu painel de controle</p>
          </div>

          {/* Health Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {healthStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">{stat.label}</h3>
                  <Activity size={20} className="text-sky-500" />
                </div>
                <div className="mt-2 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className={`ml-2 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{stat.period}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Próxima Consulta */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Próxima Consulta</h2>
                <Calendar size={24} className="text-sky-500" />
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <User size={18} className="text-gray-400 mt-0.5" />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{nextAppointment.doctor}</p>
                    <p className="text-sm text-gray-500">{nextAppointment.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="text-gray-400" />
                  <p className="ml-3 text-gray-600">
                    {nextAppointment.date} - {nextAppointment.time}
                  </p>
                </div>
                <div className="flex items-center">
                  <MapPin size={18} className="text-gray-400" />
                  <p className="ml-3 text-gray-600">{nextAppointment.location}</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/dashboard/patient/consultas')}
                className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-sky-500 text-sky-600 rounded-xl hover:bg-sky-50 transition-colors"
              >
                Ver detalhes
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>

            {/* Teleconsulta */}
            <div className="bg-gradient-to-br from-sky-500 to-sky-400 rounded-2xl shadow-sm p-6 text-white transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Teleconsulta</h2>
                <Video size={24} />
              </div>
              <p className="mb-4 text-sky-100">Realize consultas online com nossos especialistas</p>
              <button 
                onClick={() => navigate('/dashboard/patient/teleconsulta')}
                className="w-full bg-white text-sky-600 rounded-xl py-2 px-4 font-medium hover:bg-sky-50 transition-colors"
              >
                Agendar Teleconsulta
              </button>
            </div>

            {/* Histórico */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Histórico Médico</h2>
                <ClipboardList size={24} className="text-sky-500" />
              </div>
              <p className="text-gray-600 mb-4">Acesse seu histórico completo de consultas e exames</p>
              <button 
                onClick={() => navigate('/dashboard/patient/historico')}
                className="w-full flex items-center justify-center px-4 py-2 border border-sky-500 text-sky-600 rounded-xl hover:bg-sky-50 transition-colors"
              >
                Ver Histórico
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>

          {/* Consultas Agendadas */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">Consultas Agendadas</h2>
              <button 
                onClick={() => navigate('/dashboard/patient/consultas')}
                className="text-sky-600 hover:text-sky-700 text-sm font-medium"
              >
                Ver todas
              </button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div 
                  key={appointment.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-sky-100 hover:bg-sky-50/50 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                    <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                      <Calendar size={24} className="text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{appointment.doctor}</h3>
                      <p className="text-sm text-gray-500">{appointment.date} - {appointment.time}</p>
                      <p className="text-sm text-gray-500">{appointment.location}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/dashboard/patient/consultas')}
                    className="text-sky-600 hover:text-sky-700 transform transition-transform group-hover:translate-x-1 self-end sm:self-center"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Profile Error Modal */}
      {showProfileError && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-auto animate-slide-up">
            <div className="flex items-center justify-center mb-4">
              <AlertCircle size={48} className="text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Acesso Restrito</h3>
            <p className="text-gray-600 text-center mb-6">
              Por motivos de segurança e integridade dos dados, as informações do perfil só podem ser alteradas pelo administrador do sistema. Por favor, entre em contato com o suporte para solicitar alterações.
            </p>
            <button
              onClick={() => setShowProfileError(false)}
              className="w-full py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;