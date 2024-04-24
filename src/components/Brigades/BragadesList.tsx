import React from "react";
import { AutoSizer, List, ListRowProps } from "react-virtualized";
import "react-virtualized/styles.css"; // импортируем стили
import BrigadeCard from "./BrigadeCard";

interface Brigade {
    brigadeName: string;
    departmentName: string;
    connectionState: string;
    cluster: number;
    field: string;
    well: number;
}

interface Size {
    width: number;
    height: number;
}

// Моковые данные для списка бригад
const mockBrigades: Brigade[] = Array(100)
    .fill(null)
    .map((_, index) => ({
        brigadeName: `Бригада №${index + 1}`,
        departmentName: `Департамент ${index + 1}`,
        connectionState: index % 2 === 0 ? "В норме" : "Недоступен",
        cluster: 89,
        field: `Поле ${index + 1}`,
        well: 660,
    }));

const cardWidth = 300;

const BrigadesList: React.FC = () => {
    const rowRenderer = (
        { key, index, isScrolling, isVisible, style }: ListRowProps,
        listWidth: number
    ): JSX.Element => {
        const cardsPerRow = Math.floor(listWidth / cardWidth) || 1;
        const brigades = mockBrigades.slice(
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
                {brigades.map((brigade, idx) => (
                    <div key={`${key}_${idx}`} style={{ flex: "1" }}>
                        <BrigadeCard
                            brigadeName={brigade.brigadeName}
                            departmentName={brigade.departmentName}
                            connectionState={brigade.connectionState}
                            cluster={brigade.cluster}
                            field={brigade.field}
                            well={brigade.well}
                        />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <AutoSizer>
            {({ width, height }: Size) => (
                <List
                    style={{ padding: "20px" }}
                    width={width}
                    height={height - 64}
                    rowCount={Math.ceil(
                        mockBrigades.length /
                            Math.max(1, Math.floor(width / cardWidth))
                    )}
                    rowHeight={270 + 20}
                    rowRenderer={(listProps) => rowRenderer(listProps, width)}
                    overscanRowCount={3}
                />
            )}
        </AutoSizer>
    );
};

export default BrigadesList;
