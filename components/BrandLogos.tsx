// Adding keyframes in tailwind arbitrary class is clean:
// animate-[scroll_40s_linear_infinite]
export function BrandLogos() {
  const brands = [
    "OLA ELECTRIC",
    "ATHER ENERGY",
    "TVS MOTOR",
    "BAJAJ AUTO",
    "HERO VIDA",
    "AMPERE",
  ];

  // We duplicate the array to allow for seamless infinite scrolling
  const marqueeBrands = [...brands, ...brands, ...brands];

  return (
    <div className="w-full overflow-hidden flex relative py-8 border-y border-white/5 bg-[#03050A]">
      {/* Left and Right fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0E1A] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0E1A] to-transparent z-10 pointer-events-none" />
      
      <div 
        className="flex gap-16 md:gap-32 w-max items-center animate-[scroll_40s_linear_infinite]"
        style={{
          // We can inline the keyframes animation if it's not in tailwind config yet, 
          // but tailwind standard doesn't support inline keyframes.
          // Alternatively, we use CSS module or simply rely on Framer Motion. 
          // Let's rely on standard tailwind if we configure it, or inline styles:
          animation: "var(--marquee-anim, scroll 40s linear infinite)"
        }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-33.333% - 2rem)); }
          }
        `}} />
        
        {marqueeBrands.map((brand, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale select-none"
          >
            <span className="font-heading font-black text-2xl tracking-tighter text-white">
              {brand}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
