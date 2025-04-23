import React, { useState } from 'react';
import { Bell, Calendar, FileText, Pill, AlertCircle, CheckCircle, Clock, X } from 'lucide-react';
import Logo from '../../components/Logo';
import Sidebar from '../../components/Sidebar';

interface Notification {
  id: number;
  type: 'appointment' | 'exam' | 'prescription' | 'alert';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'appointment',
    title: 'Consulta Confirmada',
    message: 'Sua consulta com Dra. Maria Silva foi confirmada para amanhã às 14:30.',
    date: '2024-04-14 09:30',
    read: false
  },
  {
    id: 2,
    type: 'exam',
    title: 'Resultado de Exame Disponível',
    message: 'O resultado do seu exame de sangue já está disponível para visualização.',
    date: '2024-04-13 15:45',
    read: false
  },
  {
    id: 3,
    type: 'prescription',
    title: 'Nova Prescrição',
    message: 'Dr. João Santos adicionou uma nova prescrição ao seu prontuário.',
    date: '2024-04-12 11:20',
    read: true
  },
  {
    id: 4,
    type: 'alert',
    title: 'Lembrete de Medicação',
    message: 'Não se esqueça de tomar sua medicação hoje às 20:00.',
    date: '2024-04-12 08:00',
    read: true
  }
];

const notificationIcons = {
  appointment: Calendar,
  exam: FileText,
  prescription: Pill,
  alert: AlertCircle
};

const notificationColors = {
  appointment: 'text-sky-500 bg-sky-50 border-sky-100',
  exam: 'text-purple-500 bg-purple-50 border-purple-100',
  prescription: 'text-green-500 bg-green-50 border-green-100',
  alert: 'text-yellow-500 bg-yellow-50 border-yellow-100'
};

const PatientNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter(notification => !notification.read);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1">
        <header className="bg-white shadow-sm py-4 px-6 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo />
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell size={20} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto py-8 px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notificações</h1>
              <p className="text-gray-600">
                {unreadCount} notificações não lidas
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="all">Todas</option>
                <option value="unread">Não lidas</option>
              </select>
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 text-sky-600 hover:text-sky-700 transition-colors"
              >
                Marcar todas como lidas
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredNotifications.map((notification) => {
              const Icon = notificationIcons[notification.type];
              const colorClass = notificationColors[notification.type];

              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl shadow-sm border p-4 transition-all ${
                    notification.read ? 'border-gray-200' : 'border-l-4 border-l-sky-500'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`h-10 w-10 rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={20} />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{notification.title}</h3>
                          <p className="text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-gray-400 hover:text-sky-500 transition-colors"
                              title="Marcar como lida"
                            >
                              <CheckCircle size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            title="Remover notificação"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        {new Date(notification.date).toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredNotifications.length === 0 && (
              <div className="text-center py-12">
                <Bell size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Nenhuma notificação</h3>
                <p className="text-gray-600">
                  {filter === 'all' ? 'Você não tem notificações.' : 'Você não tem notificações não lidas.'}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientNotifications;