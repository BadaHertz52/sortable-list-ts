import { useCallback, useState } from "react";
import "./SortableList.css";
import SortableListItem from "./SortableListItem";

type SortableListProps = {
  data: any;
  onClickItem: (index: number) => void;
  renderItem: (item: any, index: number) => JSX.Element;
  updateData?: (newPlayList: any) => void;
};

function SortableList({
  data,
  onClickItem,
  renderItem,
  updateData,
}: SortableListProps) {
  /**
   * drag되는 item 의 index
   */
  const [startIndex, setStartIndex] = useState(0);
  const [listData, setListData] = useState(data);
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
      list.splice(dropIndex - (startIndex < dropIndex ? -1 : 0), 0, dragItem);
      setListData(list);
      updateData && updateData(list);
    },
    [startIndex, listData]
  );
  return (
    <ul className="sortable-list">
      {listData.map((item: any, index: number) => (
        <SortableListItem
          key={index}
          index={index}
          draggable={true}
          onDropItem={onDropItem}
          onDragStart={onDragStart}
          onClickItem={onClickItem}
        >
          {renderItem(item, index)}
        </SortableListItem>
      ))}
      <SortableListItem
        key={listData.length}
        index={listData.length}
        draggable={false}
        onDropItem={onDropItem}
      />
    </ul>
  );
}

export default SortableList;
