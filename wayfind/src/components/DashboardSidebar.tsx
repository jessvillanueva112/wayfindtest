"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Users, MessageCircle, Gift, User, Star, CalendarDays } from 'lucide-react';

const navItems = [
  { name: 'Events', href: '/dashboard/events', icon: CalendarDays },
  { name: 'Community', href: '/dashboard/community', icon: Users },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageCircle },
  { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
  { name: 'Rewards', href: '/dashboard/rewards', icon: Star },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <aside className="h-full w-64 bg-white border-r shadow-sm flex flex-col py-8 px-4 min-h-screen">
      <div className="mb-8 text-2xl font-bold text-blue-700 tracking-tight">Wayfind</div>
      <nav className="flex flex-col gap-2">
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors hover:bg-blue-50 hover:text-blue-700 ${pathname.startsWith(href) ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
          >
            <Icon className="w-5 h-5" />
            <span>{name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
} 