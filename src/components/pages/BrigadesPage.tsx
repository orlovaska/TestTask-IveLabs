import React from "react";
import { BRIGADES_ROUTE } from "../../routing/routesConsts";
import Navbar from "../Navbar";
import BrigadesList from "../Brigades/BragadesList";

const BrigadesPage: React.FC = () => {
    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
            }}
        >
            <Navbar activeKey={BRIGADES_ROUTE} />
            <BrigadesList/>
        </div>
    );
};

export default BrigadesPage;
