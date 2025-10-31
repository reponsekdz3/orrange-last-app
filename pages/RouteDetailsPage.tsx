// This page is deprecated and its functionality is now handled by pages/RouteStopsPage.tsx.
// The file is kept to prevent potential import errors but should not be used.
import React from 'react';

const DeprecatedRouteDetailsPage: React.FC = () => {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold">This page is deprecated.</h1>
            <p>Please use the Find Bus page to select a route and proceed to seat selection or view route stops.</p>
        </div>
    );
}

export { DeprecatedRouteDetailsPage as RouteDetailsPage };
