import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import GetPointsButton from "./GetPointsButton";
import React from "react";

const PointHighChart: React.FC = () => {
    const options: Highcharts.Options = {
        chart: {
            type: "line",
        },
        title: {
            text: "График с данными",
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
                data: [
                    [Date.parse("2023-01-01 00:00:00"), 440],
                    [Date.parse("2023-01-01 12:30:00"), 460],
                    [Date.parse("2023-01-01 15:45:00"), 480],
                ],
            },
        ],
    };

    return (
        <div style={{ margin: "20px" }}>
            <div style={{ marginLeft: "20px" }}>
                <GetPointsButton defaultValue={1000} />
            </div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default PointHighChart;
