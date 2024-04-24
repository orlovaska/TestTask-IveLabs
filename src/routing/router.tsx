import { Navigate, createBrowserRouter } from "react-router-dom";
import BrigadesPage from "../components/pages/BrigadesPage";
import GraphPage from "../components/pages/GraphPage";
import { BRIGADES_ROUTE, GRAPH_ROUTE } from "./routesConsts";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={BRIGADES_ROUTE} replace />,
    },
    {
        path: BRIGADES_ROUTE,
        element: <BrigadesPage />,
    },
    {
        path: GRAPH_ROUTE,
        element: <GraphPage />,
    },
]);
