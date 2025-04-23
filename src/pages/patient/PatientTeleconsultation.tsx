import React, { useState } from 'react';
import { Video, Mic, MicOff, VideoOff, Phone, Users, AlertCircle } from 'lucide-react';
import Logo from '../../components/Logo';
import Sidebar from '../../components/Sidebar';

const PatientTeleconsultation: React.FC = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const doctorInfo = {
    name: "Dra. Maria Silva",
    specialty: "Cardiologia",
    status: "Online"
  };

  const toggleAudio = () => setIsAudioEnabled(!isAudioEnabled);
  const toggleVideo = () => setIsVideoEnabled(!isVideoEnabled);
  const toggleCall = () => setIsCallActive(!isCallActive);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-900 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <header className="bg-gray-800 shadow-sm py-4 px-6 border-b border-gray-700">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <Logo variant="white" />
            </div>
          </header>
          
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="bg-gray-800 rounded-xl p-6 text-center max-w-md mx-auto">
              <AlertCircle size={48} className="mx-auto mb-4 text-yellow-500" />
              <h2 className="text-xl font-semibold text-white mb-3">Acesso via Desktop</h2>
              <p className="text-gray-300 mb-4">
                Para uma melhor experiência na teleconsulta, por favor acesse esta página através de um computador ou notebook.
              </p>
              <p className="text-gray-400 text-sm">
                O serviço de teleconsulta requer recursos que funcionam melhor em telas maiores.
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 shadow-sm py-4 px-6 border-b border-gray-700">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo variant="white" />
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-500 text-sm">Conectado</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 flex">
          <div className="flex-1 p-6 relative">
            {isCallActive ? (
              <div className="relative h-full">
                <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gray-800 flex items-center justify-center">
                  {isVideoEnabled ? (
                    <img 
                      src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg"
                      alt="Doctor"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-500 flex flex-col items-center">
                      <VideoOff size={48} />
                      <p className="mt-2">Vídeo Desativado</p>
                    </div>
                  )}
                </div>
                
                <div className="absolute bottom-4 right-4 w-64 h-48 rounded-xl overflow-hidden bg-gray-800 border-2 border-gray-700">
                  {isVideoEnabled ? (
                    <img 
                      src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg"
                      alt="You"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <VideoOff size={24} />
                    </div>
                  )}
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-gray-800/90 px-6 py-3 rounded-full backdrop-blur-sm">
                  <button
                    onClick={toggleAudio}
                    className={`p-3 rounded-full transition-colors ${
                      isAudioEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    {isAudioEnabled ? <Mic size={20} className="text-white" /> : <MicOff size={20} className="text-white" />}
                  </button>
                  <button
                    onClick={toggleVideo}
                    className={`p-3 rounded-full transition-colors ${
                      isVideoEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    {isVideoEnabled ? <Video size={20} className="text-white" /> : <VideoOff size={20} className="text-white" />}
                  </button>
                  <button
                    onClick={toggleCall}
                    className="p-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                  >
                    <Phone size={20} className="text-white" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-6">
                    <div className="h-24 w-24 rounded-full bg-gray-800 mx-auto flex items-center justify-center mb-4">
                      <Users size={48} className="text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">{doctorInfo.name}</h2>
                    <p className="text-gray-400">{doctorInfo.specialty}</p>
                  </div>
                  <button
                    onClick={toggleCall}
                    className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center mx-auto"
                  >
                    <Phone size={20} className="mr-2" />
                    Iniciar Teleconsulta
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientTeleconsultation;