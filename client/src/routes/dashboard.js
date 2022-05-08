
import React from 'react';
import Dashboard from "../components/dashboard/Dashboard";
import PrivateRoute from "../components/PrivateRoute";

const dashboardRoutes = [
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        private: true,
    },
];


export default dashboardRoutes;