import React from "react";
import { GRAPH_ROUTE } from "../../routing/routesConsts";
import Navbar from "../Navbar";
import PointHighChart from "../Graph/PointHighcharts";

const GraphPage: React.FC = () => {
    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
            }}
        >
            <Navbar activeKey={GRAPH_ROUTE} />
            <PointHighChart />
        </div>
    );
};

export default GraphPage;
