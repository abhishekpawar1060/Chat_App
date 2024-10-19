import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheackPasswordPage from "../pages/CheackPasswordPage";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "email",
                element: <CheckEmailPage />
            },
            {
                path: "password",
                element: <CheackPasswordPage />
            },
            {
                path: "",
                element: <Home />,
                children: [
                    {
                        path: ":userId",
                        element: <MessagePage />
                    }
                ]
            }
        ]
    }
])

export default router;