import React, {
  useCallback,
  useState,
  useEffect,
  TouchEvent,
  CSSProperties,
  useRef,
} from "react";
import "./SortableList.css";
import SortableListItem from "./SortableListItem";

type SortableListProps = {
  data: any;
  onClickItem: (index: number) => void;
  renderItem: (item: any, index: number) => JSX.Element;
  updateData?: (newPlayList: any) => void;
};

const SortableList = ({
  data,
  onClickItem,
  renderItem,
  updateData,
}: SortableListProps) => {
  /**
   * drag되는 item 의 index
   */
  const [startIndex, setStartIndex] = useState(0);
  const [listData, setListData] = useState(data);
  const [mobileDrag, setMobileDrag] = useState(false);

  const initialDragItemStyle: CSSProperties = {
    position: "absolute",
    opacity: 0.5,
    top: "110%",
    left: 0,
  };
  type DataPosition = {
    element: Element;
    y: number;
  };
  const [dragItemStyle, setDragItemStyle] =
    useState<CSSProperties>(initialDragItemStyle);
  const [dataPositionArray, setDataPositionArray] = useState<
    DataPosition[] | undefined
  >(undefined);
  const listRef = useRef<HTMLUListElement>(null);
  const onDragStart = (index: number) => setStartIndex(index);
  /**
   *
   * @param  dropIndex  : drag 되는 item의 drop될 위치의 index
   */
  const onDropItem = useCallback(
    (dropIndex: number) => {
      const dragItem = listData[startIndex];
      const list = [...listData];
      list.splice(startIndex, 1);
      list.splice(dropIndex, 0, dragItem);
      setListData(list);
      updateData && updateData(list);
    },
    [startIndex, listData, updateData]
  );
  const onTouchEnd = () => {
    if (mobileDrag) {
      const dragOverEl = document.querySelector(".dragover");
      if (dragOverEl) {
        const dropIndex: number = Number(
          dragOverEl.id.replace("sortableList_item_", "")
        );
        onDropItem(dropIndex);
        dragOverEl.classList.remove("dragover");
      }
      document.querySelector(".dragstart")?.classList.remove("dragstart");
      setMobileDrag(false);
    }
  };
  const onTouchMove = (event: TouchEvent) => {
    if (mobileDrag && dataPositionArray) {
      const itemHeight = document.querySelector(
        ".sortable-list .item"
      )?.clientHeight;
      if (itemHeight) {
        const top = event.touches[0].clientY;
        const bottom = top + itemHeight;
        setDragItemStyle({
          ...initialDragItemStyle,
          top: top + itemHeight * 0.5,
        });
        const target = dataPositionArray.filter(
          (e) => e.y <= bottom && e.y >= top
        )[0];
        if (target && !target.element?.classList?.contains("dragOver")) {
          document.querySelector(".dragover")?.classList.remove("dragover");
          target.element.classList.add("dragover");
        }
      }
    }
  };
  useEffect(() => {
    if (mobileDrag && listRef.current) {
      const listElTop = listRef.current.getClientRects()[0].top;
      const item = [...document.querySelectorAll(".sortable-list .item")].map(
        (e, i) => ({ element: e, y: e.getClientRects()[0].top - listElTop })
      );
      setDataPositionArray(item);
    }
  }, [mobileDrag]);

  return (
    <ul
      className="sortable-list"
      ref={listRef}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {listData.map((item: any, index: number) => (
        <SortableListItem
          key={index}
          index={index}
          draggable={true}
          onDropItem={onDropItem}
          onDragStart={onDragStart}
          onClickItem={onClickItem}
          mobileDrag={mobileDrag}
          setMobileDrag={setMobileDrag}
          startIndex={startIndex}
        >
          {renderItem(item, index)}
        </SortableListItem>
      ))}
      <SortableListItem
        key={listData.length}
        index={listData.length}
        draggable={false}
        onDropItem={onDropItem}
        mobileDrag={mobileDrag}
        setMobileDrag={setMobileDrag}
        startIndex={startIndex}
      />
      {mobileDrag && (
        <div className="drag-item" style={dragItemStyle}>
          <SortableListItem
            key={listData.length}
            index={startIndex}
            draggable={false}
            onDropItem={onDropItem}
            mobileDrag={mobileDrag}
            setMobileDrag={setMobileDrag}
            startIndex={startIndex}
          >
            {renderItem(listData[startIndex], startIndex)}
          </SortableListItem>
        </div>
      )}
    </ul>
  );
};

export default React.memo(SortableList);
