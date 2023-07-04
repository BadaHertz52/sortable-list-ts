"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./SortableList.css");
const SortableListItem_1 = __importDefault(require("./SortableListItem"));
function SortableList({ data, onClickItem, renderItem, updateData, }) {
    /**
     * drag되는 item 의 index
     */
    const [startIndex, setStartIndex] = (0, react_1.useState)(0);
    const [listData, setListData] = (0, react_1.useState)(data);
    const onDragStart = (index) => setStartIndex(index);
    /**
     *
     * @param  dropIndex  : drag 되는 item의 drop될 위치의 index
     */
    const onDropItem = (0, react_1.useCallback)((dropIndex) => {
        const dragItem = listData[startIndex];
        const list = [...listData];
        list.splice(startIndex, 1);
        list.splice(dropIndex - (startIndex < dropIndex ? -1 : 0), 0, dragItem);
        setListData(list);
        updateData && updateData(list);
    }, [startIndex, listData]);
    return ((0, jsx_runtime_1.jsxs)("ul", { className: "sortable-list", children: [listData.map((item, index) => ((0, jsx_runtime_1.jsx)(SortableListItem_1.default, { index: index, draggable: true, onDropItem: onDropItem, onDragStart: onDragStart, onClickItem: onClickItem, children: renderItem(item, index) }, index))), (0, jsx_runtime_1.jsx)(SortableListItem_1.default, { index: listData.length, draggable: false, onDropItem: onDropItem }, listData.length)] }));
}
exports.default = SortableList;
