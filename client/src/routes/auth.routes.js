import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

export const login = { path: "/login", element: <Login /> };
export const register = { path: '/register', element: <Register />} ;

const AuthRoutes = [
    login,
    register
];
export default AuthRoutes;