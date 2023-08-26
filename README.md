# sortable-list-tsc

[🔗sortable-list-tsc 패키지 바로가기](https://www.npmjs.com/package/@badahertz52/sortable-list-tsc)

[🔗 sortable-list-tsc 패키지 사용한 샘플 보러가기 ](https://badahertz52.github.io/sortable-list-tsc/)

## <div id="sortable">1. Sortable List</div>

## <div id="#introduce">1) 소개</div>

<img alt="project" src="./sortable.gif" width="150px" />

마우스의 드래그, 드롭을 이용해 아이템을 재정렬할 할 수 있는 기능을 제공하는 [sortable-list 라이브러리](https://www.npmjs.com/package/@badahertz52/sortable-list) 는 react(with js)에서만 사용할 수 있었기 때문에, typescript 로 진행하는 react 프로젝트에서도 사용할 수 있는 sortable-list-tsc를 만들었다.

🔗[sortable-list github 바로가기](https://github.com/BadaHertz52/sortable)

🔗[sortable-list npm 바로가기](https://www.npmjs.com/package/@badahertz52/sortable-list)

## <div id="#use"> 2) 사용 방법</div>

### A. 설치

```bash
npm i @badahertz52/sortable-list-tsc
```

### B. 설명

### a. 컴포넌트

#### ⓐ SortableItem

사용자가 지정한 data 속의 아이템들을 감싸고 있는 html요소, 마우스의 드래그,드롭 이벤트를 통해 재정렬된다.

```ts
type SortableListItemProps = {
  index: number;
  draggable: boolean;
  children?: ReactNode;
  onDragStart?: (index: number) => void;
  onDropItem: (index: number) => void;
  onClickItem?: (index: number) => void;
};

const SortableItem = ({ props }: SortableListItemProps) => {
  return <li>{props.children}</li>;
};
```

- SortableItem의 props
  |props|설명|
  |---|---|
  | index|SortableItem이 감싸고 있는 data 속 아이템의 index |
  draggable|마우스로 드래그 할 수 있는 지 여부 <br/> type:boolean|
  children|data 속의 아이템을 화면에 표시하는 컴포넌트 ,<br/> 예시 : <a href="#testItem"> TestItem </a>|
  onDragStart| 드래그 시,startIndex의 상태를 드래그되는 아이템의 index로 변경하는 함수 |
  onDropItem| 아이템을 드롭 시, 드롭되는 위치에 맞게 아이템을 재정렬하는 함수|
  onClickItem|정렬된 아이템들을 클릭 할 때 발생하는 이벤트|
  <br/>

#### ⓑ SortableList

여러 개의 SortableItem을 가지고 있는, SortableItem의 부모 요소

```ts
type SortableListProps = {
  data: any;
  onClickItem: (index: number) => void;
  renderItem: (item: any, index: number) => JSX.Element;
  updateList?: (newPlayList: any) => void;
};

const SortableList = ({props}:SortableListProps) => {
  ....
}
```

- SortableList의 props
  |props|설명|
  |---|---|
  |data|정렬할 아이템들을 담은 배열로 배열안 요소의 형식은 사용자가 지정할 수 있다 <br/>
  type: Array|
  |onClickItem|정렬된 아이템들을 클릭 할 때 발생하는 이벤트 |
  |renderItem| SortableItem의 children 요소를 반환하는 함수로 정렬할 아이템을 화면상에 어떻게 보일 지를 결정한다. <br/> parameter: item (data의 item), index(item의 data 속 index) |
  |updateData|onDropItem 에서 item을 재졍렬해 data를 변경할때, 변경된 data를 SortableList 외부에서도 반영할 수 있게 해ㅔ준다. |

### b. 사용 예시

- App.js

```js
import SortableList from "@badahertz52/sortable-list";
import { data } from "./TestItem/testData";
import TestItem from "./TestItem/TestItem";
function App() {
  const onClickItem = (index) => {
    alert(index);
  };
  return (
    <SortableList
      data={data}
      renderItem={(item, index) => <TestItem data={item} index={index} />}
      onClickItem={onClickItem}
    />
  );
}

export default App;
```

- <div id="testItem"> TestItem.jsx </div>

```js
import React from "react";
import "./TestItem.css";
function TestItem({ data, index }) {
  return (
    <div className="test-item">
      <div>
        <p>content:{data.content}</p>
        <p>index:{index}</p>
      </div>
    </div>
  );
}

export default TestItem;
```

- testData.js

```js
export const data = [
  { content: "Apple 🍎" },
  { content: "Banana 🍌" },
  { content: "Carrot 🥕" },
  { content: "Dessert 🧁" },
];
```

## <div id="skill">2. Skill & Scripts</div>

### Skill

- HTML, CSS, TypeScript
- React

### install

```bash
npm i
```

### start

```bash
npm run start
```

### publish

```bash
npm publish
```
