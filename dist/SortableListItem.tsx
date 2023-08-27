import React, {
  useRef,
  ReactNode,
  DragEvent,
  Dispatch,
  SetStateAction,
} from "react";

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

const SortableListItem = ({
  index,
  draggable,
  children,
  onDragStart,
  onDropItem,
  onClickItem,
  mobileDrag,
  setMobileDrag,
}: SortableListItemProps) => {
  let timeout: undefined | NodeJS.Timeout = undefined;
  const itemRef = useRef<HTMLLIElement>(null);
  const onDragStartItem = () => {
    itemRef.current?.classList.add("dragstart");
    onDragStart && onDragStart(index);
  };
  const onDragEnd = () => {
    itemRef.current?.classList.remove("dragstart");
  };
  const onDragEnter = () => {
    itemRef.current?.classList.add("dragover");
  };
  const onDragLeave = () => {
    itemRef.current?.classList.remove("dragover");
  };
  /**
   * onDrop 의 선행 조건
   */
  const onDragOver = (event: DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  };
  const onDrop = () => {
    itemRef.current?.classList.remove("dragover");
    onDropItem(index);
  };
  const onClick = () => {
    onClickItem && onClickItem(index);
  };
  const onTouchStart = () => {
    if (!mobileDrag) {
      timeout = setTimeout(() => {
        setMobileDrag(true);
        onDragStartItem();
      }, 1000);
    }
  };
  const onTouchEnd = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
  };
  return (
    <li
      ref={itemRef}
      className="item"
      id={`sortableList_item_${index}`}
      draggable={draggable || false}
      onDragStart={onDragStartItem}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
      onMouseEnter={() => itemRef.current?.classList.add("on")}
      onMouseLeave={() => itemRef.current?.classList.remove("on")}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </li>
  );
};

export default React.memo(SortableListItem);
