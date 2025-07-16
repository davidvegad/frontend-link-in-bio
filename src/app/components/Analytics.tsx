'use client';

import React, { useEffect, useState } from 'react';

interface LinkAnalyticsData {
  id: number;
  title: string;
  url: string;
  clicks: number;
}

interface AnalyticsData {
  total_views: number;
  total_clicks: number;
  links_data: LinkAnalyticsData[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const AnalyticsCard = ({ title, value, change }: { title: string; value: string | number; change?: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h4 className="text-gray-500 text-sm font-medium mb-2">{title}</h4>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
    {change && <p className="text-green-500 text-sm mt-1">{change} vs. el último mes</p>}
  </div>
);

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          setError('No authentication token found.');
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/api/linkinbio/profiles/me/analytics/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch analytics: ${response.statusText}`);
        }

        const data: AnalyticsData = await response.json();
        setAnalyticsData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch analytics.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando estadísticas...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  const ctr = analyticsData && analyticsData.total_views > 0
    ? ((analyticsData.total_clicks / analyticsData.total_views) * 100).toFixed(2) + '%'
    : '0.00%';

  return (
    <section id="analytics-section" className="space-y-8">
      <div className="text-center p-6 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h2 className="text-2xl font-semibold text-indigo-800">Estadísticas de tu Perfil</h2>
          <p className="text-indigo-600 mt-2">
              Aquí puedes ver el rendimiento de tu perfil y enlaces.
          </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard title="Vistas del Perfil" value={analyticsData?.total_views.toLocaleString() || 0} />
        <AnalyticsCard title="Total de Clics" value={analyticsData?.total_clicks.toLocaleString() || 0} />
        <AnalyticsCard title="Click-Through Rate (CTR)" value={ctr} />
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Vistas en los últimos 30 días</h3>
        <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
          <p className="text-gray-500">[Gráfico de analíticas próximamente]</p>
        </div>
      </div>

      {/* Top Links Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Enlaces con más clics</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título del Enlace
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clics
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyticsData?.links_data.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-sm text-gray-500 text-center">
                    No hay datos de clics disponibles.
                  </td>
                </tr>
              ) : (
                analyticsData?.links_data.map((link) => (
                  <tr key={link.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{link.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{link.url}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">
                      {link.clicks}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
