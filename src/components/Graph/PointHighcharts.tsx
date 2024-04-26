import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import GetPointsButton from "./GetPointsButton";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Modal, Spin, Typography } from "antd";
import { fetchPoints } from "../../store/reducers/PointsSlice";
const { Paragraph } = Typography;

const PointHighChart: React.FC = () => {
    const { points, isLoading, error } = useAppSelector(
        (state) => state.pointsReducer
    );
    const data = points?.map((point) => [Date.parse(point.x), point.y]);

    useEffect(() => {
        if (error) {
            Modal.error({
                title: "Ошибка при получении данных",
                content: error,
            });
        }
    }, [error]);

    const options: Highcharts.Options = {
        chart: {
            type: "line",
        },
        title: {
            text: "График",
        },
        xAxis: {
            type: "datetime",
            title: {
                text: "Дата и время",
            },
        },
        yAxis: {
            title: {
                text: "Значение",
            },
        },
        series: [
            {
                step: "left",
                type: "line",
                name: "Серия данных",
                data: data,
            },
        ],
    };

    return (
        <div style={{ margin: "20px" }}>
            <div style={{ marginLeft: "20px" }}>
                <GetPointsButton defaultValue={1000} />
            </div>
            {isLoading ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%"
                    }}
                >
                    <Spin style={{ marginBottom: "10px" }} size="large" />
                    <Paragraph style={{ color: "#1699ff", fontSize: "16px" }}>
                        Загрузка...
                    </Paragraph>
                </div>
            ) : (
                <HighchartsReact highcharts={Highcharts} options={options} />
            )}
        </div>
    );
};

export default PointHighChart;
