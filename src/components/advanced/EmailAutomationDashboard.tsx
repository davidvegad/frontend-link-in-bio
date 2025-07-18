'use client';

import { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  Users,
  TrendingUp,
  Clock,
  Settings,
  Plus,
  Play,
  Pause,
  Eye,
  Edit,
  Trash2,
  Copy,
  BarChart3,
  Target,
  Zap,
  Calendar,
  Filter,
  Search,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  emailAutomationService,
  EmailTemplate,
  EmailCampaign,
  EmailSequence,
  EmailSubscriber,
  EmailSegment
} from '@/lib/email-automation';

interface EmailAutomationDashboardProps {
  className?: string;
}

export default function EmailAutomationDashboard({ className }: EmailAutomationDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'sequences' | 'templates' | 'subscribers' | 'analytics'>('overview');
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [sequences, setSequences] = useState<EmailSequence[]>([]);
  const [subscribers, setSubscribers] = useState<EmailSubscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    try {
      setTemplates(emailAutomationService.getAllTemplates());
      setCampaigns(Array.from(emailAutomationService['campaigns'].values()));
      setSequences(Array.from(emailAutomationService['sequences'].values()));
      setSubscribers(Array.from(emailAutomationService['subscribers'].values()));
    } catch (error) {
      console.error('Failed to load email automation data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = {
    totalSubscribers: subscribers.filter(s => s.status === 'subscribed').length,
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.status === 'sending' || c.status === 'scheduled').length,
    totalSequences: sequences.length,
    activeSequences: sequences.filter(s => s.isActive).length,
    avgOpenRate: campaigns.length > 0 
      ? campaigns.reduce((acc, campaign) => {
          const openRate = campaign.stats.sent > 0 ? (campaign.stats.opened / campaign.stats.sent) * 100 : 0;
          return acc + openRate;
        }, 0) / campaigns.length 
      : 0
  };

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: BarChart3 },
    { id: 'campaigns', label: 'Campañas', icon: Send },
    { id: 'sequences', label: 'Secuencias', icon: Zap },
    { id: 'templates', label: 'Plantillas', icon: Mail },
    { id: 'subscribers', label: 'Suscriptores', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className={cn('bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden', className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <Mail className="w-7 h-7 mr-3" />
              Email Marketing
            </h2>
            <p className="text-green-100 mt-1">Automatiza y optimiza tus campañas de email</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </button>
            <button className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors flex items-center font-medium">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Campaña
            </button>
          </div>
        </div>
      </div>

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
                    ? 'border-green-500 text-green-600'
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
          <OverviewTab stats={stats} campaigns={campaigns} sequences={sequences} />
        )}
        
        {activeTab === 'campaigns' && (
          <CampaignsTab campaigns={campaigns} onCampaignUpdate={loadData} />
        )}
        
        {activeTab === 'sequences' && (
          <SequencesTab sequences={sequences} onSequenceUpdate={loadData} />
        )}
        
        {activeTab === 'templates' && (
          <TemplatesTab templates={templates} onTemplateUpdate={loadData} />
        )}
        
        {activeTab === 'subscribers' && (
          <SubscribersTab subscribers={subscribers} onSubscriberUpdate={loadData} />
        )}
        
        {activeTab === 'analytics' && (
          <AnalyticsTab campaigns={campaigns} sequences={sequences} />
        )}
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ stats, campaigns, sequences }: { stats: any, campaigns: EmailCampaign[], sequences: EmailSequence[] }) {
  const recentCampaigns = campaigns
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Suscriptores Activos"
          value={stats.totalSubscribers}
          icon={Users}
          color="blue"
          trend="+12%"
        />
        <StatCard
          title="Campañas Totales"
          value={stats.totalCampaigns}
          icon={Send}
          color="green"
          trend="+8%"
        />
        <StatCard
          title="Secuencias Activas"
          value={stats.activeSequences}
          icon={Zap}
          color="purple"
          trend="+5%"
        />
        <StatCard
          title="Tasa Apertura Promedio"
          value={`${stats.avgOpenRate.toFixed(1)}%`}
          icon={TrendingUp}
          color="emerald"
          trend="+2.3%"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickActionCard
          title="Crear Campaña"
          description="Envía un email a tu audiencia"
          icon={Send}
          color="blue"
          onClick={() => console.log('Create campaign')}
        />
        <QuickActionCard
          title="Nueva Secuencia"
          description="Automatiza series de emails"
          icon={Zap}
          color="purple"
          onClick={() => console.log('Create sequence')}
        />
        <QuickActionCard
          title="Diseñar Plantilla"
          description="Crea emails personalizados"
          icon={Mail}
          color="green"
          onClick={() => console.log('Create template')}
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
                    {new Date(campaign.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={cn(
                  'px-2 py-1 rounded-full text-xs font-medium',
                  {
                    'bg-gray-100 text-gray-800': campaign.status === 'draft',
                    'bg-yellow-100 text-yellow-800': campaign.status === 'scheduled',
                    'bg-blue-100 text-blue-800': campaign.status === 'sending',
                    'bg-green-100 text-green-800': campaign.status === 'sent'
                  }
                )}>
                  {campaign.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Emails Enviados (30d)</span>
              <span className="text-sm font-medium text-gray-900">
                {campaigns.reduce((acc, c) => acc + c.stats.sent, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Emails Abiertos (30d)</span>
              <span className="text-sm font-medium text-gray-900">
                {campaigns.reduce((acc, c) => acc + c.stats.opened, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Clicks Totales (30d)</span>
              <span className="text-sm font-medium text-gray-900">
                {campaigns.reduce((acc, c) => acc + c.stats.clicked, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Campaigns Tab Component
function CampaignsTab({ campaigns, onCampaignUpdate }: { campaigns: EmailCampaign[], onCampaignUpdate: () => void }) {
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null);

  const handleSendCampaign = async (campaignId: string) => {
    try {
      await emailAutomationService.sendCampaign(campaignId);
      onCampaignUpdate();
    } catch (error) {
      console.error('Failed to send campaign:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Campañas de Email</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Campaña
        </button>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaña
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enviados
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tasa Apertura
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campaign) => {
              const openRate = campaign.stats.sent > 0 ? (campaign.stats.opened / campaign.stats.sent) * 100 : 0;
              
              return (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">{campaign.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                      {
                        'bg-gray-100 text-gray-800': campaign.status === 'draft',
                        'bg-yellow-100 text-yellow-800': campaign.status === 'scheduled',
                        'bg-blue-100 text-blue-800': campaign.status === 'sending',
                        'bg-green-100 text-green-800': campaign.status === 'sent',
                        'bg-red-100 text-red-800': campaign.status === 'cancelled'
                      }
                    )}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.stats.sent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {openRate.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.stats.clicked.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    {campaign.status === 'draft' && (
                      <button
                        onClick={() => handleSendCampaign(campaign.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedCampaign(campaign)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Templates Tab Component
function TemplatesTab({ templates, onTemplateUpdate }: { templates: EmailTemplate[], onTemplateUpdate: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Plantillas de Email</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
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
                <p className="text-sm text-gray-600">{template.subject}</p>
              </div>
              <span className={cn(
                'px-2 py-1 rounded-full text-xs font-medium',
                {
                  'bg-green-100 text-green-800': template.category === 'welcome',
                  'bg-blue-100 text-blue-800': template.category === 'promotional',
                  'bg-purple-100 text-purple-800': template.category === 'nurturing',
                  'bg-gray-100 text-gray-800': template.category === 'transactional'
                }
              )}>
                {template.category}
              </span>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 line-clamp-3">{template.previewText}</p>
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
                <button className="text-gray-600 hover:text-gray-800">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sequences Tab Component
function SequencesTab({ sequences, onSequenceUpdate }: { sequences: EmailSequence[], onSequenceUpdate: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Secuencias Automatizadas</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Secuencia
        </button>
      </div>

      {/* Sequences List */}
      <div className="space-y-4">
        {sequences.map((sequence) => (
          <div key={sequence.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h4 className="text-lg font-semibold text-gray-900 mr-3">{sequence.name}</h4>
                  <span className={cn(
                    'px-2 py-1 rounded-full text-xs font-medium',
                    sequence.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  )}>
                    {sequence.isActive ? 'Activa' : 'Pausada'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{sequence.description}</p>
                
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Trigger:</span>
                    <p className="font-medium capitalize">{sequence.trigger.type}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Emails:</span>
                    <p className="font-medium">{sequence.emails.length}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Suscriptores:</span>
                    <p className="font-medium">{sequence.stats.subscribers}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Tasa Completación:</span>
                    <p className="font-medium">{sequence.stats.completionRate.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  {sequence.isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
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
function SubscribersTab({ subscribers, onSubscriberUpdate }: { subscribers: EmailSubscriber[], onSubscriberUpdate: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | EmailSubscriber['status']>('all');

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = !searchQuery || 
      subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscriber.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscriber.lastName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || subscriber.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Suscriptores</h3>
        <div className="flex space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Importar
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Añadir Suscriptor
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar suscriptores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">Todos los estados</option>
          <option value="subscribed">Suscrito</option>
          <option value="unsubscribed">No suscrito</option>
          <option value="bounced">Rebotado</option>
          <option value="complained">Queja</option>
        </select>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Suscriptor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Segmentos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Suscripción
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubscribers.map((subscriber) => (
              <tr key={subscriber.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {subscriber.firstName?.[0] || subscriber.email[0].toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {subscriber.firstName} {subscriber.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{subscriber.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                    {
                      'bg-green-100 text-green-800': subscriber.status === 'subscribed',
                      'bg-gray-100 text-gray-800': subscriber.status === 'unsubscribed',
                      'bg-red-100 text-red-800': subscriber.status === 'bounced',
                      'bg-yellow-100 text-yellow-800': subscriber.status === 'complained'
                    }
                  )}>
                    {subscriber.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {subscriber.segments.length || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(subscriber.subscribedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Analytics Tab Component
function AnalyticsTab({ campaigns, sequences }: { campaigns: EmailCampaign[], sequences: EmailSequence[] }) {
  const totalSent = campaigns.reduce((acc, c) => acc + c.stats.sent, 0);
  const totalOpened = campaigns.reduce((acc, c) => acc + c.stats.opened, 0);
  const totalClicked = campaigns.reduce((acc, c) => acc + c.stats.clicked, 0);
  
  const overallOpenRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0;
  const overallClickRate = totalSent > 0 ? (totalClicked / totalSent) * 100 : 0;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Analytics de Email</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Emails Enviados"
          value={totalSent.toLocaleString()}
          icon={Send}
          color="blue"
        />
        <StatCard
          title="Tasa de Apertura"
          value={`${overallOpenRate.toFixed(1)}%`}
          icon={Mail}
          color="green"
        />
        <StatCard
          title="Tasa de Clicks"
          value={`${overallClickRate.toFixed(1)}%`}
          icon={Target}
          color="purple"
        />
        <StatCard
          title="Secuencias Activas"
          value={sequences.filter(s => s.isActive).length}
          icon={Zap}
          color="emerald"
        />
      </div>

      {/* Campaign Performance */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Rendimiento por Campaña</h4>
        <div className="space-y-3">
          {campaigns.slice(0, 10).map(campaign => {
            const openRate = campaign.stats.sent > 0 ? (campaign.stats.opened / campaign.stats.sent) * 100 : 0;
            const clickRate = campaign.stats.sent > 0 ? (campaign.stats.clicked / campaign.stats.sent) * 100 : 0;
            
            return (
              <div key={campaign.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                  <p className="text-xs text-gray-500">{campaign.stats.sent} enviados</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{openRate.toFixed(1)}% apertura</p>
                  <p className="text-xs text-gray-500">{clickRate.toFixed(1)}% clicks</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Utility Components
function StatCard({ title, value, icon: Icon, color, trend }: any) {
  const colorClasses = {
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

function QuickActionCard({ title, description, icon: Icon, color, onClick }: any) {
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    purple: 'bg-purple-500 hover:bg-purple-600'
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full p-6 rounded-xl text-white text-left transition-colors',
        colorClasses[color]
      )}
    >
      <Icon className="w-8 h-8 mb-3" />
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-sm opacity-90">{description}</p>
    </button>
  );
}