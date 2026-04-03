'use client';

import { useEffect, useState, useMemo } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { learnDb } from '@/firebase/learnConfig';
import { 
  TrendingUp, Users, BookOpen, Award, Loader2, 
  FileText, Briefcase, PlayCircle, Layers, Globe
} from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area
} from 'recharts';

interface AnalyticsData {
  totalUsers: number;
  totalApplications: number;
  enrolledStudents: number;
  totalResources: number;
  totalArticles: number;
  averageProgress: number;
  applicationsByTrack: Array<{ name: string; value: number }>;
  applicationsByStatus: Array<{ name: string; value: number }>;
  resourceDistribution: Array<{ name: string; value: number }>;
  userGrowth: Array<{ date: string; count: number }>;
  progressDistribution: Array<{ name: string; count: number }>;
  topPerformers: Array<{ name: string; progress: number; userId: string }>;
}

const COLORS = ['#CC2630', '#ea2a33', '#fca5a5', '#7f1d1d', '#ef4444', '#b91c1c'];
const STATUS_COLORS = {
  pending: '#fbbf24',
  accepted: '#10b981',
  rejected: '#f87171'
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      const [usersSnap, appsSnap, progressSnap, resourcesSnap, articlesSnap] = await Promise.all([
        getDocs(collection(learnDb, 'users')),
        getDocs(collection(learnDb, 'applications')),
        getDocs(collection(learnDb, 'progress')),
        getDocs(collection(learnDb, 'resources')),
        getDocs(collection(learnDb, 'Article')),
      ]);

      const users = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      const applications = appsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      const progressDocs = progressSnap.docs.map(doc => ({ userId: doc.id, ...doc.data() as any }));
      const resources = resourcesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      const articles = articlesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));

      const enrolledStudents = users.filter((u: any) => u.role === 'enrolled').length;

      // Applications by track (Pie Chart Data)
      const trackCounts = applications.reduce((acc: any, app: any) => {
        const track = app.track || 'Other';
        acc[track] = (acc[track] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const trackData = Object.entries(trackCounts).map(([name, value]) => ({ name, value: value as number }));

      // Applications by status (Pie Chart Data)
      const statusCounts = applications.reduce((acc: any, app: any) => {
        const status = app.status || 'pending';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, { pending: 0, accepted: 0, rejected: 0 });

      const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value: value as number }));

      // Resource Distribution (Bar Chart Data)
      const resourceCounts = resources.reduce((acc: any, res: any) => {
        const type = res.type || 'Other';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const resourceData = Object.entries(resourceCounts).map(([name, value]) => ({ name, value: value as number }));

      // User Growth (Line Chart Data)
      // Group users by creation date
      const growthMap = users.reduce((acc: any, user: any) => {
        const date = user.createdAt?.toDate ? user.createdAt.toDate().toLocaleDateString() : 'Unknown';
        if (date !== 'Unknown') {
          acc[date] = (acc[date] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      const growthData = Object.entries(growthMap)
        .map(([date, count]) => ({ date, count: count as number }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(-30); // Last 30 dates

      // Progress distribution
      const distributionMap = progressDocs.reduce((acc: any, p: any) => {
        const progress = p.overallProgress || 0;
        if (progress <= 25) acc['0-25%'] = (acc['0-25%'] || 0) + 1;
        else if (progress <= 50) acc['26-50%'] = (acc['26-50%'] || 0) + 1;
        else if (progress <= 75) acc['51-75%'] = (acc['51-75%'] || 0) + 1;
        else acc['76-100%'] = (acc['76-100%'] || 0) + 1;
        return acc;
      }, { '0-25%': 0, '26-50%': 0, '51-75%': 0, '76-100%': 0 });

      const distributionData = Object.entries(distributionMap).map(([name, count]) => ({ name, count: count as number }));

      // Average progress
      const totalProgressValue = progressDocs.reduce((sum: number, p: any) => sum + (p.overallProgress || 0), 0);
      const avgProgress = progressDocs.length > 0 ? Math.round(totalProgressValue / progressDocs.length) : 0;

      // Top performers
      const performers = progressDocs
        .map((p: any) => {
          const foundUser = users.find((u: any) => u.id === p.userId);
          return {
            userId: p.userId,
            name: (foundUser as any)?.fullName || 'Unknown',
            progress: p.overallProgress || 0,
          };
        })
        .sort((a, b) => b.progress - a.progress)
        .slice(0, 5);

      setData({
        totalUsers: users.length,
        totalApplications: applications.length,
        enrolledStudents,
        totalResources: resources.length,
        totalArticles: articles.length,
        averageProgress: avgProgress,
        applicationsByTrack: trackData,
        applicationsByStatus: statusData,
        resourceDistribution: resourceData,
        userGrowth: growthData,
        progressDistribution: distributionData,
        topPerformers: performers,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 size={48} className="text-[#ea2a33] animate-spin mx-auto mb-4" />
          <p className="text-[#b89d9f]">Synthesizing platform intelligence...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="p-8 pb-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-[#CC2630]/10 rounded-lg">
            <TrendingUp size={24} className="text-[#CC2630]" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Platform Intelligence</h1>
        </div>
        <p className="text-[#b89d9f] text-lg">Comprehensive insights across the ASN ecosystem</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">
        <StatsCard
          title="Total Users"
          value={data.totalUsers}
          icon={Users}
          description="Ecosystem growth"
        />
        <StatsCard
          title="Applications"
          value={data.totalApplications}
          icon={BookOpen}
          description="ASAP Funnel status"
        />
        <StatsCard
          title="Resources"
          value={data.totalResources}
          icon={Layers}
          description="Content library size"
        />
        <StatsCard
          title="Articles"
          value={data.totalArticles}
          icon={FileText}
          description="Blog engine activity"
        />
        <StatsCard
          title="Avg. Progress"
          value={`${data.averageProgress}%`}
          icon={Award}
          description="Learning completion rate"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* User Growth Trend */}
        <div className="lg:col-span-2 bg-[#201617]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Registration Trends</h2>
            <div className="flex items-center gap-2 text-xs font-bold text-[#b89d9f] uppercase tracking-wider">
              <div className="w-3 h-3 rounded-full bg-[#CC2630]" />
              New Signups
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.userGrowth}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CC2630" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#CC2630" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#5e494a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#5e494a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1314', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#CC2630" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Application Status Funnel */}
        <div className="bg-[#201617]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-8">ASAP Funnel</h2>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.applicationsByStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {data.applicationsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={(STATUS_COLORS as any)[entry.name] || '#333'} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1314', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-black text-white">{data.totalApplications}</span>
              <span className="text-xs font-bold text-[#b89d9f] uppercase">Apps</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {data.applicationsByStatus.map((item) => (
              <div key={item.name} className="text-center">
                <p className="text-xs font-bold text-[#b89d9f] uppercase mb-1">{item.name}</p>
                <p className="text-xl font-black text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Track Popularity */}
        <div className="bg-[#201617]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-8">Track Popularity</h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.applicationsByTrack} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#fff" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  width={100}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1a1314', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {data.applicationsByTrack.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resource Distribution */}
        <div className="bg-[#201617]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-8">Content Ecosystem</h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.resourceDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#5e494a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                   stroke="#5e494a" 
                   fontSize={12} 
                   tickLine={false} 
                   axisLine={false}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1a1314', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="value" fill="#CC2630" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Progress Histogram */}
        <div className="bg-[#201617]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Skill Progression</h2>
            <div className="text-xs font-bold text-[#b89d9f] uppercase">Global Distribution</div>
          </div>
          <div className="space-y-6">
            {data.progressDistribution.map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-[#b89d9f]">{item.name} completion</span>
                  <span className="text-sm font-black text-white">{item.count} students</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#CC2630] rounded-full transition-all duration-1000"
                    style={{ width: `${data.enrolledStudents > 0 ? (item.count / data.enrolledStudents) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers (Hall of Fame) */}
        <div className="bg-[#201617]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-8">Hall of Fame</h2>
          <div className="space-y-4">
            {data.topPerformers.length > 0 ? (
              data.topPerformers.map((performer, index) => (
                <div key={performer.userId} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${
                    index === 0 ? 'bg-amber-500 text-white' :
                    index === 1 ? 'bg-slate-400 text-white' :
                    index === 2 ? 'bg-amber-700 text-white' :
                    'bg-white/10 text-white/50'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-lg">{performer.name}</p>
                    <p className="text-xs text-[#b89d9f] font-medium">Verified Learner</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-emerald-400 font-black text-xl">
                      <span>{performer.progress}</span>
                      <span className="text-sm">%</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center py-10">
                <p className="text-[#b89d9f] font-medium">Gathering stellar performances...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
