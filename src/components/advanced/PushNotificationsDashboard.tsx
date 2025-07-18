'use client';

import { useState, useEffect } from 'react';
import {
  Bell,
  BellOff,
  Send,
  Settings,
  BarChart3,
  Users,
  TrendingUp,
  Clock,
  Play,
  Pause,
  Plus,
  Eye,
  Edit,
  Trash2,
  TestTube,
  Zap,
  MessageSquare,
  Target,
  Calendar,
  Filter,
  Search,
  Download,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePushNotifications, useNotificationPreferences, useNotificationCampaigns } from '@/hooks/usePushNotifications.safe';
import { 
  NotificationCampaign, 
  NotificationTemplate, 
  PushNotification,
  NotificationPreferences
} from '@/lib/push-notifications';

interface PushNotificationsDashboardProps {
  className?: string;
}

export default function PushNotificationsDashboard({ className }: PushNotificationsDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'templates' | 'subscribers' | 'analytics' | 'settings'>('overview');
  
  const {
    subscription,
    isSupported,
    permission,
    isLoading,
    error,
    subscribe,
    unsubscribe,
    sendTestNotification,
    getAnalytics,
    isSubscribed,
    canSubscribe
  } = usePushNotifications();

  const { campaigns, templates, executeCampaign, sendFromTemplate } = useNotificationCampaigns();
  const { preferences, updatePreference } = useNotificationPreferences();

  const analytics = getAnalytics();

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: BarChart3 },
    { id: 'campaigns', label: 'Campañas', icon: Send },
    { id: 'templates', label: 'Plantillas', icon: MessageSquare },
    { id: 'subscribers', label: 'Suscriptores', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  const handleSubscribe = async () => {
    await subscribe(undefined, preferences);
  };

  const handleUnsubscribe = async () => {
    await unsubscribe();
  };

  const handleTestNotification = async () => {
    await sendTestNotification();
  };

  return (
    <div className={cn('bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden', className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <Bell className="w-7 h-7 mr-3" />
              Notificaciones Push
            </h2>
            <p className="text-purple-100 mt-1">Mantén a tus usuarios conectados con notificaciones inteligentes</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {isSubscribed && (
              <button
                onClick={handleTestNotification}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <TestTube className="w-4 h-4 mr-2" />
                Probar
              </button>
            )}
            
            {canSubscribe && !isSubscribed ? (
              <button
                onClick={handleSubscribe}
                disabled={isLoading}
                className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors flex items-center font-medium disabled:opacity-50"
              >
                <Bell className="w-4 h-4 mr-2" />
                {isLoading ? 'Activando...' : 'Activar'}
              </button>
            ) : isSubscribed ? (
              <button
                onClick={handleUnsubscribe}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <BellOff className="w-4 h-4 mr-2" />
                Desactivar
              </button>
            ) : null}
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="mt-4 flex items-center space-x-6">
          <div className="flex items-center">
            <div className={cn(
              'w-2 h-2 rounded-full mr-2',
              isSupported ? 'bg-green-400' : 'bg-red-400'
            )} />
            <span className="text-sm text-purple-100">
              {isSupported ? 'Soportado' : 'No soportado'}
            </span>
          </div>
          
          <div className="flex items-center">
            <div className={cn(
              'w-2 h-2 rounded-full mr-2',
              permission === 'granted' ? 'bg-green-400' : 
              permission === 'denied' ? 'bg-red-400' : 'bg-yellow-400'
            )} />
            <span className="text-sm text-purple-100">
              {permission === 'granted' ? 'Permisos concedidos' : 
               permission === 'denied' ? 'Permisos denegados' : 'Permisos pendientes'}
            </span>
          </div>
          
          {isSubscribed && (
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2" />
              <span className="text-sm text-purple-100">Suscrito</span>
            </div>
          )}
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors',
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <OverviewTab 
            analytics={analytics} 
            campaigns={campaigns} 
            templates={templates}
            isSubscribed={isSubscribed}
          />
        )}
        
        {activeTab === 'campaigns' && (
          <CampaignsTab 
            campaigns={campaigns} 
            onExecuteCampaign={executeCampaign}
          />
        )}
        
        {activeTab === 'templates' && (
          <TemplatesTab 
            templates={templates} 
            onSendFromTemplate={sendFromTemplate}
          />
        )}
        
        {activeTab === 'subscribers' && (
          <SubscribersTab analytics={analytics} />
        )}
        
        {activeTab === 'analytics' && (
          <AnalyticsTab analytics={analytics} campaigns={campaigns} />
        )}
        
        {activeTab === 'settings' && (
          <SettingsTab 
            preferences={preferences} 
            onUpdatePreference={updatePreference}
            isSubscribed={isSubscribed}
          />
        )}
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ 
  analytics, 
  campaigns, 
  templates, 
  isSubscribed 
}: { 
  analytics: any, 
  campaigns: NotificationCampaign[], 
  templates: NotificationTemplate[],
  isSubscribed: boolean 
}) {
  const recentCampaigns = campaigns
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Suscriptores Activos"
          value={analytics.activeSubscriptions}
          icon={Users}
          color="blue"
          trend="+12%"
        />
        <StatCard
          title="Notificaciones Enviadas"
          value={analytics.totalSent}
          icon={Send}
          color="green"
          trend="+25%"
        />
        <StatCard
          title="Tasa de Clicks"
          value={`${analytics.clickRate.toFixed(1)}%`}
          icon={Target}
          color="purple"
          trend="+3.2%"
        />
        <StatCard
          title="Campañas Activas"
          value={analytics.campaignCount}
          icon={Zap}
          color="emerald"
          trend="+5%"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickActionCard
          title="Nueva Campaña"
          description="Crea una campaña de notificaciones"
          icon={Send}
          color="blue"
          disabled={!isSubscribed}
          onClick={() => console.log('Create campaign')}
        />
        <QuickActionCard
          title="Diseñar Plantilla"
          description="Crea plantillas reutilizables"
          icon={MessageSquare}
          color="purple"
          disabled={false}
          onClick={() => console.log('Create template')}
        />
        <QuickActionCard
          title="Ver Analytics"
          description="Analiza el rendimiento"
          icon={BarChart3}
          color="green"
          disabled={false}
          onClick={() => console.log('View analytics')}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Campañas Recientes</h3>
          <div className="space-y-3">
            {recentCampaigns.map(campaign => (
              <div key={campaign.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                  <p className="text-xs text-gray-500">
                    {campaign.analytics.sent} enviadas
                  </p>
                </div>
                <span className={cn(
                  'px-2 py-1 rounded-full text-xs font-medium',
                  campaign.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                )}>
                  {campaign.isActive ? 'Activa' : 'Pausada'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tasa de Entrega</span>
              <span className="text-sm font-medium text-gray-900">98.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tasa de Apertura</span>
              <span className="text-sm font-medium text-gray-900">76.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tasa de Interacción</span>
              <span className="text-sm font-medium text-gray-900">{analytics.clickRate.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Plantillas Disponibles</span>
              <span className="text-sm font-medium text-gray-900">{analytics.templateCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Campaigns Tab Component
function CampaignsTab({ 
  campaigns, 
  onExecuteCampaign 
}: { 
  campaigns: NotificationCampaign[], 
  onExecuteCampaign: (campaignId: string) => Promise<boolean> 
}) {
  const [selectedCampaign, setSelectedCampaign] = useState<NotificationCampaign | null>(null);

  const handleExecuteCampaign = async (campaignId: string) => {
    const success = await onExecuteCampaign(campaignId);
    if (success) {
      console.log('Campaign executed successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Campañas de Notificaciones</h3>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Campaña
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900">{campaign.name}</h4>
                <p className="text-sm text-gray-600">{campaign.title}</p>
              </div>
              <span className={cn(
                'px-2 py-1 rounded-full text-xs font-medium',
                campaign.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              )}>
                {campaign.isActive ? 'Activa' : 'Pausada'}
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Enviadas:</span>
                <span className="font-medium">{campaign.analytics.sent}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Clicks:</span>
                <span className="font-medium">{campaign.analytics.clicked}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tasa conversión:</span>
                <span className="font-medium">{campaign.analytics.conversionRate.toFixed(1)}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                {campaign.schedule.type === 'immediate' ? 'Inmediata' : 'Programada'}
              </div>
              <div className="flex space-x-2">
                {campaign.isActive && (
                  <button
                    onClick={() => handleExecuteCampaign(campaign.id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setSelectedCampaign(campaign)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Templates Tab Component
function TemplatesTab({ 
  templates, 
  onSendFromTemplate 
}: { 
  templates: NotificationTemplate[], 
  onSendFromTemplate: (templateId: string, sessionId: string, variables?: Record<string, string>) => Promise<boolean> 
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Plantillas de Notificaciones</h3>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Plantilla
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{template.name}</h4>
                <p className="text-sm text-gray-600">{template.title}</p>
              </div>
              <span className={cn(
                'px-2 py-1 rounded-full text-xs font-medium',
                {
                  'bg-green-100 text-green-800': template.category === 'welcome',
                  'bg-blue-100 text-blue-800': template.category === 'promotional',
                  'bg-purple-100 text-purple-800': template.category === 'reminder',
                  'bg-gray-100 text-gray-800': template.category === 'custom'
                }
              )}>
                {template.category}
              </span>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 line-clamp-2">{template.body}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                {template.variables.length} variables
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-purple-600 hover:text-purple-800">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Subscribers Tab Component
function SubscribersTab({ analytics }: { analytics: any }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Suscriptores</h3>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </button>
      </div>

      {/* Subscribers Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Suscriptores</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalSubscriptions}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Activos</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.activeSubscriptions}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tasa Engagement</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.clickRate.toFixed(1)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Placeholder for subscriber list */}
      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-gray-900 mb-2">Lista de Suscriptores</h4>
        <p className="text-gray-600">Aquí aparecerán los detalles de los suscriptores cuando se implemente la funcionalidad completa.</p>
      </div>
    </div>
  );
}

// Analytics Tab Component
function AnalyticsTab({ 
  analytics, 
  campaigns 
}: { 
  analytics: any, 
  campaigns: NotificationCampaign[] 
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Analytics de Notificaciones</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Notificaciones Enviadas"
          value={analytics.totalSent}
          icon={Send}
          color="blue"
        />
        <StatCard
          title="Clicks Totales"
          value={analytics.totalClicks}
          icon={Target}
          color="green"
        />
        <StatCard
          title="Tasa de Clicks"
          value={`${analytics.clickRate.toFixed(1)}%`}
          icon={TrendingUp}
          color="purple"
        />
        <StatCard
          title="Campañas Activas"
          value={analytics.campaignCount}
          icon={Zap}
          color="emerald"
        />
      </div>

      {/* Campaign Performance */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Rendimiento por Campaña</h4>
        <div className="space-y-3">
          {campaigns.slice(0, 10).map(campaign => (
            <div key={campaign.id} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                <p className="text-xs text-gray-500">{campaign.analytics.sent} enviadas</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{campaign.analytics.clicked} clicks</p>
                <p className="text-xs text-gray-500">{campaign.analytics.conversionRate.toFixed(1)}% conversión</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Settings Tab Component
function SettingsTab({ 
  preferences, 
  onUpdatePreference, 
  isSubscribed 
}: { 
  preferences: NotificationPreferences, 
  onUpdatePreference: (key: string, value: any) => void,
  isSubscribed: boolean 
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Configuración de Notificaciones</h3>
      
      {!isSubscribed && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <AlertCircle className="w-5 h-5 text-yellow-400 mr-3" />
            <p className="text-sm text-yellow-700">
              Necesitas activar las notificaciones para cambiar la configuración.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Configuración General</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Notificaciones Habilitadas</label>
                <p className="text-xs text-gray-500">Recibir notificaciones push</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.enabled}
                onChange={(e) => onUpdatePreference('enabled', e.target.checked)}
                disabled={!isSubscribed}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 disabled:opacity-50"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Frecuencia</label>
              <select
                value={preferences.frequency}
                onChange={(e) => onUpdatePreference('frequency', e.target.value)}
                disabled={!isSubscribed}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50"
              >
                <option value="immediate">Inmediata</option>
                <option value="daily">Diaria</option>
                <option value="weekly">Semanal</option>
                <option value="never">Nunca</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Categorías de Notificaciones</h4>
          
          <div className="space-y-3">
            {Object.entries(preferences.categories).map(([category, enabled]) => (
              <div key={category} className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700 capitalize">{category}</label>
                  <p className="text-xs text-gray-500">
                    {category === 'marketing' && 'Promociones y ofertas especiales'}
                    {category === 'updates' && 'Actualizaciones del producto'}
                    {category === 'reminders' && 'Recordatorios importantes'}
                    {category === 'promotions' && 'Descuentos y promociones'}
                    {category === 'personalized' && 'Contenido personalizado'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => onUpdatePreference(`categories.${category}`, e.target.checked)}
                  disabled={!isSubscribed}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 disabled:opacity-50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Horario Silencioso</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Habilitar Horario Silencioso</label>
                <p className="text-xs text-gray-500">No recibir notificaciones durante estas horas</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.quietHours.enabled}
                onChange={(e) => onUpdatePreference('quietHours.enabled', e.target.checked)}
                disabled={!isSubscribed}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 disabled:opacity-50"
              />
            </div>
            
            {preferences.quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Hora de Inicio</label>
                  <input
                    type="time"
                    value={preferences.quietHours.start}
                    onChange={(e) => onUpdatePreference('quietHours.start', e.target.value)}
                    disabled={!isSubscribed}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Hora de Fin</label>
                  <input
                    type="time"
                    value={preferences.quietHours.end}
                    onChange={(e) => onUpdatePreference('quietHours.end', e.target.value)}
                    disabled={!isSubscribed}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility Components
type StatCardColorKey = 'blue' | 'green' | 'purple' | 'emerald';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: StatCardColorKey;
  trend?: string;
}

function StatCard({ title, value, icon: Icon, color, trend }: StatCardProps) {
  const colorClasses: Record<StatCardColorKey, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    emerald: 'bg-emerald-500'
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-1">{trend} vs mes anterior</p>
          )}
        </div>
        <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', colorClasses[color])}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

type QuickActionColorKey = 'blue' | 'green' | 'purple';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: QuickActionColorKey;
  disabled?: boolean;
  onClick: () => void;
}

function QuickActionCard({ title, description, icon: Icon, color, disabled, onClick }: QuickActionCardProps) {
  const colorClasses: Record<QuickActionColorKey, string> = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    purple: 'bg-purple-500 hover:bg-purple-600'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full p-6 rounded-xl text-white text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        colorClasses[color]
      )}
    >
      <Icon className="w-8 h-8 mb-3" />
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-sm opacity-90">{description}</p>
    </button>
  );
}