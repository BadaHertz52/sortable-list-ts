"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function SortableListItem({ index, draggable, children, onDragStart, onDropItem, onClickItem, }) {
    const itemRef = (0, react_1.useRef)(null);
    const onDragStartItem = () => {
        var _a;
        (_a = itemRef.current) === null || _a === void 0 ? void 0 : _a.classList.add("dragstart");
        onDragStart && onDragStart(index);
    };
    const onDragEnd = () => {
        var _a;
        (_a = itemRef.current) === null || _a === void 0 ? void 0 : _a.classList.remove("dragstart");
    };
    const onDragEnter = () => {
        var _a;
        (_a = itemRef.current) === null || _a === void 0 ? void 0 : _a.classList.add("dragover");
    };
    const onDragLeave = () => {
        var _a;
        (_a = itemRef.current) === null || _a === void 0 ? void 0 : _a.classList.remove("dragover");
    };
    /**
     * onDrop 의 선행 조건
     */
    const onDragOver = (event) => {
        event.preventDefault();
    };
    const onDrop = () => {
        var _a;
        (_a = itemRef.current) === null || _a === void 0 ? void 0 : _a.classList.remove("dragover");
        onDropItem(index);
    };
    const onClick = () => {
        onClickItem && onClickItem(index);
    };
    return ((0, jsx_runtime_1.jsx)("li", { ref: itemRef, className: "item", draggable: draggable || false, onDragStart: onDragStartItem, onDragEnd: onDragEnd, onDragEnter: onDragEnter, onDragLeave: onDragLeave, onDragOver: onDragOver, onDrop: onDrop, onClick: onClick, onMouseEnter: () => { var _a; return (_a = itemRef.current) === null || _a === void 0 ? void 0 : _a.classList.add("on"); }, onMouseLeave: () => { var _a; return (_a = itemRef.current) === null || _a === void 0 ? void 0 : _a.classList.remove("on"); }, children: children }));
}
exports.default = SortableListItem;
