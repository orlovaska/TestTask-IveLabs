import React from "react";
import { BRIGADES_ROUTE } from "../../routing/routesConsts";
import Navbar from "../Navbar";

const BrigadesPage: React.FC = () => {
    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
            }}
        >
            <Navbar activeKey={BRIGADES_ROUTE} />
            BrigadesPage
        </div>
    );
};

export default BrigadesPage;
