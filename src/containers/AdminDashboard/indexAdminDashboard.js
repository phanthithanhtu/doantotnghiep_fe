import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import "simplebar/src/simplebar.css"; // Import simplebar CSS
import AdminDashboard from './AdminDashboard';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

function indexAdminDashboard() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default indexAdminDashboard;

serviceWorker.unregister(); // Register or unregister service worker as needed

reportWebVitals(console.log); // Log performance metrics or send to analytics endpoint
