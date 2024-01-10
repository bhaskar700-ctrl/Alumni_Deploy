import React from 'react';

const PictureGallerySection = () => {
    const images = [
        'https://source.unsplash.com/random/800x600',
        'https://source.unsplash.com/random/800x601',
        'https://source.unsplash.com/random/800x602',
        // Add more image paths here
    ];
    

    return (
        <section className="p-8">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {images.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                        <img src={image} alt={`Gallery ${index}`} className="w-full h-auto object-cover"/>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PictureGallerySection;
