"use client";
import DashboardSidebar from '@/components/DashboardSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 bg-gradient-to-br from-blue-50 to-white p-8">{children}</div>
    </div>
  );
} 