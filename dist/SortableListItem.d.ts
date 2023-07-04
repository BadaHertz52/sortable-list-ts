import { ReactNode } from "react";
type SortableListItemProps = {
    index: number;
    draggable: boolean;
    children?: ReactNode;
    onDragStart?: (index: number) => void;
    onDropItem: (index: number) => void;
    onClickItem?: (index: number) => void;
};
declare function SortableListItem({ index, draggable, children, onDragStart, onDropItem, onClickItem, }: SortableListItemProps): import("react/jsx-runtime").JSX.Element;
export default SortableListItem;
