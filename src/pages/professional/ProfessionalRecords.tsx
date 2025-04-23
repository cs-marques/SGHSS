import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, FileText, Plus, Save, AlertCircle, Search, Filter, ArrowRight } from 'lucide-react';
import ProfessionalSidebar from '../../components/ProfessionalSidebar';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  allergies: string[];
  conditions: string[];
  lastVisit: string;
}

interface MedicalRecord {
  id: number;
  date: string;
  type: string;
  notes: string;
  evolution: string;
  exams: string[];
  prescription: string;
}

const patients: Patient[] = [
  {
    id: 1,
    name: "Maria Silva",
    age: 45,
    gender: "Feminino",
    bloodType: "A+",
    allergies: ["Penicilina", "Dipirona"],
    conditions: ["Hipertensão", "Diabetes Tipo 2"],
    lastVisit: "15/03/2024"
  },
  {
    id: 2,
    name: "João Santos",
    age: 62,
    gender: "Masculino",
    bloodType: "O+",
    allergies: ["Sulfas"],
    conditions: ["Artrite"],
    lastVisit: "10/03/2024"
  },
  {
    id: 3,
    name: "Ana Oliveira",
    age: 35,
    gender: "Feminino",
    bloodType: "B-",
    allergies: [],
    conditions: ["Asma"],
    lastVisit: "05/03/2024"
  }
];

const medicalRecords: Record<number, MedicalRecord[]> = {
  1: [
    {
      id: 1,
      date: "15/03/2024",
      type: "Consulta Regular",
      notes: "Paciente relata melhora nos sintomas após ajuste da medicação.",
      evolution: "Pressão arterial controlada. Glicemia em níveis aceitáveis.",
      exams: ["Hemograma", "Glicemia em jejum"],
      prescription: "Losartana 50mg - 1x ao dia\nMetformina 850mg - 2x ao dia"
    },
    {
      id: 2,
      date: "01/03/2024",
      type: "Retorno",
      notes: "Paciente apresentou efeitos colaterais com a medicação anterior.",
      evolution: "Necessário ajuste na medicação para melhor controle da pressão.",
      exams: [],
      prescription: "Losartana 25mg - 1x ao dia\nMetformina 850mg - 2x ao dia"
    }
  ],
  2: [
    {
      id: 1,
      date: "10/03/2024",
      type: "Consulta Regular",
      notes: "Paciente relata dores articulares intensas.",
      evolution: "Iniciado novo tratamento para artrite.",
      exams: ["Raio-X das articulações"],
      prescription: "Ibuprofeno 600mg - 3x ao dia"
    }
  ],
  3: [
    {
      id: 1,
      date: "05/03/2024",
      type: "Consulta Regular",
      notes: "Paciente com crises de asma mais frequentes.",
      evolution: "Ajustado tratamento para melhor controle da asma.",
      exams: ["Espirometria"],
      prescription: "Salbutamol spray - 2 jatos quando necessário"
    }
  ]
};

const ProfessionalRecords: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<MedicalRecord>({
    id: 0,
    date: new Date().toLocaleDateString(),
    type: "Consulta Regular",
    notes: "",
    evolution: "",
    exams: [],
    prescription: ""
  });

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.conditions.some(condition => condition.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSave = () => {
    if (selectedPatient) {
      const patientRecords = medicalRecords[selectedPatient.id] || [];
      const newRecord = {
        ...currentRecord,
        id: patientRecords.length + 1,
        date: new Date().toLocaleDateString()
      };
      medicalRecords[selectedPatient.id] = [newRecord, ...patientRecords];
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 3000);
      
      // Reset form
      setCurrentRecord({
        id: 0,
        date: new Date().toLocaleDateString(),
        type: "Consulta Regular",
        notes: "",
        evolution: "",
        exams: [],
        prescription: ""
      });
    }
  };

  const handlePrescription = () => {
    if (selectedPatient) {
      navigate(`/dashboard/professional/receita/${selectedPatient.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ProfessionalSidebar />
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Prontuários</h1>
            <p className="text-gray-600">Selecione um paciente para visualizar ou criar um prontuário</p>
          </div>

          {!selectedPatient ? (
            <>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1 relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar por nome ou condição..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
                        <User size={24} className="text-sky-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{patient.name}</h3>
                        <p className="text-sm text-gray-500">{patient.age} anos - {patient.gender}</p>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">Última consulta: {patient.lastVisit}</p>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {patient.conditions.map((condition, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-sky-50 text-sky-700 rounded-full text-xs"
                            >
                              {condition}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <ArrowRight size={20} className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-start justify-between">
                  <div className="flex items-start space-x-4 mb-4 md:mb-0">
                    <div className="h-16 w-16 rounded-full bg-sky-100 flex items-center justify-center">
                      <User size={32} className="text-sky-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{selectedPatient.name}</h2>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Idade</p>
                          <p className="font-medium text-gray-900">{selectedPatient.age} anos</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Tipo Sanguíneo</p>
                          <p className="font-medium text-gray-900">{selectedPatient.bloodType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Gênero</p>
                          <p className="font-medium text-gray-900">{selectedPatient.gender}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">Alergias</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedPatient.allergies.length > 0 ? (
                            selectedPatient.allergies.map((allergy, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-red-50 text-red-700 rounded-full text-sm"
                              >
                                {allergy}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">Nenhuma alergia registrada</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => setSelectedPatient(null)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Voltar para lista
                    </button>
                    <button
                      onClick={handlePrescription}
                      className="px-4 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors"
                    >
                      Emitir Receita
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Nova Evolução</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de Atendimento
                    </label>
                    <select
                      value={currentRecord.type}
                      onChange={(e) => setCurrentRecord({ ...currentRecord, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option>Consulta Regular</option>
                      <option>Retorno</option>
                      <option>Urgência</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Evolução
                    </label>
                    <textarea
                      value={currentRecord.evolution}
                      onChange={(e) => setCurrentRecord({ ...currentRecord, evolution: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 h-32"
                      placeholder="Registre a evolução do paciente..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Exames Solicitados
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {currentRecord.exams.map((exam, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center"
                        >
                          {exam}
                          <button
                            onClick={() => {
                              const newExams = currentRecord.exams.filter((_, i) => i !== index);
                              setCurrentRecord({ ...currentRecord, exams: newExams });
                            }}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <button
                        onClick={() => {
                          const exam = prompt('Nome do exame:');
                          if (exam) {
                            setCurrentRecord({
                              ...currentRecord,
                              exams: [...currentRecord.exams, exam]
                            });
                          }
                        }}
                        className="px-3 py-1 border border-gray-200 rounded-full text-sm flex items-center hover:bg-gray-50"
                      >
                        <Plus size={14} className="mr-1" />
                        Adicionar Exame
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prescrição
                    </label>
                    <textarea
                      value={currentRecord.prescription}
                      onChange={(e) => setCurrentRecord({ ...currentRecord, prescription: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 h-32"
                      placeholder="Registre a prescrição médica..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Observações
                    </label>
                    <textarea
                      value={currentRecord.notes}
                      onChange={(e) => setCurrentRecord({ ...currentRecord, notes: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 h-32"
                      placeholder="Adicione observações relevantes..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors flex items-center"
                    >
                      <Save size={18} className="mr-2" />
                      Salvar Evolução
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Histórico de Atendimentos</h3>
                <div className="space-y-6">
                  {(medicalRecords[selectedPatient.id] || []).map((record) => (
                    <div
                      key={record.id}
                      className="p-4 rounded-xl bg-gray-50 hover:bg-sky-50/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Calendar size={20} className="text-gray-400 mr-2" />
                          <span className="font-medium text-gray-900">{record.date}</span>
                        </div>
                        <span className="text-sm text-gray-500">{record.type}</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Evolução</p>
                          <p className="text-gray-600">{record.evolution}</p>
                        </div>
                        {record.exams.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-700">Exames Solicitados</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {record.exams.map((exam, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                >
                                  {exam}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-700">Prescrição</p>
                          <pre className="text-gray-600 whitespace-pre-wrap font-sans">{record.prescription}</pre>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Observações</p>
                          <p className="text-gray-600">{record.notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Success Message */}
        {showSaveSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center animate-fade-in">
            <AlertCircle size={20} className="mr-2" />
            Alterações salvas com sucesso!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalRecords;