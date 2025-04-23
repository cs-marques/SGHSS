import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, User, Calendar, FileText, ArrowRight, Plus, AlertCircle, X, Phone, Mail, Heart } from 'lucide-react';
import ProfessionalSidebar from '../../components/ProfessionalSidebar';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  condition: string;
  lastVisit: string;
  nextVisit: string | null;
  status: 'active' | 'inactive';
  bloodType: string;
  allergies: string[];
}

const initialPatients: Patient[] = [
  {
    id: 1,
    name: "Maria Silva",
    age: 45,
    gender: "Feminino",
    email: "maria@email.com",
    phone: "(11) 98765-4321",
    condition: "Hipertensão",
    lastVisit: "15/03/2024",
    nextVisit: "22/03/2024",
    status: "active",
    bloodType: "A+",
    allergies: ["Penicilina", "Dipirona"]
  },
  {
    id: 2,
    name: "João Santos",
    age: 62,
    gender: "Masculino",
    email: "joao@email.com",
    phone: "(11) 98765-4322",
    condition: "Diabetes Tipo 2",
    lastVisit: "10/03/2024",
    nextVisit: "24/03/2024",
    status: "active",
    bloodType: "O+",
    allergies: ["Sulfas"]
  },
  {
    id: 3,
    name: "Ana Oliveira",
    age: 35,
    gender: "Feminino",
    email: "ana@email.com",
    phone: "(11) 98765-4323",
    condition: "Ansiedade",
    lastVisit: "05/03/2024",
    nextVisit: null,
    status: "inactive",
    bloodType: "B-",
    allergies: []
  }
];

const ProfessionalPatients: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [patients, setPatients] = useState(initialPatients);
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    gender: 'Feminino',
    status: 'active',
    bloodType: 'A+',
    allergies: []
  });

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const validatePatient = () => {
    const errors: string[] = [];
    if (!newPatient.name?.trim()) errors.push("Nome é obrigatório");
    if (!newPatient.age || newPatient.age < 0) errors.push("Idade inválida");
    if (!newPatient.email?.trim()) errors.push("Email é obrigatório");
    if (!newPatient.phone?.trim()) errors.push("Telefone é obrigatório");
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newPatient.email || '')) {
      errors.push("Email inválido");
    }
    if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(newPatient.phone || '')) {
      errors.push("Telefone inválido (formato: (99) 99999-9999)");
    }
    return errors;
  };

  const handleAddPatient = () => {
    const errors = validatePatient();
    setValidationErrors(errors);

    if (errors.length === 0) {
      const newId = Math.max(...patients.map(p => p.id)) + 1;
      const patientToAdd: Patient = {
        id: newId,
        name: newPatient.name!,
        age: Number(newPatient.age),
        gender: newPatient.gender || 'Feminino',
        email: newPatient.email!,
        phone: newPatient.phone!,
        condition: newPatient.condition || 'Em avaliação',
        lastVisit: new Date().toLocaleDateString(),
        nextVisit: null,
        status: newPatient.status as 'active' | 'inactive',
        bloodType: newPatient.bloodType || 'A+',
        allergies: newPatient.allergies || []
      };

      setPatients([...patients, patientToAdd]);
      setShowNewPatientModal(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setNewPatient({
        gender: 'Feminino',
        status: 'active',
        bloodType: 'A+',
        allergies: []
      });
      setValidationErrors([]);
    }
  };

  const handleAddAllergy = () => {
    const allergy = prompt('Digite a alergia:');
    if (allergy?.trim()) {
      setNewPatient({
        ...newPatient,
        allergies: [...(newPatient.allergies || []), allergy.trim()]
      });
    }
  };

  const handleRemoveAllergy = (index: number) => {
    setNewPatient({
      ...newPatient,
      allergies: (newPatient.allergies || []).filter((_, i) => i !== index)
    });
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ProfessionalSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Meus Pacientes</h1>
              <p className="text-gray-600">Gerencie e acompanhe seus pacientes</p>
            </div>
            <button
              onClick={() => setShowNewPatientModal(true)}
              className="px-4 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center sm:justify-start"
            >
              <Plus size={20} className="mr-2" />
              Novo Paciente
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou condição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                  className="pl-4 pr-8 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white transition-all"
                >
                  <option value="all">Todos</option>
                  <option value="active">Ativos</option>
                  <option value="inactive">Inativos</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
                      <User size={24} className="text-sky-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-500">{patient.age} anos - {patient.gender}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {patient.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FileText size={18} className="mr-2" />
                    <span>{patient.condition}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar size={18} className="mr-2" />
                    <span>Última consulta: {patient.lastVisit}</span>
                  </div>
                  {patient.nextVisit && (
                    <div className="flex items-center text-sky-600">
                      <Calendar size={18} className="mr-2" />
                      <span>Próxima consulta: {patient.nextVisit}</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Heart size={18} className="mr-2" />
                    <span>Tipo sanguíneo: {patient.bloodType}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/dashboard/professional/prontuario/${patient.id}`)}
                      className="flex items-center text-sky-600 hover:text-sky-700 transition-colors group"
                    >
                      Ver prontuário
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                    <div className="flex space-x-2">
                      <a
                        href={`tel:${patient.phone}`}
                        className="p-2 text-gray-400 hover:text-sky-600 transition-colors"
                        title="Ligar"
                      >
                        <Phone size={18} />
                      </a>
                      <a
                        href={`mailto:${patient.email}`}
                        className="p-2 text-gray-400 hover:text-sky-600 transition-colors"
                        title="Enviar email"
                      >
                        <Mail size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Patient Modal */}
        {showNewPatientModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <h2 className="text-xl font-semibold text-gray-900">Cadastrar Novo Paciente</h2>
                <button
                  onClick={() => {
                    setShowNewPatientModal(false);
                    setValidationErrors([]);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {validationErrors.length > 0 && (
                <div className="p-4 bg-red-50 m-6 rounded-xl">
                  <div className="flex items-center mb-2">
                    <AlertCircle size={20} className="text-red-500 mr-2" />
                    <h3 className="font-medium text-red-800">Por favor, corrija os seguintes erros:</h3>
                  </div>
                  <ul className="list-disc list-inside text-sm text-red-700">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      value={newPatient.name || ''}
                      onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                      placeholder="Nome do paciente"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Idade *
                    </label>
                    <input
                      type="number"
                      value={newPatient.age || ''}
                      onChange={(e) => setNewPatient({ ...newPatient, age: Number(e.target.value) })}
                      min="0"
                      max="150"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                    />
                  </div>
                
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={newPatient.email || ''}
                      onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      value={newPatient.phone || ''}
                      onChange={(e) => setNewPatient({ ...newPatient, phone: formatPhone(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                      placeholder="(99) 99999-9999"
                      maxLength={15}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gênero
                    </label>
                    <select
                      value={newPatient.gender}
                      onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                    >
                      <option value="Feminino">Feminino</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo Sanguíneo
                    </label>
                    <select
                      value={newPatient.bloodType}
                      onChange={(e) => setNewPatient({ ...newPatient, bloodType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Condição
                    </label>
                    <input
                      type="text"
                      value={newPatient.condition || ''}
                      onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                      placeholder="Ex: Hipertensão"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={newPatient.status}
                      onChange={(e) => setNewPatient({ ...newPatient, status: e.target.value as 'active' | 'inactive' })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                    >
                      <option value="active">Ativo</option>
                      <option value="inactive">Inativo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alergias
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newPatient.allergies?.map((allergy, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm flex items-center"
                      >
                        {allergy}
                        <button
                          onClick={() => handleRemoveAllergy(index)}
                          className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleAddAllergy}
                    className="text-sky-600 hover:text-sky-700 text-sm flex items-center transition-colors"
                  >
                    <Plus size={16} className="mr-1" />
                    Adicionar Alergia
                  </button>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end space-x-4 sticky bottom-0 bg-white">
                <button
                  onClick={() => {
                    setShowNewPatientModal(false);
                    setValidationErrors([]);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddPatient}
                  className="px-6 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all duration-300 transform hover:scale-[1.02] flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Cadastrar Paciente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center animate-fade-in">
            <AlertCircle size={20} className="mr-2" />
            Paciente cadastrado com sucesso!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalPatients;