import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardSidebar = () => {
    // Define your navigation items
    const navItems = [
        { name: 'Profile', href: '/profile', icon: 'icon-path' }, // Replace icon-path with actual paths
        { name: 'Events', href: '/events', icon: 'icon-path' },
        { name: 'News', href: '/news', icon: 'icon-path' },
        { name: 'Jobs', href: '/jobs', icon: 'icon-path' },
        { name: 'Messaging', href: '/messages', icon: 'icon-path' },
        { name: 'Forums', href: '/forums', icon: 'icon-path' },
        // Add other navigation items here
    ];

    return (
        <aside className="w-64" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.href}
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-blue-600"
                                activeClassName="bg-blue-500 dark:bg-blue-600"
                            >
                                <img src={item.icon} alt={item.name} className="w-6 h-6" />
                                <span className="ml-3">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
