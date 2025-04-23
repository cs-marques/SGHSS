import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  BedDouble, 
  FileText, 
  BarChart, 
  Settings, 
  Bell, 
  Search,
  ArrowUp,
  ArrowDown,
  Calendar,
  Activity,
  UserPlus,
  ClipboardList,
  AlertCircle,
  X,
  ChevronDown,
  Plus,
  TrendingUp,
  Stethoscope,
  Building2,
  Heart
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import Logo from '../components/Logo';
import NotificationsPanel from '../components/NotificationsPanel';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSystemStatus, setShowSystemStatus] = useState(true);
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Nova solicitação de cadastro",
      message: "Dr. Ricardo Souza aguarda aprovação",
      time: "5 minutos atrás",
      read: false
    },
    {
      id: 2,
      title: "Alerta de ocupação",
      message: "UTI atingiu 90% da capacidade",
      time: "1 hora atrás",
      read: false
    },
    {
      id: 3,
      title: "Relatório mensal disponível",
      message: "O relatório de Fevereiro está pronto",
      time: "2 horas atrás",
      read: false
    }
  ]);

  const stats = [
    {
      title: "Total de Pacientes",
      value: "1,284",
      change: "+12.5%",
      trend: "up",
      period: "vs. mês anterior",
      icon: Users
    },
    {
      title: "Internações Ativas",
      value: "64",
      change: "-3.2%",
      trend: "down",
      period: "vs. mês anterior",
      icon: BedDouble
    },
    {
      title: "Taxa de Ocupação",
      value: "85%",
      change: "+2.1%",
      trend: "up",
      period: "vs. mês anterior",
      icon: Activity
    },
    {
      title: "Consultas Hoje",
      value: "128",
      change: "+8.4%",
      trend: "up",
      period: "vs. ontem",
      icon: Calendar
    }
  ];

  const recentRegistrations = [
    {
      id: 1,
      name: "Dr. Carlos Silva",
      type: "Médico",
      specialty: "Cardiologia",
      date: "15/03/2024"
    },
    {
      id: 2,
      name: "Maria Oliveira",
      type: "Paciente",
      condition: "Consulta de rotina",
      date: "14/03/2024"
    },
    {
      id: 3,
      name: "Dra. Ana Santos",
      type: "Médico",
      specialty: "Pediatria",
      date: "14/03/2024"
    }
  ];

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleRemove = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleViewAll = () => {
    navigate('/dashboard/admin/notificacoes');
  };

  const hospitalStats = [
    {
      title: "Leitos Disponíveis",
      value: "15",
      total: "80",
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Taxa de Ocupação UTI",
      value: "90%",
      status: "Crítico",
      color: "bg-red-100 text-red-800"
    },
    {
      title: "Tempo Médio de Internação",
      value: "5.2",
      unit: "dias",
      color: "bg-blue-100 text-blue-800"
    }
  ];

  const departmentStats = [
    {
      name: "Cardiologia",
      patients: 45,
      trend: "up",
      percentage: 12
    },
    {
      name: "Pediatria",
      patients: 38,
      trend: "up",
      percentage: 8
    },
    {
      name: "Ortopedia",
      patients: 32,
      trend: "down",
      percentage: 3
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1">
        <header className="bg-white shadow-sm py-4 px-6 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo />
            <div className="flex items-center space-x-4">
              <NotificationsPanel
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onRemove={handleRemove}
                onViewAll={handleViewAll}
              />
              <button 
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sair
              </button>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-8 px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
            <p className="text-gray-600">Visão geral do sistema</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center">
                    <stat.icon size={20} className="text-sky-500" />
                  </div>
                </div>
                <p className="text-2xl font-semibold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  } flex items-center`}>
                    {stat.trend === 'up' ? (
                      <ArrowUp size={16} className="mr-1" />
                    ) : (
                      <ArrowDown size={16} className="mr-1" />
                    )}
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">{stat.period}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-sky-500 to-sky-400 rounded-xl shadow-sm p-6 text-white">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Cadastros</h2>
                  <UserPlus size={24} />
                </div>
                <p className="mb-6 text-sky-100">Gerencie os cadastros de médicos, pacientes e funcionários.</p>
                <div className="space-y-3">
                  <button 
                    onClick={() => navigate('/dashboard/admin/cadastros')}
                    className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl py-2.5 px-4 transition-all"
                  >
                    Novo Médico
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard/admin/cadastros')}
                    className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl py-2.5 px-4 transition-all"
                  >
                    Novo Paciente
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard/admin/cadastros')}
                    className="w-full bg-white text-sky-600 rounded-xl py-2.5 px-4 font-medium hover:bg-sky-50 transition-all"
                  >
                    Ver Todos os Cadastros
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Relatórios</h2>
                  <BarChart size={24} className="text-sky-500" />
                </div>
                <div className="space-y-4">
                  <button 
                    onClick={() => navigate('/dashboard/admin/relatorios')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-sky-50 rounded-xl transition-all group"
                  >
                    <div className="flex items-center">
                      <Activity size={20} className="text-gray-400 group-hover:text-sky-500" />
                      <span className="ml-3 text-gray-600 group-hover:text-gray-900">Relatório de Ocupação</span>
                    </div>
                    <ArrowUp size={16} className="text-green-500" />
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard/admin/relatorios')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-sky-50 rounded-xl transition-all group"
                  >
                    <div className="flex items-center">
                      <Users size={20} className="text-gray-400 group-hover:text-sky-500" />
                      <span className="ml-3 text-gray-600 group-hover:text-gray-900">Relatório de Atendimentos</span>
                    </div>
                    <ArrowUp size={16} className="text-green-500" />
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard/admin/relatorios')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-sky-50 rounded-xl transition-all group"
                  >
                    <div className="flex items-center">
                      <FileText size={20} className="text-gray-400 group-hover:text-sky-500" />
                      <span className="ml-3 text-gray-600 group-hover:text-gray-900">Relatório Financeiro</span>
                    </div>
                    <ArrowDown size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Cadastros Recentes</h2>
                <ClipboardList size={24} className="text-sky-500" />
              </div>
              <div className="space-y-4">
                {recentRegistrations.map(registration => (
                  <div key={registration.id} className="p-4 bg-gray-50 rounded-xl hover:bg-sky-50/50 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{registration.name}</p>
                        <p className="text-sm text-gray-500">
                          {registration.type} • {registration.specialty || registration.condition}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">{registration.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => navigate('/dashboard/admin/cadastros')}
                className="mt-6 w-full text-sky-600 hover:text-sky-700 font-medium"
              >
                Ver todos os cadastros
              </button>
            </div>
          </div>

          {/* Hospital Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {hospitalStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                    {stat.total && <span className="text-gray-400 text-lg">/{stat.total}</span>}
                    {stat.unit && <span className="text-gray-400 text-lg"> {stat.unit}</span>}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${stat.color}`}>
                    {stat.status || stat.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Department Stats */}
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Estatísticas por Departamento</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {departmentStats.map((dept, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Stethoscope size={20} className="text-sky-500 mr-2" />
                      <h3 className="font-medium text-gray-900">{dept.name}</h3>
                    </div>
                    {dept.trend === 'up' ? (
                      <ArrowUp size={16} className="text-green-500" />
                    ) : (
                      <ArrowDown size={16} className="text-red-500" />
                    )}
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">{dept.patients}</p>
                  <p className="text-sm text-gray-500">
                    {dept.trend === 'up' ? '+' : '-'}{dept.percentage}% vs. mês anterior
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          {showSystemStatus && (
            <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Status do Sistema</h2>
                  <p className="text-gray-600">Monitoramento em tempo real</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Settings size={24} className="text-gray-400" />
                  <button
                    onClick={() => setShowSystemStatus(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium text-green-700">Servidor Principal</span>
                  </div>
                  <p className="mt-2 text-sm text-green-600">Operando normalmente</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium text-green-700">Banco de Dados</span>
                  </div>
                  <p className="mt-2 text-sm text-green-600">Conectado</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="font-medium text-yellow-700">Backup</span>
                  </div>
                  <p className="mt-2 text-sm text-yellow-600">Última atualização: 6h atrás</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;