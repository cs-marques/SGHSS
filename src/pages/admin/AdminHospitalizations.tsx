import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BedDouble, 
  Search, 
  Filter, 
  Plus, 
  AlertCircle,
  X,
  User,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Logo from '../../components/Logo';

interface Hospitalization {
  id: number;
  patient: string;
  room: string;
  bed: string;
  admissionDate: string;
  expectedDischarge: string;
  status: 'active' | 'discharged' | 'transferred';
  doctor: string;
  diagnosis: string;
  notes: string;
}

const initialHospitalizations: Hospitalization[] = [
  {
    id: 1,
    patient: "Maria Silva",
    room: "302",
    bed: "A",
    admissionDate: "2024-03-15",
    expectedDischarge: "2024-03-20",
    status: "active",
    doctor: "Dr. Carlos Santos",
    diagnosis: "Pneumonia",
    notes: "Paciente em observação"
  },
  {
    id: 2,
    patient: "João Oliveira",
    room: "205",
    bed: "B",
    admissionDate: "2024-03-14",
    expectedDischarge: "2024-03-18",
    status: "active",
    doctor: "Dra. Ana Lima",
    diagnosis: "Pós-operatório",
    notes: "Recuperação normal"
  }
];

const AdminHospitalizations: React.FC = () => {
  const navigate = useNavigate();
  const [hospitalizations, setHospitalizations] = useState<Hospitalization[]>(initialHospitalizations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'discharged' | 'transferred'>('all');
  const [showNewHospitalization, setShowNewHospitalization] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [newHospitalization, setNewHospitalization] = useState<Partial<Hospitalization>>({
    status: 'active'
  });

  const filteredHospitalizations = hospitalizations.filter(hospitalization => {
    const matchesSearch = 
      hospitalization.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospitalization.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospitalization.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || hospitalization.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddHospitalization = () => {
    if (newHospitalization.patient && newHospitalization.room && newHospitalization.bed) {
      const hospitalization: Hospitalization = {
        id: Math.max(...hospitalizations.map(h => h.id)) + 1,
        patient: newHospitalization.patient,
        room: newHospitalization.room,
        bed: newHospitalization.bed,
        admissionDate: newHospitalization.admissionDate || new Date().toISOString().split('T')[0],
        expectedDischarge: newHospitalization.expectedDischarge || '',
        status: newHospitalization.status as 'active' | 'discharged' | 'transferred',
        doctor: newHospitalization.doctor || '',
        diagnosis: newHospitalization.diagnosis || '',
        notes: newHospitalization.notes || ''
      };

      setHospitalizations([...hospitalizations, hospitalization]);
      setShowNewHospitalization(false);
      showSuccessMessage('Internação registrada com sucesso');
      setNewHospitalization({
        status: 'active'
      });
    }
  };

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleStatusChange = (id: number, status: 'active' | 'discharged' | 'transferred') => {
    setHospitalizations(hospitalizations.map(h =>
      h.id === id ? { ...h, status } : h
    ));
    showSuccessMessage('Status atualizado com sucesso');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <button 
            onClick={() => navigate('/dashboard/admin')}
            className="text-gray-600 hover:text-gray-900"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Controle de Internações</h1>
            <p className="text-gray-600">Gerencie internações e leitos hospitalares</p>
          </div>
          <button
            onClick={() => setShowNewHospitalization(true)}
            className="px-4 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Nova Internação
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por paciente, médico ou diagnóstico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Filter size={20} className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'discharged' | 'transferred')}
                className="pl-4 pr-8 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              >
                <option value="all">Todos</option>
                <option value="active">Internados</option>
                <option value="discharged">Alta</option>
                <option value="transferred">Transferidos</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredHospitalizations.map((hospitalization) => (
            <div
              key={hospitalization.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
                    <User size={24} className="text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{hospitalization.patient}</h3>
                    <p className="text-gray-500">{hospitalization.doctor}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <MapPin size={16} className="mr-1" />
                      Quarto {hospitalization.room} - Leito {hospitalization.bed}
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    hospitalization.status === 'active' ? 'bg-green-100 text-green-800' :
                    hospitalization.status === 'discharged' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {hospitalization.status === 'active' ? 'Internado' :
                     hospitalization.status === 'discharged' ? 'Alta' : 'Transferido'}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Data de Admissão</p>
                  <div className="flex items-center mt-1">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <p className="text-gray-900">{new Date(hospitalization.admissionDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Previsão de Alta</p>
                  <div className="flex items-center mt-1">
                    <Clock size={16} className="text-gray-400 mr-2" />
                    <p className="text-gray-900">{hospitalization.expectedDischarge ? new Date(hospitalization.expectedDischarge).toLocaleDateString() : 'Não definida'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Diagnóstico</p>
                  <p className="text-gray-900 mt-1">{hospitalization.diagnosis}</p>
                </div>
              </div>

              {hospitalization.notes && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Observações</p>
                  <p className="text-gray-700 mt-1">{hospitalization.notes}</p>
                </div>
              )}

              <div className="mt-6 flex items-center justify-end space-x-4">
                {hospitalization.status === 'active' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(hospitalization.id, 'discharged')}
                      className="flex items-center px-4 py-2 text-green-600 hover:text-green-700 transition-colors"
                    >
                      <CheckCircle size={18} className="mr-2" />
                      Dar Alta
                    </button>
                    <button
                      onClick={() => handleStatusChange(hospitalization.id, 'transferred')}
                      className="flex items-center px-4 py-2 text-yellow-600 hover:text-yellow-700 transition-colors"
                    >
                      <ArrowRight size={18} className="mr-2" />
                      Transferir
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* New Hospitalization Modal */}
      {showNewHospitalization && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Nova Internação</h2>
              <button
                onClick={() => setShowNewHospitalization(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paciente *
                  </label>
                  <input
                    type="text"
                    value={newHospitalization.patient || ''}
                    onChange={(e) => setNewHospitalization({ ...newHospitalization, patient: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Nome do paciente"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Médico Responsável *
                  </label>
                  <input
                    type="text"
                    value={newHospitalization.doctor || ''}
                    onChange={(e) => setNewHospitalization({ ...newHospitalization, doctor: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Nome do médico"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quarto *
                  </label>
                  <input
                    type="text"
                    value={newHospitalization.room || ''}
                    onChange={(e) => setNewHospitalization({ ...newHospitalization, room: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Número do quarto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Leito *
                  </label>
                  <input
                    type="text"
                    value={newHospitalization.bed || ''}
                    onChange={(e) => setNewHospitalization({ ...newHospitalization, bed: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Identificação do leito"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Admissão
                  </label>
                  <input
                    type="date"
                    value={newHospitalization.admissionDate || ''}
                    onChange={(e) => setNewHospitalization({ ...newHospitalization, admissionDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Previsão de Alta
                  </label>
                  <input
                    type="date"
                    value={newHospitalization.expectedDischarge || ''}
                    onChange={(e) => setNewHospitalization({ ...newHospitalization, expectedDischarge: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Diagnóstico
                  </label>
                  <input
                    type="text"
                    value={newHospitalization.diagnosis || ''}
                    onChange={(e) => setNewHospitalization({ ...newHospitalization, diagnosis: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Diagnóstico inicial"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Observações
                  </label>
                  <textarea
                    value={newHospitalization.notes || ''}
                    onChange={(e) => setNewHospitalization({ ...newHospitalization, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    rows={3}
                    placeholder="Observações adicionais"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowNewHospitalization(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddHospitalization}
                className="px-6 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Registrar Internação
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center animate-fade-in">
          <AlertCircle size={20} className="mr-2" />
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default AdminHospitalizations;