import React, { useEffect, useState } from "react";
import { AutoSizer, List, ListRowProps } from "react-virtualized";
import "react-virtualized/styles.css";
import BrigadeCard from "./BrigadeCard";
import BrigadesFilters, { Filter } from "./BrigadesFilters";
import { Brigade } from "../../models/Brigade";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    fetchBrigades,
    fetchConnectionStates,
    fetchDepartments,
} from "../../store/reducers/BrigadesSlice";
import { Modal, Spin, Typography } from "antd";
const { Paragraph } = Typography;

interface Size {
    width: number;
    height: number;
}

const cardWidth = 300;

const BrigadesList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { brigades, isLoading, error } = useAppSelector(
        (state) => state.brigadesReducer
    );
    const departments = useAppSelector(
        (state) => state.brigadesReducer.departments
    );
    const connectionStates = useAppSelector(
        (state) => state.brigadesReducer.connectionStates
    );

    const [filteredBrigades, setFilteredBrigades] = useState<Brigade[]>(
        brigades ? brigades : []
    );

    useEffect(() => {
        setFilteredBrigades(brigades ?? []);
    }, [brigades?.length]);

    useEffect(() => {
        if (brigades == null) {
            dispatch(fetchBrigades());
        }
        if (departments == null) {
            dispatch(fetchDepartments());
        }
        if (connectionStates == null) {
            dispatch(fetchConnectionStates());
        }
    }, []);

    useEffect(() => {
        if (error) {
            Modal.error({
                title: "Ошибка при получении данных",
                content: error,
            });
        }
    }, [error]);

    const handleFiltersChange = (filters: Filter[]): void => {
        if (!brigades) return;

        const newFilteredBrigades = brigades.filter((brigade) => {
            return filters.every((filter) => {
                if (
                    !filter.selectedValues ||
                    filter.selectedValues.length === 0
                ) {
                    // Если фильтр не активен, то считаем условие выполненным
                    return true;
                }

                switch (filter.filteringFields) {
                    case "department":
                        return filter.selectedValues.includes(
                            brigade.departmentId
                        );
                    case "connectionState":
                        return filter.selectedValues.includes(
                            brigade.connectionStateId
                        );
                    default:
                        return true; // Если фильтр неизвестен, не фильтруем по нему
                }
            });
        });

        setFilteredBrigades(newFilteredBrigades);
    };

    const rowRenderer = (
        { key, index, isScrolling, isVisible, style }: ListRowProps,
        listWidth: number
    ): JSX.Element => {
        const cardsPerRow = Math.floor(listWidth / cardWidth) || 1;
        const brigadesForRow = filteredBrigades?.slice(
            index * cardsPerRow,
            (index + 1) * cardsPerRow
        );

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
                            department={
                                departments?.find(
                                    (d) => d.id == brigade.departmentId
                                ) ?? null
                            }
                            connectionState={
                                connectionStates?.find(
                                    (d) => d.id == brigade.connectionStateId
                                ) ?? null
                            }
                            cluster={brigade.position.cluster}
                            field={brigade.position.field}
                            well={brigade.position.well}
                        />
                    </div>
                ))}
            </div>
        );
    };

    if (isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80%",
                }}
            >
                <Spin style={{ marginBottom: "10px" }} size="large" />
                <Paragraph style={{ color: "#1699ff", fontSize: "16px" }}>
                    Загрузка...
                </Paragraph>
            </div>
        );
    }

    return (
        <>
            <div style={{ marginLeft: "20px", position: "relative" }}>
                <BrigadesFilters
                    connectionStates={connectionStates ? connectionStates : []}
                    departments={departments ? departments : []}
                    onFiltersChange={handleFiltersChange}
                />
            </div>
            <AutoSizer>
                {({ width, height }: Size) => (
                    <List
                        style={{ padding: "0px 20px 20px 20px" }}
                        width={width}
                        height={height - 125}
                        rowCount={Math.ceil(
                            (filteredBrigades?.length ||
                                0) / Math.max(1, Math.floor(width / cardWidth))
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
