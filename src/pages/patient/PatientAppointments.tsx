import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, AlertCircle, CheckCircle, XCircle, X } from 'lucide-react';
import Logo from '../../components/Logo';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const appointments = [
  {
    id: 1,
    doctor: "Dra. Maria Silva",
    specialty: "Cardiologia",
    date: "15 de Abril, 2024",
    time: "14:30",
    location: "Clínica Central",
    status: "scheduled",
    room: "Sala 302",
    preparation: "Jejum de 8 horas",
    documents: ["Documento de identificação", "Cartão do convênio", "Exames anteriores"],
    insurance: "Plano de Saúde ABC"
  },
  {
    id: 2,
    doctor: "Dr. João Santos",
    specialty: "Dermatologia",
    date: "20 de Abril, 2024",
    time: "10:00",
    location: "Unidade Sul",
    status: "confirmed",
    room: "Sala 105",
    preparation: "Nenhuma preparação necessária",
    documents: ["Documento de identificação", "Cartão do convênio"],
    insurance: "Plano de Saúde ABC"
  },
  {
    id: 3,
    doctor: "Dra. Ana Oliveira",
    specialty: "Oftalmologia",
    date: "25 de Abril, 2024",
    time: "16:15",
    location: "Centro Médico Norte",
    status: "cancelled",
    room: "Sala 201",
    preparation: "Não dirigir após a consulta",
    documents: ["Documento de identificação", "Cartão do convênio", "Receita dos óculos atual"],
    insurance: "Plano de Saúde ABC"
  }
];

const statusConfig = {
  scheduled: {
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: AlertCircle,
    text: "Agendada"
  },
  confirmed: {
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    icon: CheckCircle,
    text: "Confirmada"
  },
  cancelled: {
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: XCircle,
    text: "Cancelada"
  }
};

const PatientAppointments: React.FC = () => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<number | null>(null);
  const [localAppointments, setLocalAppointments] = useState(appointments);

  const handleShowDetails = (id: number) => {
    setSelectedAppointment(id);
    setShowDetails(true);
  };

  const handleCancelClick = (id: number) => {
    setAppointmentToCancel(id);
    setShowCancelConfirm(true);
  };

  const handleCancelConfirm = () => {
    if (appointmentToCancel) {
      setLocalAppointments(localAppointments.map(appointment =>
        appointment.id === appointmentToCancel
          ? { ...appointment, status: 'cancelled' }
          : appointment
      ));
      setShowCancelConfirm(false);
      setAppointmentToCancel(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1">
        <header className="bg-white shadow-sm py-4 px-6 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo />
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-8 px-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Minhas Consultas</h1>
            <button
              onClick={() => navigate('/dashboard/patient/agendamento')}
              className="px-4 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors flex items-center"
            >
              <Calendar size={18} className="mr-2" />
              Agendar Nova Consulta
            </button>
          </div>

          <div className="space-y-4">
            {localAppointments.map((appointment) => {
              const status = statusConfig[appointment.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;

              return (
                <div
                  key={appointment.id}
                  className={`bg-white rounded-xl shadow-sm border ${status.border} p-6 transition-all hover:shadow-md`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
                          <User size={24} className="text-sky-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{appointment.doctor}</h3>
                          <p className="text-gray-500">{appointment.specialty}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar size={18} className="mr-2" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock size={18} className="mr-2" />
                          {appointment.time}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin size={18} className="mr-2" />
                          {appointment.location}
                        </div>
                      </div>
                    </div>

                    <div className={`px-3 py-1 rounded-full ${status.bg} ${status.color} flex items-center`}>
                      <StatusIcon size={16} className="mr-1" />
                      {status.text}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end space-x-4">
                    <button
                      onClick={() => handleShowDetails(appointment.id)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Ver Detalhes
                    </button>
                    {appointment.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancelClick(appointment.id)}
                        className="px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
                      >
                        Cancelar Consulta
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Modal de Detalhes */}
          {showDetails && selectedAppointment && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl w-full max-w-2xl m-4">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Detalhes da Consulta</h2>
                    <button
                      onClick={() => setShowDetails(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {(() => {
                    const appointment = localAppointments.find(a => a.id === selectedAppointment);
                    if (!appointment) return null;

                    return (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Informações da Consulta</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-500">Médico</p>
                              <p className="font-medium text-gray-900">{appointment.doctor}</p>
                              <p className="text-sm text-gray-500">{appointment.specialty}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-500">Local</p>
                              <p className="font-medium text-gray-900">{appointment.location}</p>
                              <p className="text-sm text-gray-500">{appointment.room}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Preparação</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-900">{appointment.preparation}</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Documentos Necessários</h3>
                          <ul className="bg-gray-50 p-4 rounded-lg space-y-2">
                            {appointment.documents.map((doc, index) => (
                              <li key={index} className="flex items-center text-gray-900">
                                <CheckCircle size={16} className="text-green-500 mr-2" />
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Convênio</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-900">{appointment.insurance}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="p-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de Confirmação de Cancelamento */}
          {showCancelConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl w-full max-w-md m-4 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirmar Cancelamento</h3>
                <p className="text-gray-600 mb-6">
                  Tem certeza que deseja cancelar esta consulta? Esta ação não pode ser desfeita.
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowCancelConfirm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleCancelConfirm}
                    className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                  >
                    Confirmar Cancelamento
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PatientAppointments;