import { Briefcase, Package, Video, FileText } from 'lucide-react';

interface ResourceTypeBadgeProps {
  type: 'job' | 'toolkit' | 'video' | 'article';
  size?: 'sm' | 'md' | 'lg';
}

export default function ResourceTypeBadge({ type, size = 'md' }: ResourceTypeBadgeProps) {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-3 py-1',
    lg: 'text-sm px-4 py-1.5',
  };

  const iconSize = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  const config = {
    job: {
      icon: Briefcase,
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
      label: 'Job',
    },
    toolkit: {
      icon: Package,
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      label: 'Toolkit',
    },
    video: {
      icon: Video,
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      label: 'Video',
    },
    article: {
      icon: FileText,
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      label: 'Article',
    },
  };

  const style = config[type];
  const Icon = style.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-full border ${style.bg} ${style.text} ${style.border} ${sizeClasses[size]}`}>
      <Icon size={iconSize[size]} />
      {style.label}
    </span>
  );
}
