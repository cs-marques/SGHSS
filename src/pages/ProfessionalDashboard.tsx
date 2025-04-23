import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, FileText, Clock, ArrowRight, Plus, Activity, BarChart as ChartBar, Stethoscope, AlertCircle } from 'lucide-react';
import ProfessionalSidebar from '../components/ProfessionalSidebar';

const ProfessionalDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  
  const todaysAppointments = [
    {
      id: 1,
      patient: "Maria Silva",
      time: "09:00",
      type: "Consulta Regular",
      status: "scheduled"
    },
    {
      id: 2,
      patient: "João Santos",
      time: "10:30",
      type: "Retorno",
      status: "confirmed"
    },
    {
      id: 3,
      patient: "Ana Oliveira",
      time: "14:00",
      type: "Primeira Consulta",
      status: "confirmed"
    }
  ];

  const recentPatients = [
    {
      id: 1,
      name: "Pedro Costa",
      lastVisit: "12/03/2024",
      condition: "Hipertensão",
      nextVisit: "20/03/2024"
    },
    {
      id: 2,
      name: "Lucia Ferreira",
      lastVisit: "11/03/2024",
      condition: "Diabetes Tipo 2",
      nextVisit: "25/03/2024"
    },
    {
      id: 3,
      name: "Carlos Mendes",
      lastVisit: "10/03/2024",
      condition: "Check-up Anual",
      nextVisit: "10/04/2024"
    }
  ];

  const stats = [
    {
      title: "Total de Consultas",
      value: "128",
      change: "+12%",
      period: "vs. mês anterior",
      trend: "up",
      icon: Activity
    },
    {
      title: "Pacientes Ativos",
      value: "85",
      change: "+5%",
      period: "vs. mês anterior",
      trend: "up",
      icon: Users
    },
    {
      title: "Taxa de Retorno",
      value: "92%",
      change: "+2%",
      period: "vs. mês anterior",
      trend: "up",
      icon: ChartBar
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ProfessionalSidebar />
      
      <div className="flex-1">
        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Banner */}
            {showWelcome && (
              <div className="relative bg-gradient-to-r from-sky-500 to-sky-400 rounded-2xl p-6 mb-8 text-white animate-fade-in">
                <button
                  onClick={() => setShowWelcome(false)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white"
                >
                  <AlertCircle size={20} />
                </button>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Stethoscope size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Bem-vindo, Dr. Winston</h1>
                    <p className="text-sky-100">Você tem {todaysAppointments.length} consultas agendadas para hoje</p>
                  </div>
                </div>
              </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                    <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center">
                      <stat.icon size={20} className="text-sky-500" />
                    </div>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">{stat.period}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Today's Appointments */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Consultas de Hoje</h2>
                  <Calendar size={24} className="text-sky-500" />
                </div>
                <div className="space-y-4">
                  {todaysAppointments.map((appointment) => (
                    <div 
                      key={appointment.id} 
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-sky-50 transition-all duration-300 cursor-pointer group"
                      onClick={() => navigate('/dashboard/professional/agenda')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <Clock size={20} className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{appointment.patient}</p>
                          <p className="text-sm text-gray-500">{appointment.time} - {appointment.type}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'confirmed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {appointment.status === 'confirmed' ? 'Confirmado' : 'Agendado'}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate('/dashboard/professional/agenda')}
                  className="mt-6 w-full flex items-center justify-center px-4 py-2.5 border border-sky-500 text-sky-600 rounded-xl hover:bg-sky-50 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Ver agenda completa
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Recent Patients */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Pacientes Recentes</h2>
                  <Users size={24} className="text-sky-500" />
                </div>
                <div className="space-y-4">
                  {recentPatients.map((patient) => (
                    <div 
                      key={patient.id} 
                      className="p-4 rounded-xl bg-gray-50 hover:bg-sky-50 transition-all duration-300 cursor-pointer group"
                      onClick={() => navigate(`/dashboard/professional/prontuario/${patient.id}`)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-500">Última visita: {patient.lastVisit}</p>
                          <p className="text-sm text-gray-500">{patient.condition}</p>
                        </div>
                        <span className="text-xs text-sky-600 bg-sky-50 px-2 py-1 rounded-full">
                          Próx: {patient.nextVisit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => navigate('/dashboard/professional/pacientes')}
                    className="w-full flex items-center justify-center px-4 py-2.5 border border-sky-500 text-sky-600 rounded-xl hover:bg-sky-50 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Ver todos os pacientes
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                  <button
                    onClick={() => navigate('/dashboard/professional/pacientes')}
                    className="w-full flex items-center justify-center px-4 py-2.5 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <Plus size={16} className="mr-2" />
                    Cadastrar Novo Paciente
                  </button>
                </div>
              </div>

              {/* Quick Access */}
              <div className="bg-gradient-to-br from-sky-500 to-sky-400 rounded-2xl shadow-sm p-6 text-white transform transition-all duration-300 hover:shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Acesso Rápido</h2>
                  <FileText size={24} />
                </div>
                <p className="mb-6 text-sky-100">Acesse rapidamente prontuários e emita receitas para seus pacientes.</p>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/dashboard/professional/prontuarios')}
                    className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl py-2.5 px-4 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
                  >
                    <FileText size={18} className="mr-2" />
                    Acessar Prontuários
                  </button>
                  <button
                    onClick={() => navigate('/dashboard/professional/prontuarios')}
                    className="w-full bg-white text-sky-600 rounded-xl py-2.5 px-4 font-medium hover:bg-sky-50 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
                  >
                    <Plus size={18} className="mr-2" />
                    Emitir Receita
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;