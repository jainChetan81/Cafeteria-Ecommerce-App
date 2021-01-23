import Dashboard from "../Container/Dashboard";
import Checkout from "../Container/Checkout";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        layout: "/",
    },
    {
        path: "checkout",
        name: "Checkout",
        component: Checkout,
        layout: "/",
    },
];
const authRoutes = [
    {
        path: "/",
        name: "Login",
        component: Login,
        layout: "/",
    },
    {
        path: "signup",
        name: "Signup",
        component: Signup,
        layout: "/",
    },
];
export { routes, authRoutes };
