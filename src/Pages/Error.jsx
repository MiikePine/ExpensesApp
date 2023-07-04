import React from 'react';
import InfoFilter from '../components/InfoFilter';

function Error() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">404 Not Found</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            The page you are looking for does not exist.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Error;