import React from 'react';

interface FeaturePlaceholderProps {
  title: string;
  description?: string;
}

/**
 * Generic placeholder page for upcoming dashboard features.
 * Displays a page title and optional description so we can quickly
 * add new routes without copying bulky demo code from the bolt project.
 */
const FeaturePlaceholder: React.FC<FeaturePlaceholderProps> = ({ title, description }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="max-w-xl text-gray-600">
        {description || 'Fitur ini sedang dalam pembangunan dan akan tersedia segera. Nantikan ya!'}
      </p>
    </div>
  );
};

export default FeaturePlaceholder;