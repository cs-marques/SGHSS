import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PatientRegistration from './pages/PatientRegistration';
import PatientDashboard from './pages/PatientDashboard';
import PatientAppointments from './pages/patient/PatientAppointments';
import PatientScheduling from './pages/patient/PatientScheduling';
import PatientHistory from './pages/patient/PatientHistory';
import PatientTeleconsultation from './pages/patient/PatientTeleconsultation';
import PatientNotifications from './pages/patient/PatientNotifications';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import ProfessionalSchedule from './pages/professional/ProfessionalSchedule';
import ProfessionalPatients from './pages/professional/ProfessionalPatients';
import ProfessionalRecords from './pages/professional/ProfessionalRecords';
import ProfessionalPrescription from './pages/professional/ProfessionalPrescription';
import AdminDashboard from './pages/AdminDashboard';
import AdminRegistrations from './pages/admin/AdminRegistrations';
import AdminHospitalizations from './pages/admin/AdminHospitalizations';
import AdminReports from './pages/admin/AdminReports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro-paciente" element={<PatientRegistration />} />
        
        {/* Patient Routes */}
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/dashboard/patient/consultas" element={<PatientAppointments />} />
        <Route path="/dashboard/patient/agendamento" element={<PatientScheduling />} />
        <Route path="/dashboard/patient/historico" element={<PatientHistory />} />
        <Route path="/dashboard/patient/teleconsulta" element={<PatientTeleconsultation />} />
        <Route path="/dashboard/patient/notificacoes" element={<PatientNotifications />} />
        
        {/* Professional Routes */}
        <Route path="/dashboard/professional" element={<ProfessionalDashboard />} />
        <Route path="/dashboard/professional/agenda" element={<ProfessionalSchedule />} />
        <Route path="/dashboard/professional/pacientes" element={<ProfessionalPatients />} />
        <Route path="/dashboard/professional/prontuarios" element={<ProfessionalRecords />} />
        <Route path="/dashboard/professional/prontuario/:id" element={<ProfessionalRecords />} />
        <Route path="/dashboard/professional/receita/:id" element={<ProfessionalPrescription />} />
        
        {/* Admin Routes */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/cadastros" element={<AdminRegistrations />} />
        <Route path="/dashboard/admin/internacoes" element={<AdminHospitalizations />} />
        <Route path="/dashboard/admin/relatorios" element={<AdminReports />} />
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;