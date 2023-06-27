import SortableList from "./lib/SortableList";
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
