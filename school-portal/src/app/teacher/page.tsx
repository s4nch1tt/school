"use client";
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Users, FilePlus, Calendar } from 'lucide-react';

export default function TeacherDashboard() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (role !== 'teacher') {
        router.push('/');
      }
    }
  }, [user, role, loading, router]);

  if (loading || !user || role !== 'teacher') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white border-b pb-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your classes and students.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
           <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-gray-700">My Classes</h3>
             <Users className="text-primary-500 w-5 h-5" />
           </div>
           <p className="text-3xl font-bold text-gray-900">4</p>
           <p className="text-xs text-gray-500 mt-1">Assigned Sections</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
               <button className="w-full flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors text-left">
                  <FilePlus className="w-5 h-5 mr-3 text-primary-600" />
                  <div>
                    <span className="font-semibold block">Upload Marks</span>
                    <span className="text-xs text-gray-500">Enter exam results for your subjects</span>
                  </div>
               </button>
               <button className="w-full flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors text-left">
                  <Calendar className="w-5 h-5 mr-3 text-primary-600" />
                  <div>
                    <span className="font-semibold block">Mark Attendance</span>
                    <span className="text-xs text-gray-500">Daily roll call</span>
                  </div>
               </button>
            </div>
         </div>

         <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Class Schedule (Today)</h3>
            <ul className="space-y-4">
               <li className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="font-bold text-gray-800">Class X - A</p>
                    <p className="text-xs text-gray-500">Mathematics</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">09:00 AM</span>
               </li>
               <li className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="font-bold text-gray-800">Class IX - B</p>
                    <p className="text-xs text-gray-500">Mathematics</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">11:30 AM</span>
               </li>
            </ul>
         </div>
      </div>
    </div>
  );
}
