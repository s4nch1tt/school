"use client";
import { Users, BookOpen, GraduationCap, Bell } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Students</p>
            <p className="text-2xl font-bold text-gray-800">1,245</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Teachers</p>
            <p className="text-2xl font-bold text-gray-800">48</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
            <Bell className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Notices</p>
            <p className="text-2xl font-bold text-gray-800">12</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Classes</p>
            <p className="text-2xl font-bold text-gray-800">12</p>
          </div>
        </div>
      </div>

      {/* Recent Activity / Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
             <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-all text-left">
               <span className="font-semibold block text-primary-700">+ Add Student</span>
               <span className="text-xs text-gray-500">Register a new student</span>
             </button>
             <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-all text-left">
               <span className="font-semibold block text-primary-700">+ Add Teacher</span>
               <span className="text-xs text-gray-500">Onboard new faculty</span>
             </button>
             <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-all text-left">
               <span className="font-semibold block text-primary-700">+ Post Notice</span>
               <span className="text-xs text-gray-500">Announce to school</span>
             </button>
             <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-all text-left">
               <span className="font-semibold block text-primary-700">Upload Result</span>
               <span className="text-xs text-gray-500">Publish exam marks</span>
             </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Notices</h3>
          <div className="space-y-4">
             {[1, 2, 3].map(i => (
               <div key={i} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                  <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 mr-4">
                    1{i} Oct
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">School Closed on Account of Festival</h4>
                    <p className="text-sm text-gray-500 line-clamp-1">The school will remain closed on 1{i}th October due to...</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
