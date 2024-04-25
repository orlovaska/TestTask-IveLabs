import React from "react";
import { Select } from "antd";

interface ItemWithId {
    id: number;
    name: string;
    [key: string]: any; // Разрешаем доп свойства
}

interface SelectFilterProps {
    items: ItemWithId[];
    placeholder: string;
    onChangeSelectedValue: (value: number[] | undefined) => void;
    multiSelect: boolean;
}

const SelectFilter: React.FC<SelectFilterProps> = ({
    items,
    placeholder,
    onChangeSelectedValue,
    multiSelect: multiple = false, // По умолчанию мульти выбор выключен
}) => {
    return (
        <Select
            style={{width: "maxContent", minWidth: "140px"}}
            mode={multiple ? "multiple" : undefined}
            size="large"
            placeholder={placeholder}
            allowClear
            onChange={onChangeSelectedValue}
        >
            {items.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                    {item.name}
                </Select.Option>
            ))}
        </Select>
    );
};

export default SelectFilter;
