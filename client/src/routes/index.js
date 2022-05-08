import React from 'react';
import authRoutes from "./auth.routes";
import NotFound from "../components/layout/NotFound";
import dashboardRoutes from "./dashboard";
const routes = [
    ...dashboardRoutes,
    ...authRoutes,
    {
        path: '*',
        element: <NotFound />,
        private: false,
    }

]

export default routes;