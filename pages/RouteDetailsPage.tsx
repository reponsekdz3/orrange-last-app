// This page is no longer needed as the flow goes from FindBus -> SeatSelection.
// The contents have been removed to avoid confusion.
// Keeping the file to prevent import errors in case it's referenced elsewhere,
// but it should be considered deprecated.
import React from 'react';

const RouteDetailsPage: React.FC = () => {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold">This page is deprecated.</h1>
            <p>Please use the Find Bus page to select a route and proceed to seat selection.</p>
        </div>
    );
}

export { RouteDetailsPage };
