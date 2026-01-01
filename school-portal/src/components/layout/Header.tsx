"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, role, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Admissions', href: '/admission' },
    { name: 'Academics', href: '/academics' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-primary-700 text-white p-2 rounded-lg font-bold text-xl">
              SECR
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-primary-900 leading-tight">
                S.E.C. Railway Hr. Sec. School No. 2
              </h1>
              <p className="text-xs text-gray-500">Bilaspur, Chhattisgarh</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
               <div className="relative group">
                 <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                   <User className="w-5 h-5" />
                   <span className="capitalize">{role}</span>
                 </button>
                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block border border-gray-100">
                   <Link href={`/${role}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                   <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
                 </div>
               </div>
            ) : (
              <Link
                href="/login"
                className="bg-primary-600 text-white px-5 py-2 rounded-full font-medium hover:bg-primary-700 transition-colors shadow-sm"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 mt-2">
              {user ? (
                 <>
                  <Link href={`/${role}`} className="block px-3 py-3 text-base font-medium text-primary-600" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-red-600">
                    Logout
                  </button>
                 </>
              ) : (
                <Link
                  href="/login"
                  className="block w-full text-center bg-primary-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-primary-700"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
