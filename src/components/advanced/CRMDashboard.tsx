'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  TrendingUp,
  DollarSign,
  Mail,
  Phone,
  Building,
  Tag,
  Calendar,
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Activity,
  Target,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { crmService, Contact, Lead, Activity as CRMActivity, CRMAnalytics } from '@/lib/crm-integration';

interface CRMDashboardProps {
  className?: string;
}

export default function CRMDashboard({ className }: CRMDashboardProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activities, setActivities] = useState<CRMActivity[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts' | 'leads' | 'activities' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | Contact['status']>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      setContacts(crmService.getAllContacts());
      setLeads(Array.from(crmService['leads'].values()));
      setActivities(Array.from(crmService['activities'].values()));
    } catch (error) {
      console.error('Failed to load CRM data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = !searchQuery || 
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || contact.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalContacts: contacts.length,
    totalLeads: leads.length,
    conversionRate: crmService.getConversionRate(),
    pipelineValue: crmService.getTotalPipelineValue(),
    newContactsThisWeek: contacts.filter(c => 
      new Date(c.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
    ).length,
    hotLeads: contacts.filter(c => c.status === 'hot').length
  };

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: BarChart3 },
    { id: 'contacts', label: 'Contactos', icon: Users },
    { id: 'leads', label: 'Leads', icon: Target },
    { id: 'activities', label: 'Actividades', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className={cn('bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden', className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <Users className="w-7 h-7 mr-3" />
              CRM Dashboard
            </h2>
            <p className="text-blue-100 mt-1">Gestiona tus contactos y leads</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </button>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center font-medium">
              <UserPlus className="w-4 h-4 mr-2" />
              Nuevo Contacto
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
                    ? 'border-blue-500 text-blue-600'
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
          <OverviewTab stats={stats} contacts={contacts} leads={leads} />
        )}
        
        {activeTab === 'contacts' && (
          <ContactsTab
            contacts={filteredContacts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            selectedContact={selectedContact}
            setSelectedContact={setSelectedContact}
            onContactUpdate={loadData}
          />
        )}
        
        {activeTab === 'leads' && (
          <LeadsTab leads={leads} contacts={contacts} onLeadUpdate={loadData} />
        )}
        
        {activeTab === 'activities' && (
          <ActivitiesTab activities={activities} contacts={contacts} />
        )}
        
        {activeTab === 'analytics' && (
          <AnalyticsTab contacts={contacts} leads={leads} />
        )}
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ stats, contacts, leads }: { stats: any, contacts: Contact[], leads: Lead[] }) {
  const recentContacts = contacts
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentLeads = leads
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Contactos"
          value={stats.totalContacts}
          icon={Users}
          color="blue"
          trend="+12%"
        />
        <StatCard
          title="Leads Activos"
          value={stats.totalLeads}
          icon={Target}
          color="green"
          trend="+8%"
        />
        <StatCard
          title="Tasa Conversión"
          value={`${stats.conversionRate.toFixed(1)}%`}
          icon={TrendingUp}
          color="purple"
          trend="+2.3%"
        />
        <StatCard
          title="Pipeline Value"
          value={`$${stats.pipelineValue.toLocaleString()}`}
          icon={DollarSign}
          color="emerald"
          trend="+15%"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contactos Recientes</h3>
          <div className="space-y-3">
            {recentContacts.map(contact => (
              <div key={contact.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {contact.firstName?.[0] || contact.email[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {contact.firstName} {contact.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{contact.email}</p>
                  </div>
                </div>
                <span className={cn(
                  'px-2 py-1 rounded-full text-xs font-medium',
                  {
                    'bg-gray-100 text-gray-800': contact.status === 'cold',
                    'bg-yellow-100 text-yellow-800': contact.status === 'warm',
                    'bg-red-100 text-red-800': contact.status === 'hot',
                    'bg-green-100 text-green-800': contact.status === 'customer'
                  }
                )}>
                  {contact.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads por Etapa</h3>
          <div className="space-y-3">
            {Object.entries(crmService.getLeadsByStage()).map(([stage, count]) => (
              <div key={stage} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize">{stage}</span>
                <span className="text-sm font-medium text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Contacts Tab Component
function ContactsTab({
  contacts,
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  selectedContact,
  setSelectedContact,
  onContactUpdate
}: {
  contacts: Contact[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: 'all' | Contact['status'];
  setFilterStatus: (status: 'all' | Contact['status']) => void;
  selectedContact: Contact | null;
  setSelectedContact: (contact: Contact | null) => void;
  onContactUpdate: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar contactos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Todos los estados</option>
          <option value="cold">Frío</option>
          <option value="warm">Tibio</option>
          <option value="hot">Caliente</option>
          <option value="customer">Cliente</option>
          <option value="churned">Perdido</option>
        </select>
      </div>

      {/* Contacts Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Empresa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lead Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Última Interacción
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {contact.firstName?.[0] || contact.email[0].toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {contact.firstName} {contact.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{contact.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {contact.company || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                    {
                      'bg-gray-100 text-gray-800': contact.status === 'cold',
                      'bg-yellow-100 text-yellow-800': contact.status === 'warm',
                      'bg-red-100 text-red-800': contact.status === 'hot',
                      'bg-green-100 text-green-800': contact.status === 'customer',
                      'bg-gray-100 text-gray-800': contact.status === 'churned'
                    }
                  )}>
                    {contact.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${contact.leadScore}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{contact.leadScore}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(contact.lastInteraction).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedContact(contact)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <ContactDetailModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onUpdate={onContactUpdate}
        />
      )}
    </div>
  );
}

// Leads Tab Component
function LeadsTab({ leads, contacts, onLeadUpdate }: { leads: Lead[], contacts: Contact[], onLeadUpdate: () => void }) {
  const getContactName = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    return contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Pipeline de Ventas</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Lead
        </button>
      </div>

      {/* Pipeline Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        {['awareness', 'interest', 'consideration', 'intent', 'evaluation', 'purchase'].map(stage => {
          const stageLeads = leads.filter(lead => lead.stage === stage);
          const stageValue = stageLeads.reduce((sum, lead) => sum + (lead.value || 0), 0);
          
          return (
            <div key={stage} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium text-gray-900 capitalize">{stage}</h4>
                <span className="text-xs text-gray-500">{stageLeads.length}</span>
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                ${stageValue.toLocaleString()}
              </div>
              
              <div className="space-y-2">
                {stageLeads.slice(0, 3).map(lead => (
                  <div key={lead.id} className="bg-white p-2 rounded border text-xs">
                    <div className="font-medium">{getContactName(lead.contactId)}</div>
                    <div className="text-gray-500">${lead.value?.toLocaleString()}</div>
                  </div>
                ))}
                {stageLeads.length > 3 && (
                  <div className="text-xs text-gray-500 text-center">
                    +{stageLeads.length - 3} más
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Activities Tab Component
function ActivitiesTab({ activities, contacts }: { activities: CRMActivity[], contacts: Contact[] }) {
  const recentActivities = activities
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 20);

  const getContactName = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    return contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown';
  };

  const getActivityIcon = (type: CRMActivity['type']) => {
    switch (type) {
      case 'email': return Mail;
      case 'call': return Phone;
      case 'meeting': return Calendar;
      case 'note': return Edit;
      case 'task': return CheckCircle;
      default: return Activity;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Actividades Recientes</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Actividad
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        {recentActivities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div key={activity.id} className={cn(
              'p-4 flex items-start space-x-3',
              index !== recentActivities.length - 1 && 'border-b border-gray-200'
            )}>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon className="w-4 h-4 text-blue-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <time className="text-xs text-gray-500">
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {getContactName(activity.contactId)}
                </p>
                {activity.description && (
                  <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Analytics Tab Component
function AnalyticsTab({ contacts, leads }: { contacts: Contact[], leads: Lead[] }) {
  const contactsByStatus = crmService.getContactsByStatus();
  const leadsByStage = crmService.getLeadsByStage();
  const sourceAnalytics = crmService.getLeadSourceAnalytics();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Analytics y Reportes</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Contactos por Estado</h4>
          <div className="space-y-3">
            {Object.entries(contactsByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize">{status}</span>
                <span className="text-sm font-medium text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Fuentes de Leads</h4>
          <div className="space-y-3">
            {Object.entries(sourceAnalytics).map(([source, count]) => (
              <div key={source} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{source}</span>
                <span className="text-sm font-medium text-gray-900">{count}</span>
              </div>
            ))}
          </div>
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

function ContactDetailModal({ contact, onClose, onUpdate }: any) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Detalle del Contacto</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {contact.firstName?.[0] || contact.email[0].toUpperCase()}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {contact.firstName} {contact.lastName}
                </h4>
                <p className="text-gray-600">{contact.email}</p>
                <p className="text-sm text-gray-500">{contact.company}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <p className="text-sm text-gray-900">{contact.phone || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Lead Score</label>
                <p className="text-sm text-gray-900">{contact.leadScore}/100</p>
              </div>
            </div>

            {contact.notes && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Notas</label>
                <p className="text-sm text-gray-900">{contact.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}