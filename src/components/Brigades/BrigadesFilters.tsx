import React from "react";
import { Flex } from "antd";
import { ConnectionState } from "../../models/ConnectionState";
import { Department } from "../../models/Department";
import SelectFilter from "./Filters/SelectFilter";

interface BrigadesFiltersProps {
    connectionStates: ConnectionState[];
    departments: Department[];
    onSelectedDepartmentChange: (selectedValues: number[] | undefined) => void;
    onSelectedConnectionChange: (selectedValues: number[] | undefined) => void;
}

const BrigadesFilters: React.FC<BrigadesFiltersProps> = ({
    connectionStates,
    departments,
    onSelectedDepartmentChange,
    onSelectedConnectionChange,
}) => {
    return (
        <Flex
            gap="middle"
            style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                margin: "10px",
                gap: "10px",
            }}
        >
            <SelectFilter
                items={connectionStates.map((connection) => ({
                    id: connection.id,
                    name: connection.name,
                }))}
                placeholder="Соединение"
                multiSelect={false}
                onChangeSelectedValue={onSelectedConnectionChange}
            />
            <SelectFilter
                items={departments}
                placeholder="Департамент"
                multiSelect={true}
                onChangeSelectedValue={onSelectedDepartmentChange}
            />
        </Flex>
    );
};

export default BrigadesFilters;
