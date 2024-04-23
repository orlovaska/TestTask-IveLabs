import React from "react";
import { GRAPH_ROUTE } from "../../routing/routesConsts";
import Navbar from "../Navbar";

const GraphPage: React.FC = () => {
    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
            }}
        >
            <Navbar activeKey={GRAPH_ROUTE} />
            GraphPage
        </div>
    );
};

export default GraphPage;
