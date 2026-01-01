import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* School Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">S.E.C. Railway Hr. Sec. School</h3>
            <p className="text-sm leading-relaxed mb-4">
              Providing quality education and fostering holistic development since inception. Affiliated with CBSE.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/admission" className="hover:text-white transition-colors">Admissions</Link></li>
              <li><Link href="/academics" className="hover:text-white transition-colors">Academics</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/public-disclosure" className="hover:text-white transition-colors">Mandatory Disclosure</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 shrink-0 text-primary-400" />
                <span>Near Bilaspur Railway Station, Budhwari Bazar, Bilaspur – 495004 (C.G.)</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 shrink-0 text-primary-400" />
                <span>07752-242506 / 9752876606</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 shrink-0 text-primary-400" />
                <span>pplhmbsp@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Map/Extra */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Locate Us</h3>
            <div className="bg-gray-800 h-32 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500">[Google Map Placeholder]</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} S.E.C. Railway Hr. Sec. School No. 2. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
