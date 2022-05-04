import React from 'react';
import { useRoutes } from "react-router-dom";
import NotFound from "../components/layout/NotFound";
import authRoutes from "./auth.routes";
function AppRoutes() {
    const routes =  useRoutes([
        ...authRoutes,
        { path: '*', element: <NotFound />}
    ]);
    return routes;
}

export default AppRoutes;