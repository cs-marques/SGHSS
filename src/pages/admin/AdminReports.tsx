import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  FileText, 
  Calendar,
  Users,
  Activity,
  TrendingUp,
  AlertCircle,
  BedDouble,
  Stethoscope,
  ArrowUp,
  ArrowDown,
  Filter,
  Search,
  Eye,
  RefreshCw,
  ArrowRight,
  Pill,
  X,
  Download,
  Mail,
  CheckCircle,
  Clock
} from 'lucide-react';
import Logo from '../../components/Logo';
import AdminSidebar from '../../components/AdminSidebar';

interface ReportData {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  period: string;
}

interface Report {
  id: string;
  title: string;
  category: 'administrative' | 'clinical' | 'financial';
  description: string;
  lastGenerated: string;
  status: 'available' | 'generating' | 'pending';
}

const reportData: Record<string, ReportData[]> = {
  administrative: [
    {
      id: 'total_patients',
      title: 'Total de Pacientes',
      value: '1,284',
      change: '+12.5%',
      trend: 'up',
      period: 'vs. mês anterior'
    },
    {
      id: 'occupancy_rate',
      title: 'Taxa de Ocupação',
      value: '85%',
      change: '+2.1%',
      trend: 'up',
      period: 'vs. mês anterior'
    },
    {
      id: 'new_registrations',
      title: 'Novos Cadastros',
      value: '246',
      change: '+15.3%',
      trend: 'up',
      period: 'vs. mês anterior'
    }
  ],
  clinical: [
    {
      id: 'appointments',
      title: 'Consultas Realizadas',
      value: '856',
      change: '+8.4%',
      trend: 'up',
      period: 'vs. mês anterior'
    },
    {
      id: 'procedures',
      title: 'Procedimentos',
      value: '324',
      change: '-3.2%',
      trend: 'down',
      period: 'vs. mês anterior'
    },
    {
      id: 'hospitalizations',
      title: 'Internações',
      value: '64',
      change: '+5.7%',
      trend: 'up',
      period: 'vs. mês anterior'
    }
  ],
  financial: [
    {
      id: 'revenue',
      title: 'Receita Total',
      value: 'R$ 256.480',
      change: '+18.3%',
      trend: 'up',
      period: 'vs. mês anterior'
    },
    {
      id: 'expenses',
      title: 'Despesas',
      value: 'R$ 198.650',
      change: '+5.2%',
      trend: 'up',
      period: 'vs. mês anterior'
    },
    {
      id: 'profit',
      title: 'Lucro Líquido',
      value: 'R$ 57.830',
      change: '+12.7%',
      trend: 'up',
      period: 'vs. mês anterior'
    }
  ]
};

const initialReports: Report[] = [
  {
    id: '1',
    title: 'Relatório de Ocupação',
    category: 'administrative',
    description: 'Análise detalhada da taxa de ocupação por departamento',
    lastGenerated: '2024-03-15',
    status: 'available'
  },
  {
    id: '2',
    title: 'Relatório de Atendimentos',
    category: 'clinical',
    description: 'Estatísticas de atendimentos por especialidade',
    lastGenerated: '2024-03-14',
    status: 'available'
  },
  {
    id: '3',
    title: 'Relatório Financeiro',
    category: 'financial',
    description: 'Análise financeira mensal',
    lastGenerated: '2024-03-13',
    status: 'available'
  }
];

const AdminReports: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'administrative' | 'clinical' | 'financial'>('all');
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const handleGenerateReport = (reportId: string) => {
    setGeneratingReport(reportId);
    setTimeout(() => {
      setGeneratingReport(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setShowReportModal(true);
    setEmailSent(false);
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    setTimeout(() => {
      setShowReportModal(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const filteredReports = initialReports.filter(report => {
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1">
        <header className="bg-white shadow-sm py-4 px-6 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo />
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-8 px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
            <p className="text-gray-600">Análise e geração de relatórios administrativos e clínicos</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as 'all' | 'administrative' | 'clinical' | 'financial')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="all">Todas as categorias</option>
                  <option value="administrative">Administrativos</option>
                  <option value="clinical">Clínicos</option>
                  <option value="financial">Financeiros</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Inicial
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Final
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Report Categories */}
          <div className="space-y-8">
            {/* Administrative Reports */}
            {(selectedCategory === 'all' || selectedCategory === 'administrative') && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Relatórios Administrativos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {reportData.administrative.map((report) => (
                    <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">{report.title}</h3>
                        <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center">
                          <Activity size={20} className="text-sky-500" />
                        </div>
                      </div>
                      <p className="text-2xl font-semibold text-gray-900">{report.value}</p>
                      <div className="flex items-center mt-2">
                        <span className={`text-sm flex items-center ${
                          report.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {report.trend === 'up' ? (
                            <ArrowUp size={16} className="mr-1" />
                          ) : (
                            <ArrowDown size={16} className="mr-1" />
                          )}
                          {report.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">{report.period}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <button
                          onClick={() => handleGenerateReport(report.id)}
                          className="text-sky-600 hover:text-sky-700 flex items-center"
                        >
                          {generatingReport === report.id ? (
                            <>
                              <RefreshCw size={16} className="mr-2 animate-spin" />
                              Gerando...
                            </>
                          ) : (
                            <>
                              <Eye size={16} className="mr-2" />
                              Visualizar Dados
                            </>
                          )}
                        </button>
                        <span className="text-xs text-gray-500">
                          Atualizado há 5min
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clinical Reports */}
            {(selectedCategory === 'all' || selectedCategory === 'clinical') && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Relatórios Clínicos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {reportData.clinical.map((report) => (
                    <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">{report.title}</h3>
                        <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center">
                          <Stethoscope size={20} className="text-purple-500" />
                        </div>
                      </div>
                      <p className="text-2xl font-semibold text-gray-900">{report.value}</p>
                      <div className="flex items-center mt-2">
                        <span className={`text-sm flex items-center ${
                          report.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {report.trend === 'up' ? (
                            <ArrowUp size={16} className="mr-1" />
                          ) : (
                            <ArrowDown size={16} className="mr-1" />
                          )}
                          {report.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">{report.period}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <button
                          onClick={() => handleGenerateReport(report.id)}
                          className="text-sky-600 hover:text-sky-700 flex items-center"
                        >
                          {generatingReport === report.id ? (
                            <>
                              <RefreshCw size={16} className="mr-2 animate-spin" />
                              Gerando...
                            </>
                          ) : (
                            <>
                              <Eye size={16} className="mr-2" />
                              Visualizar Dados
                            </>
                          )}
                        </button>
                        <span className="text-xs text-gray-500">
                          Atualizado há 5min
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Financial Reports */}
            {(selectedCategory === 'all' || selectedCategory === 'financial') && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Relatórios Financeiros</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {reportData.financial.map((report) => (
                    <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">{report.title}</h3>
                        <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center">
                          <TrendingUp size={20} className="text-green-500" />
                        </div>
                      </div>
                      <p className="text-2xl font-semibold text-gray-900">{report.value}</p>
                      <div className="flex items-center mt-2">
                        <span className={`text-sm flex items-center ${
                          report.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {report.trend === 'up' ? (
                            <ArrowUp size={16} className="mr-1" />
                          ) : (
                            <ArrowDown size={16} className="mr-1" />
                          )}
                          {report.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">{report.period}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <button
                          onClick={() => handleGenerateReport(report.id)}
                          className="text-sky-600 hover:text-sky-700 flex items-center"
                        >
                          {generatingReport === report.id ? (
                            <>
                              <RefreshCw size={16} className="mr-2 animate-spin" />
                              Gerando...
                            </>
                          ) : (
                            <>
                              <Eye size={16} className="mr-2" />
                              Visualizar Dados
                            </>
                          )}
                        </button>
                        <span className="text-xs text-gray-500">
                          Atualizado há 5min
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Report View Modal */}
        {showReportModal && selectedReport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Visualizar Relatório</h2>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{selectedReport.title}</h3>
                  <p className="text-gray-600">{selectedReport.description}</p>
                </div>

                {emailSent ? (
                  <div className="text-center py-8">
                    <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Relatório Enviado!</h3>
                    <p className="text-gray-600">
                      O relatório foi enviado para seu email com sucesso.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Mail size={20} className="text-sky-500 mr-2" />
                          <span className="font-medium text-gray-900">Enviar por Email</span>
                        </div>
                        <button
                          onClick={handleSendEmail}
                          className="px-4 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors"
                        >
                          Enviar
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">
                        O relatório será enviado para seu email cadastrado no sistema.
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Download size={20} className="text-sky-500 mr-2" />
                          <span className="font-medium text-gray-900">Download</span>
                        </div>
                        <button
                          onClick={() => {
                            setShowReportModal(false);
                            setShowSuccess(true);
                            setTimeout(() => setShowSuccess(false), 3000);
                          }}
                          className="px-4 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors"
                        >
                          Baixar
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Baixe o relatório em formato PDF para visualização offline.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center animate-fade-in">
            <AlertCircle size={20} className="mr-2" />
            {emailSent ? 'Relatório enviado com sucesso!' : 'Relatório baixado com sucesso!'}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReports;