import React, { useState } from 'react';
import { Calendar, Clock, User, ChevronRight, ArrowLeft } from 'lucide-react';
import Logo from '../../components/Logo';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const specialties = [
  'Cardiologia',
  'Dermatologia',
  'Oftalmologia',
  'Ortopedia',
  'Pediatria',
  'Psiquiatria'
];

const doctors = {
  Cardiologia: [
    { id: 1, name: 'Dra. Maria Silva', rating: '4.9' },
    { id: 2, name: 'Dr. João Santos', rating: '4.8' }
  ],
  Dermatologia: [
    { id: 3, name: 'Dra. Ana Oliveira', rating: '4.7' },
    { id: 4, name: 'Dr. Carlos Lima', rating: '4.9' }
  ],
  Oftalmologia: [
    { id: 5, name: 'Dr. Pedro Costa', rating: '4.8' },
    { id: 6, name: 'Dra. Laura Mendes', rating: '4.9' }
  ],
  Ortopedia: [
    { id: 7, name: 'Dr. Ricardo Santos', rating: '4.8' },
    { id: 8, name: 'Dra. Patricia Lima', rating: '4.7' }
  ],
  Pediatria: [
    { id: 9, name: 'Dra. Beatriz Costa', rating: '4.9' },
    { id: 10, name: 'Dr. Fernando Silva', rating: '4.8' }
  ],
  Psiquiatria: [
    { id: 11, name: 'Dr. Marcelo Souza', rating: '4.9' },
    { id: 12, name: 'Dra. Camila Santos', rating: '4.8' }
  ]
};

const timeSlots = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00'
];

const PatientScheduling: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<{ id: number; name: string; rating: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    if (step === 4) {
      // Here you would typically make an API call to save the appointment
      navigate('/dashboard/patient/consultas');
      return;
    }
    setStep(step + 1);
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
        
        <main className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={handleBack}
                className={`flex items-center text-gray-600 hover:text-gray-900 ${step === 1 ? 'invisible' : ''}`}
              >
                <ArrowLeft size={20} className="mr-2" />
                Voltar
              </button>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full transition-all ${
                      i === step ? 'w-8 bg-sky-500' : i < step ? 'bg-sky-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="min-h-[400px]">
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Selecione a Especialidade</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {specialties.map((specialty) => (
                      <button
                        key={specialty}
                        onClick={() => setSelectedSpecialty(specialty)}
                        className={`p-4 rounded-xl border transition-all ${
                          selectedSpecialty === specialty
                            ? 'border-sky-500 bg-sky-50 text-sky-700'
                            : 'border-gray-200 hover:border-sky-200 hover:bg-sky-50/50'
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Escolha o Profissional</h2>
                  <div className="space-y-4">
                    {doctors[selectedSpecialty as keyof typeof doctors]?.map((doctor) => (
                      <button
                        key={doctor.id}
                        onClick={() => setSelectedDoctor(doctor)}
                        className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between ${
                          selectedDoctor?.id === doctor.id
                            ? 'border-sky-500 bg-sky-50 text-sky-700'
                            : 'border-gray-200 hover:border-sky-200 hover:bg-sky-50/50'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center mr-4">
                            <User size={24} className="text-sky-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">{doctor.name}</p>
                            <p className="text-sm text-gray-500">⭐ {doctor.rating}</p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Selecione a Data</h2>
                  <div className="w-full">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Escolha o Horário</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-4 rounded-xl border transition-all ${
                          selectedTime === time
                            ? 'border-sky-500 bg-sky-50 text-sky-700'
                            : 'border-gray-200 hover:border-sky-200 hover:bg-sky-50/50'
                        }`}
                      >
                        <Clock size={18} className="mx-auto mb-2" />
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !selectedSpecialty) ||
                  (step === 2 && !selectedDoctor) ||
                  (step === 3 && !selectedDate) ||
                  (step === 4 && !selectedTime)
                }
                className="px-6 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 4 ? 'Confirmar Agendamento' : 'Próximo'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientScheduling;