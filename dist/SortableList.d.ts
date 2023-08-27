import React, { CSSProperties } from "react";
import "./SortableList.css";
type SortableListProps = {
    data: any;
    onClickItem: (index: number) => void;
    renderItem: (item: any, index: number) => JSX.Element;
    updateData?: (newPlayList: any) => void;
    dragItemStyleProps?: CSSProperties;
};
declare const _default: React.MemoExoticComponent<({ data, onClickItem, renderItem, updateData, dragItemStyleProps, }: SortableListProps) => import("react/jsx-runtime").JSX.Element>;
export default _default;
