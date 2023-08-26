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
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const SortableListItem = ({ index, draggable, children, onDragStart, onDropItem, onClickItem, mobileDrag, setMobileDrag, startIndex, }) => {
    let timeout = undefined;
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
    return ((0, jsx_runtime_1.jsx)("li", Object.assign({ ref: itemRef, className: "item", id: `sortableList_item_${index}`, draggable: draggable || false, onDragStart: onDragStartItem, onDragEnd: onDragEnd, onDragEnter: onDragEnter, onDragLeave: onDragLeave, onDragOver: onDragOver, onDrop: onDrop, onClick: onClick, onMouseEnter: () => { var _a; return (_a = itemRef.current) === null || _a === void 0 ? void 0 : _a.classList.add("on"); }, onMouseLeave: () => { var _a; return (_a = itemRef.current) === null || _a === void 0 ? void 0 : _a.classList.remove("on"); }, onTouchStart: onTouchStart, onTouchEnd: onTouchEnd }, { children: children })));
};
exports.default = react_1.default.memo(SortableListItem);
