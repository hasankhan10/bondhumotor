import type { Metadata } from "next";
import { MessageCircle, MapPin, Clock, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us & Showroom Location | Bondhu Motor",
  description: "Visit Bondhu Motor and Electric showroom at Jumainaskar Hat, South 24 Parganas. Book a test ride or get details on latest EV prices.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black font-heading tracking-tight mb-4">
          Contact <span className="text-brand-green">Us</span>
        </h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          We're here to help you make the shift to electric. Drop by our showroom or send us a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-8">
          
          <div className="glass-card p-6 md:p-8 rounded-3xl border-brand-green/20">
            <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-6">
              <MessageCircle className="w-6 h-6 text-[#25D366]" />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-2">WhatsApp Us</h3>
            <p className="text-text-muted mb-6 text-sm">
              Get instant replies for pricing, EMI options, and availability. No calls waiting, just direct answers.
            </p>
            <a
              href="https://wa.me/916297944059?text=Hi,%20I%20would%20like%20to%20book%20a%20test%20ride."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-6 py-4 bg-[#25D366] text-gray-900 font-bold rounded-xl hover:bg-[#1EBE61] transition-colors shadow-lg shadow-[#25D366]/20"
            >
              Message on WhatsApp
            </a>
          </div>

          <div className="glass-card p-6 md:p-8 rounded-3xl border-white/10 flex items-start gap-4">
             <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 flex items-center justify-center mt-1">
               <PhoneCall className="w-5 h-5 text-brand-blue" />
             </div>
             <div>
                <h4 className="font-bold text-lg mb-1">Direct Calling</h4>
                <p className="text-text-muted text-sm mb-2">Available during office hours</p>
                <a href="tel:+916297944059" className="text-xl font-mono font-semibold text-brand-blue hover:text-brand-green transition-colors">+91 6297 944 059</a>
             </div>
          </div>
          
          <div className="glass-card p-6 md:p-8 rounded-3xl border-white/10 flex items-start gap-4">
             <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 flex items-center justify-center mt-1">
               <Clock className="w-5 h-5 text-text-primary" />
             </div>
             <div>
                <h4 className="font-bold text-lg mb-1">Showroom Hours</h4>
                <p className="text-text-muted text-sm">Monday to Sunday<br/>08:00 AM – 08:00 PM</p>
                <p className="text-brand-green text-xs mt-2 font-semibold">Open All Week</p>
             </div>
          </div>

        </div>

        {/* Map / Address */}
        <div className="flex flex-col">
           <div className="glass-card p-6 md:p-8 rounded-[2rem] border-white/10 h-full flex flex-col">
              <div className="flex items-start gap-4 mb-6">
                 <div className="w-12 h-12 shrink-0 rounded-full bg-brand-blue/10 flex items-center justify-center">
                   <MapPin className="w-6 h-6 text-brand-blue" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold font-heading mb-2">Address</h3>
                    <p className="text-text-muted leading-relaxed">
                       Bondhu Motor and Electric<br/>
                       Jumainaskar Hat,<br/>
                       South 24 Parganas,<br/>
                       West Bengal, India
                    </p>
                 </div>
              </div>
              
              <iframe 
                src="https://maps.google.com/maps?q=Bondhu+Motor+and+Electric,+Jumainaskar+Hat,+South+24+Parganas,+West+Bengal&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: "350px" }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full flex-1 rounded-2xl overflow-hidden shadow-inner border border-card-border"
              />
           </div>
        </div>

      </div>
    </div>
  );
}
