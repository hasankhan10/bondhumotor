import Image from "next/image";
import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, Zap, Handshake } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Bondhu Motor and Electric",
  description: "Learn about Bondhu Motor and Electric, South 24 Parganas' most trusted authorised dealer for premium EV scooters.",
};

export default function AboutPage() {
  return (
    <div className="w-full">
      
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 px-4 min-h-[60svh] md:min-h-[70vh] flex flex-col justify-center bg-[#070A11] text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black/50">
          <Image 
            src="/about.jpeg" 
            alt="Bondhu Motor About Us" 
            fill 
            className="object-cover md:opacity-75 opacity-80 object-[43%_100%] md:object-[center_90%]" 
            priority
          />
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/20 blur-[100px] pointer-events-none z-0" />
        <div className="container mx-auto max-w-4xl relative z-10 hidden md:block">
          <h1 className="text-5xl md:text-7xl font-black font-heading mb-6 text-white">
            Driving The <span className="text-brand-blue text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">Change</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Bondhu Motor and Electric was founded with a single mission: to accelerate the adoption of sustainable mobility in West Bengal by providing the best electric scooters and unmatched after-sales service.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 px-4">
         <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <span className="text-brand-green font-bold tracking-widest uppercase text-sm">Our Story</span>
                <h2 className="text-3xl md:text-5xl font-bold font-heading">
                  Rooted in South 24 Parganas
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Located in the heart of Jumainaskar Hat, we recognized the growing need for high-quality, reliable electric vehicles in our region. Instead of offering just one brand, we brought together the finest EV manufacturers under one roof.
                </p>
                <p className="text-text-muted leading-relaxed">
                  Today, we stand as the premier exclusive authorised dealer for TARMAC electric vehicles. We don't just sell scooters; we handhold our customers through the entire transition to electric—from navigating subsidies to setting up home charging.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group mb-6">
                  <Image src="/owner.jpeg" alt="Miraz Laskar - Bondhu Motor Owner" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" />
                </div>
                <div className="text-center md:text-left pl-2">
                  <h3 className="text-2xl md:text-3xl font-bold font-heading text-text-primary">Miraz Laskar</h3>
                  <p className="text-brand-green font-semibold uppercase tracking-widest text-xs mt-1">Founder & Owner</p>
                </div>
              </div>
            </div>
         </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-card-bg px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-16">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
               { icon: ShieldCheck, title: "Trust & Transparency", desc: "No hidden charges, honest assessments of range and performance." },
               { icon: Zap, title: "Future Ready", desc: "Offering only vehicles that boast the latest battery and software tech." },
               { icon: Handshake, title: "Customer First", desc: "A dedicated team specifically for regular maintenance and warranty claims." },
               { icon: CheckCircle2, title: "Sustainability", desc: "Promoting zero-emission travel for a cleaner, greener West Bengal." }
            ].map((v, i) => (
              <div key={i} className="flex gap-6 items-start p-8 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-brand-blue/10 flex items-center justify-center">
                  <v.icon className="w-6 h-6 text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading mb-2">{v.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Showroom Gallery */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-blue font-bold tracking-widest uppercase text-sm">Tour</span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mt-2 text-text-primary">Our Showroom</h2>
            <p className="text-text-muted mt-4 max-w-2xl mx-auto">Step inside Bondhu Motor to explore the stunning lineup of Tarmac EVs.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div 
                key={num} 
                className={`relative rounded-2xl overflow-hidden group ${
                  num === 1 || num === 4 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                }`}
              >
                <Image 
                  src={`/showpic${num}.jpeg`} 
                  alt={`Bondhu Motor Showroom ${num}`} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
