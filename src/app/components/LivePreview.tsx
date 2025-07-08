'use client';

import React from 'react';
import Image from 'next/image'; // Import Image component

interface LivePreviewProps {
  profileSlug: string;
  name: string;
  bio: string;
  avatar: string | null; // avatar can be a URL string or null
}

const LivePreview: React.FC<LivePreviewProps> = ({ profileSlug, name, bio, avatar }) => {
  // We no longer need publicUrl for the iframe, but keeping profileSlug for potential future use
  // const publicUrl = `${window.location.origin}/${profileSlug}`;

  return (
    <div className="w-full h-full border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white flex flex-col items-center justify-center p-4">
      <div className="relative mb-4">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={128}
            height={128}
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-md"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-4xl font-bold">
            {name ? name.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">{name}</h2>
      <p className="text-gray-600 text-center px-4">{bio}</p>
      {/* You can add a button or other elements here if needed, e.g., for social links */}
    </div>
  );
};

export default LivePreview;