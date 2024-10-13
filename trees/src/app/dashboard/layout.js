// File: src/app/dashboard/layout.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTree, FaCalendarAlt, FaUsers, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const links = [
    { href: '/dashboard', icon: FaTree, label: 'Dashboard' },
    { href: '/dashboard/events', icon: FaCalendarAlt, label: 'Manage Events' },
    { href: '/dashboard/users', icon: FaUsers, label: 'Manage Users' },
  ];

  return (
    <div className={`bg-green-800 text-white h-screen fixed top-0 left-0 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-0 md:w-16'} overflow-x-hidden`}>
      <div className="flex justify-end p-4 md:hidden">
        <button onClick={toggleSidebar} className="text-white">
          <FaTimes size={24} />
        </button>
      </div>
      <nav className="mt-8">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={`flex items-center p-4 hover:bg-green-700 ${pathname === link.href ? 'bg-green-700' : ''}`}>
            <link.icon className="mr-4" size={24} />
            <span className={`${isOpen ? 'block' : 'hidden md:block'}`}></span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button onClick={toggleSidebar} className="text-green-800 md:hidden">
            <FaBars size={24} />
          </button>
          <h1 className="text-2xl font-bold text-green-800">TreeVerse Dashboard</h1>
          <div>{/* Add user menu or logout button here */}</div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}