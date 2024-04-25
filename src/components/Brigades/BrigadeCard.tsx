import React from "react";
import { Card, Typography } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { ConnectionState } from "../../models/ConnectionState";
import { Department } from "../../models/Department";

const { Title, Paragraph } = Typography;

interface BrigadeData {
    brigadeName: string;
    department: Department | null;
    connectionState: ConnectionState | null;
    cluster: number;
    field: string;
    well: number;
}

const BrigadeCard: React.FC<BrigadeData> = ({
    brigadeName,
    department,
    connectionState,
    cluster,
    field,
    well,
}) => {
    const connectionStatusIcon =
        connectionState?.id === 1 ? (
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
                    transition: "box-shadow 0.2s",
                }}
                hoverable
            >
                <Title level={4} style={{ marginTop: 0 }}>
                    {brigadeName}
                </Title>
                <Paragraph>{department?.name}</Paragraph>
                <Paragraph>
                    Соединение: {connectionStatusIcon} {connectionState?.name}
                </Paragraph>
                <Paragraph>Кластер: {cluster}</Paragraph>
                <Paragraph>Поле: {field}</Paragraph>
                <Paragraph>Скважина: {well}</Paragraph>
            </Card>
        </div>
    );
};

export default BrigadeCard;
