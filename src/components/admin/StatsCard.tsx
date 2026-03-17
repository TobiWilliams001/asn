import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  description?: string;
}

export default function StatsCard({ title, value, icon: Icon, trend, description }: StatsCardProps) {
  return (
    <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6 hover:border-[#533c3d] transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#ea2a33]/10 flex items-center justify-center">
          <Icon size={24} className="text-[#ea2a33]" />
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            trend.isPositive 
              ? 'bg-emerald-500/10 text-emerald-400' 
              : 'bg-red-500/10 text-red-400'
          }`}>
            {trend.isPositive ? '+' : ''}{trend.value}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">{title}</p>
        <p className="text-3xl font-black text-white mb-1">{value}</p>
        {description && (
          <p className="text-xs text-[#b89d9f]">{description}</p>
        )}
      </div>
    </div>
  );
}
