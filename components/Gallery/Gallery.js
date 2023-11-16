import React from 'react';
import PhotoAlbum from 'react-photo-album';

const Gallery = () => {
  const photos = [
    {
      src: '/gallery/photo-4.jpeg',
      width: 800,
      height: 600,
      srcSet: [
        { src: '/gallery/photo-4.jpeg', width: 400, height: 300 },
        { src: '/gallery/photo-4.jpeg', width: 200, height: 150 },
      ],
    },
    {
      src: '/gallery/photo-3.jpeg',
      width: 1600,
      height: 900,
      srcSet: [
        { src: '/gallery/photo-3.jpeg', width: 800, height: 450 },
        { src: '/gallery/photo-3.jpeg', width: 400, height: 225 },
      ],
    },
    {
      src: '/gallery/photo-2.jpeg',
      width: 1600,
      height: 900,
      srcSet: [
        { src: '/gallery/photo-2.jpeg', width: 800, height: 450 },
        { src: '/gallery/photo-2.jpeg', width: 400, height: 225 },
      ],
    },
    {
      src: '/gallery/photo-1.jpeg',
      width: 800,
      height: 600,
      srcSet: [
        { src: '/gallery/photo-1.jpeg', width: 400, height: 300 },
        { src: '/gallery/photo-1.jpeg', width: 200, height: 150 },
      ],
    },
    {
      src: '/gallery/photo-4.jpeg',
      width: 800,
      height: 600,
      srcSet: [
        { src: '/gallery/photo-4.jpeg', width: 400, height: 300 },
        { src: '/gallery/photo-4.jpeg', width: 200, height: 150 },
      ],
    },
    {
      src: '/gallery/photo-3.jpeg',
      width: 1600,
      height: 900,
      srcSet: [
        { src: '/gallery/photo-3.jpeg', width: 800, height: 450 },
        { src: '/gallery/photo-3.jpeg', width: 400, height: 225 },
      ],
    },

    {
      src: '/gallery/photo-2.jpeg',
      width: 1600,
      height: 900,
      srcSet: [
        { src: '/gallery/photo-2.jpeg', width: 800, height: 450 },
        { src: '/gallery/photo-2.jpeg', width: 400, height: 225 },
      ],
    },
    {
      src: '/gallery/photo-1.jpeg',
      width: 800,
      height: 600,
      srcSet: [
        { src: '/gallery/photo-1.jpeg', width: 400, height: 300 },
        { src: '/gallery/photo-1.jpeg', width: 200, height: 150 },
      ],
    },
    {
      src: '/gallery/photo-2.jpeg',
      width: 1600,
      height: 900,
      srcSet: [
        { src: '/gallery/photo-2.jpeg', width: 800, height: 450 },
        { src: '/gallery/photo-2.jpeg', width: 400, height: 225 },
      ],
    },
    {
      src: '/gallery/photo-3.jpeg',
      width: 1600,
      height: 900,
      srcSet: [
        { src: '/gallery/photo-3.jpeg', width: 800, height: 450 },
        { src: '/gallery/photo-3.jpeg', width: 400, height: 225 },
      ],
    },
    {
      src: '/gallery/photo-4.jpeg',
      width: 800,
      height: 600,
      srcSet: [
        { src: '/gallery/photo-4.jpeg', width: 400, height: 300 },
        { src: '/gallery/photo-4.jpeg', width: 200, height: 150 },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20 pt-5">
      <h2 className="text-center text-4xl font-bold font-heading mb-8 mt-12 text-headerMain	">
        Team Data Solutions Image gallery
      </h2>
      <PhotoAlbum layout="rows" photos={photos} />
    </div>
  );
};

export default Gallery;
