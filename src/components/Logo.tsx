import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'simple' | 'full';
  textColor?: string;
}

const Logo = ({ className = "h-12", variant = 'simple', textColor = "text-black dark:text-white/80" }: LogoProps) => {
  return (
    <div className={`flex flex-col ${variant === 'full' ? 'items-start' : 'items-start'} gap-2`}>
      <div className={`relative flex items-center ${className}`}>
        {/* Official Brand Logo Image */}
        <Image 
          src="/assets/wplogo.png" 
          alt="Hi Wood" 
          width={120}
          height={48}
          className="h-full w-auto object-contain"
          priority
        />
      </div>

      {variant === 'full' && (
        <div className="mt-1 flex flex-col items-start">
          <p className={`text-[10px] md:text-xs font-bold ${textColor} tracking-[0.2em] uppercase border-t border-black/10 dark:border-white/10 pt-1`}>
            Timber Solutions & Custom Designs
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;
