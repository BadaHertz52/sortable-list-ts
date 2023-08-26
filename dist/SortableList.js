"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
require("./SortableList.css");
const SortableListItem_1 = __importDefault(require("./SortableListItem"));
const SortableList = ({ data, onClickItem, renderItem, updateData, }) => {
    /**
     * drag되는 item 의 index
     */
    const [startIndex, setStartIndex] = (0, react_1.useState)(0);
    const [listData, setListData] = (0, react_1.useState)(data);
    const [mobileDrag, setMobileDrag] = (0, react_1.useState)(false);
    const initialDragItemStyle = {
        position: "absolute",
        opacity: 0.5,
        top: "110%",
        left: 0,
    };
    const [dragItemStyle, setDragItemStyle] = (0, react_1.useState)(initialDragItemStyle);
    const [dataPositionArray, setDataPositionArray] = (0, react_1.useState)(undefined);
    const listRef = (0, react_1.useRef)(null);
    const onDragStart = (index) => setStartIndex(index);
    /**
     *
     * @param  dropIndex  : drag 되는 item의 drop될 위치의 index
     */
    const onDropItem = (0, react_1.useCallback)((dropIndex) => {
        const dragItem = listData[startIndex];
        const list = [...listData];
        list.splice(startIndex, 1);
        list.splice(dropIndex, 0, dragItem);
        setListData(list);
        updateData && updateData(list);
    }, [startIndex, listData, updateData]);
    const onTouchEnd = () => {
        var _a;
        if (mobileDrag) {
            const dragOverEl = document.querySelector(".dragover");
            if (dragOverEl) {
                const dropIndex = Number(dragOverEl.id.replace("sortableList_item_", ""));
                onDropItem(dropIndex);
                dragOverEl.classList.remove("dragover");
            }
            (_a = document.querySelector(".dragstart")) === null || _a === void 0 ? void 0 : _a.classList.remove("dragstart");
            setMobileDrag(false);
        }
    };
    const onTouchMove = (event) => {
        var _a, _b, _c, _d;
        if (mobileDrag && dataPositionArray) {
            const itemHeight = (_a = document.querySelector(".sortable-list .item")) === null || _a === void 0 ? void 0 : _a.clientHeight;
            if (itemHeight) {
                const top = event.touches[0].clientY;
                const bottom = top + itemHeight;
                setDragItemStyle(Object.assign(Object.assign({}, initialDragItemStyle), { top: top + itemHeight * 0.5 }));
                const target = dataPositionArray.filter((e) => e.y <= bottom && e.y >= top)[0];
                if (target && !((_c = (_b = target.element) === null || _b === void 0 ? void 0 : _b.classList) === null || _c === void 0 ? void 0 : _c.contains("dragOver"))) {
                    (_d = document.querySelector(".dragover")) === null || _d === void 0 ? void 0 : _d.classList.remove("dragover");
                    target.element.classList.add("dragover");
                }
            }
        }
    };
    (0, react_1.useEffect)(() => {
        if (mobileDrag && listRef.current) {
            const listElTop = listRef.current.getClientRects()[0].top;
            const item = [...document.querySelectorAll(".sortable-list .item")].map((e, i) => ({ element: e, y: e.getClientRects()[0].top - listElTop }));
            setDataPositionArray(item);
        }
    }, [mobileDrag]);
    return ((0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: "sortable-list", ref: listRef, onTouchMove: onTouchMove, onTouchEnd: onTouchEnd }, { children: [listData.map((item, index) => ((0, jsx_runtime_1.jsx)(SortableListItem_1.default, Object.assign({ index: index, draggable: true, onDropItem: onDropItem, onDragStart: onDragStart, onClickItem: onClickItem, mobileDrag: mobileDrag, setMobileDrag: setMobileDrag, startIndex: startIndex }, { children: renderItem(item, index) }), index))), (0, jsx_runtime_1.jsx)(SortableListItem_1.default, { index: listData.length, draggable: false, onDropItem: onDropItem, mobileDrag: mobileDrag, setMobileDrag: setMobileDrag, startIndex: startIndex }, listData.length), mobileDrag && ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "drag-item", style: dragItemStyle }, { children: (0, jsx_runtime_1.jsx)(SortableListItem_1.default, Object.assign({ index: startIndex, draggable: false, onDropItem: onDropItem, mobileDrag: mobileDrag, setMobileDrag: setMobileDrag, startIndex: startIndex }, { children: renderItem(listData[startIndex], startIndex) }), listData.length) })))] })));
};
exports.default = react_1.default.memo(SortableList);
