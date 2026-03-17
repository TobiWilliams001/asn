interface ProgressBarProps {
  progress: number;
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  variant?: 'default' | 'success';
}

export default function ProgressBar({
  progress,
  height = 'md',
  showLabel = false,
  className = '',
  variant = 'default',
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));
  const heights = { sm: 'h-1', md: 'h-1.5', lg: 'h-2' };

  const fillColor =
    variant === 'success'
      ? 'bg-gradient-to-r from-emerald-600 to-emerald-400'
      : 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33]';

  const glowColor =
    variant === 'success'
      ? '0 0 8px rgba(34,197,94,0.35)'
      : '0 0 8px rgba(234,42,51,0.4)';

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-[#b89d9f] uppercase tracking-widest">
            Progress
          </span>
          <span className="text-xs font-black text-white">{Math.round(clamped)}%</span>
        </div>
      )}
      {/* Track uses design system bg, not arbitrary white opacity */}
      <div className={`w-full bg-[#382929] rounded-full overflow-hidden ${heights[height]}`}>
        <div
          className={`h-full ${fillColor} rounded-full transition-all duration-700 ease-out`}
          style={{
            width: `${clamped}%`,
            boxShadow: clamped > 0 ? glowColor : 'none',
          }}
        />
      </div>
    </div>
  );
}