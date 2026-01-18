import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, FileSpreadsheet, UserCheck, Menu } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/vacancies', label: 'Vacantes', icon: Briefcase },
        { path: '/evaluations', label: 'Evaluaciones', icon: FileSpreadsheet },
        { path: '/onboarding', label: 'Onboarding', icon: UserCheck },
    ];

    return (
        <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col fixed left-0 top-0 z-50">
            <div className="p-6 border-b border-slate-100 flex flex-col items-center justify-center space-y-2">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg"
                    alt="Coca-Cola"
                    className="h-8 w-auto object-contain"
                />
                <span className="text-sm font-medium tracking-widest text-slate-500 uppercase">Recruiting Hub</span>
            </div>

            <nav className="flex-1 py-6 space-y-1 px-3">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? 'bg-red-600 text-white shadow-lg shadow-red-900/20'
                                : 'text-slate-500 hover:bg-red-50 hover:text-red-700'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 border-t border-slate-100">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-700">
                        JD
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-900">Jane Doe</p>
                        <p className="text-xs text-slate-500">HR Manager</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

const Header = () => {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 ml-64">
            <h1 className="text-xl font-semibold text-slate-800">Portal de Selección</h1>
            <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-500">20 de Noviembre, 2025</span>
            </div>
        </header>
    );
};

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-64">
                <Header />
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
