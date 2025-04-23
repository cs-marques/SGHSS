import React, { useState } from 'react';
import { FileText, Calendar, User, ArrowRight, Pill, Stethoscope, Activity, X, Search, Filter, AlertCircle, LineChart } from 'lucide-react';
import Logo from '../../components/Logo';
import Sidebar from '../../components/Sidebar';

interface MedicalRecord {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}

const medicalHistory: MedicalRecord[] = [
  {
    id: 1,
    doctor: "Dra. Maria Silva",
    specialty: "Cardiologia",
    date: "15 de Março, 2024",
    diagnosis: "Hipertensão Arterial Leve",
    prescription: "Losartana 50mg - 1x ao dia",
    notes: "Paciente apresentou pressão arterial levemente elevada. Recomendado monitoramento regular."
  },
  {
    id: 2,
    doctor: "Dr. João Santos",
    specialty: "Dermatologia",
    date: "10 de Março, 2024",
    diagnosis: "Dermatite Atópica",
    prescription: "Hidratante corporal e pomada de corticoide",
    notes: "Lesões em fase de melhora. Manter hidratação da pele."
  },
  {
    id: 3,
    doctor: "Dra. Ana Oliveira",
    specialty: "Oftalmologia",
    date: "5 de Março, 2024",
    diagnosis: "Miopia",
    prescription: "Receita para óculos atualizada",
    notes: "Pequeno aumento da miopia. Retorno em 6 meses."
  }
];

const specialties = ["Cardiologia", "Dermatologia", "Oftalmologia"];

const PatientHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [showVitalsChart, setShowVitalsChart] = useState(false);
  const [showFullRecord, setShowFullRecord] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);

  const handleShowDetails = (id: number) => {
    setSelectedRecordId(id);
    setShowDetails(true);
  };

  const filteredHistory = medicalHistory.filter(record => {
    const matchesSearch = 
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty = 
      selectedSpecialty === 'all' || 
      record.specialty === selectedSpecialty;

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1">
        <header className="bg-white shadow-sm py-4 px-6 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo />
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">Histórico Médico</h1>
              <p className="text-gray-600 mt-1">Acompanhe seu histórico de consultas e exames</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setShowVitalsChart(true)}
                className="px-4 py-2 bg-white text-sky-600 border border-sky-200 rounded-xl hover:bg-sky-50 transition-colors flex items-center justify-center"
              >
                <Activity size={18} className="mr-2" />
                Ver Evolução
              </button>
              <button 
                onClick={() => setShowFullRecord(true)}
                className="px-4 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors flex items-center justify-center"
              >
                <FileText size={18} className="mr-2" />
                Ver Prontuário Completo
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar por médico, diagnóstico ou especialidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="pl-4 pr-8 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              >
                <option value="all">Todas especialidades</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredHistory.length > 0 ? (
            <div className="space-y-4">
              {filteredHistory.map((record) => (
                <div
                  key={record.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                      <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
                        <User size={24} className="text-sky-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{record.doctor}</h3>
                        <p className="text-gray-500">{record.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Calendar size={18} className="mr-2" />
                      {record.date}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Diagnóstico</h4>
                      <p className="text-gray-900">{record.diagnosis}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Prescrição</h4>
                      <p className="text-gray-900">{record.prescription}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Observações</h4>
                    <p className="text-gray-600">{record.notes}</p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleShowDetails(record.id)}
                      className="flex items-center text-sky-600 hover:text-sky-700 transition-colors"
                    >
                      Ver Detalhes
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Nenhum registro encontrado</h3>
              <p className="text-gray-600 mt-2">
                Tente ajustar os filtros ou termos de pesquisa
              </p>
            </div>
          )}

          {/* Modal de Evolução */}
          {showVitalsChart && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl w-full max-w-4xl mx-auto">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Evolução dos Sinais Vitais</h2>
                  <button
                    onClick={() => setShowVitalsChart(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="p-6">
                  <div className="aspect-[16/9] bg-gray-50 rounded-xl flex items-center justify-center">
                    <div className="text-center max-w-md mx-auto px-4">
                      <Activity size={48} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 font-medium mb-2">
                        Histórico em construção
                      </p>
                      <p className="text-sm text-gray-500">
                        Para fornecer uma análise precisa da sua evolução, precisamos de pelo menos 3 meses de acompanhamento médico. Continue suas consultas regulares para acessar este recurso em breve.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowVitalsChart(false)}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de Prontuário Completo */}
          {showFullRecord && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl w-full max-w-4xl mx-auto max-h-[90vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Prontuário Completo</h2>
                  <button
                    onClick={() => setShowFullRecord(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Informações do Paciente</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Nome</p>
                          <p className="font-medium text-gray-900">João Silva</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Data de Nascimento</p>
                          <p className="font-medium text-gray-900">15/05/1985</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Histórico Completo</h3>
                      <div className="space-y-4">
                        {medicalHistory.map((record) => (
                          <div key={record.id} className="bg-gray-50 p-4 rounded-xl">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="font-medium text-gray-900">{record.doctor}</h4>
                                <p className="text-sm text-gray-500">{record.specialty}</p>
                              </div>
                              <p className="text-sm text-gray-500">{record.date}</p>
                            </div>
                            <div className="space-y-2">
                              <p><span className="font-medium">Diagnóstico:</span> {record.diagnosis}</p>
                              <p><span className="font-medium">Prescrição:</span> {record.prescription}</p>
                              <p><span className="font-medium">Observações:</span> {record.notes}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowFullRecord(false)}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de Detalhes */}
          {showDetails && selectedRecordId && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl w-full max-w-2xl mx-auto">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Detalhes do Registro</h2>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="p-6">
                  {(() => {
                    const record = medicalHistory.find(r => r.id === selectedRecordId);
                    if (!record) return null;

                    return (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Informações da Consulta</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-500">Médico</p>
                              <p className="font-medium text-gray-900">{record.doctor}</p>
                              <p className="text-sm text-gray-500">{record.specialty}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-500">Data</p>
                              <p className="font-medium text-gray-900">{record.date}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Diagnóstico e Tratamento</h3>
                          <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center mb-2">
                                <Stethoscope size={18} className="text-sky-500 mr-2" />
                                <p className="font-medium text-gray-900">Diagnóstico</p>
                              </div>
                              <p className="text-gray-700">{record.diagnosis}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center mb-2">
                                <Pill size={18} className="text-sky-500 mr-2" />
                                <p className="font-medium text-gray-900">Prescrição</p>
                              </div>
                              <p className="text-gray-700">{record.prescription}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Observações</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">{record.notes}</p>
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
        </main>
      </div>
    </div>
  );
};

export default PatientHistory;