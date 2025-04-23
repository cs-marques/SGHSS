import React from 'react';
import { Heart, PlusCircle } from 'lucide-react';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white';
}

const Logo: React.FC<LogoProps> = ({ className = '', variant = 'default' }) => {
  const textColor = variant === 'white' ? 'text-white' : 'text-gray-800';
  const gradientFrom = variant === 'white' ? 'from-sky-500' : 'from-sky-500';
  const gradientTo = variant === 'white' ? 'to-sky-400' : 'to-sky-400';
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`relative bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white p-3.5 rounded-2xl shadow-lg flex items-center gap-2 group transition-all duration-300 hover:shadow-sky-200`}>
        <Heart 
          size={24} 
          className="text-white transition-transform duration-300 group-hover:scale-110" 
          fill="rgba(255,255,255,0.2)" 
          strokeWidth={2.5}
        />
        <PlusCircle 
          size={16} 
          className={`absolute -top-1 -right-1 ${variant === 'white' ? 'text-sky-400 bg-white' : 'text-sky-400 bg-white'} rounded-full transition-transform duration-300 group-hover:rotate-180`} 
        />
      </div>
      <div className={`ml-3 text-xl font-bold ${textColor} flex items-center tracking-tight`}>
        {variant === 'white' ? (
          <span className="text-white">VidaPlus</span>
        ) : (
          <>
            Vida<span className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>Plus</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Logo;