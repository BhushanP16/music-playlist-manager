import { Music } from 'lucide-react';
import { gradientFor } from '../utils/format';

const sizes = {
  sm: 'h-11 w-11 rounded-xl',
  md: 'h-12 w-12 rounded-xl',
  lg: 'h-14 w-14 rounded-2xl',
  xl: 'h-20 w-20 rounded-2xl sm:h-24 sm:w-24 sm:rounded-3xl',
};

export default function Cover({ seed, size = 'md', icon: Icon = Music, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`grid shrink-0 place-items-center text-white/90 shadow-lg shadow-black/30 ${sizes[size]} ${className}`}
      style={{ background: gradientFor(seed) }}
    >
      <Icon className="h-1/2 w-1/2" />
    </div>
  );
}