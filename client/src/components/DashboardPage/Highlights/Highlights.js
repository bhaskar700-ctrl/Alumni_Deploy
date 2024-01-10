import React from 'react';
// Import any icons or additional components if needed

const Highlights = () => {
    // Placeholder data, replace with actual data fetching logic
    const highlightStats = [
        { label: 'Active Members', value: '1,024' },
        { label: 'Jobs Posted', value: '76' },
        { label: 'Events This Year', value: '12' },
        { label: 'Projects Funded', value: '33' },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Highlights</h3>
            <div className="grid grid-cols-2 gap-4">
                {highlightStats.map((stat, index) => (
                    <div key={index} className="highlight-stat">
                        <div className="text-lg text-gray-600">{stat.label}</div>
                        <div className="text-xl font-bold text-indigo-600">{stat.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Highlights;
