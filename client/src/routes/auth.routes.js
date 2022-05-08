import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

export const login = { path: "/login", element: <Login />, private: false, };
export const register = { path: '/register', element: <Register />, private: false} ;

const AuthRoutes = [
    login,
    register
];
export default AuthRoutes;