// src/components/FeaturesSection/FeaturesSection.js

import React from 'react';

const FeaturesSection = () => {
    const features = [
        {
            title: 'Networking Opportunities',
            description: 'Connect with alumni across the globe and expand your professional network.',
            icon: 'https://files.oaiusercontent.com/file-1WuAd5cbSgzmZ772qgeZX7LE?se=2024-01-09T08%3A45%3A28Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Dd0b410f8-1822-4621-aafd-1af913265066.webp&sig=C2CCliVYAVm9AgNS7FUCuWUr/aqmjqgjtijXOjSHo34%3D', // Replace with your icon path
        },
        {
            title: 'Job Board',
            description: 'Access exclusive job listings and career opportunities.',
            icon: 'https://files.oaiusercontent.com/file-3Vo3qTr3r5TWP7wo4tVX0EQg?se=2024-01-09T08%3A45%3A45Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D59cc364d-3395-45a9-98ad-9a5d6ad0e2df.webp&sig=CxeHz2oJS9wp1/9TJixKK6TdO1pw6l2GxBu%2ByodLrNI%3D', // Replace with your icon path
        },
        {
            title: 'Event Calendar',
            description: 'Stay updated with alumni events, reunions, and webinars.',
            icon: 'https://files.oaiusercontent.com/file-pDWHtep84SQXfthBSwt0Dvzf?se=2024-01-09T08%3A46%3A33Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Db68868f8-7331-4bce-b42f-4c61e01b3ddd.webp&sig=Gavk4U2UQDHbIJU4NRGKrZ/mPyvM1vwIcFfpRwupSuk%3D', // Replace with your icon path
        },
        {
            title: 'Forums',
            description: 'Engage in discussions, share knowledge, and stay connected with the alumni community.',
            icon: 'https://files.oaiusercontent.com/file-x9LXTrPJAjT5vuqJOBkJIOfZ?se=2024-01-09T08%3A46%3A41Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D08a3815a-da09-4bdd-a2c4-4f6c28c311c4.webp&sig=9WpsHup4inRg1npHfmFLs2hPBdl8XNZwdWNqIiIwaAw%3D', // Replace with your icon for forums
        },
        // Add more features as needed
    ];

    return (
        <section className="p-8 bg-white">
            <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-100">
                        <img className="w-full h-40 object-cover" src={feature.icon} alt={feature.title} />
                        <div className="p-6">
                            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                            <p className="text-gray-700 text-base">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
