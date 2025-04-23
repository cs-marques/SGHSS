import React, { useState } from 'react';
import { Bell, X, Check, AlertCircle } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onRemove: (id: number) => void;
  onViewAll: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  notifications,
  onMarkAsRead,
  onRemove,
  onViewAll
}) => {
  const [showPanel, setShowPanel] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllAsRead = () => {
    notifications.forEach(notification => {
      if (!notification.read) {
        onMarkAsRead(notification.id);
      }
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="p-2 text-gray-600 hover:text-gray-900 relative"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showPanel && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50 animate-fade-in">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Notificações</h3>
              <p className="text-sm text-gray-500">{unreadCount} não lidas</p>
            </div>
            <button
              onClick={() => setShowPanel(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-sky-50' : ''
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <AlertCircle size={16} className="text-sky-500" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="font-medium text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => onMarkAsRead(notification.id)}
                          className="text-sky-500 hover:text-sky-600"
                          title="Marcar como lida"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => onRemove(notification.id)}
                        className="text-gray-400 hover:text-red-500"
                        title="Remover"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                Nenhuma notificação
              </div>
            )}
          </div>

          {unreadCount > 0 && (
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleMarkAllAsRead}
                className="w-full text-sm text-sky-600 hover:text-sky-700 font-medium"
              >
                Marcar todas como lidas
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;