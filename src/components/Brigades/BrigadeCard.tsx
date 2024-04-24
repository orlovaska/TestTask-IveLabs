// import React from "react";
// import { Card } from "antd";

// interface BrigadeData {
//     brigadeName: string;
//     departmentName: string;
//     connectionState: string;
//     cluster: number;
//     field: string;
//     well: number;
// }

// const BrigadeCard: React.FC<BrigadeData> = ({
//     brigadeName,
//     departmentName,
//     connectionState,
//     cluster,
//     field,
//     well,
// }) => {
//     return (
//         <Card
//             style={{
//                 width: "100%",
//                 minWidth: "200px",
//                 height: "260px"
//             }}
//         >
//             <Card.Meta
//                 title={brigadeName}
//                 description={
//                     <>
//                         <p>{departmentName}</p>
//                         <p>{`Соединение: ${connectionState}`}</p>
//                         <p>{`Кластер: ${cluster}`}</p>
//                         <p>{`Поле: ${field}`}</p>
//                         <p>{`Скважина: ${well}`}</p>
//                     </>
//                 }
//             />
//         </Card>
//     );
// };

// export default BrigadeCard;

import React from "react";
import { Card, Typography } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

interface BrigadeData {
    brigadeName: string;
    departmentName: string;
    connectionState: string;
    cluster: number;
    field: string;
    well: number;
}

const BrigadeCard: React.FC<BrigadeData> = ({
    brigadeName,
    departmentName,
    connectionState,
    cluster,
    field,
    well,
}) => {
    const connectionStatusIcon =
        connectionState === "В норме" ? (
            <CheckCircleOutlined style={{ color: "green" }} />
        ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
        );

    return (
        <div style={{ padding: "10px" }}>
            <Card
                style={{
                    width: "100%",
                    minWidth: "200px",
                    height: "270px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    transition: "box-shadow 0.3s",
                }}
                hoverable
            >
                <Title level={4} style={{ marginTop: 0 }}>
                    {brigadeName}
                </Title>
                <Paragraph>{departmentName}</Paragraph>
                <Paragraph>
                    Соединение: {connectionStatusIcon} {connectionState}
                </Paragraph>
                <Paragraph>Кластер: {cluster}</Paragraph>
                <Paragraph>Поле: {field}</Paragraph>
                <Paragraph>Скважина: {well}</Paragraph>
            </Card>
        </div>
    );
};

export default BrigadeCard;
