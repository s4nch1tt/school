"use client";
import Link from 'next/link';
import { ArrowRight, BookOpen, Award, Users, Calendar } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
            Empowering Minds,<br /> Shaping Futures
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-primary-100">
            S.E.C. Railway Hr. Sec. School No. 2 provides a world-class education rooted in values and excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admission" className="bg-accent text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-500 transition-colors shadow-lg">
              Admissions Open
            </Link>
            <Link href="/about" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-primary-900 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24 relative z-20">
            <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-primary-500">
              <div className="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Academic Excellence</h3>
              <p className="text-gray-600 mb-4">
                Consistently achieving top results with a curriculum designed for holistic development.
              </p>
              <Link href="/academics" className="text-primary-600 font-semibold flex items-center hover:underline">
                Read More <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-accent">
              <div className="bg-yellow-50 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Faculty</h3>
              <p className="text-gray-600 mb-4">
                Highly qualified and dedicated teachers mentoring students to reach their full potential.
              </p>
              <Link href="/staff" className="text-accent font-semibold flex items-center hover:underline">
                Meet Our Team <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-secondary-500">
              <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Co-Curricular</h3>
              <p className="text-gray-600 mb-4">
                A vibrant campus life with sports, arts, and clubs to nurture every talent.
              </p>
              <Link href="/gallery" className="text-secondary-600 font-semibold flex items-center hover:underline">
                Explore Activities <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
              <div className="relative">
                <div className="w-full h-80 bg-gray-300 rounded-lg shadow-lg flex items-center justify-center text-gray-500">
                   {/* Placeholder for Principal Image */}
                   <span>Principal Image</span>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="font-bold text-lg text-primary-900">Sri M.L. Dhruw</p>
                  <p className="text-sm text-gray-500">M.A., B.Ed</p>
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold font-serif mb-6 text-gray-900">Principal&apos;s Message</h2>
              <blockquote className="text-lg text-gray-700 leading-relaxed italic mb-6">
                &quot;Education is not just about learning facts, but about training the mind to think. At S.E.C. Railway Hr. Sec. School No. 2, we strive to create an environment where every student feels valued and inspired to achieve their dreams.&quot;
              </blockquote>
              <div className="md:hidden mb-4">
                 <p className="font-bold text-lg text-primary-900">Sri M.L. Dhruw</p>
                 <p className="text-sm text-gray-500">M.A., B.Ed</p>
              </div>
              <Link href="/principal-message" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-block">
                Read Full Message
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Notices Board */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold font-serif text-gray-900">Latest Notices & Announcements</h2>
             <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Mock Notices - In real app, fetch from Firestore */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Oct {10 + i}, 2024</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">
                    {i === 1 ? 'Annual Sports Day Registration Open' : i === 2 ? 'Parent Teacher Meeting Schedule' : 'Half Yearly Examination Time Table Declared'}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    Please find the details regarding the upcoming event. All students are requested to participate...
                  </p>
                  <Link href="/notices" className="text-primary-600 text-sm font-medium hover:underline">
                    Read Details
                  </Link>
                </div>
              ))}
           </div>
           <div className="text-center mt-10">
             <Link href="/notices" className="inline-flex items-center text-primary-700 font-bold hover:text-primary-900">
               View All Notices <ArrowRight className="w-5 h-5 ml-2" />
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
