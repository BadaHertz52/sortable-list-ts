import React, { ReactNode, Dispatch, SetStateAction } from "react";
type SortableListItemProps = {
    index: number;
    draggable: boolean;
    children?: ReactNode;
    onDragStart?: (index: number) => void;
    onDropItem: (index: number) => void;
    onClickItem?: (index: number) => void;
    mobileDrag: boolean;
    setMobileDrag: Dispatch<SetStateAction<boolean>>;
};
declare const _default: React.MemoExoticComponent<({ index, draggable, children, onDragStart, onDropItem, onClickItem, mobileDrag, setMobileDrag, }: SortableListItemProps) => import("react/jsx-runtime").JSX.Element>;
export default _default;
