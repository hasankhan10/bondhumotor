import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Battery, PenSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/ProductCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Reviews } from "@/components/Reviews";
import { EMICalculator } from "@/components/EMICalculator";
import Script from "next/script";
import { cn } from "@/lib/utils";


export default async function Home() {
  const supabase = await createClient();
  
  // Fetch Featured Products
  const { data: featuredProducts } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .order("display_order", { ascending: true })
    .limit(3);

  // Fetch Visible Reviews
  const { data: visibleReviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_visible", true)
    .order("display_order", { ascending: true })
    .limit(6);

  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which is the best electric scooty showroom in Dholahat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bondhu Motor and Electronic is the premier electric scooty showroom in the Dholahat and Jumainaskar Hat region, serving as an official TARMAC dealer."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need a driving license for TARMAC electric scooters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Registration and license requirements depend on the model speed. Low-speed models (below 25 kmph) do not require a license, while high-speed TARMAC models do."
        }
      },
      {
        "@type": "Question",
        "name": "Is EMI available for electric scooters at Bondhu Motor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide flexible EMI options with minimal down payments for all electric scooters at our Jumainaskar Hat showroom."
        }
      }
    ]
  };

  return (
    <div className="flex flex-col">
      <Script
        id="home-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      {/* SEO H1 BLOCK */}
      <h1 className="sr-only">
        Bondhu Motor and Electronic - Official TARMAC Dealer. Best electric scooty price in Jumainaskar, Dholahat & South 24 Parganas, West Bengal. Book a test ride for the latest EV models.
      </h1>

      {/* Hero Section */}
      <section className="relative min-h-[75svh] md:min-h-[95vh] flex items-center justify-center pt-28 pb-20 md:pt-20 md:pb-32 overflow-hidden px-4 bg-[#0A0D14]">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 to-transparent">
          <Image 
            src="/main brand.jpeg" 
            alt="Bondhu Motor Tarmac Electric Scooty" 
            fill 
            className="object-cover opacity-80 object-[30%_center] md:object-center" 
            priority
          />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-green/20 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto relative z-10 text-center flex flex-col items-center justify-end md:justify-center max-w-5xl h-full pb-8 md:pb-0">
          <div className="hidden md:flex flex-col items-center w-full">
            <div className="px-5 py-2 rounded-full bg-white/5 border border-brand-green/30 text-[10px] font-black uppercase tracking-widest mb-8 text-brand-green shadow-glow-green/30 backdrop-blur-md">
              TARMAC Exclusive Showroom
            </div>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black font-heading tracking-tight leading-[0.9] mb-10 text-white drop-shadow-2xl">
              Ride The <br />
              <span className="text-gradient">
                Future.
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl leading-relaxed font-medium">
              Looking for the <strong className="font-bold text-white">best electric scooty in Jumainaskar</strong> or Dholahat? Experience the ultimate ride with top-tier Tarmac electric scooters.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-auto md:mt-0 pt-10 md:pt-4">
            <Link
              href="/products"
              className="px-8 py-4 md:px-10 md:py-5 rounded-full bg-brand-blue text-white font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-brand-blue/80 hover:shadow-glow-blue transition-all flex items-center justify-center gap-3 group"
            >
              Explore Tarmac
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 md:px-10 md:py-5 rounded-full bg-white/10 text-white font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-white/20 backdrop-blur-md transition-all flex items-center justify-center border border-white/20 whitespace-nowrap"
            >
              Book Free Test Ride
            </Link>
          </div>

        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="py-24 px-4 bg-card-bg">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black font-heading mb-4 text-text-primary leading-tight">
                Top <span className="text-gradient">Selection</span>
              </h2>
              <p className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed">
                Handpicked electric vehicles designed for range, performance, and durability. Discover why we are the <strong className="font-bold text-text-body">best EV dealership</strong> near you.
              </p>
            </div>
            
            <div className={cn(
              "grid gap-8 justify-center",
              featuredProducts.length === 1 ? "grid-cols-1 max-w-sm mx-auto" : 
              featuredProducts.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto" : 
              "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            )}>
              {featuredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>

            <div className="text-center mt-16 pb-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-brand-blue hover:text-brand-green hover:border-brand-green/30 font-black uppercase tracking-widest text-[10px] sm:text-xs group transition-all"
              >
                View All Tarmac Models <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

      )}

      {/* Reviews Section */}
      <Reviews initialReviews={visibleReviews || []} />

      {/* EMI Section */}
      <section className="py-24 px-4 bg-background relative border-y border-card-border overflow-hidden">
         <div className="absolute right-[-10%] top-1/3 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[150px] pointer-events-none" />
         <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
               <h2 className="text-4xl md:text-6xl font-black font-heading mb-8 text-text-primary leading-tight">
                 Plan Your <br /> <span className="text-gradient">Purchase.</span>
               </h2>
               <p className="text-lg text-text-muted mb-10 leading-relaxed font-medium">
                 We make owning a Tarmac electric scooter affordable for everyone in West Bengal. Use our real-time calculator to estimate your monthly EMI.
               </p>
               <ul className="space-y-5 mb-10">
                 {[
                   "Flexible loan tenures (12 to 36 months)",
                   "Minimal paperwork needed",
                   "Quick rural approvals in South 24 Parganas"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-text-primary font-bold">
                     <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center border border-brand-green/20">
                       <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                     </div>
                     {item}
                   </li>
                 ))}
               </ul>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-brand-blue/20 to-brand-green/20 blur-2xl rounded-[3rem] opacity-40 pointer-events-none animate-pulse" />
              <div className="relative z-10 shadow-2xl rounded-[2.5rem] overflow-hidden border border-white/5">
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
            <h2 className="text-4xl md:text-6xl font-black font-heading mb-4 text-text-primary">
              Why <span className="text-gradient">Bondhu?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Exclusive Dealer", desc: "100% genuine products directly from TARMAC factory." },
              { icon: PenSquare, title: "Easy EMI", desc: "Instant loan approvals with minimal down payment options." },
              { icon: CheckCircle2, title: "Free Test Ride", desc: "Experience the premium ride before you make a decision." },
              { icon: Battery, title: "After-Sales", desc: "Dedicated on-site service team for all maintenance needs." },
              { icon: CheckCircle2, title: "Best Price", desc: "Unmatched wholesale pricing across South 24 Parganas." },
              { icon: CheckCircle2, title: "Subsidy Help", desc: "We handle the full paperwork for state EV subsidies." }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-10 rounded-[2.5rem] hover:-translate-y-2 transition-all duration-500 border border-white/5 hover:border-brand-blue/30 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-brand-blue/10 transition-colors">
                  <feature.icon className="w-7 h-7 text-brand-blue" />
                </div>
                <h3 className="text-2xl font-bold font-heading mb-4 text-text-primary">{feature.title}</h3>
                <p className="text-text-muted text-base leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="py-24 px-4 bg-[#0D1117] border-y border-brand-green/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-brand-green/5 blur-[120px] pointer-events-none" />
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-black font-heading mb-8 tracking-tight text-white leading-tight">
            Have Questions? <br /> Let's <span className="text-[#25D366]">Chat.</span>
          </h2>
          <p className="text-gray-400 font-medium mb-12 max-w-xl mx-auto text-lg leading-relaxed">
            Our EV experts are available to guide you. Message us for latest prices, offers, and immediate queries.
          </p>
          <a
            href="https://wa.me/916297944059?text=Hi,%20I%20am%20looking%20for%20the%20best%20electric%20scooty."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-12 py-6 bg-[#25D366] text-white font-black uppercase tracking-widest text-sm rounded-full hover:scale-105 transition-all shadow-[0_20px_50px_rgba(37,211,102,0.4)]"
          >
            Open WhatsApp
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black font-heading mb-6 text-text-primary tracking-tight">FAQ</h2>
            <div className="w-20 h-1 bg-brand-blue mx-auto rounded-full" />
          </div>
          <div className="max-w-4xl mx-auto">
            <FAQAccordion />
          </div>
        </div>
      </section>

    </div>
  );
}
