import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, AlertCircle, ArrowLeft, FileText, User, Calendar } from 'lucide-react';
import ProfessionalSidebar from '../../components/ProfessionalSidebar';

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

const ProfessionalPrescription: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState({
    date: new Date().toISOString().split('T')[0],
    medications: [] as Medication[],
    observations: '',
    useInstructions: ''
  });

  const [newMedication, setNewMedication] = useState<Medication>({
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  });

  const handleAddMedication = () => {
    if (newMedication.name && newMedication.dosage) {
      setPrescriptionData({
        ...prescriptionData,
        medications: [...prescriptionData.medications, newMedication]
      });
      setNewMedication({
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
      });
    }
  };

  const handleRemoveMedication = (index: number) => {
    setPrescriptionData({
      ...prescriptionData,
      medications: prescriptionData.medications.filter((_, i) => i !== index)
    });
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/dashboard/professional/prontuarios');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ProfessionalSidebar />
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Emitir Receita</h1>
                <p className="text-gray-600">Prescreva medicamentos e instruções</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors flex items-center"
            >
              <Save size={18} className="mr-2" />
              Salvar Receita
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
                  <User size={24} className="text-sky-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Maria Silva</h3>
                  <p className="text-sm text-gray-500">45 anos - Feminino</p>
                </div>
              </div>
              <div className="flex items-center text-gray-500">
                <Calendar size={18} className="mr-2" />
                <input
                  type="date"
                  value={prescriptionData.date}
                  onChange={(e) => setPrescriptionData({ ...prescriptionData, date: e.target.value })}
                  className="border-none bg-transparent focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Medicamentos</h3>
                <div className="space-y-4">
                  {prescriptionData.medications.map((medication, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <p className="font-medium text-gray-900">{medication.name}</p>
                          <p className="text-gray-600">{medication.dosage}</p>
                          <p className="text-gray-600">{medication.frequency}</p>
                          <p className="text-gray-600">{medication.duration}</p>
                          <p className="text-gray-600">{medication.instructions}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveMedication(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-gray-200 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Medicamento
                        </label>
                        <input
                          type="text"
                          value={newMedication.name}
                          onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Nome do medicamento"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dosagem
                        </label>
                        <input
                          type="text"
                          value={newMedication.dosage}
                          onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Ex: 500mg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Frequência
                        </label>
                        <input
                          type="text"
                          value={newMedication.frequency}
                          onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Ex: 2x ao dia"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duração
                        </label>
                        <input
                          type="text"
                          value={newMedication.duration}
                          onChange={(e) => setNewMedication({ ...newMedication, duration: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Ex: 7 dias"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Instruções
                        </label>
                        <input
                          type="text"
                          value={newMedication.instructions}
                          onChange={(e) => setNewMedication({ ...newMedication, instructions: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Ex: Tomar após as refeições"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleAddMedication}
                      className="mt-4 px-4 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors"
                    >
                      Adicionar Medicamento
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observações Gerais
                </label>
                <textarea
                  value={prescriptionData.observations}
                  onChange={(e) => setPrescriptionData({ ...prescriptionData, observations: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 h-32"
                  placeholder="Adicione observações importantes..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instruções de Uso
                </label>
                <textarea
                  value={prescriptionData.useInstructions}
                  onChange={(e) => setPrescriptionData({ ...prescriptionData, useInstructions: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 h-32"
                  placeholder="Instruções gerais sobre o uso dos medicamentos..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center space-x-2 text-gray-600">
              <FileText size={20} />
              <span>Visualização da Receita</span>
            </div>
            <div className="mt-4 p-6 border border-gray-200 rounded-xl">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold">RECEITUÁRIO</h2>
                <p className="text-gray-600">Dr. João Santos</p>
                <p className="text-gray-600">CRM 12345 SP</p>
              </div>

              <div className="mb-6">
                <p className="font-medium">Paciente: Maria Silva</p>
                <p className="text-gray-600">Data: {new Date(prescriptionData.date).toLocaleDateString()}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Prescrição:</h3>
                {prescriptionData.medications.map((med, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium">{med.name}</p>
                    <p className="text-gray-600">{med.dosage}</p>
                    <p className="text-gray-600">{med.frequency}</p>
                    <p className="text-gray-600">{med.duration}</p>
                    <p className="text-gray-600">{med.instructions}</p>
                  </div>
                ))}
              </div>

              {prescriptionData.observations && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Observações:</h3>
                  <p className="text-gray-600">{prescriptionData.observations}</p>
                </div>
              )}

              {prescriptionData.useInstructions && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Instruções de Uso:</h3>
                  <p className="text-gray-600">{prescriptionData.useInstructions}</p>
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <div className="inline-block">
                  <div className="w-48 border-b border-gray-400"></div>
                  <p className="mt-2 text-gray-600">Assinatura e Carimbo</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center animate-fade-in">
            <AlertCircle size={20} className="mr-2" />
            Receita salva com sucesso!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalPrescription;