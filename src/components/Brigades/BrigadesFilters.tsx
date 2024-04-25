import React, { useState } from "react";
import { Flex } from "antd";
import { ConnectionState } from "../../models/ConnectionState";
import { Department } from "../../models/Department";
import SelectFilter from "./Filters/SelectFilter";

export interface Filter {
    filteringFields: "department" | "connectionState";
    selectedValues: number[] | undefined;
}

interface BrigadesFiltersProps {
    connectionStates: ConnectionState[];
    departments: Department[];
    onFiltersChange: (filters: Filter[]) => void;
}

const BrigadesFilters: React.FC<BrigadesFiltersProps> = ({
    connectionStates,
    departments,
    onFiltersChange,
}) => {
    const [filters, setFilters] = useState<Filter[]>([
        { filteringFields: "department", selectedValues: undefined },
        { filteringFields: "connectionState", selectedValues: undefined },
    ]);
    const onSelectedValuesChange = (
        newSelectedValues: number[] | undefined,
        filteringFields: "department" | "connectionState"
    ) => {
        const newFilters = [...filters].map((filter) => {
            if (filter.filteringFields == filteringFields) {
                filter.selectedValues = newSelectedValues;
            }
            return filter;
        });
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

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
                onChangeSelectedValue={(selectedValues) =>
                    onSelectedValuesChange(selectedValues, "connectionState")
                }
            />
            <SelectFilter
                items={departments}
                placeholder="Департамент"
                multiSelect={true}
                onChangeSelectedValue={(selectedValues) =>
                    onSelectedValuesChange(selectedValues, "department")
                }
            />
        </Flex>
    );
};

export default BrigadesFilters;
