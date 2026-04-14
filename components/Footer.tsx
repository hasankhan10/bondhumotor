import { MessageCircle, MapPin, Clock, Phone, Mail } from "lucide-react";


export function Footer() {
  return (
    <footer className="bg-card-bg border-t border-card-border mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-2xl tracking-wide">
              BONDHU <span className="text-gradient">MOTOR</span>
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Your trusted authorished dealer for premium electric scooters in South 24 Parganas. Serving you with top brands, easy EMI, and zero-emission mobility.
            </p>
          </div>

          {/* Contact Col */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-text-primary">Contact Us</h4>
            <div className="space-y-3">
              <a href="https://wa.me/916297944059" className="flex items-center gap-3 text-sm text-text-muted hover:text-brand-green transition-colors">
                <MessageCircle className="w-4 h-4 text-brand-green" />
                <span>+91 6297 944 059</span>
              </a>
                <span>Jumainaskar Hat,<br />South 24 Parganas,<br />West Bengal, India</span>
              </div>
              <a href="mailto:bondhumotorandelectronic@gmail.com" className="flex items-center gap-3 text-sm text-text-muted hover:text-brand-blue transition-colors">
                <Mail className="w-4 h-4 text-brand-blue" />
                <span className="break-all">bondhumotorandelectronic@gmail.com</span>
              </a>

              <div className="flex items-center gap-3 text-sm text-text-muted">
                <Clock className="w-4 h-4 text-brand-blue" />
                <span>Mon - Sun: 08:00 AM - 08:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-text-primary">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "All Scooters", href: "/products" },
                { label: "About Us", href: "/about" },
                { label: "Contact & Maps", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted hover:text-brand-blue transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-text-primary">Brands Available</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>TARMAC Electric</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-card-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-text-muted text-center md:text-left gap-4">
          <p>&copy; {new Date().getFullYear()} Bondhu Motor and Electric. All rights reserved.</p>
          <p>
            Designed exclusively for South 24 Parganas | Developed by <a href="https://stovamedia.in" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:text-brand-green transition-colors font-semibold">Stova Media</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
