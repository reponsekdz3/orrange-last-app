import React, { useContext } from 'react';
import { Page } from '../types';
import { AppContext } from '../App';

const NavItem: React.FC<{ icon: React.ReactNode; label: string; page: Page; }> = ({ icon, label, page }) => {
    const { page: currentPage, setPage } = useContext(AppContext);
    const isActive = currentPage === page;

    return (
        <button onClick={() => setPage(page)} className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-orange-100'}`}>
            {icon}
            <span className="ml-3 font-semibold">{label}</span>
        </button>
    );
};


const DashboardIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const RoutesIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>;
const BusesIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" /></svg>;
const SchedulesIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ReportsIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const SettingsIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;


export const OperatorSidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-white shadow-md flex-shrink-0 hidden lg:block">
            <div className="p-6">
                <div className="relative mb-6">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input type="text" placeholder="Search..." className="w-full h-10 pl-10 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-orange-500" />
                </div>
                <nav className="space-y-2">
                    <NavItem icon={<DashboardIcon />} label="Dashboard" page="OPERATOR_DASHBOARD" />
                    <NavItem icon={<RoutesIcon />} label="Routes" page="OPERATOR_ROUTES" />
                    <NavItem icon={<BusesIcon />} label="Buses" page="OPERATOR_BUSES" />
                    <NavItem icon={<SchedulesIcon />} label="Schedules" page="OPERATOR_SCHEDULES" />
                    <NavItem icon={<ReportsIcon />} label="Reports" page="OPERATOR_REPORTS" />
                    <NavItem icon={<SettingsIcon />} label="Settings" page="OPERATOR_SETTINGS" />
                </nav>
            </div>
        </aside>
    );
};