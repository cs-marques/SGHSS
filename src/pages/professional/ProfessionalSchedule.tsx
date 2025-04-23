import React, { useState, useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock, User, X, AlertCircle, Plus, Calendar as CalendarIcon } from 'lucide-react';
import ProfessionalSidebar from '../../components/ProfessionalSidebar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Appointment {
  id: number;
  title: string;
  start: Date;
  end: Date;
  patient: string;
  type: string;
  status: 'scheduled' | 'confirmed' | 'cancelled';
}

const initialAppointments: Appointment[] = [
  {
    id: 1,
    title: 'Consulta - Maria Silva',
    start: new Date(2024, 2, 20, 9, 0),
    end: new Date(2024, 2, 20, 10, 0),
    patient: 'Maria Silva',
    type: 'Consulta Regular',
    status: 'confirmed'
  },
  {
    id: 2,
    title: 'Consulta - João Santos',
    start: new Date(2024, 2, 20, 10, 30),
    end: new Date(2024, 2, 20, 11, 30),
    patient: 'João Santos',
    type: 'Retorno',
    status: 'scheduled'
  }
];

const ProfessionalSchedule: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [newAppointment, setNewAppointment] = useState({
    patient: '',
    type: 'Consulta Regular',
    duration: 60
  });

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectSlot = ({ start }: { start: Date }) => {
    if (isMobile) {
      setShowMobileWarning(true);
      return;
    }
    setSelectedSlot(start);
    setShowNewAppointment(true);
  };

  const handleAddAppointment = () => {
    if (selectedSlot && newAppointment.patient) {
      const endTime = new Date(selectedSlot.getTime() + newAppointment.duration * 60000);
      const appointment: Appointment = {
        id: appointments.length + 1,
        title: `Consulta - ${newAppointment.patient}`,
        start: selectedSlot,
        end: endTime,
        patient: newAppointment.patient,
        type: newAppointment.type,
        status: 'scheduled'
      };

      setAppointments([...appointments, appointment]);
      setShowNewAppointment(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setNewAppointment({
        patient: '',
        type: 'Consulta Regular',
        duration: 60
      });
    }
  };

  const eventStyleGetter = (event: Appointment) => {
    let style = {
      backgroundColor: '#0ea5e9',
      borderColor: '#0284c7'
    };

    if (event.status === 'scheduled') {
      style = {
        backgroundColor: '#f59e0b',
        borderColor: '#d97706'
      };
    } else if (event.status === 'cancelled') {
      style = {
        backgroundColor: '#ef4444',
        borderColor: '#dc2626'
      };
    }

    return { style };
  };

  const { messages, formats } = useMemo(
    () => ({
      messages: {
        week: 'Semana',
        work_week: 'Semana de Trabalho',
        day: 'Dia',
        month: 'Mês',
        previous: 'Anterior',
        next: 'Próximo',
        today: 'Hoje',
        agenda: 'Agenda',
        noEventsInRange: 'Não há eventos neste período.',
        allDay: 'Dia inteiro',
        date: 'Data',
        time: 'Hora',
        event: 'Evento',
      },
      formats: {
        timeGutterFormat: 'HH:mm',
        eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
          `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`,
        dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
          `${format(start, 'dd/MM/yyyy')} - ${format(end, 'dd/MM/yyyy')}`,
      },
    }),
    []
  );

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <ProfessionalSidebar />
        <div className="flex-1 p-8">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
              <CalendarIcon size={48} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Acesso via Desktop</h2>
              <p className="text-gray-600 mb-4">
                Para uma melhor experiência ao gerenciar sua agenda, por favor acesse esta página através de um computador ou notebook.
              </p>
              <p className="text-sm text-gray-500">
                O calendário requer uma tela maior para visualização adequada.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ProfessionalSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Minha Agenda</h1>
              <p className="text-gray-600">Gerencie suas consultas e horários</p>
            </div>
            <button
              onClick={() => {
                if (isMobile) {
                  setShowMobileWarning(true);
                  return;
                }
                setSelectedSlot(new Date());
                setShowNewAppointment(true);
              }}
              className="px-4 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Nova Consulta
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <Calendar
              localizer={localizer}
              events={appointments}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              messages={messages}
              formats={formats}
              eventPropGetter={eventStyleGetter}
              onSelectSlot={handleSelectSlot}
              selectable
              popup
              step={30}
              timeslots={2}
              defaultView="week"
              min={new Date(0, 0, 0, 8, 0, 0)}
              max={new Date(0, 0, 0, 18, 0, 0)}
            />
          </div>
        </div>

        {/* New Appointment Modal */}
        {showNewAppointment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md mx-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Nova Consulta</h2>
                <button
                  onClick={() => setShowNewAppointment(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paciente *
                  </label>
                  <input
                    type="text"
                    value={newAppointment.patient}
                    onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Nome do paciente"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Consulta
                  </label>
                  <select
                    value={newAppointment.type}
                    onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Consulta Regular">Consulta Regular</option>
                    <option value="Retorno">Retorno</option>
                    <option value="Primeira Consulta">Primeira Consulta</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data e Hora
                  </label>
                  <input
                    type="datetime-local"
                    value={selectedSlot?.toISOString().slice(0, 16)}
                    onChange={(e) => setSelectedSlot(new Date(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duração (minutos)
                  </label>
                  <select
                    value={newAppointment.duration}
                    onChange={(e) => setNewAppointment({ ...newAppointment, duration: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value={30}>30 minutos</option>
                    <option value={60}>1 hora</option>
                    <option value={90}>1 hora e 30 minutos</option>
                  </select>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
                <button
                  onClick={() => setShowNewAppointment(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddAppointment}
                  className="px-6 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors"
                >
                  Agendar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center animate-fade-in">
            <AlertCircle size={20} className="mr-2" />
            Consulta agendada com sucesso!
          </div>
        )}

        {/* Mobile Warning Modal */}
        {showMobileWarning && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-auto">
              <div className="text-center">
                <CalendarIcon size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Acesso via Desktop</h3>
                <p className="text-gray-600 mb-4">
                  Para gerenciar sua agenda, por favor acesse através de um computador ou notebook.
                </p>
                <button
                  onClick={() => setShowMobileWarning(false)}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Entendi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalSchedule;