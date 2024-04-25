import React, { useEffect, useState } from "react";
import { AutoSizer, List, ListRowProps } from "react-virtualized";
import "react-virtualized/styles.css"; // импортируем стили
import BrigadeCard from "./BrigadeCard";
import BrigadesFilters from "./BrigadesFilters";
import { Department } from "../../models/Department";
import { ConnectionState } from "../../models/ConnectionState";
import { Brigade } from "../../models/Brigade";
import BrigadeService from "../../services/BrigadeService";

interface Size {
    width: number;
    height: number;
}

const cardWidth = 300;

const BrigadesList: React.FC = () => {
    const departments: Department[] = [
        {
            id: 0,
            name: "Лукойл",
        },
        {
            id: 1,
            name: "Роснефть",
        },
        {
            id: 2,
            name: "Газпром нефть",
        },
    ];
    const connectionStates: ConnectionState[] = [
        {
            id: 0,
            name: "Недоступен",
        },
        {
            id: 1,
            name: "Доступен",
        },
    ];
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                BrigadeService.getConnectionState().then((response) => {});
                BrigadeService.getDepartments().then((response) => {});
                BrigadeService.getBrigadesData().then((response) => {});
            } catch (error) {
                //TODO - сделать обработку ошибок
                console.error("Ошибка при получении данных:", error);
            }
        };

        fetchClasses();
    }, []);

    const [brigades, setBrigades] = useState<Brigade[]>();
    const [filteredBrigades, setFilteredBrigades] = useState(brigades);

    const onSelectedConnectionChange = (
        selectedValues: number[] | undefined
    ): void => {
        const newFilteredBrigades = brigades?.filter((brigade) =>
            selectedValues
                ? selectedValues.includes(brigade.connectionState.id)
                : true
        );
        setFilteredBrigades(newFilteredBrigades);
    };

    const onSelectedDepartmentChange = (
        selectedValues: number[] | undefined
    ): void => {
        const newFilteredBrigades = brigades?.filter((brigade) =>
            selectedValues
                ? selectedValues.includes(brigade.department.id)
                : true
        );
        setFilteredBrigades(newFilteredBrigades);
    };

    const rowRenderer = (
        { key, index, isScrolling, isVisible, style }: ListRowProps,
        listWidth: number
    ): JSX.Element => {
        console.log("index: ", index);
        console.log("style: ", style);

        const cardsPerRow = Math.floor(listWidth / cardWidth) || 1;
        const brigadesForRow = filteredBrigades?.slice(
            index * cardsPerRow,
            (index + 1) * cardsPerRow
        );

        console.log("cardsPerRow: ", cardsPerRow);
        return (
            <div
                key={key}
                style={{
                    ...style,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
                className="row"
            >
                {brigadesForRow?.map((brigade, idx) => (
                    <div key={`${key}_${idx}`} style={{ flex: "1" }}>
                        <BrigadeCard
                            brigadeName={brigade.name}
                            departmentName={brigade.department.name}
                            connectionState={brigade.connectionState.name}
                            cluster={brigade.position.cluster}
                            field={brigade.position.field}
                            well={brigade.position.well}
                        />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <BrigadesFilters
                connectionStates={connectionStates}
                departments={departments}
                onSelectedDepartmentChange={(selectedValues) => {
                    onSelectedDepartmentChange(selectedValues);
                }}
                onSelectedConnectionChange={(selectedValues) => {
                    onSelectedConnectionChange(selectedValues);
                }}
            />
            <AutoSizer>
                {({ width, height }: Size) => (
                    <List
                        style={{ padding: "20px" }}
                        width={width}
                        height={height - 80}
                        rowCount={Math.ceil(
                            filteredBrigades?.length || 0 / Math.max(1, Math.floor(width / cardWidth))
                        )}
                        rowHeight={270 + 20}
                        rowRenderer={(listProps) =>
                            rowRenderer(listProps, width)
                        }
                        overscanRowCount={3}
                    />
                )}
            </AutoSizer>
        </>
    );
};

export default BrigadesList;
