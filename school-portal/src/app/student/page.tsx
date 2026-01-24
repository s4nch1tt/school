"use client";
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Book, Calendar, FileText, User } from 'lucide-react';

export default function StudentDashboard() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (role !== 'student') {
        router.push('/');
      }
    }
  }, [user, role, loading, router]);

  if (loading || !user || role !== 'student') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-primary-700 rounded-xl p-8 text-white mb-8 flex flex-col md:flex-row items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, Student</h1>
            <p className="opacity-90">Class X - Section A</p>
         </div>
         <div className="mt-4 md:mt-0 bg-white/20 p-4 rounded-lg backdrop-blur-sm flex items-center">
            <User className="w-8 h-8 mr-3" />
            <div>
              <p className="font-bold text-sm">Admission No</p>
              <p className="text-lg">2024001</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mb-4">
               <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">My Results</h3>
            <p className="text-gray-500 mb-4 text-sm">View academic performance reports.</p>
            <button className="text-blue-600 font-semibold text-sm hover:underline">View Results</button>
         </div>

         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center text-green-600 mb-4">
               <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Attendance</h3>
            <p className="text-gray-500 mb-4 text-sm">Check your daily attendance record.</p>
            <button className="text-green-600 font-semibold text-sm hover:underline">View Attendance</button>
         </div>

         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-purple-50 w-12 h-12 rounded-lg flex items-center justify-center text-purple-600 mb-4">
               <Book className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Assignments</h3>
            <p className="text-gray-500 mb-4 text-sm">Download notes and homework.</p>
            <button className="text-purple-600 font-semibold text-sm hover:underline">View Assignments</button>
         </div>
      </div>
    </div>
  );
}
