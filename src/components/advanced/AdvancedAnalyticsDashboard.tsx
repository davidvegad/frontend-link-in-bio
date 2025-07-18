'use client';

import { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Target,
  DollarSign,
  Activity,
  Globe,
  Smartphone,
  Calendar,
  Filter,
  Download,
  Share,
  Settings,
  Plus,
  Zap,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { advancedAnalyticsService, FunnelAnalysis, Report } from '@/lib/advanced-analytics';

interface AdvancedAnalyticsDashboardProps {
  className?: string;
}

export default function AdvancedAnalyticsDashboard({ className }: AdvancedAnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'funnel' | 'cohort' | 'reports' | 'realtime'>('overview');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'custom'>('30d');
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const [engagementMetrics, setEngagementMetrics] = useState<any>(null);
  const [revenueMetrics, setRevenueMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
    
    // Set up real-time updates
    const interval = setInterval(() => {
      if (activeTab === 'realtime') {
        loadRealTimeData();
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [dateRange, activeTab]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    try {
      const range = getDateRange(dateRange);
      
      const [engagement, revenue, realTime] = await Promise.all([
        advancedAnalyticsService.calculateEngagementMetrics(range),
        advancedAnalyticsService.calculateRevenueMetrics(range),
        advancedAnalyticsService.getRealTimeData(30)
      ]);

      setEngagementMetrics(engagement);
      setRevenueMetrics(revenue);
      setRealTimeData(realTime);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRealTimeData = async () => {
    try {
      const data = advancedAnalyticsService.getRealTimeData(30);
      setRealTimeData(data);
    } catch (error) {
      console.error('Failed to load real-time data:', error);
    }
  };

  const getDateRange = (range: string) => {
    const end = new Date();
    const start = new Date();
    
    switch (range) {
      case '7d':
        start.setDate(end.getDate() - 7);
        break;
      case '30d':
        start.setDate(end.getDate() - 30);
        break;
      case '90d':
        start.setDate(end.getDate() - 90);
        break;
      default:
        start.setDate(end.getDate() - 30);
    }
    
    return { start, end };
  };

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: BarChart3 },
    { id: 'funnel', label: 'Funnels', icon: Target },
    { id: 'cohort', label: 'Cohortes', icon: Users },
    { id: 'reports', label: 'Reportes', icon: LineChart },
    { id: 'realtime', label: 'Tiempo Real', icon: Activity }
  ];

  return (
    <div className={cn('bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden', className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <BarChart3 className="w-7 h-7 mr-3" />
              Analytics Avanzados
            </h2>
            <p className="text-indigo-100 mt-1">Análisis detallado de tu audiencia y rendimiento</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="bg-white/20 border border-white/30 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="90d">Últimos 90 días</option>
            </select>
            
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </button>
            
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors flex items-center font-medium">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Reporte
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
                    ? 'border-indigo-500 text-indigo-600'
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
            engagementMetrics={engagementMetrics}
            revenueMetrics={revenueMetrics}
            realTimeData={realTimeData}
            isLoading={isLoading}
          />
        )}
        
        {activeTab === 'funnel' && <FunnelTab />}
        {activeTab === 'cohort' && <CohortTab />}
        {activeTab === 'reports' && <ReportsTab />}
        {activeTab === 'realtime' && <RealTimeTab realTimeData={realTimeData} />}
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ 
  engagementMetrics, 
  revenueMetrics, 
  realTimeData, 
  isLoading 
}: { 
  engagementMetrics: any, 
  revenueMetrics: any, 
  realTimeData: any, 
  isLoading: boolean 
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Usuarios Únicos"
          value={engagementMetrics?.totalUsers?.toLocaleString() || '0'}
          change={12.5}
          icon={Users}
          color="blue"
        />
        <MetricCard
          title="Sesiones"
          value={engagementMetrics?.totalSessions?.toLocaleString() || '0'}
          change={8.2}
          icon={Activity}
          color="green"
        />
        <MetricCard
          title="Tasa de Rebote"
          value={`${engagementMetrics?.bounceRate?.toFixed(1) || '0'}%`}
          change={-3.1}
          icon={ArrowDownRight}
          color="red"
          isPercentage
        />
        <MetricCard
          title="Duración Promedio"
          value={`${Math.floor(engagementMetrics?.avgSessionDuration / 60 || 0)}:${String(Math.floor(engagementMetrics?.avgSessionDuration % 60 || 0)).padStart(2, '0')}`}
          change={15.3}
          icon={Clock}
          color="purple"
        />
      </div>

      {/* Revenue Metrics */}
      {revenueMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Ingresos Totales"
            value={`$${revenueMetrics.totalRevenue?.toLocaleString() || '0'}`}
            change={25.4}
            icon={DollarSign}
            color="emerald"
          />
          <MetricCard
            title="Transacciones"
            value={revenueMetrics.transactions?.toLocaleString() || '0'}
            change={18.7}
            icon={Target}
            color="indigo"
          />
          <MetricCard
            title="Valor Promedio"
            value={`$${revenueMetrics.avgOrderValue?.toFixed(2) || '0'}`}
            change={5.2}
            icon={TrendingUp}
            color="pink"
          />
        </div>
      )}

      {/* Charts and Additional Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Páginas Más Visitadas</h3>
          <div className="space-y-3">
            {realTimeData?.topPages?.slice(0, 5).map((page: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                  <span className="text-sm font-medium text-gray-900 truncate ml-2">
                    {page.page}
                  </span>
                </div>
                <span className="text-sm text-gray-600">{page.views} vistas</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dispositivos</h3>
          <div className="space-y-4">
            {Object.entries(realTimeData?.deviceBreakdown || {}).map(([device, count]: [string, any]) => {
              const total = Object.values(realTimeData?.deviceBreakdown || {}).reduce((sum: number, val: any) => sum + val, 0);
              const percentage = total > 0 ? (count / total) * 100 : 0;
              
              return (
                <div key={device} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                      <Smartphone className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 capitalize">{device}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{count}</div>
                    <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fuentes de Tráfico</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {realTimeData?.topReferrers?.slice(0, 6).map((referrer: any, index: number) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {referrer.referrer === 'Direct' ? 'Directo' : referrer.referrer}
                  </p>
                  <p className="text-xs text-gray-500">Visitas</p>
                </div>
                <span className="text-lg font-bold text-indigo-600">{referrer.visits}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Funnel Tab Component
function FunnelTab() {
  const [funnels, setFunnels] = useState<any[]>([]);
  const [selectedFunnel, setSelectedFunnel] = useState<string | null>(null);
  const [funnelAnalysis, setFunnelAnalysis] = useState<FunnelAnalysis | null>(null);

  useEffect(() => {
    // Load funnels from service
    const loadedFunnels = Array.from(advancedAnalyticsService['funnels'].values());
    setFunnels(loadedFunnels);
  }, []);

  const analyzeFunnel = (funnelId: string) => {
    const analysis = advancedAnalyticsService.analyzeFunnel(funnelId);
    setFunnelAnalysis(analysis);
    setSelectedFunnel(funnelId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Análisis de Funnels</h3>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Crear Funnel
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Funnel List */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Funnels Disponibles</h4>
          <div className="space-y-3">
            {funnels.map(funnel => (
              <button
                key={funnel.id}
                onClick={() => analyzeFunnel(funnel.id)}
                className={cn(
                  'w-full text-left p-3 rounded-lg border transition-colors',
                  selectedFunnel === funnel.id
                    ? 'bg-white border-indigo-500 text-indigo-700'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                )}
              >
                <div className="font-medium">{funnel.name}</div>
                <div className="text-sm text-gray-500">{funnel.steps.length} pasos</div>
              </button>
            ))}
          </div>
        </div>

        {/* Funnel Analysis */}
        <div className="lg:col-span-2">
          {funnelAnalysis ? (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Análisis del Funnel</h4>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{funnelAnalysis.totalUsers}</div>
                    <div className="text-sm text-gray-500">Usuarios Totales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {funnelAnalysis.overallConversionRate.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-500">Conversión Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      {funnelAnalysis.stepData[funnelAnalysis.stepData.length - 1]?.users || 0}
                    </div>
                    <div className="text-sm text-gray-500">Conversiones</div>
                  </div>
                </div>

                {/* Funnel Steps */}
                <div className="space-y-4">
                  {funnelAnalysis.stepData.map((step, index) => (
                    <div key={step.stepId} className="relative">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium text-gray-900">{step.stepName}</h5>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900">
                                {step.users} usuarios
                              </div>
                              <div className="text-xs text-gray-500">
                                {step.conversionRate.toFixed(1)}% conversión
                              </div>
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mt-2 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{ width: `${(step.users / funnelAnalysis.totalUsers) * 100}%` }}
                            />
                          </div>
                          
                          {step.dropoffRate > 0 && index > 0 && (
                            <div className="mt-1 text-xs text-red-600">
                              {step.dropoffRate.toFixed(1)}% abandono
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {index < funnelAnalysis.stepData.length - 1 && (
                        <div className="ml-4 mt-2 mb-2">
                          <div className="w-px h-6 bg-gray-300"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Selecciona un funnel para ver el análisis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Cohort Tab Component
function CohortTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Análisis de Cohortes</h3>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Cohorte
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Retención de Usuarios</h4>
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Configura cohortes para analizar la retención de usuarios</p>
        </div>
      </div>
    </div>
  );
}

// Reports Tab Component
function ReportsTab() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const loadedReports = Array.from(advancedAnalyticsService['reports'].values());
    setReports(loadedReports);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Reportes Personalizados</h3>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Crear Reporte
        </button>
      </div>

      {reports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map(report => (
            <div key={report.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{report.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                </div>
                <span className={cn(
                  'px-2 py-1 rounded-full text-xs font-medium',
                  report.type === 'dashboard' && 'bg-blue-100 text-blue-800',
                  report.type === 'funnel' && 'bg-green-100 text-green-800',
                  report.type === 'custom' && 'bg-purple-100 text-purple-800'
                )}>
                  {report.type}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Creado: {new Date(report.createdAt).toLocaleDateString()}</span>
                <div className="flex space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-800">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
                    <Share className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No hay reportes creados aún</p>
          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Crear mi primer reporte
          </button>
        </div>
      )}
    </div>
  );
}

// Real Time Tab Component
function RealTimeTab({ realTimeData }: { realTimeData: any }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Actividad en Tiempo Real</h3>
        <div className="flex items-center text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Actualizando cada 30 segundos
        </div>
      </div>

      {/* Real-time metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Usuarios Activos"
          value={realTimeData?.uniqueVisitors?.toString() || '0'}
          icon={Users}
          color="green"
          isRealTime
        />
        <MetricCard
          title="Páginas Vistas"
          value={realTimeData?.pageViews?.toString() || '0'}
          icon={Eye}
          color="blue"
          isRealTime
        />
        <MetricCard
          title="Eventos Totales"
          value={realTimeData?.totalEvents?.toString() || '0'}
          icon={Activity}
          color="purple"
          isRealTime
        />
        <MetricCard
          title="Conversiones"
          value={realTimeData?.conversions?.toString() || '0'}
          icon={Target}
          color="emerald"
          isRealTime
        />
      </div>

      {/* Real-time activity feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Páginas Activas</h4>
          <div className="space-y-3">
            {realTimeData?.topPages?.slice(0, 8).map((page: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-900 truncate">{page.page}</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">{page.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Ubicaciones</h4>
          <div className="space-y-3">
            {realTimeData?.locationBreakdown?.slice(0, 8).map((location: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Globe className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">{location.country}</span>
                </div>
                <span className="text-sm text-gray-600">{location.visits}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility Components
type ColorKey = 'blue' | 'green' | 'red' | 'purple' | 'emerald' | 'indigo' | 'pink';

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ComponentType<{ className?: string }>;
  color: ColorKey;
  isPercentage?: boolean;
  isRealTime?: boolean;
}

function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color, 
  isPercentage = false, 
  isRealTime = false 
}: MetricCardProps) {
  const colorClasses: Record<ColorKey, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    emerald: 'bg-emerald-500',
    indigo: 'bg-indigo-500',
    pink: 'bg-pink-500'
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change !== undefined && !isRealTime && (
            <p className={cn(
              'text-sm mt-1 flex items-center',
              change >= 0 ? 'text-green-600' : 'text-red-600'
            )}>
              {change >= 0 ? (
                <ArrowUpRight className="w-3 h-3 mr-1" />
              ) : (
                <ArrowDownRight className="w-3 h-3 mr-1" />
              )}
              {Math.abs(change)}% vs mes anterior
            </p>
          )}
          {isRealTime && (
            <p className="text-sm text-gray-500 mt-1 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              En vivo
            </p>
          )}
        </div>
        <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', colorClasses[color])}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}