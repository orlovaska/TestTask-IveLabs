import { InputNumber, Button } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { fetchPoints } from "../../store/reducers/PointsSlice";

interface GetPointsButtonProps {
    defaultValue: number;
}

const GetPointsButton: React.FC<GetPointsButtonProps> = (props) => {
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState<number | null>(
        props.defaultValue
    );

    const downloadPoints = () => {
        if (inputValue) {
            dispatch(fetchPoints(inputValue));
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                margin: "10px",
                gap: "10px",
            }}
        >
            <InputNumber
                min={1}
                max={1000000}
                defaultValue={props.defaultValue}
                onChange={(value) => setInputValue(value)}
            />
            <Button onClick={downloadPoints}>Загрузить точки</Button>
        </div>
    );
};

export default GetPointsButton;
