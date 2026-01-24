"use client";
import NoticeForm from '@/components/admin/NoticeForm';

export default function AdminNoticesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Notices</h1>
      <NoticeForm />
      {/* List of existing notices would go here */}
    </div>
  );
}
