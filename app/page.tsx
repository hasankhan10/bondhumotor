import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Battery, PenSquare } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Reviews } from "@/components/Reviews";
import { EMICalculator } from "@/components/EMICalculator";

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* 
        ================================================================
        SEO H1 BLOCK (Visually Hidden but accessible) ensures strict 
        exact-match keywords are the first H1 the crawler sees. 
        ================================================================
      */}
      <h1 className="sr-only">
        Best electric scooty near me - Official TARMAC Dealer in Dholahat & Jumainaskar, South 24 Parganas.
      </h1>

      {/* Hero Section */}
      <section className="relative min-h-[75svh] md:min-h-[90vh] flex items-center justify-center pt-28 pb-20 md:pt-20 md:pb-32 overflow-hidden px-4 bg-[#0A0D14]">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/5 to-transparent">
          <Image 
            src="/main brand.jpeg" 
            alt="Bondhu Motor Tarmac Electric Scooty" 
            fill 
            className="object-cover opacity-80 object-[30%_center] md:object-center" 
            priority
          />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-blue/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-green/30 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto relative z-10 text-center flex flex-col items-center justify-end md:justify-center max-w-5xl h-full pb-8 md:pb-0">
          <div className="hidden md:flex flex-col items-center w-full">
            <div className="px-4 py-1.5 rounded-full bg-white/5 border border-brand-green/30 text-sm font-medium mb-8 text-brand-green tracking-wide shadow-glow-green">
              TARMAC Exclusive Showroom
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight leading-tight mb-6 text-white">
              Ride The Future. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">
                Zero Emissions.
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl leading-relaxed">
              Looking for the <strong className="font-semibold text-white">best electric scooty in Jumainaskar</strong> or Dholahat? Experience the ultimate ride with top-tier Tarmac electric scooters. Best price guarantee and easy EMI available.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-auto md:mt-0 pt-8 md:pt-0">
            <Link
              href="/products"
              className="px-8 py-4 rounded-full bg-brand-blue text-white font-bold hover:bg-brand-blue/80 hover:shadow-glow-blue transition-all flex items-center justify-center gap-2 group"
            >
              Explore Tarmac
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 backdrop-blur-md transition-all flex items-center justify-center border border-white/10"
            >
              Book Free Test Ride
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4 bg-card-bg">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-text-primary">
              Best <span className="text-brand-blue">Tarmac Models</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Handpicked electric vehicles designed for range, performance, and durability on our roads. If you are searching for the <strong className="font-medium text-text-body">best electric scooty near me</strong>, you are at the right place.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 text-brand-blue hover:text-brand-green font-semibold group transition-colors"
            >
              View All Tarmac Scooters <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* NEW: Reviews Section */}
      <Reviews />

      {/* NEW: Global EMI Calculator Section */}
      <section className="py-24 px-4 bg-background relative border-y border-card-border">
         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-1/2 bg-brand-blue/5 blur-[120px] pointer-events-none" />
         <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
               <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-text-primary">
                 Plan Your <span className="text-brand-blue">Purchase</span>
               </h2>
               <p className="text-lg text-text-muted mb-8 leading-relaxed">
                 We make owning a Tarmac electric scooter affordable for everyone in West Bengal. Use our real-time calculator to estimate your monthly EMI based on your preferred down payment. 
               </p>
               <ul className="space-y-4 mb-8">
                 {[
                   "Flexible loan tenures (12 to 36 months)",
                   "Minimal paperwork needed",
                   "Quick rural approvals in South 24 Parganas"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-text-primary font-medium">
                     <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
                     {item}
                   </li>
                 ))}
               </ul>
            </div>
            
            {/* We pass a standard base price for the global estimator */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue/20 to-brand-green/20 blur-xl rounded-full opacity-50 pointer-events-none" />
              <div className="relative z-10 shadow-2xl rounded-3xl overflow-hidden">
                <EMICalculator price={120000} />
              </div>
            </div>
         </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 bg-card-bg relative">
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-text-primary">
              Why <span className="text-brand-green">Bondhu Motor?</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              We are the top-rated destination for the <strong className="font-medium text-text-primary">best electric scooty in Dholahat</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Exclusive TARMAC Dealer", desc: "100% genuine products directly from TARMAC." },
              { icon: PenSquare, title: "Easy EMI", desc: "Instant loan approvals with minimal down payment." },
              { icon: CheckCircle2, title: "Free Test Ride", desc: "Experience the scooter before you make a decision." },
              { icon: Battery, title: "After-Sales Support", desc: "Dedicated service team for all maintenance needs." },
              { icon: CheckCircle2, title: "Best Price Guarantee", desc: "Unmatched pricing across South 24 Parganas." },
              { icon: CheckCircle2, title: "Subsidy Assistance", desc: "We handle the paperwork for state EV subsidies." }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-card-bg rounded-2xl flex items-center justify-center mb-6 border border-card-border">
                  <feature.icon className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-3 text-text-primary">{feature.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="py-24 px-4 bg-card-bg border-y border-brand-green/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-brand-green/10 blur-[100px] pointer-events-none" />
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 tracking-tight text-text-primary">
            Have Questions? Let's <span className="text-[#25D366]">WhatsApp!</span>
          </h2>
          <p className="text-text-muted font-medium mb-10 max-w-xl mx-auto">
            Our EV experts are available to guide you. Message us for latest prices, offers, and immediate queries.
          </p>
          <a
            href="https://wa.me/916297944059?text=Hi,%20I%20am%20looking%20for%20the%20best%20electric%20scooty."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:shadow-[0_0_40px_rgba(37,211,102,0.5)]"
          >
            Chat with us on WhatsApp
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-text-primary">Frequently Asked Questions</h2>
            <p className="text-text-muted">Everything you need to know about buying a Tarmac EV at Bondhu Motor.</p>
          </div>
          <FAQAccordion />
        </div>
      </section>

    </div>
  );
}
